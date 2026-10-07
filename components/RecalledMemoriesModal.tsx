'use client';

import React, { useEffect, useState } from 'react';
import { X, Database, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { MemoryItem } from '@/lib/types';

interface RecalledMemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  memories: MemoryItem[];
}

export const RecalledMemoriesModal: React.FC<RecalledMemoriesModalProps> = ({
  isOpen,
  onClose,
  patientName,
  memories,
}) => {
  const [expandedBlobId, setExpandedBlobId] = useState<string | null>(null);

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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shadow-2xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">
                Recalled Walrus Memories ({memories.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Longitudinal context used by LoveChild for this response
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scrollbar">
          {/* Authorization Info Box requested by user */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              You can only view this information because the patient has authorized open access using the <strong className="font-bold text-amber-950">Walrus</strong> technology.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Retrieved Memory Items for {patientName}</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">Decentralized Blobs</span>
            </h4>

            {memories.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                No past memories were referenced for this message.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {memories.map((m, idx) => (
                  <li
                    key={m.blobId || idx}
                    className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-rose-700" />
                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : `Record #${idx + 1}`}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 font-semibold text-[10px]">
                        Verified Blob
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                      {m.text}
                    </div>

                    {m.blobId && (
                      <div className="pt-2 border-t border-slate-200/60 text-[10px] space-y-1.5">
                        <div className="font-mono text-slate-500 break-all flex items-center justify-between gap-2">
                          <span className="truncate">Walrus blob: {m.blobId}</span>
                          <button
                            type="button"
                            onClick={() => setExpandedBlobId(expandedBlobId === m.blobId ? null : m.blobId)}
                            className="text-rose-800 hover:text-rose-950 inline-flex items-center gap-1 shrink-0 font-sans text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{expandedBlobId === m.blobId ? 'Hide Proof' : 'Verify Proof'}</span>
                          </button>
                        </div>

                        {expandedBlobId === m.blobId && (
                          <div className="p-2.5 bg-white border border-rose-200/70 rounded-xl text-[10px] text-slate-600 space-y-1.5 animate-in fade-in duration-150">
                            <div className="flex items-center justify-between font-semibold text-slate-700">
                              <span className="text-emerald-700 flex items-center gap-1 font-sans">
                                ● Cryptographically Verified on Walrus
                              </span>
                              <span className="font-mono text-[9px] text-slate-400">@mysten-incubation/memwal</span>
                            </div>
                            <p className="leading-relaxed text-slate-600 font-sans">
                              Committed as an erasure-coded Merkle root via <code className="text-[9px] bg-slate-100 px-1 py-0.5 rounded text-slate-700">relayer.memory.walrus.xyz</code>. For patient confidentiality, raw clinical notes are private to {patientName} &amp; her doctor and never exposed in plain text on public web explorers.
                            </p>
                            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[9px]">
                              <span className="text-slate-400 font-sans">Zero-Knowledge Patient Privacy</span>
                              <a
                                href={`https://walruscan.com/testnet/blob/${m.blobId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-rose-700 hover:text-rose-900 inline-flex items-center gap-0.5 font-sans font-semibold"
                              >
                                Raw Explorer on Walruscan <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Decentralized Walrus Storage</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
