'use client';

import React from 'react';
import { PatientPersona } from '@/lib/types';
import { PATIENTS } from '@/lib/mockData';
import { HeartPulse, Calendar, AlertCircle, ShieldAlert } from 'lucide-react';

interface PersonaSelectorProps {
  selectedPatient: PatientPersona;
  onSelectPatient: (patient: PatientPersona) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPatient,
  onSelectPatient,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            Hackathon Multi-User Showcase
          </span>
          <h2 className="text-sm font-semibold text-slate-900 mt-1">
            Select Expectant Mother ({PATIENTS.length} Profiles, ≥10 Mainnet Blobs Each)
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Namespace: <span className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">{selectedPatient.walrusNamespace.split(':')[2]}</span>
        </div>
      </div>

      {/* Patient Tab Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {PATIENTS.map((p) => {
          const isSelected = p.id === selectedPatient.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPatient(p)}
              className={`flex items-start p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-rose-500 bg-gradient-to-br from-rose-50/80 via-white to-teal-50/50 shadow-md ring-2 ring-rose-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <span className="text-2xl mr-2.5 p-1 rounded-lg bg-white shadow-sm border border-slate-100">
                {p.avatar}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {p.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/70 px-1.5 py-0.2 rounded font-mono">
                    {p.memories.length} Blobs
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Week {p.gestationalWeek} • {p.trimester}
                </p>
                <p className="text-[11px] text-slate-600 line-clamp-1 mt-1 font-medium">
                  {p.coreWatchArea.split('(')[0]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Profile Info Banner */}
      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Obstetric Status</span>
          <span className="font-semibold text-slate-800">{selectedPatient.gravidaPara}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Estimated Due Date</span>
          <span className="font-semibold text-slate-800 flex items-center mt-0.5">
            <Calendar className="w-3 h-3 mr-1 text-slate-500" />
            {new Date(selectedPatient.estimatedDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Blood Group</span>
          <span className="font-semibold text-slate-800">{selectedPatient.bloodType}</span>
        </div>
        <div className="bg-rose-50/70 p-2 rounded-lg border border-rose-100/80">
          <span className="text-rose-600 block text-[10px] uppercase font-semibold flex items-center">
            <ShieldAlert className="w-3 h-3 mr-1 text-rose-500" />
            Active Surveillance
          </span>
          <span className="font-semibold text-rose-900 truncate block mt-0.5" title={selectedPatient.coreWatchArea}>
            {selectedPatient.coreWatchArea}
          </span>
        </div>
      </div>
    </div>
  );
};
