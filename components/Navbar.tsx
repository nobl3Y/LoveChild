'use client';

import React from 'react';
import { Database, FileText, ShieldCheck, Activity, ExternalLink } from 'lucide-react';
import { WALRUS_MAINNET_AGENT_INFO } from '@/lib/mockData';

interface NavbarProps {
  onOpenVault: () => void;
  onOpenReport: () => void;
  blobCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVault,
  onOpenReport,
  blobCount,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-600 to-teal-500 flex items-center justify-center shadow-md shadow-rose-200 text-white font-bold text-xl">
              🤰🏾
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-600 to-teal-700 bg-clip-text text-transparent">
                  NatalRecall
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                  <ShieldCheck className="w-3 h-3 mr-1 text-teal-600" />
                  Walrus Mainnet
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Sovereign Antenatal Clinical Memory Scribe
              </p>
            </div>
          </div>

          {/* Walrus Mainnet Proofs & Quick Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Mainnet Agent Pill */}
            <div className="hidden lg:flex items-center px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-slate-700 font-medium">Agent:</span>
              <span className="font-mono text-xs text-slate-500 truncate max-w-[100px]" title={WALRUS_MAINNET_AGENT_INFO.agentId}>
                {WALRUS_MAINNET_AGENT_INFO.agentId.slice(0, 6)}...{WALRUS_MAINNET_AGENT_INFO.agentId.slice(-4)}
              </span>
            </div>

            {/* Blob Counter Trigger */}
            <button
              onClick={onOpenVault}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium border border-teal-200/80 transition-colors shadow-sm"
              title="Open Walrus Memory Vault"
            >
              <Database className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
              <span>Vault: </span>
              <span className="ml-1 font-bold font-mono text-teal-900 bg-teal-200/60 px-1.5 py-0.5 rounded">
                {blobCount} Blobs
              </span>
            </button>

            {/* Generate Doctor Briefing Button */}
            <button
              onClick={onOpenReport}
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white text-xs font-semibold shadow-md shadow-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              <span>OB-GYN Briefing</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
