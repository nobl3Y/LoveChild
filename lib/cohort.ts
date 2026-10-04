import { Profile } from './types';

export interface FeaturedMother {
  profile: Profile;
  displayName: string;
  location: string;
  stage: string;
  summary: string;
  clinicalFocus: string;
}

export const FEATURED_MOTHERS: FeaturedMother[] = [
  {
    profile: { name: 'Ada', pin: '1234', week: 30 },
    displayName: 'Ada Bello',
    location: 'Lagos, Nigeria',
    stage: 'Week 30 • 3rd Trimester',
    summary: 'First-time mother monitoring sudden foot swelling, morning headaches, and blood pressure patterns.',
    clinicalFocus: 'Pre-Eclampsia Risk Surveillance & Blood Pressure Tracking',
  },
  {
    profile: { name: 'Blessing', pin: '2222', week: 18 },
    displayName: 'Blessing Okon',
    location: 'Calabar, Nigeria',
    stage: 'Week 18 • 2nd Trimester',
    summary: 'High school teacher tracking persistent morning nausea, fluid intake, and iron supplement adherence.',
    clinicalFocus: 'Hyperemesis Management & Maternal Hydration',
  },
  {
    profile: { name: 'Chiamaka', pin: '3333', week: 38 },
    displayName: 'Chiamaka Eze',
    location: 'Enugu, Nigeria',
    stage: 'Week 38 • Term Preparation',
    summary: 'Mother of one preparing for delivery, recording fetal kick counts and tracking Braxton-Hicks contractions.',
    clinicalFocus: 'Fetal Well-being (Kick Counts) & Labor Readiness',
  },
];
