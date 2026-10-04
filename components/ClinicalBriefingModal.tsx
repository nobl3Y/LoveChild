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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden print:border-none print:shadow-none print:max-w-none">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-sm">Summary for your doctor</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              disabled={!report}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-slate-800">
          <div className="border-b-2 border-slate-900 pb-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">LoveChild summary</h1>
            <p className="text-xs text-slate-500 mt-1">
              {profile.name}
              {profile.week ? ` • Week ${profile.week}` : ''} • Prepared {new Date().toLocaleDateString()}
            </p>
          </div>

          {loading && (
            <div className="flex items-center text-slate-500 text-sm py-8 justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Reading your notes from Walrus…
            </div>
          )}
          {error && <p className="text-sm text-rose-700">{error}</p>}
          {!loading && !error && memories.length === 0 && (
            <p className="text-sm text-slate-500">
              There are no saved notes yet. Chat with LoveChild first, then come back here.
            </p>
          )}

          {report && (
            <>
              <div className="whitespace-pre-line text-sm leading-relaxed">{report}</div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Her original notes ({memories.length})
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-600 list-decimal pl-4">
                  {memories.map((m) => (
                    <li key={m.blobId}>{m.text}</li>
                  ))}
                </ol>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                This summary was written by an AI from notes the patient entered. It is not a medical assessment and does not
                replace a clinician&apos;s judgment.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
