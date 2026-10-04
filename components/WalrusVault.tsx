'use client';

import React, { useEffect, useState } from 'react';
import { X, Database, Loader2, Lock } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          <div className="p-5 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-800 text-white flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Notes saved on Walrus</h2>
                  <p className="text-xs text-slate-500">For {profile.name} only</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs text-rose-950 leading-relaxed flex items-start space-x-2">
              <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-700" />
              <span>
                Each note below was written from something you told LoveChild. On Walrus they are stored encrypted; they appear here
                readable only because this app holds the key for your account.
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {loading && (
              <div className="flex items-center text-slate-500 text-sm py-8 justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading from Walrus…
              </div>
            )}
            {error && <p className="text-sm text-rose-700">{error}</p>}
            {!loading && !error && items.length === 0 && (
              <p className="text-center py-12 text-slate-400 text-sm">
                Nothing saved yet. Chat with LoveChild and your notes will appear here.
              </p>
            )}
            {items.map((m) => (
              <div key={m.blobId} className="p-4 rounded-xl border border-slate-200 text-xs bg-white">
                {m.createdAt && (
                  <div className="text-slate-400 text-[11px] mb-1">{new Date(m.createdAt).toLocaleString()}</div>
                )}
                <p className="text-slate-800 text-sm leading-relaxed">{m.text}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-400 break-all">
                  blob {m.blobId}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
