import fs from 'fs';
import { MemWal } from '@mysten-incubation/memwal';
import { createHash } from 'crypto';

const envContent = fs.readFileSync('.env.local', 'utf8');
envContent.split('\n').forEach(l => {
  const idx = l.indexOf('=');
  if (idx > 0) {
    const k = l.slice(0, idx).trim();
    const v = l.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (k && !process.env[k]) process.env[k] = v;
  }
});

function ns(n, p) {
  const id = createHash('sha256').update(n.trim().toLowerCase() + ':' + p.trim()).digest('hex').slice(0, 24);
  return 'lovechild-' + id;
}

const memwal = MemWal.create({
  key: process.env.MEMWAL_PRIVATE_KEY,
  accountId: process.env.MEMWAL_ACCOUNT_ID,
  serverUrl: 'https://relayer.memory.walrus.xyz'
});

async function check() {
  for (const user of [{ n: 'Ada', p: '1234' }, { n: 'Blessing', p: '2222' }, { n: 'Chiamaka', p: '3333' }]) {
    try {
      const res = await memwal.recall({ query: 'notes', limit: 20, namespace: ns(user.n, user.p) });
      console.log(`User ${user.n}: ${res.results?.length || 0} memories stored on Walrus.`);
      (res.results || []).forEach((r, i) => console.log(`   [${i+1}] Blob: ${r.blob_id} -> ${r.text.slice(0, 50)}...`));
    } catch (e) {
      console.log(`User ${user.n} error:`, e.message);
    }
  }
}

check();
