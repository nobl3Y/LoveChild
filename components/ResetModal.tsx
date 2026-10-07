'use client';

import React from 'react';
import { X, RotateCcw, Database } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
  isResetting?: boolean;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
  isResetting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-800 shadow-2xs">
            <RotateCcw className="w-5 h-5 text-rose-800" />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Reset Session Data
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You can only reset it because of the fact that its users have authorized for open access using the <strong className="font-bold text-slate-900">Walrus</strong> technology.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <Database className="w-3.5 h-3.5 text-rose-700" />
            <span>Decentralized Verification Baseline</span>
          </div>
          <p className="leading-relaxed">
            This clears any temporary live check-ins added during this testing session and restores the 10 verified baseline records for Ada, Blessing, and Chiamaka.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isResetting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmReset}
            disabled={isResetting}
            className="px-5 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Resetting…' : 'Confirm Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
