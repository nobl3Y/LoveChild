'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PersonaSelector } from '@/components/PersonaSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { WalrusVault } from '@/components/WalrusVault';
import { ClinicalBriefingModal } from '@/components/ClinicalBriefingModal';
import { PATIENTS, WALRUS_MAINNET_AGENT_INFO } from '@/lib/mockData';
import { PatientPersona, WalrusMemoryItem } from '@/lib/types';
import { ShieldCheck, Heart, Sparkles, AlertCircle, FileText, Cpu, Database, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [patients, setPatients] = useState<PatientPersona[]>(PATIENTS);
  const [activePatientId, setActivePatientId] = useState<string>('amina-bello');
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const currentPatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const handleMemoryAdded = (newMemory: WalrusMemoryItem) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === currentPatient.id) {
          return {
            ...p,
            memories: [newMemory, ...p.memories],
          };
        }
        return p;
      })
    );
  };

  const totalBlobsAcrossPatients = patients.reduce(
    (sum, p) => sum + p.memories.length,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      
      {/* Navigation */}
      <Navbar
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        blobCount={totalBlobsAcrossPatients}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hackathon Header Banner */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-rose-50 mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Walrus Session 8 Submission • "Chatbots That Remember"
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Sovereign Antenatal Memory for Safe Mothers & Babies
            </h1>
            <p className="mt-2 text-rose-100 text-xs sm:text-base leading-relaxed">
              Standard chatbots forget you the moment you close the tab. <span className="font-bold text-white">NatalRecall</span> uses decentralized Walrus Memory to track subtle symptoms across 40 weeks of pregnancy—catching life-threatening complications like <span className="underline decoration-amber-300 decoration-2 font-bold">Pre-Eclampsia</span> and preparing a 1-page Clinical Briefing for the OB-GYN.
            </p>

            {/* Quick Proof Badges */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-rose-100 border border-white/10">
                <Database className="w-3.5 h-3.5 mr-1 text-teal-300" />
                Walrus Mainnet Storage
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-rose-100 border border-white/10">
                <Cpu className="w-3.5 h-3.5 mr-1 text-amber-300" />
                Google Gemini Engine (Beyond the Big Two)
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-rose-100 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                3 Users with ≥10 Blobs Each
              </span>
            </div>
          </div>
        </div>

        {/* Persona Switcher Section */}
        <PersonaSelector
          selectedPatient={currentPatient}
          onSelectPatient={(p) => setActivePatientId(p.id)}
        />

        {/* Live Clinical Chat Interface */}
        <ChatInterface
          patient={currentPatient}
          onMemoryAdded={handleMemoryAdded}
          onOpenVault={() => setIsVaultOpen(true)}
        />

        {/* Educational Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Why Walrus Memory Matters
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Expectant mothers will never trust closed clouds with their intimate bodily symptoms. SEAL-encrypted storage on Walrus gives sovereign data ownership that follows the mother between clinics, midwives, and hospitals.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              No Unlicensed Prescriptions
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              NatalRecall never acts as an unlicensed prescriber. It actively flags contraindicated drugs (like Ibuprofen/NSAIDs) and synthesizes raw facts into an objective SOAP report for attending physicians.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              1-Click OB-GYN Briefing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Doctors only have 8 minutes per patient. Instead of vague answers, the mother hands over a chronological briefing highlighting blood pressure shifts, kick trends, and pre-eclampsia warning signs.
            </p>
          </div>
        </div>

      </main>

      {/* Slide-over Walrus Vault Drawer */}
      <WalrusVault
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        patient={currentPatient}
      />

      {/* Printable Clinical Report Modal */}
      <ClinicalBriefingModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        patient={currentPatient}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">NatalRecall</span>
            <span>• Built for Walrus Session 8 (Chatbots That Remember)</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Agent: {WALRUS_MAINNET_AGENT_INFO.agentId.slice(0, 10)}...</span>
            <span className="text-teal-700 font-bold">{totalBlobsAcrossPatients} Mainnet Blobs</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
