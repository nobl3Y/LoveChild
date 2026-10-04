import { MemWal } from '@mysten-incubation/memwal';
import { createHash } from 'crypto';
import type { MemoryItem } from '../types';

let client: MemWal | null = null;

export function getMemWal(): MemWal {
  if (client) return client;
  const key = process.env.MEMWAL_PRIVATE_KEY;
  const accountId = process.env.MEMWAL_ACCOUNT_ID;
  const serverUrl = process.env.MEMWAL_SERVER_URL || 'https://relayer.memory.walrus.xyz';
  if (!key || !accountId) {
    throw new Error('Walrus Memory is not configured (MEMWAL_PRIVATE_KEY / MEMWAL_ACCOUNT_ID missing).');
  }
  client = MemWal.create({ key, accountId, serverUrl });
  return client;
}

/** Each person gets their own Walrus namespace, derived from nickname + PIN. */
export function namespaceFor(name: string, pin: string): string {
  const id = createHash('sha256')
    .update(`${name.trim().toLowerCase()}:${pin.trim()}`)
    .digest('hex')
    .slice(0, 24);
  return `lovechild-${id}`;
}

export async function recallMemories(
  namespace: string,
  query: string,
  limit = 5
): Promise<MemoryItem[]> {
  const res = await getMemWal().recall({ query, limit, namespace });
  return (res.results || []).map((r: any) => ({
    blobId: r.blob_id,
    text: r.text,
    createdAt: r.created_at,
  }));
}

/** Everything stored for this person, oldest first. */
export async function listMemories(namespace: string): Promise<MemoryItem[]> {
  try {
    const items = await recallMemories(
      namespace,
      'pregnancy symptoms vitals notes',
      20
    );
    return items.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  } catch (err: any) {
    console.warn('listMemories notice:', err.message);
    return [];
  }
}

/** Writes one memory and waits (up to timeoutMs) for the real Walrus blob id. */
export async function saveMemory(
  namespace: string,
  text: string,
  timeoutMs = 45000
): Promise<{ status: 'saved' | 'pending'; blobId?: string; jobId: string }> {
  const memwal = getMemWal();
  const job = await memwal.remember(text, namespace);
  const jobId = job.job_id;
  try {
    const result: any = await Promise.race([
      memwal.waitForRememberJob(jobId),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs)),
    ]);
    return { status: 'saved', blobId: result?.blob_id, jobId };
  } catch {
    return { status: 'pending', jobId };
  }
}
