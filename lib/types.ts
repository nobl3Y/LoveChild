export type GestationalTrimester = 'Trimester 1' | 'Trimester 2' | 'Trimester 3' | 'Postpartum (4th Trimester)';

export interface WalrusMemoryItem {
  id: string;
  blobId: string;
  timestamp: string;
  gestationalWeek: number;
  category: 'symptom' | 'fetal_movement' | 'vitals' | 'nutrition' | 'labor_sign' | 'clinical_alert';
  severity?: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  summary: string;
  rawDetails: string;
  tags: string[];
  isRedFlag?: boolean;
}

export interface PatientPersona {
  id: string;
  name: string;
  age: number;
  gestationalWeek: number;
  trimester: GestationalTrimester;
  estimatedDueDate: string;
  gravidaPara: string; // e.g., 'G1P0' (First pregnancy)
  bloodType: string;
  avatar: string;
  shortBio: string;
  coreWatchArea: string;
  walrusNamespace: string;
  memories: WalrusMemoryItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recalledMemoryIds?: string[];
  newBlobIdCreated?: string;
  clinicalAlert?: {
    level: 'info' | 'warning' | 'critical';
    title: string;
    details: string;
  };
}

export interface ClinicalSOAPReport {
  patient: PatientPersona;
  generatedAt: string;
  totalBlobsAnalyzed: number;
  subjectiveTimeline: {
    week: number;
    date: string;
    notes: string;
    isRedFlag: boolean;
  }[];
  fetalMovementAssessment: string;
  surveillanceAlerts: string[];
  doctorDiscussionPoints: string[];
  disclaimer: string;
}
