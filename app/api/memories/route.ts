import { NextRequest, NextResponse } from 'next/server';
import { listMemories, namespaceFor } from '@/lib/server/walrus';
import { getCohortData } from '@/lib/cohortData';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, pin } = await req.json();
    if (!name?.trim() || !pin?.trim()) {
      return NextResponse.json({ error: 'Name and PIN are required.' }, { status: 400 });
    }

    // Instant return for verified demo cohort mothers
    const cohort = getCohortData(name);
    if (cohort) {
      return NextResponse.json({ memories: cohort.records });
    }

    const memories = await listMemories(namespaceFor(name, pin));
    return NextResponse.json({ memories });
  } catch (error: any) {
    console.error('memories error:', error);
    return NextResponse.json({ error: error?.message || 'Could not load memories.' }, { status: 500 });
  }
}
