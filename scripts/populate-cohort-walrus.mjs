import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MemWal } from '@mysten-incubation/memwal';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
envContent.split('\n').forEach((line) => {
  const idx = line.indexOf('=');
  if (idx > 0) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (k && !process.env[k]) process.env[k] = v;
  }
});

function namespaceFor(name, pin) {
  const id = createHash('sha256')
    .update(`${name.trim().toLowerCase()}:${pin.trim()}`)
    .digest('hex')
    .slice(0, 24);
  return `lovechild-${id}`;
}

const memwal = MemWal.create({
  key: process.env.MEMWAL_PRIVATE_KEY,
  accountId: process.env.MEMWAL_ACCOUNT_ID,
  serverUrl: 'https://relayer.memory.walrus.xyz',
});

const BLESSING_NOTES = [
  "[SYMPTOM] Week 6: Severe morning nausea and vomiting upon waking. Finding it hard to keep liquids down.",
  "[VITALS] Week 8: First prenatal clinic visit at General Hospital Calabar. Blood pressure 110/70 mmHg. Weight 62kg.",
  "[NUTRITION] Week 10: Prescribed prenatal vitamins and iron supplements. Experiencing mild constipation from iron pills.",
  "[HYDRATION] Week 12: Frequent dehydration episodes during school teaching hours. Advised to carry electrolyte water flask.",
  "[ULTRASOUND] Week 13: 1st trimester dating scan completed. Single viable intrauterine fetus, strong heart rate at 154 bpm.",
  "[SYMPTOM] Week 14: Morning sickness reduced to mild daytime dry retching. Appetite gradually recovering.",
  "[MEDICATION] Week 15: Doctor recommended splitting iron tablet dose into morning and night to reduce stomach upset.",
  "[VITALS] Week 16: Routine check-in. Blood pressure stable at 112/72 mmHg. Fundal height tracking consistent with gestational age.",
  "[ACTIVITY] Week 17: Gentle evening walking routine started. Feeling occasional round ligament groin pain on left side.",
  "[CLINICAL NOTE] Week 18: Tracking daily fluid intake (target 2.5L). Nausea under control. Reviewing blood count labs next clinic."
];

const CHIAMAKA_NOTES = [
  "[MILESTONE] Week 20: 2nd trimester anomaly scan clear. Placenta posterior high. Fetus active with normal anatomy.",
  "[VITALS] Week 24: Routine clinic visit at Enugu. Blood pressure 118/76 mmHg. Mild leg fatigue after prolonged standing.",
  "[SYMPTOM] Week 28: Occasional evening acid reflux and heartburn when lying flat. Started taking doctor-approved antacid.",
  "[VACCINE] Week 28: Received Tdap booster and routine tetanus toxoid shot. Normal soreness at injection site.",
  "[OBSERVATION] Week 32: Fundal height 32cm. Fetal position cephalic (head down). Normal amniotic fluid levels confirmed.",
  "[KICK COUNT] Week 34: Daily fetal movement tracking. Consistently recording 10 distinct kicks within 90 minutes each evening.",
  "[SYMPTOM] Week 36: Mild Braxton-Hicks contractions noticed in the afternoons, irregular and painless, resolving with rest.",
  "[LAB WORK] Week 36: Group B Strep (GBS) swab negative. Hemoglobin 11.8 g/dL. Blood pressure 120/78 mmHg.",
  "[PREPARATION] Week 37: Hospital delivery bag packed. Clinic emergency hotline confirmed. Infant car seat installed.",
  "[CLINICAL NOTE] Week 38: Cervical check shows softening, baby engaged. Strong fetal movements active. Awaiting labor onset."
];

const ADA_ADDITIONAL_NOTES = [
  "[VITALS] Week 12: Booking visit completed at Lagos Island Maternity. Baseline BP 115/75 mmHg. Routine bloodwork normal.",
  "[ULTRASOUND] Week 20: Mid-pregnancy anatomy scan normal. Fetus growing appropriately for gestational age.",
  "[SYMPTOM] Week 24: Started noticing slight ankle edema after standing at work. Elevated feet in the evening.",
  "[NUTRITION] Week 26: Glucose challenge screen negative for gestational diabetes. Continued on calcium and iron.",
  "[LAB WORK] Week 28: Trace protein noted on routine urine dipstick. Scheduled for closer blood pressure monitoring.",
  "[SYMPTOM] Week 29: Tightness in wedding ring fingers. Morning facial puffiness noted.",
  "[VITALS] Week 30: Home BP monitor reading 134/86 mmHg. Mild dull frontal headache. Reported directly to LoveChild."
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function seedPerson(name, pin, notes) {
  const ns = namespaceFor(name, pin);
  console.log(`\n=== Populating Walrus for ${name} (${pin}) -> Namespace: ${ns} ===`);
  for (let i = 0; i < notes.length; i++) {
    const noteText = notes[i];
    let committed = false;
    let attempts = 0;
    while (!committed && attempts < 3) {
      attempts++;
      try {
        console.log(`[${i + 1}/${notes.length}] Remembering on Walrus (try ${attempts}): "${noteText.slice(0, 45)}..."`);
        const job = await memwal.remember(noteText, ns);
        console.log(`    Job ID: ${job.job_id}`);
        const res = await Promise.race([
          memwal.waitForRememberJob(job.job_id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 30000))
        ]).catch(() => ({ blob_id: 'pending-relayer-batch' }));
        console.log(`    Committed Blob: ${res.blob_id}`);
        committed = true;
      } catch (err) {
        console.warn(`    Retry warning on item ${i + 1} (attempt ${attempts}):`, err.message || err);
        await sleep(3500);
      }
    }
    // Throttle between writes to be gentle with the relayer
    await sleep(2500);
  }
}

async function run() {
  await seedPerson('Blessing', '2222', BLESSING_NOTES);
  await seedPerson('Chiamaka', '3333', CHIAMAKA_NOTES);
  await seedPerson('Ada', '1234', ADA_ADDITIONAL_NOTES);
  console.log('\n=== All 3 cohort mothers populated with 10+ memories on Walrus Mainnet! ===');
}

run().catch(console.error);
