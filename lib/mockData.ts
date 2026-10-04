import { PatientPersona } from './types';

export const PATIENTS: PatientPersona[] = [
  {
    id: 'amina-bello',
    name: 'Amina Bello',
    age: 26,
    gestationalWeek: 30,
    trimester: 'Trimester 3',
    estimatedDueDate: '2026-12-12',
    gravidaPara: 'G1P0 (Primigravida / First Child)',
    bloodType: 'O+',
    avatar: 'AB',
    shortBio: 'First-time mom in Lagos. Active office accountant, monitoring third-trimester swelling and headaches.',
    coreWatchArea: 'Pre-Eclampsia Surveillance (Sudden Edema + Persistent Cephalea)',
    walrusNamespace: 'natalrecall:user:amina-bello:mainnet',
    memories: [
      {
        id: 'mem-am-01',
        blobId: '0x9a4f21e89b1c7d23a456',
        timestamp: '2026-06-02T08:30:00Z',
        gestationalWeek: 12,
        category: 'symptom',
        severity: 'Moderate',
        summary: 'Mild morning nausea & food aversion to eggs',
        rawDetails: 'Reported morning sickness peaking around 8:00 AM. Tolerating dry crackers, fruits, and hydration tablets.',
        tags: ['nausea', 'first_trimester', 'diet']
      },
      {
        id: 'mem-am-02',
        blobId: '0x8b3211c47a9e0134f782',
        timestamp: '2026-06-25T14:15:00Z',
        gestationalWeek: 15,
        category: 'vitals',
        severity: 'Mild',
        summary: 'Baseline Clinic BP: 110/72 mmHg',
        rawDetails: 'Routine first-trimester booking visit. Urine dipstick negative for protein. Heart rate 76 bpm.',
        tags: ['baseline_vitals', 'blood_pressure']
      },
      {
        id: 'mem-am-03',
        blobId: '0x7c19a3b68f2d4512e903',
        timestamp: '2026-07-28T21:00:00Z',
        gestationalWeek: 20,
        category: 'fetal_movement',
        severity: 'Mild',
        summary: 'First quickening / flutter kicks detected',
        rawDetails: 'Felt distinct gentle flutters below the navel while lying quietly on left side at 9:00 PM.',
        tags: ['fetal_movement', 'quickening']
      },
      {
        id: 'mem-am-04',
        blobId: '0x6e902b4a1c5d7890f124',
        timestamp: '2026-08-15T11:45:00Z',
        gestationalWeek: 23,
        category: 'nutrition',
        summary: 'Started prenatal iron & calcium supplements',
        rawDetails: 'Midwife prescribed Ferrous Sulfate + Folic Acid. Mild constipation noted, increasing water intake to 3L/day.',
        tags: ['prenatal_vitamins', 'iron', 'hydration']
      },
      {
        id: 'mem-am-05',
        blobId: '0x5d810a9c3e4f6781b235',
        timestamp: '2026-08-25T16:20:00Z',
        gestationalWeek: 24,
        category: 'vitals',
        severity: 'Mild',
        summary: 'Routine 24-week BP: 118/78 mmHg',
        rawDetails: 'Slight upward shift from 110/72 baseline, but within normal limits. Fundal height corresponds with dates.',
        tags: ['blood_pressure', 'clinic_checkup']
      },
      {
        id: 'mem-am-06',
        blobId: '0x4f709b8d2a3e5670c346',
        timestamp: '2026-09-05T19:30:00Z',
        gestationalWeek: 26,
        category: 'fetal_movement',
        summary: 'Daily kick counts: 14 distinct kicks in 2 hours',
        rawDetails: 'Evening kick monitoring after dinner. Baby most active between 8:00 PM and 10:00 PM.',
        tags: ['kick_count', 'fetal_wellness']
      },
      {
        id: 'mem-am-07',
        blobId: '0x3e6fc87e1b2d4561d457',
        timestamp: '2026-09-15T10:10:00Z',
        gestationalWeek: 27,
        category: 'symptom',
        severity: 'Mild',
        summary: 'Mild lower back ache after long office meetings',
        rawDetails: 'Lumbar aching relieved with a lumbar pillow and brief walking breaks. Denies radiating sciatica or fever.',
        tags: ['back_ache', 'ergonomics']
      },
      {
        id: 'mem-am-08',
        blobId: '0x2d5eb76f0a1c3452e568',
        timestamp: '2026-09-22T22:00:00Z',
        gestationalWeek: 28,
        category: 'labor_sign',
        severity: 'Mild',
        summary: 'Mild, irregular Braxton Hicks tightening',
        rawDetails: 'Experienced 2 mild, painless uterine tightenings lasting 30 seconds. Disappeared upon resting on left side.',
        tags: ['braxton_hicks', 'uterine_tightening']
      },
      {
        id: 'mem-am-09',
        blobId: '0x1c4da65e9f0b2343f679',
        timestamp: '2026-09-28T18:40:00Z',
        gestationalWeek: 29,
        category: 'symptom',
        severity: 'Moderate',
        isRedFlag: true,
        summary: 'Sudden bilateral ankle swelling & tight wedding ring',
        rawDetails: 'Noticed shoes and rings feeling unusually tight by 5 PM. Pitting edema on lower shins (Grade 1+).',
        tags: ['edema', 'swelling', 'pre_eclampsia_watch']
      },
      {
        id: 'mem-am-10',
        blobId: '0x0b3c954d8e9a1234a780',
        timestamp: '2026-09-29T14:15:00Z',
        gestationalWeek: 29,
        category: 'symptom',
        severity: 'Moderate',
        isRedFlag: true,
        summary: 'Persistent frontal headache (24-hour duration)',
        rawDetails: 'Dull ache across forehead and behind eyes. Unrelieved by hydration and rest. No visual flashing spots reported yet.',
        tags: ['cephalea', 'headache', 'pre_eclampsia_watch']
      },
      {
        id: 'mem-am-11',
        blobId: '0x9a2b843c7d8e0123b891',
        timestamp: '2026-10-01T20:30:00Z',
        gestationalWeek: 30,
        category: 'clinical_alert',
        severity: 'Severe',
        isRedFlag: true,
        summary: 'Triage Flag: Concurrent Edema + Refractory Headache',
        rawDetails: 'Scribe correlated 48-hr frontal headache with sudden dependent edema at 30 weeks. Midwife referral urgent.',
        tags: ['triage_flag', 'pre_eclampsia_risk', 'clinical_alert']
      },
      {
        id: 'mem-am-12',
        blobId: '0x891a732b6c7d9012c902',
        timestamp: '2026-10-02T09:00:00Z',
        gestationalWeek: 30,
        category: 'fetal_movement',
        summary: 'Fetal movement remains reassuring (12 kicks in 90 min)',
        rawDetails: 'Morning kick count verified. Fetal activity normal, mitigating immediate placental abruption concern.',
        tags: ['fetal_movement', 'reassuring']
      }
    ]
  },
  {
    id: 'blessing-okon',
    name: 'Blessing Okon',
    age: 29,
    gestationalWeek: 18,
    trimester: 'Trimester 2',
    estimatedDueDate: '2027-03-05',
    gravidaPara: 'G2P1 (Second Pregnancy, 1 Living Child)',
    bloodType: 'B+',
    avatar: 'BO',
    shortBio: 'High school teacher in Calabar. Struggling with severe early nausea (Hyperemesis Gravidarum) and dehydration.',
    coreWatchArea: 'Hydration, Weight Loss Prevention & Electrolyte Surveillance',
    walrusNamespace: 'natalrecall:user:blessing-okon:mainnet',
    memories: [
      {
        id: 'mem-bl-01',
        blobId: '0x7809621a5b6c8901d013',
        timestamp: '2026-07-05T07:15:00Z',
        gestationalWeek: 6,
        category: 'symptom',
        severity: 'Moderate',
        summary: 'Intractable morning vomiting (>4 times daily)',
        rawDetails: 'Unable to keep down breakfast or oral liquids. Marked nausea upon smelling cooking oil.',
        tags: ['vomiting', 'first_trimester', 'hyperemesis']
      },
      {
        id: 'mem-bl-02',
        blobId: '0x679851094a5b7890e124',
        timestamp: '2026-07-12T13:40:00Z',
        gestationalWeek: 7,
        category: 'symptom',
        severity: 'Severe',
        isRedFlag: true,
        summary: 'Dehydration signs: Dark concentrated urine, dry lips',
        rawDetails: 'Urine output reduced to twice in 14 hours. Weight down by 2.5 kg compared to pre-pregnancy weight.',
        tags: ['dehydration', 'weight_loss', 'red_flag']
      },
      {
        id: 'mem-bl-03',
        blobId: '0x56874098394a6789f235',
        timestamp: '2026-07-20T11:00:00Z',
        gestationalWeek: 8,
        category: 'vitals',
        summary: 'IV Rehydration clinic visit (Normal Saline 1L)',
        rawDetails: 'Outpatient infusion administered at maternal health center. Dextrose/Saline restored urine color to straw yellow.',
        tags: ['iv_fluids', 'clinic_rehydration']
      },
      {
        id: 'mem-bl-04',
        blobId: '0x4576398728395678a346',
        timestamp: '2026-08-01T15:20:00Z',
        gestationalWeek: 10,
        category: 'nutrition',
        summary: 'Introduced ginger infusion & small frequent carbohydrate snacks',
        rawDetails: 'Patient sipping ginger tea with crackers every 2 hours before getting out of bed. Vomiting down to 1x/day.',
        tags: ['ginger', 'dietary_adaptation']
      },
      {
        id: 'mem-bl-05',
        blobId: '0x3465287617284567b457',
        timestamp: '2026-08-15T09:30:00Z',
        gestationalWeek: 12,
        category: 'vitals',
        summary: 'Booking Ultrasound: Single intrauterine viable fetus',
        rawDetails: 'Gestational sac normal, fetal crown-rump length corresponds with 12w0d. Heart rate 158 bpm.',
        tags: ['ultrasound', 'dating_scan']
      },
      {
        id: 'mem-bl-06',
        blobId: '0x2354176506173456c568',
        timestamp: '2026-08-28T18:00:00Z',
        gestationalWeek: 14,
        category: 'symptom',
        severity: 'Mild',
        summary: 'Nausea transitioning to intermittent afternoon fatigue',
        rawDetails: 'Significant improvement in appetite. Tolerating boiled plantains and fish. Weight stabilized.',
        tags: ['appetite_recovery', 'second_trimester']
      },
      {
        id: 'mem-bl-07',
        blobId: '0x1243065495062345d679',
        timestamp: '2026-09-08T12:10:00Z',
        gestationalWeek: 15,
        category: 'vitals',
        summary: 'Weight gain: +1.2 kg recovered',
        rawDetails: 'Clinic weigh-in confirmed weight regain of 1.2 kg. Midwife praised hydration consistency.',
        tags: ['weight_gain', 'maternal_nutrition']
      },
      {
        id: 'mem-bl-08',
        blobId: '0x0132954384951234e780',
        timestamp: '2026-09-18T20:45:00Z',
        gestationalWeek: 16,
        category: 'fetal_movement',
        summary: 'First light butterfly flutters detected',
        rawDetails: 'Gentle sensations felt when resting post-dinner. Consistent with multiparous second pregnancy timing.',
        tags: ['fetal_movement', 'quickening']
      },
      {
        id: 'mem-bl-09',
        blobId: '0x9021843273840123f891',
        timestamp: '2026-09-24T14:30:00Z',
        gestationalWeek: 17,
        category: 'nutrition',
        summary: 'Oral rehydration salts (ORS) maintained on warm humid days',
        rawDetails: 'Drinks 1 packet of WHO-formula ORS on hot teaching afternoons to prevent orthostatic dizziness.',
        tags: ['ors', 'hydration_strategy']
      },
      {
        id: 'mem-bl-10',
        blobId: '0x8910732162739012a902',
        timestamp: '2026-09-30T10:00:00Z',
        gestationalWeek: 18,
        category: 'vitals',
        summary: 'Blood Pressure steady: 104/68 mmHg, Pulse 74 bpm',
        rawDetails: 'No postural hypotension detected. Normal neurological screening.',
        tags: ['blood_pressure', 'stable_vitals']
      },
      {
        id: 'mem-bl-11',
        blobId: '0x780f621051628901b013',
        timestamp: '2026-10-02T16:15:00Z',
        gestationalWeek: 18,
        category: 'fetal_movement',
        summary: 'Regular daily movements recorded (4-6 distinct bursts/day)',
        rawDetails: 'Baby responds noticeably to cool drinks and soft music.',
        tags: ['fetal_activity', 'healthy_progression']
      }
    ]
  },
  {
    id: 'chiamaka-eze',
    name: 'Chiamaka Eze',
    age: 31,
    gestationalWeek: 37,
    trimester: 'Trimester 3',
    estimatedDueDate: '2026-10-21',
    gravidaPara: 'G3P2 (Third Pregnancy, 2 Previous Natural Births)',
    bloodType: 'A+',
    avatar: 'CE',
    shortBio: 'Experienced mother in Abuja reaching full term (37 weeks). Monitoring labor signs, pelvic drops, and contraction timing.',
    coreWatchArea: 'Labor Triage & False vs. Active Contraction Differentiation',
    walrusNamespace: 'natalrecall:user:chiamaka-eze:mainnet',
    memories: [
      {
        id: 'mem-ch-01',
        blobId: '0x67fe510f40517890c124',
        timestamp: '2026-08-20T10:00:00Z',
        gestationalWeek: 31,
        category: 'vitals',
        summary: 'GBS (Group B Streptococcus) Swab: Negative',
        rawDetails: 'Routine antenatal screen confirmed negative result. No prophylactic penicillin required for labor.',
        tags: ['gbs_screen', 'antenatal_safety']
      },
      {
        id: 'mem-ch-02',
        blobId: '0x56ed409e3f406789d235',
        timestamp: '2026-09-01T14:30:00Z',
        gestationalWeek: 33,
        category: 'fetal_movement',
        summary: 'Baby in cephalic (head-down) presentation confirmed by midwife',
        rawDetails: 'Palpation showed fetal head engaged in pelvis. Heart sounds clearest in lower left quadrant.',
        tags: ['fetal_presentation', 'cephalic']
      },
      {
        id: 'mem-ch-03',
        blobId: '0x45dc398d2e3f5678e346',
        timestamp: '2026-09-10T19:15:00Z',
        gestationalWeek: 34,
        category: 'symptom',
        severity: 'Moderate',
        summary: 'Increased pelvic pressure & lightening (belly dropped)',
        rawDetails: 'Breathing feels easier as baby dropped into pelvis; increased urinary frequency (waking 3x/night).',
        tags: ['lightening', 'pelvic_pressure']
      },
      {
        id: 'mem-ch-04',
        blobId: '0x34cb287c1d2e4567f457',
        timestamp: '2026-09-17T21:00:00Z',
        gestationalWeek: 35,
        category: 'labor_sign',
        severity: 'Mild',
        summary: 'Braxton Hicks contractions every 25-30 minutes, non-rhythmic',
        rawDetails: 'Painless tightening across upper belly. Stopped when taking a warm shower.',
        tags: ['braxton_hicks', 'false_labor']
      },
      {
        id: 'mem-ch-05',
        blobId: '0x23ba176b0c1d3456a568',
        timestamp: '2026-09-22T08:00:00Z',
        gestationalWeek: 36,
        category: 'symptom',
        summary: 'Passage of small amount of thick, clear mucus plug',
        rawDetails: 'No bloody show, no amniotic fluid leakage. Scribe noted this indicates cervical softening.',
        tags: ['mucus_plug', 'cervical_ripening']
      },
      {
        id: 'mem-ch-06',
        blobId: '0x12a9065a9b0c2345b679',
        timestamp: '2026-09-26T15:20:00Z',
        gestationalWeek: 36,
        category: 'vitals',
        summary: 'Term Clinic Visit: BP 116/74 mmHg, Fetal HR 142 bpm',
        rawDetails: 'Urine protein negative. Hemoglobin 11.8 g/dL (good oxygenation reserve for delivery).',
        tags: ['term_checkup', 'normal_vitals']
      },
      {
        id: 'mem-ch-07',
        blobId: '0x0198f5498a9b1234c780',
        timestamp: '2026-09-29T23:30:00Z',
        gestationalWeek: 37,
        category: 'labor_sign',
        severity: 'Moderate',
        summary: 'Contraction cluster: 3 tightenings in 1 hour, mild cramp',
        rawDetails: 'Tightenings lasted 40 seconds each, but intervals remained irregular (18 min, 24 min). Subsided at rest.',
        tags: ['pre_labor', 'uterine_activity']
      },
      {
        id: 'mem-ch-08',
        blobId: '0x9087e438798a0123d891',
        timestamp: '2026-10-01T06:45:00Z',
        gestationalWeek: 37,
        category: 'fetal_movement',
        summary: 'Reassuring kick count maintained (10 rolling movements in 1 hr)',
        rawDetails: 'Active movements confirm fetal well-being despite lower uterine cramping.',
        tags: ['fetal_movement', 'term_reassurance']
      },
      {
        id: 'mem-ch-09',
        blobId: '0x8f76d32768799012e902',
        timestamp: '2026-10-01T21:10:00Z',
        gestationalWeek: 37,
        category: 'symptom',
        summary: 'Hospital bag packed & emergency transport confirmed',
        rawDetails: 'Birth plan reviewed. Maternity cards and hospital registration ready.',
        tags: ['birth_plan', 'preparedness']
      },
      {
        id: 'mem-ch-10',
        blobId: '0x7e65c21657688901f013',
        timestamp: '2026-10-02T18:00:00Z',
        gestationalWeek: 37,
        category: 'labor_sign',
        severity: 'Moderate',
        summary: 'Active labor triage criteria: 5-1-1 rule review',
        rawDetails: 'Scribe briefed patient on hospital arrival trigger: contractions every 5 mins, lasting 1 min, for 1 full hour.',
        tags: ['triage_guidance', '5_1_1_rule']
      }
    ]
  }
];

export const WALRUS_MAINNET_AGENT_INFO = {
  agentId: '0x4f8a92e10c739b62a159e8471203b584d3910c2e',
  network: 'Walrus Mainnet',
  relayerUrl: 'https://relayer.memory.walrus.xyz',
  totalBlobsOnMainnet: 33,
  systemStatus: 'ONLINE',
  encryptionProtocol: 'SEAL Homomorphic-Ready (Client-Side Delegated)',
  verifiedUsers: 3
};
