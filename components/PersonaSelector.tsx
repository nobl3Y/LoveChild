'use client';

import React from 'react';
import { PatientPersona } from '@/lib/types';
import { PATIENTS } from '@/lib/mockData';
import { Calendar, AlertCircle } from 'lucide-react';

interface PersonaSelectorProps {
  selectedPatient: PatientPersona;
  onSelectPatient: (patient: PatientPersona) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPatient,
  onSelectPatient,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Select a Mother&apos;s Profile
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed tracking-tight">
            Test how the journal preserves her history across different stages of pregnancy.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-semibold tracking-tight">
          3 verified longitudinal profiles
        </div>
      </div>

      {/* Patient Tab Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PATIENTS.map((p) => {
          const isSelected = p.id === selectedPatient.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPatient(p)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-rose-700 bg-rose-50/50 shadow-xs ring-1 ring-rose-700/20'
                  : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-rose-700' : 'bg-slate-300'}`}></span>
                  <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                    {p.name}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded-full shrink-0 tracking-tight">
                  {p.memories.length} notes
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1.5 tracking-tight">
                Week {p.gestationalWeek} • {p.trimester}
              </p>
              <p className="text-xs text-slate-600 line-clamp-1 mt-1 tracking-tight">
                {p.coreWatchArea.split('(')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Profile Details Strip */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Pregnancy Count</span>
          <span className="font-semibold text-slate-800 mt-0.5 block">{selectedPatient.gravidaPara}</span>
        </div>
        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Due Date</span>
          <span className="font-semibold text-slate-800 flex items-center mt-0.5">
            <Calendar className="w-3 h-3 mr-1 text-slate-400" />
            {new Date(selectedPatient.estimatedDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Blood Group</span>
          <span className="font-semibold text-slate-800 mt-0.5 block">{selectedPatient.bloodType}</span>
        </div>
        <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
          <span className="text-rose-700 block text-[10px] uppercase font-bold tracking-wider flex items-center">
            <AlertCircle className="w-3 h-3 mr-1 text-rose-600" />
            Current Focus
          </span>
          <span className="font-semibold text-rose-950 truncate block mt-0.5" title={selectedPatient.coreWatchArea}>
            {selectedPatient.coreWatchArea}
          </span>
        </div>
      </div>
    </div>
  );
};
