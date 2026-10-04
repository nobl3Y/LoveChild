'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PersonaSelector } from '@/components/PersonaSelector';
import { ChatInterface } from '@/components/ChatInterface';
import { WalrusVault } from '@/components/WalrusVault';
import { ClinicalBriefingModal } from '@/components/ClinicalBriefingModal';
import { PATIENTS, WALRUS_MAINNET_AGENT_INFO } from '@/lib/mockData';
import { PatientPersona, WalrusMemoryItem } from '@/lib/types';
import { MessageSquare, Clock, FileCheck } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      
      {/* Navigation */}
      <Navbar
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        blobCount={totalBlobsAcrossPatients}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section with Rich Red Gradient */}
        <section className="bg-gradient-to-br from-rose-800 via-rose-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-rose-800/30 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300 block mb-2">
              Maternal Care Companion
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Appointments where nothing gets missed.
            </h1>
            <p className="mt-4 text-rose-100/90 text-base sm:text-lg leading-relaxed font-normal">
              This service is a maternal care chatbot for women. She simply tells it about any problem she&apos;s facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor&apos;s visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard.
            </p>

            {/* Quiet, Grounded Proof Points */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-rose-200">
              <div>
                <span className="block font-bold text-white text-sm">33 Stored Records</span>
                <span className="text-rose-300/80">Across 3 mothers</span>
              </div>
              <div>
                <span className="block font-bold text-white text-sm">Walrus Protocol</span>
                <span className="text-rose-300/80">Private decentralized memory</span>
              </div>
              <div>
                <span className="block font-bold text-white text-sm">One-Click Summary</span>
                <span className="text-rose-300/80">Ready for clinic visits</span>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Selector */}
        <section>
          <PersonaSelector
            selectedPatient={currentPatient}
            onSelectPatient={(p) => setActivePatientId(p.id)}
          />
        </section>

        {/* Live Chat Experience */}
        <section>
          <ChatInterface
            patient={currentPatient}
            onMemoryAdded={handleMemoryAdded}
            onOpenVault={() => setIsVaultOpen(true)}
          />
        </section>

        {/* The 3 Grounded Human Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Speak Freely, Big or Small
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Whenever something feels off—morning sickness, sudden ankle puffiness, or changes in how the baby moves—just say it naturally in your own words.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Every Detail Kept Over Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The exact days, how long each symptom lasted, and what you noticed are safely held in decentralized storage. The small things that usually slip away stay on record.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Doctor Appointments Prepared
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Before your visit, one click turns your whole story into a clear summary. You walk in prepared, confident that your doctor sees the whole picture.
            </p>
          </div>

        </section>

      </main>

      {/* Memory Vault Panel */}
      <WalrusVault
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        patient={currentPatient}
      />

      {/* Doctor Summary Modal */}
      <ClinicalBriefingModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        patient={currentPatient}
      />

      {/* Clean, Non-AI Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">NatalRecall</span>
            <span className="text-slate-400 ml-2">A maternal care service powered by Walrus Protocol</span>
          </div>
          <div className="text-slate-500">
            Appointments where nothing gets missed, and women feel prepared and heard.
          </div>
        </div>
      </footer>

    </div>
  );
}
