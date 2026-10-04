'use client';

import React from 'react';
import { UserCheck, ArrowRight, Activity, Stethoscope, Database, FileText } from 'lucide-react';
import { Profile } from '@/lib/types';
import { FEATURED_MOTHERS } from '@/lib/cohort';

interface MotherCohortShowcaseProps {
  currentProfile: Profile | null;
  onSelectMother: (profile: Profile) => void;
  onOpenVaultFor: (profile: Profile) => void;
  onOpenReportFor: (profile: Profile) => void;
}

export const MotherCohortShowcase: React.FC<MotherCohortShowcaseProps> = ({
  currentProfile,
  onSelectMother,
  onOpenVaultFor,
  onOpenReportFor,
}) => {
  return (
    <div className="space-y-6">
      {/* Purpose & Clinical Mission Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50/50 border border-rose-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
              <Activity className="w-3 h-3 text-rose-700" />
              Longitudinal Memory in Maternal Care
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Ensuring No Detail of a Mother&apos;s Journey Is Forgotten
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.8]">
              Between routine antenatal checks (usually 2 to 3 weeks apart), expectant mothers can share any concern at any time. Seemingly minor signs—headaches, tight rings, or subtle swelling—are securely stored on <strong className="text-slate-800">Walrus Memory</strong> so nothing is forgotten when speaking with her doctor.
            </p>
          </div>
          <div className="bg-white/90 border border-rose-100 rounded-xl p-3 shrink-0 shadow-2xs md:max-w-xs">
            <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs mb-1">
              <Stethoscope className="w-3.5 h-3.5 text-rose-700" />
              Saves Doctor Time
            </div>
            <p className="text-[11px] text-slate-600 leading-[1.7]">
              Condenses decentralized Walrus logs into a 60-second clinical briefing for her OB-GYN, saving 10–15 minutes per consultation.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURED_MOTHERS.map((m) => {
          const isSelected = currentProfile?.name.toLowerCase() === m.profile.name.toLowerCase();
          return (
            <div
              key={m.profile.name}
              className={`relative bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-700 ring-2 ring-rose-700/20 shadow-md'
                  : 'border-slate-200/90 hover:border-rose-300 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {m.stage}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    PIN: {m.profile.pin}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    {m.displayName}
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        <UserCheck className="w-3 h-3" /> Active
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500">{m.location}</p>
                </div>

                <p className="text-xs text-slate-600 leading-[1.8]">
                  {m.summary}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                    Clinical Surveillance Focus
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-[1.7]">
                    {m.clinicalFocus}
                  </p>
                </div>
              </div>

              {/* Action Controls for this specific mother */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                {/* Switch / Chat Button */}
                <button
                  type="button"
                  onClick={() => onSelectMother(m.profile)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-rose-900 text-white shadow-sm hover:bg-rose-950'
                      : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
                  }`}
                >
                  {isSelected ? `Chatting as ${m.profile.name}` : `Switch to ${m.profile.name}`}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Stored Records & Doctor Report specific to this mother */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenVaultFor(m.profile)}
                    className="py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Database className="w-3 h-3 text-rose-700" />
                    <span>Walrus Vault</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenReportFor(m.profile)}
                    className="py-2 px-2.5 rounded-lg border border-rose-200 hover:border-rose-300 bg-white hover:bg-rose-50/50 text-rose-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <FileText className="w-3 h-3 text-rose-700" />
                    <span>Doctor&apos;s Report</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
