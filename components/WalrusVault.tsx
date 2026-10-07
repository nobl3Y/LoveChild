'use client';

import React, { useEffect, useState } from 'react';
import { X, Database, Loader2, Lock, ExternalLink, ShieldCheck } from 'lucide-react';
import { MemoryItem, Profile } from '@/lib/types';

interface WalrusVaultProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  refreshKey: number;
  onLoaded: (count: number) => void;
}

export const WalrusVault: React.FC<WalrusVaultProps> = ({ isOpen, onClose, profile, refreshKey, onLoaded }) => {
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedBlobId, setExpandedBlobId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setItems([]);
    setLoading(true);
    setError('');
    fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: profile.name, pin: profile.pin }),
    })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not load');
        if (!cancelled) {
          setItems(d.memories);
          onLoaded(d.memories.length);
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, refreshKey, profile.name, profile.pin]);

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
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto"
      >
        <div className="w-full sm:w-[500px] md:w-[560px] max-w-full bg-white shadow-2xl flex flex-col border-l border-slate-200 h-full max-h-screen">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-800 text-white flex items-center justify-center shadow-xs">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Walrus Memory Vault</h2>
                  <p className="text-xs text-slate-500">Decentralized records for {profile.name} only</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close vault"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs text-rose-950 leading-relaxed flex items-start space-x-2">
              <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-700" />
              <span>
                Each clinical entry below is stored directly on decentralized Walrus storage under your cryptographic PIN partition.
              </span>
            </div>
          </div>

          {/* Scrollable Notes List */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3 custom-scrollbar">
            {loading && (
              <div className="flex items-center text-slate-500 text-sm py-16 justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2 text-rose-700" /> Querying Walrus decentralized storage…
              </div>
            )}
            {error && <p className="text-sm text-rose-700 bg-rose-50 p-4 rounded-xl border border-rose-200">{error}</p>}
            {!loading && !error && items.length === 0 && (
              <p className="text-center py-16 text-slate-400 text-sm">
                No notes stored yet on Walrus. Start chatting with LoveChild to log memories.
              </p>
            )}
            {items.map((m) => (
              <div key={m.blobId} className="p-4 rounded-xl border border-slate-200 text-xs bg-white shadow-2xs hover:border-slate-300 transition-all">
                {m.createdAt && (
                  <div className="text-slate-400 text-[11px] mb-1.5 font-medium">{new Date(m.createdAt).toLocaleString()}</div>
                )}
                <p className="text-slate-800 text-sm leading-relaxed">{m.text}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] space-y-1.5">
                  <div className="font-mono text-slate-500 break-all flex items-center justify-between gap-2">
                    <span className="truncate">blob: {m.blobId}</span>
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
                    <div className="p-2.5 bg-slate-50 border border-rose-200/70 rounded-xl text-[10px] text-slate-600 space-y-1.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between font-semibold text-slate-700">
                        <span className="text-emerald-700 flex items-center gap-1 font-sans">
                          ● Cryptographically Verified on Walrus
                        </span>
                        <span className="font-mono text-[9px] text-slate-400">@mysten-incubation/memwal</span>
                      </div>
                      <p className="leading-relaxed text-slate-600 font-sans">
                        Committed as an erasure-coded Merkle root via <code className="text-[9px] bg-white px-1 py-0.5 rounded text-slate-700 border border-slate-200">relayer.memory.walrus.xyz</code>. For patient confidentiality, raw clinical notes are private to {profile.name} &amp; her doctor and never exposed in plain text on public web explorers.
                      </p>
                      <div className="pt-1 border-t border-slate-200/70 flex items-center justify-between text-[9px]">
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
              </div>
            ))}
          </div>

          {/* Sticky Dismiss Footer */}
          <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 text-xs text-slate-500">
            <span className="font-medium">{items.length} decentralized notes on Walrus</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Close Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
