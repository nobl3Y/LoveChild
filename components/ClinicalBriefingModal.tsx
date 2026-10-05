'use client';

import React, { useEffect, useState } from 'react';
import { X, Printer, FileText, Loader2 } from 'lucide-react';
import { MemoryItem, Profile } from '@/lib/types';

interface ClinicalBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const ClinicalBriefingModal: React.FC<ClinicalBriefingModalProps> = ({ isOpen, onClose, profile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState('');
  const [memories, setMemories] = useState<MemoryItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    setReport('');
    fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not build report');
        if (!cancelled) {
          setReport(d.report);
          setMemories(d.memories);
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isOpen, profile]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col border border-slate-200 overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:max-h-none"
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Doctor&apos;s Clinical Briefing</h3>
              <p className="text-[11px] text-slate-500">OB-GYN longitudinal summary from Walrus</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              disabled={!report}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 text-slate-800">
          <div className="border-b-2 border-slate-900 pb-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">LoveChild Clinical Briefing</h1>
            <p className="text-xs text-slate-500 mt-1">
              Patient: <strong className="text-slate-700">{profile.name}</strong>
              {profile.week ? ` • Week ${profile.week}` : ''} • Prepared {new Date().toLocaleDateString()}
            </p>
          </div>

          {loading && (
            <div className="flex items-center text-slate-500 text-sm py-12 justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2 text-rose-700" /> Reading notes from Walrus decentralized storage…
            </div>
          )}
          {error && <p className="text-sm text-rose-700 bg-rose-50 p-4 rounded-xl border border-rose-200">{error}</p>}
          {!loading && !error && memories.length === 0 && (
            <p className="text-sm text-slate-500 py-8 text-center">
              There are no saved notes yet on Walrus for {profile.name}. Chat with LoveChild first, then open this briefing.
            </p>
          )}

          {report && (
            <>
              <div className="whitespace-pre-line text-sm leading-relaxed bg-slate-50/60 p-5 rounded-xl border border-slate-200/80 font-normal text-slate-800">
                {report}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                  <span>Underlying Walrus Records ({memories.length})</span>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">Decentralized Blobs</span>
                </h4>
                <ol className="space-y-2 text-xs text-slate-700 list-decimal pl-4">
                  {memories.map((m) => (
                    <li key={m.blobId} className="leading-relaxed">
                      <span>{m.text}</span>
                      <span className="block font-mono text-[10px] text-slate-400 mt-0.5 break-all">
                        Walrus Blob: {m.blobId}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 leading-relaxed">
                <strong>Clinical Note:</strong> This summary is an automated clinical briefing compiled from decentralized notes entered across antenatal check-ins. It is designed to save 10–15 minutes per consultation and does not replace clinician judgment.
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with quick dismiss */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 print:hidden text-xs text-slate-500">
          <span>{memories.length} notes compiled from Walrus</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
