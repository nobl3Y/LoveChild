import { MemoryItem } from './types';

export interface CohortMotherData {
  records: MemoryItem[];
  report: string;
}

export const COHORT_DATA: Record<string, CohortMotherData> = {
  ada: {
    records: [
      {
        blobId: 'oxgp1ZxNRmypQ_8e1Y0p11m4UjX-i5P_mC_y_h-V2qE',
        text: 'Week 20: Felt unusually exhausted after the commute home today. Put my feet up on two pillows to rest.',
        createdAt: '2026-07-28T18:45:00.000Z',
      },
      {
        blobId: 'RayL9DDTmchB3wX6l3e6T-h47tL48h0y34j1l4m3_1A',
        text: 'Week 22: Noticed my ankles were puffy after sitting at my office desk all afternoon. Drank cold water and rested.',
        createdAt: '2026-08-11T16:20:00.000Z',
      },
      {
        blobId: 'B6-Y_ESBaUuk6-X213l46m-k17tL48h0y34j1l4m3_2B',
        text: 'Week 24: My flats felt really tight around 4pm. When I took my socks off, there was a deep indented ring on my ankles.',
        createdAt: '2026-08-25T17:10:00.000Z',
      },
      {
        blobId: '6uEUPYEiAo3q5-Y314l57n-l28uM59i1z45k2m5n4_3C',
        text: 'Week 25: Had a dull ache in my temples this morning before breakfast. Passed after I rested in a dark room.',
        createdAt: '2026-09-01T08:30:00.000Z',
      },
      {
        blobId: 'Kl9UvZxNRmypQ_9f2Z1q22n5VkY-j6Q_nD_z_i-W3rF',
        text: 'Week 26: Feet are visibly swollen even in the mornings now, not just after work. Elevating them only helps a little.',
        createdAt: '2026-09-08T07:45:00.000Z',
      },
      {
        blobId: 'Nm8VwAyOSnzqR_0g3a2r33o6WlZ-k7R_oE_0_j-X4sG',
        text: 'Week 27: Struggled to slide my wedding ring off my finger before bed. Had to use soap and cold water.',
        createdAt: '2026-09-15T21:15:00.000Z',
      },
      {
        blobId: 'Op9WxBzPTo0rS_1h4b3s44p7Xma-l8S_pF_1_k-Y5tH',
        text: "Week 28: My wedding ring doesn't fit at all today. My knuckles and fingers feel tight and stiff when I make a fist.",
        createdAt: '2026-09-22T08:00:00.000Z',
      },
      {
        blobId: 'Pq0XyCaQU11sT_2i5c4t55q8Ynb-m9T_qG_2_l-Z6uI',
        text: 'Week 29: Woke up and my face felt swollen, especially around my eyelids. My husband noticed my cheeks looked puffy too.',
        createdAt: '2026-09-29T07:10:00.000Z',
      },
      {
        blobId: 'Qr1YzDbRV22tU_3j6d5u66r9Zoc-n0U_rH_3_m-a7vJ',
        text: 'Week 30 (Day 1): Checked my blood pressure on our home monitor: 132/84 mmHg. Also felt slightly lightheaded standing up.',
        createdAt: '2026-10-02T09:15:00.000Z',
      },
      {
        blobId: 'Rs2ZaEcSW33uV_4k7e6v77s0Apd-o1V_sI_4_n-b8wK',
        text: "Week 30 (Day 4): Dull frontal headache since 7am that won't go away. Re-checked home BP and it was 138/88 mmHg. Logging this for clinic tomorrow.",
        createdAt: '2026-10-05T08:00:00.000Z',
      },
    ],
    report: `WHAT SHE HAS REPORTED
- Week 20: Severe evening fatigue following office commute; managed with leg elevation.
- Week 22–24: Dependent ankle edema; socks leaving deep skin indentations by late afternoon.
- Week 25: Transient bitemporal headache resolving with quiet rest.
- Week 26: Edema becoming persistent into mornings despite overnight elevation.
- Week 27–28: Non-dependent hand edema; wedding ring tight, finger stiffness upon making a fist.
- Week 29: Sudden non-dependent facial puffiness and periorbital edema noted upon waking.
- Week 30 (Day 1): Home blood pressure rising to 132/84 mmHg with orthostatic lightheadedness.
- Week 30 (Day 4): Persistent frontal headache refractory to rest; home blood pressure elevated at 138/88 mmHg.

WHAT KEEPS COMING BACK
- Upward trajectory of blood pressure across third trimester (baseline ~115/75 to 138/88 mmHg).
- Progressive edema pattern shifting from dependent (ankles) to non-dependent (hands, fingers, face).
- Emergence of persistent frontal cephalalgia alongside borderline hypertensive readings.
- High clinical index of suspicion for early-onset Pre-Eclampsia prodrome.

WORTH ASKING THE DOCTOR
1. In-clinic automated and manual blood pressure confirmation.
2. Urine protein analysis (spot protein-to-creatinine ratio or dipstick).
3. Assessment of deep tendon reflexes and clonus.
4. Blood work evaluation: liver function enzymes (AST/ALT), platelets, and serum creatinine.`,
  },

  blessing: {
    records: [
      {
        blobId: 'RUo0sdHNyzKjM_8e1Y0p11m4UjX-i5P_mC_y_h-V2qE',
        text: 'Week 6: Threw up my breakfast twice before 8am. Even the smell of hot cooking oil made my stomach churn.',
        createdAt: '2026-07-14T08:15:00.000Z',
      },
      {
        blobId: 'KmzWOLHulvLkL_RayL9DDTmchB3wX6l3e6T-h47tL48',
        text: 'Week 8: Could not keep water down this morning, threw up yellow bile. Feeling dizzy whenever I stand up.',
        createdAt: '2026-07-28T09:00:00.000Z',
      },
      {
        blobId: '5MSiqWoV4Nm2P_B6-Y_ESBaUuk6-X213l46m-k17tL4',
        text: 'Week 10: Tried taking my iron tablet after lunch, but had terrible stomach burning and threw it up 20 minutes later.',
        createdAt: '2026-08-11T13:40:00.000Z',
      },
      {
        blobId: '633xZoeAN3Wn5_6uEUPYEiAo3q5-Y314l57n-l28uM5',
        text: 'Week 11: Skipped my iron supplement today because I was terrified of vomiting in front of my students at school.',
        createdAt: '2026-08-18T07:30:00.000Z',
      },
      {
        blobId: '744yApfBO4Xo6_Kl9UvZxNRmypQ_9f2Z1q22n5VkY-j',
        text: 'Week 12: Felt completely parched and lightheaded during 3rd period class. Barely drank half a cup of water all day.',
        createdAt: '2026-08-25T11:20:00.000Z',
      },
      {
        blobId: '855zBqgCP5Yp7_Nm8VwAyOSnzqR_0g3a2r33o6WlZ-k',
        text: "Week 13: Started keeping an insulated flask of cold electrolyte water on my teacher's desk. Managed small sips every hour.",
        createdAt: '2026-09-01T14:10:00.000Z',
      },
      {
        blobId: '966ACrhDQ6Zq8_Op9WxBzPTo0rS_1h4b3s44p7Xma-l',
        text: 'Week 14: Nausea is a little better in the morning, but daytime dry retching still hits around 2pm. Plain crackers helped.',
        createdAt: '2026-09-08T14:30:00.000Z',
      },
      {
        blobId: '077BDsiER7ar9_Pq0XyCaQU11sT_2i5c4t55q8Ynb-m',
        text: 'Week 15: Tried taking half the iron tablet with cold ginger tea before sleeping. Kept it down without vomiting for the first time!',
        createdAt: '2026-09-15T22:00:00.000Z',
      },
      {
        blobId: '188CEtjFS8bs0_Qr1YzDbRV22tU_3j6d5u66r9Zoc-n',
        text: 'Week 16: Had sudden sharp pulling cramps on my lower left groin when getting up from my classroom chair. Eased after sitting back down.',
        createdAt: '2026-09-22T10:15:00.000Z',
      },
      {
        blobId: '299DFukGT9ct1_Rs2ZaEcSW33uV_4k7e6v77s0Apd-o',
        text: 'Week 18: Hit my 2.5-liter water goal today! Urine is pale straw color again, energy is returning, and iron pills are staying down.',
        createdAt: '2026-10-05T12:00:00.000Z',
      },
    ],
    report: `WHAT SHE HAS REPORTED
- Week 6–8: Severe first-trimester nausea and emesis with food trigger sensitivity and dehydration.
- Week 10–11: Acute gastrointestinal intolerance to standard iron pills leading to missed doses at work.
- Week 12: Occupational dehydration vulnerability during school teaching hours.
- Week 13–14: Transition to cold electrolyte fluids and small frequent crackers with reduction in dry retching.
- Week 15: Improved iron tolerance achieved by splitting dose and taking at bedtime with ginger tea.
- Week 16: Transient sharp groin pain consistent with normal round ligament stretching during rapid position changes.
- Week 18: Full maternal hydration restoration (2.5L daily target reached); stable gastrointestinal tolerance.

WHAT KEEPS COMING BACK
- Initial severe hyperemesis resolving by second trimester through scheduled micro-hydration.
- Past history of medication non-compliance driven solely by GI side effects (resolved with bedtime dosing).
- Normalization of fluid intake confirmed by subjective energy return and clear urine output.

WORTH ASKING THE DOCTOR
1. Repeat serum ferritin or hemoglobin check to verify iron absorption following modified dosing.
2. Confirmation that intermittent groin twinges represent benign round ligament stretching.
3. Continued safety review of ginger tea supplementation across second trimester.`,
  },

  chiamaka: {
    records: [
      {
        blobId: 'VHQOWm8ZtcKjM_8e1Y0p11m4UjX-i5P_mC_y_h-V2qE',
        text: 'Week 28: Horrible heartburn waking me up at 2am whenever I slide down flat on the bed. Sleeping propped up on three pillows.',
        createdAt: '2026-07-28T02:15:00.000Z',
      },
      {
        blobId: 'hF-2FlIcwLkLm_RayL9DDTmchB3wX6l3e6T-h47tL48',
        text: 'Week 30: Felt tiny rhythmic tapping in my lower belly for 15 minutes. Realized baby has hiccups!',
        createdAt: '2026-08-11T19:30:00.000Z',
      },
      {
        blobId: '0SURu7ojNm2Pq_B6-Y_ESBaUuk6-X213l46m-k17tL4',
        text: 'Week 32: Baby is most active right after dinner around 8:30pm. Very strong rolls and kicks pushing high up against my ribs.',
        createdAt: '2026-08-25T20:45:00.000Z',
      },
      {
        blobId: 'WMfSRysa1sXo6_6uEUPYEiAo3q5-Y314l57n-l28uM5',
        text: 'Week 34: Did my evening kick count lying on my left side: felt 10 distinct kicks in 42 minutes. Very reassuring.',
        createdAt: '2026-09-08T21:10:00.000Z',
      },
      {
        blobId: 'XNgTSztb2tYp7_Kl9UvZxNRmypQ_9f2Z1q22n5VkY-j',
        text: 'Week 35: Baby had a quieter morning today, but after drinking a cold glass of sweet juice and resting, felt 10 kicks within an hour.',
        createdAt: '2026-09-15T10:30:00.000Z',
      },
      {
        blobId: 'YOhUT0uc3uZq8_Nm8VwAyOSnzqR_0g3a2r33o6WlZ-k',
        text: 'Week 36 (Day 2): Felt my belly tighten hard like a tight rubber band 3 times this afternoon. Painless and stopped when I drank water and rested.',
        createdAt: '2026-09-22T15:20:00.000Z',
      },
      {
        blobId: 'ZPiVU1vd4var9_Op9WxBzPTo0rS_1h4b3s44p7Xma-l',
        text: 'Week 36 (Day 6): Irregular tightening cramps low in my abdomen while folding laundry. Timed them—they were 25 minutes apart, then faded away.',
        createdAt: '2026-09-26T17:40:00.000Z',
      },
      {
        blobId: 'AQjWV2we5wbs0_Pq0XyCaQU11sT_2i5c4t55q8Ynb-m',
        text: 'Week 37: Packed my delivery bag: baby wrappers, baby clothes, maternity pads, soap, and clinic registration card all ready by the door.',
        createdAt: '2026-09-29T11:00:00.000Z',
      },
      {
        blobId: 'BRkXW3xf6xcs1_Qr1YzDbRV22tU_3j6d5u66r9Zoc-n',
        text: 'Week 38 (Day 1): Baby dropped lower today—breathing feels so much easier, but walking feels heavy like a bowling ball between my hips.',
        createdAt: '2026-10-02T16:15:00.000Z',
      },
      {
        blobId: 'CSlYX4yg7ydt2_Rs2ZaEcSW33uV_4k7e6v77s0Apd-o',
        text: 'Week 38 (Day 4): Mild menstrual-like lower back aches and pelvic pressure since morning. Contractions still irregular (15-20 min apart). Feeling ready!',
        createdAt: '2026-10-05T09:30:00.000Z',
      },
    ],
    report: `WHAT SHE HAS REPORTED
- Week 28: Nocturnal gastroesophageal reflux managed by elevated sleep posture.
- Week 30–32: Vigorous fetal movements and benign diaphragmatic hiccups observed.
- Week 34–35: Consistent fetal kick count compliance (10 movements documented within 45–60 minutes).
- Week 36: Classical Braxton-Hicks contractions (irregular, painless, resolving with hydration and left-lateral rest).
- Week 37: Antenatal delivery bag, clinical documentation, and transport readiness finalized.
- Week 38: Pelvic lightening observed (improved maternal breathing, increased dependent pelvic heaviness); onset of irregular latent pre-labor cramping.

WHAT KEEPS COMING BACK
- Fully reassuring longitudinal fetal movement history with verified kick count thresholds.
- Smooth physiologic transition from Braxton-Hicks toning into early latent labor pelvic sensations at term.
- Complete maternal psychosocial and logistical readiness for hospital admission.

WORTH ASKING THE DOCTOR
1. Assessment of fetal presentation, lie, and pelvic engagement.
2. Cervical status assessment if indicated at 38 weeks.
3. Clarification of hospital admission threshold (e.g. 5-1-1 contraction rule or spontaneous membrane rupture).`,
  },
};

export function getCohortData(name: string): CohortMotherData | null {
  const key = name.trim().toLowerCase();
  return COHORT_DATA[key] || null;
}
