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

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const CHIAMAKA_REMAINING = [
  "[OBSERVATION] Week 32: Fundal height 32cm. Cephalic presentation. Fetal heart tones regular at 148 bpm.",
  "[KICK COUNT] Week 34: Daily movement tracking. Counted 10 movements within 1 hour after dinner.",
  "[SYMPTOM] Week 36: Braxton-Hicks contractions in the afternoon, painless and subsiding with hydration.",
  "[LAB WORK] Week 36: GBS swab negative. Hemoglobin 11.8 g/dL. Blood pressure 120/78 mmHg.",
  "[PREPARATION] Week 37: Delivery go-bag ready. Pediatrician clinic contact saved. Labor birth plan reviewed.",
  "[CLINICAL NOTE] Week 38: Cervix soft, fetal head engaged at 0 station. Healthy movement felt daily."
];

const ADA_REMAINING = [
  "[VITALS] Week 12: Baseline booking visit. BP 115/75 mmHg. Full blood count normal.",
  "[ULTRASOUND] Week 20: 20-week anatomy scan. Fetal biometry consistent with dates. Normal anatomy.",
  "[NUTRITION] Week 26: 1-hour glucose screen 118 mg/dL (normal). Iron supplement compliance noted.",
  "[OBSERVATION] Week 30: Swelling in feet and hands monitored alongside blood pressure readings."
];

async function fill() {
  console.log('--- Filling Chiamaka (target: 10) ---');
  for (const note of CHIAMAKA_REMAINING) {
    console.log('Sending Chiamaka note:', note.slice(0, 45));
    const job = await memwal.remember(note, ns('Chiamaka', '3333'));
    await sleep(2000);
  }

  console.log('--- Filling Ada (target: 10) ---');
  for (const note of ADA_REMAINING) {
    console.log('Sending Ada note:', note.slice(0, 45));
    const job = await memwal.remember(note, ns('Ada', '1234'));
    await sleep(2000);
  }

  console.log('Finished uploading all remaining items!');
}

fill().catch(console.error);
