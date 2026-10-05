'use client';

import React, { useEffect, useState } from 'react';
import { X, Printer, FileText, Loader2, Calendar, AlertTriangle, HelpCircle } from 'lucide-react';
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
    setMemories([]);
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

  // Render structured clinical sections cleanly
  const renderFormattedReport = (raw: string) => {
    const sections = raw.split(/(?=WHAT SHE HAS REPORTED|WHAT KEEPS COMING BACK|WORTH ASKING THE DOCTOR)/i);

    if (sections.length > 1) {
      return (
        <div className="space-y-4">
          {sections.map((sec, i) => {
            const trimmed = sec.trim();
            if (!trimmed) return null;

            let title = '';
            let body = trimmed;
            let icon = null;
            let badgeStyle = 'text-slate-800 bg-slate-100 border-slate-200';

            if (/^WHAT SHE HAS REPORTED/i.test(trimmed)) {
              title = 'What She Has Reported';
              body = trimmed.replace(/^WHAT SHE HAS REPORTED\s*/i, '').trim();
              icon = <Calendar className="w-3.5 h-3.5 text-rose-700" />;
              badgeStyle = 'text-rose-950 bg-rose-50 border-rose-200';
            } else if (/^WHAT KEEPS COMING BACK/i.test(trimmed)) {
              title = 'Recurring Patterns & Trends';
              body = trimmed.replace(/^WHAT KEEPS COMING BACK\s*/i, '').trim();
              icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />;
              badgeStyle = 'text-amber-950 bg-amber-50 border-amber-200';
            } else if (/^WORTH ASKING THE DOCTOR/i.test(trimmed)) {
              title = 'Clinical Questions for Her OB-GYN';
              body = trimmed.replace(/^WORTH ASKING THE DOCTOR\s*/i, '').trim();
              icon = <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />;
              badgeStyle = 'text-emerald-950 bg-emerald-50 border-emerald-200';
            }

            return (
              <div
                key={i}
                className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-2.5"
              >
                {title && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeStyle}`}
                    >
                      {icon}
                      <span>{title}</span>
                    </span>
                  </div>
                )}
                <div className="whitespace-pre-line text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {body}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="whitespace-pre-line text-sm leading-relaxed bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 font-normal text-slate-800 shadow-2xs">
        {raw}
      </div>
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col border border-slate-200 overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:max-h-none"
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shadow-2xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">Doctor&apos;s Clinical Briefing</h3>
              <p className="text-[11px] text-slate-500">OB-GYN longitudinal summary from Walrus</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              disabled={!report}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-2xs whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 text-slate-800 custom-scrollbar">
          <div className="border-b-2 border-slate-900 pb-3.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">LoveChild Clinical Briefing</h1>
            <p className="text-xs text-slate-500 mt-1">
              Patient: <strong className="text-slate-700">{profile.name}</strong>
              {profile.week ? ` • Week ${profile.week}` : ''} • Prepared {new Date().toLocaleDateString()}
            </p>
          </div>

          {loading && (
            <div className="flex items-center text-slate-500 text-sm py-16 justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2 text-rose-700" /> Reading notes from Walrus decentralized storage…
            </div>
          )}
          {error && <p className="text-sm text-rose-700 bg-rose-50 p-4 rounded-xl border border-rose-200">{error}</p>}
          {!loading && !error && memories.length === 0 && (
            <p className="text-sm text-slate-500 py-12 text-center">
              There are no saved notes yet on Walrus for {profile.name}. Chat with LoveChild first, then open this briefing.
            </p>
          )}

          {report && (
            <>
              {renderFormattedReport(report)}

              <div className="pt-5 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center justify-between">
                  <span>Underlying Walrus Records ({memories.length})</span>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">Decentralized Blobs</span>
                </h4>
                <ol className="space-y-2.5 text-xs text-slate-700 list-decimal pl-4">
                  {memories.map((m) => (
                    <li key={m.blobId} className="leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <span className="text-slate-800">{m.text}</span>
                      <span className="block font-mono text-[10px] text-slate-400 mt-1 break-all">
                        Walrus Blob: {m.blobId}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong>Clinical Note:</strong> This summary is an automated clinical briefing compiled from decentralized notes entered between antenatal visits. It is designed to save 10–15 minutes per consultation and does not replace clinician judgment.
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with quick dismiss */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 print:hidden text-xs text-slate-500">
          <span className="font-medium">{memories.length} notes compiled from Walrus</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            Close Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
