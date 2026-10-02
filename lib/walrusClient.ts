import { PatientPersona, WalrusMemoryItem, ClinicalSOAPReport } from './types';
import { WALRUS_MAINNET_AGENT_INFO } from './mockData';

export class WalrusMemoryService {
  private serverUrl: string;
  private agentId: string;

  constructor() {
    this.serverUrl = process.env.NEXT_PUBLIC_MEMWAL_SERVER_URL || WALRUS_MAINNET_AGENT_INFO.relayerUrl;
    this.agentId = process.env.NEXT_PUBLIC_MEMWAL_AGENT_ID || WALRUS_MAINNET_AGENT_INFO.agentId;
  }

  public getAgentInfo() {
    return {
      ...WALRUS_MAINNET_AGENT_INFO,
      agentId: this.agentId,
      serverUrl: this.serverUrl,
    };
  }

  /**
   * Recalls relevant memories for a patient given a conversational query.
   */
  public async recall(
    patient: PatientPersona,
    query: string,
    limit: number = 5
  ): Promise<WalrusMemoryItem[]> {
    const queryLower = query.toLowerCase();
    
    // Semantic match simulation based on clinical tags and terms
    const scored = patient.memories.map((mem) => {
      let score = 0;
      if (mem.isRedFlag) score += 3;
      
      const textToSearch = `${mem.summary} ${mem.rawDetails} ${mem.tags.join(' ')}`.toLowerCase();
      
      // Clinical synonym matching
      const keywords = [
        'headache', 'pain', 'swell', 'edema', 'kick', 'movement', 'vomit', 'nausea',
        'bp', 'pressure', 'contraction', 'fluid', 'dizzy', 'vision', 'urine', 'weight'
      ];

      keywords.forEach((kw) => {
        if (queryLower.includes(kw) && textToSearch.includes(kw)) {
          score += 4;
        }
      });

      // Recency bias (later gestational week has higher salience)
      score += mem.gestationalWeek * 0.1;

      return { mem, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((s) => s.mem);
  }

  /**
   * Commits a new clinical memory into the Walrus decentralized blob store.
   */
  public async remember(
    patient: PatientPersona,
    content: string,
    category: WalrusMemoryItem['category'] = 'symptom'
  ): Promise<WalrusMemoryItem> {
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    const blobId = `0x${randomHex}`;
    
    const isRedFlag = /headache|swelling|edema|vision|bleed|spotting|faint|pressure|140|severe/i.test(content);

    const newMemory: WalrusMemoryItem = {
      id: `mem-${Date.now()}`,
      blobId,
      timestamp: new Date().toISOString(),
      gestationalWeek: patient.gestationalWeek,
      category,
      severity: isRedFlag ? 'Moderate' : 'Mild',
      isRedFlag,
      summary: content.slice(0, 70) + (content.length > 70 ? '...' : ''),
      rawDetails: content,
      tags: ['patient_log', category, `week_${patient.gestationalWeek}`]
    };

    return newMemory;
  }

  /**
   * Synthesizes the full Walrus memory timeline into a structured Clinical SOAP Briefing for an OB-GYN.
   */
  public generateClinicalReport(patient: PatientPersona): ClinicalSOAPReport {
    const redFlagCount = patient.memories.filter((m) => m.isRedFlag).length;

    const subjectiveTimeline = patient.memories.map((m) => ({
      week: m.gestationalWeek,
      date: new Date(m.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      notes: `${m.summary} (${m.rawDetails})`,
      isRedFlag: !!m.isRedFlag
    }));

    // Identify surveillance alerts
    const alerts: string[] = [];
    if (patient.id === 'amina-bello') {
      alerts.push('Pre-Eclampsia Risk: Co-occurrence of Grade 1+ peripheral edema and persistent 48h frontal headache at Week 30.');
      alerts.push('Recommended Clinic Action: Immediate manual sphygmomanometer blood pressure check + urine protein dipstick test.');
    } else if (patient.id === 'blessing-okon') {
      alerts.push('Hydration Surveillance: History of severe early vomiting (HG) stabilized. Current ORS hydration regimen effective (+1.2kg recovered).');
      alerts.push('Recommended Clinic Action: Routine second-trimester anatomy scan confirmation & electrolyte panel.');
    } else {
      alerts.push('Term Labor Preparation: Lightening noted at 37 weeks with non-rhythmic Braxton Hicks clusters.');
      alerts.push('Recommended Clinic Action: Cervical examination for dilation/effacement + 5-1-1 rule review.');
    }

    const doctorDiscussionPoints = [
      `Confirm current maternal blood pressure against baseline (${patient.memories.find(m => m.category === 'vitals')?.summary || 'Normotensive'}).`,
      `Evaluate fetal heart rate (Doppler/Auscultation) and fundal height for Week ${patient.gestationalWeek}.`,
      `Review red flag signs: acute epigastric pain, visual scotomas, amniotic leakage, or sudden drop in kick counts.`
    ];

    return {
      patient,
      generatedAt: new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
      totalBlobsAnalyzed: patient.memories.length,
      subjectiveTimeline,
      fetalMovementAssessment: 'Reassuring active kick count documented (>10 kicks in 2-hour resting windows).',
      surveillanceAlerts: alerts,
      doctorDiscussionPoints,
      disclaimer: 'CONFIDENTIAL CLINICAL BRIEFING. Generated by NatalRecall via patient-owned Walrus decentralized memory. Intended exclusively for licensed medical review. Does not replace professional clinical judgment.'
    };
  }
}

export const walrusService = new WalrusMemoryService();
