'use client';

import React from 'react';
import { FileText, Heart } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-base shadow-sm">
              <Heart className="w-4 h-4 fill-rose-100 text-rose-100" />
            </div>
            <div>
              <div className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                NatalRecall
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-normal mt-1 hidden sm:block">
                Maternal Care &amp; Clinical Journal
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Journal Log Trigger */}
            <button
              onClick={onOpenVault}
              className="px-3.5 sm:px-4 py-2 rounded-full text-slate-600 hover:text-slate-950 bg-slate-100/80 hover:bg-slate-200/60 text-xs font-semibold tracking-tight transition-all"
            >
              <span className="hidden sm:inline">Stored </span>Records ({blobCount})
            </button>

            {/* Doctor's Report Button */}
            <button
              onClick={onOpenReport}
              className="inline-flex items-center px-4 sm:px-5 py-2.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold tracking-tight shadow-sm hover:shadow transition-all"
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
