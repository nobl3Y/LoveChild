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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-12">
        
        {/* Hero Section with Rich Red Gradient */}
        <section className="bg-gradient-to-br from-rose-950 via-red-950 to-stone-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl border border-rose-900/40 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-300/90 block mb-4">
              Maternal Care Journal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
              Appointments where nothing gets missed.
            </h1>
            <p className="mt-6 text-rose-100/90 text-sm sm:text-base lg:text-[17px] leading-[1.8] sm:leading-[1.85] font-normal tracking-tight">
              This service is a maternal care chatbot for women. She simply tells it about any problem she&apos;s facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor&apos;s visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard.
            </p>

            {/* Quiet, Grounded Proof Points */}
            <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <span className="block font-bold text-white text-base sm:text-lg tracking-tight">33 Stored Records</span>
                <span className="text-rose-300/80 text-xs mt-0.5 block leading-normal">Across 3 verified mothers</span>
              </div>
              <div>
                <span className="block font-bold text-white text-base sm:text-lg tracking-tight">Walrus Memory</span>
                <span className="text-rose-300/80 text-xs mt-0.5 block leading-normal">Persistent, decentralized storage</span>
              </div>
              <div>
                <span className="block font-bold text-white text-base sm:text-lg tracking-tight">Doctor Summary</span>
                <span className="text-rose-300/80 text-xs mt-0.5 block leading-normal">Clinical intake report in one click</span>
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-5">
              <MessageSquare className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 tracking-tight">
              Speak Freely, Big or Small
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.75] font-normal tracking-tight">
              Whenever something feels off—morning sickness, sudden ankle puffiness, or changes in how the baby moves—just say it naturally in your own words.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-5">
              <Clock className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 tracking-tight">
              Every Detail Kept Over Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.75] font-normal tracking-tight">
              The exact days, how long each symptom lasted, and what you noticed are safely held in decentralized storage. The small things that usually slip away stay on record.
            </p>
          </div>

          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-5">
              <FileCheck className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2 tracking-tight">
              Doctor Appointments Prepared
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.75] font-normal tracking-tight">
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
            <span className="font-bold text-slate-800">LoveChild</span>
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
