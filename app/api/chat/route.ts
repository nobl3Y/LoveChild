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
      if (cohort) {
        allNotes = cohort.records;
        const lower = message.toLowerCase();
        const matched = allNotes.filter((n) =>
          lower.split(/\s+/).some((word: string) => word.length > 3 && n.text.toLowerCase().includes(word))
        );
        recalled = matched.length > 0 ? matched.slice(-4) : allNotes.slice(-4);
      } else {
        recalled = await recallMemories(namespace, message, 6);
        allNotes = await listMemories(namespace);
        if (recalled.length === 0 && allNotes.length > 0) {
          const lower = message.toLowerCase();
          const matched = allNotes.filter((n) =>
            lower.split(/\s+/).some((word: string) => word.length > 3 && n.text.toLowerCase().includes(word))
          );
          recalled = matched.length > 0 ? matched.slice(-4) : allNotes.slice(-4);
        }
      }
    }

    const memoryBlock = withMemory
      ? allNotes.length > 0
        ? `NOTES SHE HAS ALREADY TOLD YOU (from Walrus Memory):\n${recalled
            .map((m) => `- ${m.createdAt ? m.createdAt.slice(0, 10) + ': ' : ''}${m.text}`)
            .join('\n')}\n(She is a returning mother with ${allNotes.length} notes on Walrus. Welcome her back warmly as an ongoing companion.)`
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

    const prompt = `You are LoveChild, a warm maternal care companion. You help a pregnant woman keep track of how she feels so she can give her doctor the full picture.

${identityLine}

${memoryBlock}

RULES
- Reply in plain, kind, human language. No jargon, no lists longer than 3 points.
- If memory is ON and earlier notes are relevant, mention them naturally ("Last time you told me...").
- If memory is OFF, NEVER mention or guess her week of pregnancy, gestational age, or past timeline unless she explicitly typed it in her current message.
- Never diagnose and never recommend prescription medicine. Do not name medicines to take.
- If she describes something that could be an emergency (heavy bleeding, severe headache with vision changes, baby not moving, fluid leaking, chest pain, trouble breathing), tell her clearly to contact her clinic or go to a hospital now.
- Keep the reply under 120 words.

She says: "${message}"

Answer in EXACTLY this format:
REPLY:
<your reply to her>
NOTE:
<one or two short plain sentences recording what she reported, for her doctor's file, using only what she said. Write NONE if she only said hello or asked something with nothing to record.>`;

    const raw = await generate(prompt);
    const [replyPart, notePart = ''] = raw.split(/\nNOTE:\s*/i);
    const reply = replyPart.replace(/^REPLY:\s*/i, '').trim();
    const note = notePart.trim();

    // 2. REMEMBER: write the note to Walrus (only when memory is ON).
    let recorded: {
      note: string;
      blobId?: string;
      status: 'saved' | 'pending' | 'skipped' | 'failed';
      error?: string;
    } = { note: '', status: 'skipped' };

    if (withMemory && note && note.toUpperCase() !== 'NONE') {
      const memoryText = `${today} (${weekText}) — ${note} She said: "${message.trim()}"`;
      try {
        const saved = await saveMemory(namespace, memoryText);
        recorded = { note: memoryText, status: saved.status, blobId: saved.blobId };
        if (cohort) {
          addCohortRecord(name, {
            blobId: saved.blobId || `walrus_live_${Date.now()}`,
            text: memoryText,
            createdAt: new Date().toISOString(),
          });
        }
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
