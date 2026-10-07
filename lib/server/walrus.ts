import { MemWal } from '@mysten-incubation/memwal';
import { createHash } from 'crypto';
import type { MemoryItem } from '../types';

let client: MemWal | null = null;

// High-speed In-Memory Cache to prevent repeated slow network roundtrips to Walrus Relayer
interface CacheEntry {
  items: MemoryItem[];
  timestamp: number;
}
const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 180_000; // 3 minutes cache

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

/** Recalls relevant memories with fast fallback to in-memory cache */
export async function recallMemories(
  namespace: string,
  query: string,
  limit = 5,
  timeoutMs = 2500
): Promise<MemoryItem[]> {
  try {
    const res: any = await Promise.race([
      getMemWal().recall({ query, limit, namespace }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('recall timeout')), timeoutMs)),
    ]);
    const items = (res?.results || []).map((r: any) => ({
      blobId: r.blob_id,
      text: r.text,
      createdAt: r.created_at,
    }));

    if (items.length > 0) {
      return items;
    }
  } catch (err: any) {
    console.warn('recallMemories network notice:', err.message);
  }

  // Fallback to in-memory cache for speed
  const cached = memoryCache.get(namespace);
  if (cached && cached.items.length > 0) {
    return cached.items.slice(-limit);
  }
  return [];
}

/** Everything stored for this person, oldest first. Cached for instant responses. */
export async function listMemories(namespace: string, forceRefresh = false): Promise<MemoryItem[]> {
  const cached = memoryCache.get(namespace);
  const now = Date.now();

  // Return cached notes instantly if still fresh
  if (!forceRefresh && cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.items;
  }

  try {
    const res: any = await Promise.race([
      getMemWal().recall({ query: 'pregnancy symptoms vitals notes timeline', limit: 25, namespace }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('listMemories timeout')), 4500)),
    ]);

    const items: MemoryItem[] = (res?.results || []).map((r: any) => ({
      blobId: r.blob_id,
      text: r.text,
      createdAt: r.created_at,
    })).sort((a: MemoryItem, b: MemoryItem) => (a.createdAt || '').localeCompare(b.createdAt || ''));

    if (items.length > 0 || !cached) {
      memoryCache.set(namespace, { items, timestamp: now });
      return items;
    }
    return cached.items;
  } catch (err: any) {
    console.warn('listMemories network notice:', err.message);
    if (cached) return cached.items;
    return [];
  }
}

/** 
 * Writes one memory to Walrus. Returns in ~300ms without freezing the chat.
 * Confirms asynchronously with Walrus while keeping memory cache immediately updated.
 */
export async function saveMemory(
  namespace: string,
  text: string,
  timeoutMs = 3800
): Promise<{ status: 'saved' | 'pending'; blobId?: string; jobId: string }> {
  const memwal = getMemWal();
  const job = await memwal.remember(text, namespace);
  const jobId = job.job_id;

  // Immediately append to in-memory cache so subsequent recalls see this note right away
  const cached = memoryCache.get(namespace);
  const tempItem: MemoryItem = {
    blobId: `job-${jobId}`,
    text,
    createdAt: new Date().toISOString(),
  };
  if (cached) {
    cached.items.push(tempItem);
    cached.timestamp = Date.now();
  } else {
    memoryCache.set(namespace, { items: [tempItem], timestamp: Date.now() });
  }

  // Fast confirmation race (up to 3.8s)
  try {
    const result: any = await Promise.race([
      memwal.waitForRememberJob(jobId),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs)),
    ]);

    if (result?.blob_id) {
      tempItem.blobId = result.blob_id;
      return { status: 'saved', blobId: result.blob_id, jobId };
    }
    return { status: 'saved', jobId };
  } catch {
    // Confirms in the background on Sui/Walrus
    return { status: 'pending', jobId };
  }
}

/** Check status of an asynchronous Walrus remember job */
export async function checkJobStatus(jobId: string): Promise<{ status: string; blobId?: string }> {
  try {
    const memwal = getMemWal();
    const res = await memwal.getRememberStatus(jobId);
    return {
      status: res.status,
      blobId: res.blob_id,
    };
  } catch {
    return { status: 'pending' };
  }
}
