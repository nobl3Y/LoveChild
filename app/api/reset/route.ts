import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  if (globalThis.__cohortAdditions) {
    globalThis.__cohortAdditions = { ada: [], blessing: [], chiamaka: [] };
  }
  return NextResponse.json({ success: true, message: 'Live cohort records reset to baseline.' });
}
