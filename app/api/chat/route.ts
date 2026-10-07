import { NextRequest, NextResponse } from 'next/server';
import { generate } from '@/lib/server/gemini';
import { namespaceFor, recallMemories, saveMemory, listMemories } from '@/lib/server/walrus';
import { getCohortData, addCohortRecord } from '@/lib/cohortData';

export const runtime = 'nodejs';
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const { name, pin, week, message, withMemory } = await req.json();

    if (!name?.trim() || !pin?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, PIN and message are required.' }, { status: 400 });
    }

    const namespace = namespaceFor(name, pin);
    const today = new Date().toISOString().slice(0, 10);
    const weekText = week ? `Week ${week}` : 'week not given';

    // 1. RECALL: only when memory is ON, and only this person's namespace.
    const cohort = getCohortData(name);
    let recalled: any[] = [];
    let allNotes: any[] = [];

    if (withMemory) {
      const lower = message.toLowerCase();
      const isHistoryOrCompilationQuery = /(compile|summar|checklist|doctor visit|antenatal visit|appointment|recap|briefing|before|earlier|previous|history|past|last time|what did i|what was|remind me|records|timeline|everything)/i.test(lower);

      if (cohort) {
        allNotes = cohort.records;
        const stopWords = new Set(['hello', 'there', 'please', 'today', 'having', 'about', 'with', 'from', 'what', 'when', 'where', 'which', 'this', 'that', 'have', 'been', 'feel', 'feeling', 'lovechild', 'good', 'morning', 'afternoon', 'evening', 'night']);
        const queryWords = lower
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter((w: string) => w.length >= 4 && !stopWords.has(w));

        const matched = queryWords.length > 0
          ? allNotes.filter((n: any) => {
              const noteLower = n.text.toLowerCase();
              return queryWords.some((word: string) => noteLower.includes(word));
            })
          : [];

        if (isHistoryOrCompilationQuery) {
          recalled = allNotes.slice(-5);
        } else if (matched.length > 0) {
          recalled = matched.slice(-4);
        } else {
          recalled = [];
        }
      } else {
        recalled = await recallMemories(namespace, message, 6);
        allNotes = await listMemories(namespace);
        if (recalled.length === 0 && isHistoryOrCompilationQuery && allNotes.length > 0) {
          recalled = allNotes.slice(-5);
        }
      }
    }

    const memoryBlock = withMemory
      ? allNotes.length > 0
        ? recalled.length > 0
          ? `NOTES RECALLED FROM WALRUS MEMORY (relevant to her message):\n${recalled
              .map((m) => `- ${m.createdAt ? m.createdAt.slice(0, 10) + ': ' : ''}${m.text}`)
              .join('\n')}\n(She is a returning mother with ${allNotes.length} notes on Walrus. Reference these recalled notes naturally since they relate directly to what she asked or reported.)`
          : `(She is a returning mother with ${allNotes.length} notes on Walrus. Welcome her back warmly as an ongoing companion. She has not reported any specific symptoms or asked for past records in this message, so do NOT invent or assume current symptoms. Just greet her warmly and ask how she is doing today.)`
        : 'You have no earlier notes from her yet on Walrus. This is her very first conversation.'
      : `WALRUS MEMORY IS CURRENTLY OFF:
- You know nothing about her history, timeline, gestational age, or past check-ins beyond what she says in this message.
- CRITICAL: Never mention, assume, or guess her week of pregnancy or dates. Do NOT say phrases like "at X weeks" or "30 weeks along" unless she explicitly wrote it in her current message.
- If she asks about past notes, earlier symptoms, or previous check-ins (e.g. "what were the things that I had before?"): kindly explain that you cannot see past notes because Walrus Memory is currently off.
- Remind her naturally and gently: "If you want me to remember your details between visits, you can turn on Walrus Memory anytime above."
- Keep this reminder moderate—only mention turning on Walrus Memory when relevant (like when she asks about past history or how to save things), not in every casual greeting.`;

    const identityLine = withMemory
      ? `Her nickname: ${name} (${weekText}). Today: ${today}.`
      : `Her nickname: ${name}.`;

    const prompt = `You are LoveChild, a deeply compassionate, attentive maternal care companion (like a warm, wise midwife or doula). You help an expectant mother track how she feels, validating her journey while keeping an accurate record for her doctor.

${identityLine}

${memoryBlock}

COMMUNICATION GUIDELINES:
- Speak in warm, natural, human language with genuine emotional intelligence. Vary your phrasing dynamically—never sound scripted, robotic, or like a static questionnaire.
- If memory is ON and earlier notes are relevant to her current message, weave them into the conversation naturally ("Last time you mentioned...").
- If she asks to compile, summarize, or prepare symptoms for her doctor/antenatal visit:
  * Provide an organized, empathetic, bulleted summary of her tracked symptoms from Walrus Memory (e.g. swelling, headaches, blood pressure readings).
  * Highlight any key clinical patterns (such as morning swelling or rising blood pressure) she should discuss with her doctor.
  * Remind her gently that she can also click the "Doctor's Report" button at the top anytime for a full clinical briefing to share with her OB-GYN.
  * You may use bullet points and up to 160 words for compilation requests.
- Otherwise, keep standard conversational replies between 40 and 110 words.
- If memory is OFF, NEVER mention or guess her week of pregnancy, gestational age, or past timeline unless she explicitly typed it in her current message.
- Never diagnose and never prescribe. Do not name specific medicines to take.
- If she describes something potentially urgent (heavy bleeding, visual disturbances, severe headache, absent fetal movements, fluid leakage, chest pain, breathing difficulty), urge her clearly to contact her clinic or go to a hospital immediately.

CLINICAL TRIAGE CRITERIA (for background doctor record):
- HAS_CLINICAL_SYMPTOM: Set to YES ONLY if she reported a personal physical symptom, sensation, physiological distress, vital sign/biometric reading, or fetal movement concern experienced currently/today.
- Set HAS_CLINICAL_SYMPTOM: NO for greetings, general check-ins, conversational remarks, thank yous, app usage questions, educational inquiries, OR when she is asking to compile, summarize, or review past notes for a doctor visit (since she is summarizing existing records rather than reporting a new symptom).

She says: "${message}"

Answer in EXACTLY this format:
REPLY:
<your dynamic, warm, empathetic reply to her>
HAS_CLINICAL_SYMPTOM: <YES or NO>
NOTE:
<if YES: 1 short factual sentence summarizing her reported symptom for her doctor's file, using only what she said. If NO: write NONE>`;

    const raw = await generate(prompt, 1200, 0.65);
    const [replyPart, rest = ''] = raw.split(/\nHAS_CLINICAL_SYMPTOM:\s*/i);
    const reply = replyPart.replace(/^REPLY:\s*/i, '').trim();
    const [hasSymptomPart, notePart = ''] = rest.split(/\nNOTE:\s*/i);
    const hasClinicalSymptom = /^YES/i.test(hasSymptomPart.trim());
    const note = notePart.trim();

    // 2. REMEMBER: write the note to Walrus (only when memory is ON and a clinical symptom was reported).
    let recorded: {
      note: string;
      blobId?: string;
      jobId?: string;
      status: 'saved' | 'pending' | 'skipped' | 'failed';
      error?: string;
    } = { note: '', status: 'skipped' };

    if (withMemory && hasClinicalSymptom && note && note.toUpperCase() !== 'NONE') {
      const memoryText = `${today} (${weekText}) — ${note} She said: "${message.trim()}"`;
      try {
        const saved = await saveMemory(namespace, memoryText);
        recorded = { note: memoryText, status: saved.status, blobId: saved.blobId, jobId: saved.jobId };
        addCohortRecord(name, {
          blobId: saved.blobId || `job-${saved.jobId}`,
          text: memoryText,
          createdAt: new Date().toISOString(),
        });
      } catch (e: any) {
        recorded = { note: memoryText, status: 'failed', error: e?.message || 'Could not save to Walrus.' };
      }
    }

    return NextResponse.json({ reply, recalled, recorded });
  } catch (error: any) {
    console.error('chat error:', error);
    return NextResponse.json({ error: error?.message || 'Something went wrong.' }, { status: 500 });
  }
}
