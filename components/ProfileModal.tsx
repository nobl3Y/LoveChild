'use client';

import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { Profile } from '@/lib/types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (profile: Profile) => void;
  initial?: Profile | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onStart, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [pin, setPin] = useState(initial?.pin || '');
  const [week, setWeek] = useState(initial?.week ? String(initial.week) : '');
  const [error, setError] = useState('');

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Please enter a name (at least 2 letters).');
    if (!/^\d{4,8}$/.test(pin)) return setError('PIN must be 4 to 8 digits.');
    const w = week ? parseInt(week, 10) : null;
    if (w !== null && (isNaN(w) || w < 1 || w > 42)) return setError('Pregnancy week must be between 1 and 42.');
    setError('');
    onStart({ name: name.trim(), pin, week: w });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 sm:p-8 space-y-5 my-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Access Your Consultation Journal</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-[1.8] max-w-md mx-auto">
            Enter your name and PIN to open or continue your personal decentralized Walrus journal.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="text-xs font-semibold text-slate-700 sm:col-span-1">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ada"
                className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 font-normal"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700">
              PIN (4–8 digits)
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                inputMode="numeric"
                type="password"
                placeholder="••••"
                className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 font-normal"
              />
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Pregnancy week (optional)
              <input
                value={week}
                onChange={(e) => setWeek(e.target.value.replace(/\D/g, ''))}
                inputMode="numeric"
                placeholder="e.g. 24"
                className="mt-1 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 font-normal"
              />
            </label>
          </div>

          <div className="flex items-start space-x-2 text-[11px] text-slate-500 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-lg p-3">
            <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-700" />
            <span>
              Each consultation journal is partitioned into a decentralized Walrus memory space secured by your Name and PIN. Your medical notes are securely stored on Walrus and compiled into an OB-GYN summary for your doctor. LoveChild is an AI journal companion and not a medical doctor. In an emergency, contact your clinic or hospital.
            </span>
          </div>

          {error && <p className="text-xs text-rose-700 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white text-sm font-bold tracking-tight shadow-sm transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
