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
  limit = 5,
  timeoutMs = 3500
): Promise<MemoryItem[]> {
  try {
    const res: any = await Promise.race([
      getMemWal().recall({ query, limit, namespace }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('recall timeout')), timeoutMs)),
    ]);
    return (res?.results || []).map((r: any) => ({
      blobId: r.blob_id,
      text: r.text,
      createdAt: r.created_at,
    }));
  } catch (err: any) {
    console.warn('recallMemories notice:', err.message);
    return [];
  }
}

/** Everything stored for this person, oldest first. */
export async function listMemories(namespace: string): Promise<MemoryItem[]> {
  try {
    const items = await recallMemories(
      namespace,
      'pregnancy symptoms vitals notes',
      20,
      6000
    );
    return items.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  } catch (err: any) {
    console.warn('listMemories notice:', err.message);
    return [];
  }
}

/** 
 * Writes one memory to Walrus. Returns immediately or within ~1.2s so the user chat is blazing fast.
 * The Walrus relayer continues processing and committing to Sui in the background.
 */
export async function saveMemory(
  namespace: string,
  text: string,
  timeoutMs = 1500
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
    // If not confirmed within 1.5s, the job is still active on Walrus and will confirm in the background
    return { status: 'pending', jobId };
  }
}
