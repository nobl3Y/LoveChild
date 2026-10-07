import { MemoryItem } from './types';

const VAULT_STORAGE_KEY_PREFIX = 'lovechild_vault_';

/** Returns client-buffered Walrus memory records for the patient */
export function getLocalVaultRecords(name: string): MemoryItem[] {
  if (typeof window === 'undefined' || !name) return [];
  try {
    const key = `${VAULT_STORAGE_KEY_PREFIX}${name.trim().toLowerCase()}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Saves a newly committed Walrus note into the client's write-through cache */
export function saveLocalVaultRecord(name: string, item: MemoryItem): void {
  if (typeof window === 'undefined' || !name) return;
  try {
    const key = `${VAULT_STORAGE_KEY_PREFIX}${name.trim().toLowerCase()}`;
    const existing = getLocalVaultRecords(name);
    const alreadyExists = existing.some(
      (e) => e.text === item.text || (item.blobId && e.blobId === item.blobId)
    );
    if (!alreadyExists) {
      existing.push(item);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  } catch {}
}

/** Updates an item's temporary job identifier to its final confirmed on-chain blob ID */
export function updateLocalVaultRecordBlobId(name: string, oldBlobId: string, newBlobId: string): void {
  if (typeof window === 'undefined' || !name || !oldBlobId || !newBlobId) return;
  try {
    const key = `${VAULT_STORAGE_KEY_PREFIX}${name.trim().toLowerCase()}`;
    const existing = getLocalVaultRecords(name);
    let updated = false;
    for (const item of existing) {
      if (item.blobId === oldBlobId) {
        item.blobId = newBlobId;
        updated = true;
      }
    }
    if (updated) {
      localStorage.setItem(key, JSON.stringify(existing));
    }
  } catch {}
}

/** Clears all locally buffered notes across all patients */
export function clearLocalVaultRecords(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(VAULT_STORAGE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
}
