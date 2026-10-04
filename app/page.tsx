'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProfileGate } from '@/components/ProfileGate';
import { ChatInterface } from '@/components/ChatInterface';
import { WalrusVault } from '@/components/WalrusVault';
import { ClinicalBriefingModal } from '@/components/ClinicalBriefingModal';
import { ProfileModal } from '@/components/ProfileModal';
import { Profile } from '@/lib/types';
import { MotherCohortShowcase } from '@/components/MotherCohortShowcase';
import { MessageSquare, Clock, FileCheck } from 'lucide-react';

const STORAGE_KEY = 'lovechild-profile';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [noteCount, setNoteCount] = useState<number | null>(null);

  const [loggedInUser, setLoggedInUser] = useState<Profile | null>(null);
  const [inspectProfile, setInspectProfile] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as Profile;
        setSaved(p);
        setLoggedInUser(p);
        setProfile(p);
      }
    } catch {}
    setReady(true);
  }, []);

  // Load how many notes this person already has on Walrus.
  useEffect(() => {
    const target = loggedInUser || profile;
    if (!target) return;
    setNoteCount(null);
    fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: target.name, pin: target.pin }),
    })
      .then((r) => r.json())
      .then((d) => setNoteCount(d.memories ? d.memories.length : null))
      .catch(() => setNoteCount(null));
  }, [loggedInUser, profile, refreshKey]);

  const loginRealUser = (p: Profile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setSaved(p);
    setLoggedInUser(p);
    setProfile(p);
    setIsProfileModalOpen(false);
  };

  const startCohortChat = (p: Profile) => {
    // Allows testing chat as this cohort subject in the chat interface
    setProfile(p);
  };

  const openVaultFor = (p: Profile) => {
    setInspectProfile(p);
    setIsVaultOpen(true);
  };

  const openReportFor = (p: Profile) => {
    setInspectProfile(p);
    setIsReportOpen(true);
  };

  const switchUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setLoggedInUser(null);
    setProfile(null);
    setInspectProfile(null);
    setNoteCount(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar
        currentProfile={loggedInUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenVault={() => (inspectProfile || loggedInUser || profile) && setIsVaultOpen(true)}
        onOpenReport={() => (inspectProfile || loggedInUser || profile) && setIsReportOpen(true)}
        onSignOut={switchUser}
        blobCount={noteCount ?? 0}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-950 via-red-950 to-stone-950 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-lg border border-rose-900/40">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block mb-3">
              Maternal Health Companion • Walrus Memory
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug">
              Appointments where nothing gets missed.
            </h1>
            <p className="mt-3 text-rose-100/90 text-sm sm:text-base leading-relaxed">
              Between antenatal visits, small symptoms like mild headaches or swelling often get forgotten before they escalate. LoveChild preserves every check-in on <strong className="text-white">Walrus Memory</strong> and flags recurring patterns in a concise briefing that saves doctors 10–15 minutes per visit.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
              <MessageSquare className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">1. Check-in any time</h3>
            <p className="text-sm text-slate-600 leading-[1.85]">
              Morning sickness, swollen ankles, or worries about fetal movement. Share concerns whenever they occur, day or night.
            </p>
          </div>
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
              <Clock className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">2. Uncovers subtle patterns</h3>
            <p className="text-sm text-slate-600 leading-[1.85]">
              LoveChild securely saves every note to Walrus Memory, linking recurring symptoms across weeks before they escalate into urgent complications.
            </p>
          </div>
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
              <FileCheck className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">3. Doctor visits go smoother</h3>
            <p className="text-sm text-slate-600 leading-[1.85]">
              Before your visit, one tap compiles an OB-GYN clinical summary. Your doctor reads it in 60 seconds, saving 10–15 minutes per consultation.
            </p>
          </div>
        </section>

        {/* Segment 3: Featured Cohort Showcase */}
        <section className="pt-12 border-t border-slate-200/80">
          <MotherCohortShowcase
            currentProfile={profile}
            onSelectMother={startCohortChat}
            onOpenVaultFor={openVaultFor}
            onOpenReportFor={openReportFor}
          />
        </section>

        {/* Segment 4: Live Consultation Journal / Access */}
        <section className="pt-12 border-t border-slate-200/80 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {profile ? `Live Consultation Journal • ${profile.name}` : 'Access Your Consultation Journal'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.85]">
              {profile
                ? 'Chat naturally with LoveChild. Every symptom or observation is committed directly to your decentralized Walrus Memory vault.'
                : 'Enter your name and PIN below to access your private decentralized session.'}
            </p>
          </div>

          {!ready ? null : !profile ? (
            <ProfileGate initial={saved} onStart={loginRealUser} />
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 text-center px-1">
                {noteCount === null
                  ? 'Checking Walrus for your saved notes…'
                  : noteCount === 0
                  ? 'No saved notes yet. This is your first conversation.'
                  : `${noteCount} note${noteCount > 1 ? 's' : ''} already saved on Walrus for ${profile.name}.`}
              </p>
              <ChatInterface
                profile={profile}
                onMemoryChanged={() => setRefreshKey((k) => k + 1)}
                onOpenVault={() => setIsVaultOpen(true)}
                onOpenReport={() => setIsReportOpen(true)}
                onSwitchUser={switchUser}
              />
            </div>
          )}
        </section>
      </main>

      {(inspectProfile || profile) && (
        <>
          <WalrusVault
            isOpen={isVaultOpen}
            onClose={() => setIsVaultOpen(false)}
            profile={inspectProfile || profile!}
            refreshKey={refreshKey}
            onLoaded={setNoteCount}
          />
          <ClinicalBriefingModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            profile={inspectProfile || profile!}
          />
        </>
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onStart={loginRealUser}
        initial={saved}
      />

      <footer className="border-t border-slate-200/80 bg-white py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">LoveChild</span>
            <span className="text-slate-400 ml-2">A maternal care journal powered by Walrus Memory</span>
          </div>
          <div>Not a doctor. In an emergency, contact your clinic or hospital.</div>
        </div>
      </footer>
    </div>
  );
}
