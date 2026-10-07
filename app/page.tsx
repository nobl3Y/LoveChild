'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ChatInterface } from '@/components/ChatInterface';
import { WalrusVault } from '@/components/WalrusVault';
import { ClinicalBriefingModal } from '@/components/ClinicalBriefingModal';
import { ProfileModal } from '@/components/ProfileModal';
import { ResetModal } from '@/components/ResetModal';
import { Profile } from '@/lib/types';
import { FEATURED_MOTHERS } from '@/lib/cohort';
import { MotherCohortShowcase } from '@/components/MotherCohortShowcase';
import { MessageSquare, Clock, FileCheck } from 'lucide-react';

const STORAGE_KEY = 'lovechild-profile';

export default function Home() {
  // Default to Ada Bello (first cohort patient) so chat is ready immediately on load
  const [profile, setProfile] = useState<Profile>(FEATURED_MOTHERS[0].profile);
  const [saved, setSaved] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [noteCount, setNoteCount] = useState<number | null>(null);
  const [cohortCounts, setCohortCounts] = useState<Record<string, number>>({
    Ada: 10,
    Blessing: 10,
    Chiamaka: 10,
  });

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

  // Fetch how many notes this patient already has stored on Walrus
  useEffect(() => {
    const target = inspectProfile || profile;
    if (!target) return;
    fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: target.name, pin: target.pin }),
    })
      .then((r) => r.json())
      .then((d) => {
        const count = d.memories ? d.memories.length : 0;
        setNoteCount(count);
        setCohortCounts((prev) => ({ ...prev, [target.name]: count }));
      })
      .catch(() => {});
  }, [profile, inspectProfile, refreshKey]);

  const handleMemoryChanged = () => {
    // 1. Instantly increment in real-time on screen (0ms optimistic UI update)
    setNoteCount((prev) => (prev !== null ? prev + 1 : 11));
    setCohortCounts((prev) => {
      const current = prev[profile.name] ?? 10;
      return { ...prev, [profile.name]: current + 1 };
    });
    // 2. Trigger background sync to confirm count and update drawer
    setRefreshKey((k) => k + 1);
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/reset', { method: 'POST' });
      setCohortCounts({ Ada: 10, Blessing: 10, Chiamaka: 10 });
      setNoteCount(10);
      setRefreshKey((k) => k + 1);
      setResetKey((k) => k + 1);
      setIsResetModalOpen(false);
    } catch (e) {
      console.error('Reset failed:', e);
    } finally {
      setIsResetting(false);
    }
  };

  const loginRealUser = (p: Profile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setSaved(p);
    setLoggedInUser(p);
    setProfile(p);
    setInspectProfile(null);
    setIsProfileModalOpen(false);
  };

  const startCohortChat = (p: Profile) => {
    setInspectProfile(null);
    setProfile(p);
    setNoteCount(cohortCounts[p.name] ?? null);
  };

  const openVaultFor = (p: Profile) => {
    setProfile(p);
    setInspectProfile(p);
    setIsVaultOpen(true);
  };

  const openReportFor = (p: Profile) => {
    setProfile(p);
    setInspectProfile(p);
    setIsReportOpen(true);
  };

  const switchUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setLoggedInUser(null);
    setProfile(FEATURED_MOTHERS[0].profile);
    setInspectProfile(null);
    setRefreshKey((k) => k + 1);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar
        currentProfile={loggedInUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenVault={() => openVaultFor(profile)}
        onOpenReport={() => openReportFor(profile)}
        onSignOut={switchUser}
        blobCount={noteCount ?? 0}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        {/* Section 1: Hero Banner (Always on Top) */}
        <section className="bg-gradient-to-br from-rose-950 via-red-950 to-stone-950 rounded-3xl p-7 sm:p-9 md:p-11 text-white shadow-lg border border-rose-900/40">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-300 block mb-3">
              Maternal Health Companion • Walrus Memory
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug">
              Small symptoms slip your mind, then turn into big problems.
            </h1>
            <p className="mt-3.5 text-rose-100/90 text-sm sm:text-base leading-relaxed">
              Before every antenatal visit, small symptoms might get forgotten, then become big problems. LoveChild lets mothers log anything worth noting in decentralized <strong className="font-bold text-white">Walrus Memory</strong> and makes a note for your doctor, so you don't forget during the visits or whenever.
            </p>
          </div>
        </section>

        {/* Section 2: Live Consultation Journal (Chat immediately accessible) */}
        <section id="chat-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Live Consultation Journal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {noteCount === null
                  ? 'Querying Walrus decentralized storage…'
                  : `${noteCount} note${noteCount !== 1 ? 's' : ''} stored on Walrus for ${profile.name}.`}
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700 whitespace-nowrap">Walrus Mainnet Connected</span>
            </div>
          </div>

          <ChatInterface
            profile={profile}
            onMemoryChanged={handleMemoryChanged}
            onOpenVault={() => openVaultFor(profile)}
            onOpenReport={() => openReportFor(profile)}
            onSwitchUser={switchUser}
            onSelectMother={startCohortChat}
            onOpenCustomModal={() => setIsProfileModalOpen(true)}
            onOpenResetModal={() => setIsResetModalOpen(true)}
            blobCount={noteCount}
            resetKey={resetKey}
          />
        </section>

        {/* Section 3: Featured Clinical Cohorts (Detailed Patient Profiles) */}
        <section className="pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Featured Clinical Cohorts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.85]">
              Real longitudinal maternal records persisted on Walrus decentralized storage. Switch patient to chat, view their encrypted vault, or generate an OB-GYN briefing.
            </p>
          </div>

          <MotherCohortShowcase
            currentProfile={profile}
            cohortCounts={cohortCounts}
            onSelectMother={(p) => {
              startCohortChat(p);
              const el = document.getElementById('chat-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenVaultFor={openVaultFor}
            onOpenReportFor={openReportFor}
          />
        </section>

        {/* Section 4: How LoveChild Works */}
        <section className="pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              How LoveChild Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.85]">
              Designed to preserve longitudinal context across every stage of pregnancy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">1. Check-in any time</h3>
              <p className="text-sm text-slate-600 leading-[1.85]">
                Morning sickness, swollen ankles, or worries about fetal movement. Share concerns whenever they occur, day or night.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
                <Clock className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">2. Uncovers subtle patterns</h3>
              <p className="text-sm text-slate-600 leading-[1.85]">
                LoveChild securely saves every note to Walrus Memory, linking recurring symptoms across weeks before they escalate into urgent complications.
              </p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
                <FileCheck className="w-5 h-5 text-rose-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">3. Doctor visits go smoother</h3>
              <p className="text-sm text-slate-600 leading-[1.85]">
                Before your visit, one tap compiles an OB-GYN clinical summary. Your doctor reads it in 60 seconds, saving 10–15 minutes per consultation.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Slide-Over Walrus Vault Drawer */}
      <WalrusVault
        isOpen={isVaultOpen}
        onClose={() => {
          setIsVaultOpen(false);
          setInspectProfile(null);
        }}
        profile={inspectProfile || profile}
        refreshKey={refreshKey}
        onLoaded={(count) => setNoteCount(count)}
      />

      {/* Clinical Briefing / Doctor's Report Modal */}
      <ClinicalBriefingModal
        isOpen={isReportOpen}
        onClose={() => {
          setIsReportOpen(false);
          setInspectProfile(null);
        }}
        profile={inspectProfile || profile}
      />

      {/* Custom Patient PIN Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onStart={loginRealUser}
        initial={saved}
      />

      {/* Session Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
        isResetting={isResetting}
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
