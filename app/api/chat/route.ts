import { NextRequest, NextResponse } from 'next/server';
import { generate } from '@/lib/server/gemini';
import { namespaceFor, recallMemories, saveMemory } from '@/lib/server/walrus';

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
    const recalled = withMemory ? await recallMemories(namespace, message, 6) : [];

    const memoryBlock = withMemory
      ? recalled.length
        ? `NOTES SHE HAS ALREADY TOLD YOU (from Walrus Memory):\n${recalled
            .map((m) => `- ${m.createdAt ? m.createdAt.slice(0, 10) + ': ' : ''}${m.text}`)
            .join('\n')}`
        : 'You have no earlier notes from her yet. This looks like her first conversation.'
      : 'MEMORY IS OFF. You know nothing about her beyond this one message. Do not guess at her history.';

    const prompt = `You are LoveChild, a warm maternal care companion. You help a pregnant woman keep track of how she feels so she can give her doctor the full picture.

Her nickname: ${name} (${weekText}). Today: ${today}.

${memoryBlock}

RULES
- Reply in plain, kind, human language. No jargon, no lists longer than 3 points.
- If earlier notes are relevant, mention them naturally ("Last time you told me...").
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
