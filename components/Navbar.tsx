'use client';

import React, { useState } from 'react';
import { Heart, User, LogOut, Database, FileText } from 'lucide-react';
import { Profile } from '@/lib/types';

interface NavbarProps {
  currentProfile: Profile | null;
  onOpenProfileModal: () => void;
  onOpenVault: () => void;
  onOpenReport: () => void;
  onSignOut: () => void;
  blobCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onOpenProfileModal,
  onOpenVault,
  onOpenReport,
  onSignOut,
  blobCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              <Heart className="w-4 h-4 fill-rose-100 text-rose-100" />
            </div>
            <div>
              <div className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                LoveChild
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-normal mt-1 hidden md:block">
                Maternal Care &amp; Clinical Journal
              </p>
            </div>
          </div>

          {/* User Profile Control */}
          <div className="relative flex items-center">
            {currentProfile ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center text-[10px] font-bold">
                    {currentProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentProfile.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold">
                    {blobCount} notes
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentProfile.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {currentProfile.week ? `Week ${currentProfile.week} • ` : ''}{blobCount} notes on Walrus
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenVault();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-all"
                    >
                      <Database className="w-3.5 h-3.5 text-rose-700" />
                      View Stored Records ({blobCount})
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenReport();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-900 hover:bg-rose-50 flex items-center gap-2 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-700" />
                      Generate Doctor&apos;s Report
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-2xs"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
