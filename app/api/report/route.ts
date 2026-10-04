import { NextRequest, NextResponse } from 'next/server';
import { generate } from '@/lib/server/gemini';
import { listMemories, namespaceFor } from '@/lib/server/walrus';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { name, pin, week } = await req.json();
    if (!name?.trim() || !pin?.trim()) {
      return NextResponse.json({ error: 'Name and PIN are required.' }, { status: 400 });
    }

    const memories = await listMemories(namespaceFor(name, pin));
    if (memories.length === 0) {
      return NextResponse.json({ memories, report: '' });
    }

    const notes = memories
      .map((m, i) => `${i + 1}. ${m.createdAt ? m.createdAt.slice(0, 10) + ' — ' : ''}${m.text}`)
      .join('\n');

    const report = await generate(
      `You are preparing a short summary for a pregnant woman to hand to her doctor. Use ONLY the notes below. Do not invent symptoms, numbers, dates or diagnoses. If something is unclear, say so.

Her nickname: ${name}${week ? `, currently week ${week}` : ''}.

NOTES SHE RECORDED (oldest first):
${notes}

Write in plain language with these headings exactly:
WHAT SHE HAS REPORTED
(a short dated timeline, one line per item)
WHAT KEEPS COMING BACK
(patterns across the notes, or "Nothing repeated yet")
WORTH ASKING THE DOCTOR
(2 to 4 questions based only on the notes)

Do not diagnose. Keep it under 250 words.`,
      1500
    );

    return NextResponse.json({ memories, report });
  } catch (error: any) {
    console.error('report error:', error);
    return NextResponse.json({ error: error?.message || 'Could not build the report.' }, { status: 500 });
  }
}
