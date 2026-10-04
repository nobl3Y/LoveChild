import { NextRequest, NextResponse } from 'next/server';
import { listMemories, namespaceFor } from '@/lib/server/walrus';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, pin } = await req.json();
    if (!name?.trim() || !pin?.trim()) {
      return NextResponse.json({ error: 'Name and PIN are required.' }, { status: 400 });
    }
    const memories = await listMemories(namespaceFor(name, pin));
    return NextResponse.json({ memories });
  } catch (error: any) {
    console.error('memories error:', error);
    return NextResponse.json({ error: error?.message || 'Could not load memories.' }, { status: 500 });
  }
}
