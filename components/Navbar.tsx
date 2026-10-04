'use client';

import React from 'react';
import { Database, FileText, Heart, Shield } from 'lucide-react';
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
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 flex items-center justify-center shadow-md shadow-rose-900/10 text-white">
              <Heart className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  NatalRecall
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  <Shield className="w-3 h-3 mr-1 text-rose-600" />
                  Walrus Storage
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Maternal Care Journal • Doctor Visit Summary
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Memory Log Button */}
            <button
              onClick={onOpenVault}
              className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
              title="Open Stored Memory Log"
            >
              <Database className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span>Log: </span>
              <span className="ml-1 font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                {blobCount} records
              </span>
            </button>

            {/* Doctor's Report Button */}
            <button
              onClick={onOpenReport}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white text-xs font-semibold shadow-sm transition-all hover:shadow"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              <span>Doctor&apos;s Report</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
