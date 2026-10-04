'use client';

import React, { useState } from 'react';
import { X, Database, Shield, Lock, Search, AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';
import { PatientPersona, WalrusMemoryItem } from '@/lib/types';
import { WALRUS_MAINNET_AGENT_INFO } from '@/lib/mockData';

interface WalrusVaultProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientPersona;
}

export const WalrusVault: React.FC<WalrusVaultProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const [copiedBlob, setCopiedBlob] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlob(id);
    setTimeout(() => setCopiedBlob(null), 2000);
  };

  const filteredMemories = patient.memories.filter((m) =>
    `${m.summary} ${m.rawDetails} ${m.tags.join(' ')} ${m.blobId}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-800 text-white flex items-center justify-center shadow-xs">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center tracking-tight">
                    Walrus Memory Records
                    <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 tracking-tight">
                      Decentralized
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-mono tracking-tight mt-0.5">
                    Namespace: {patient.walrusNamespace}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Agent Metadata Card */}
            <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center font-medium">
                  <Shield className="w-3.5 h-3.5 mr-1 text-rose-700" />
                  Agent ID (Mainnet):
                </span>
                <span className="font-mono text-slate-800 font-semibold truncate max-w-[200px]" title={WALRUS_MAINNET_AGENT_INFO.agentId}>
                  {WALRUS_MAINNET_AGENT_INFO.agentId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center font-medium">
                  <Lock className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  Privacy Protocol:
                </span>
                <span className="text-slate-700 font-medium">
                  SEAL Client-Side Encrypted
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Records for {patient.name}:</span>
                <span className="font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {patient.memories.length} Blobs Verified
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search encrypted blobs by keyword, week, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
              />
            </div>
          </div>

          {/* Blobs List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {filteredMemories.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No memories match your query.
              </div>
            ) : (
              filteredMemories.map((mem) => {
                const isCopied = copiedBlob === mem.id;
                return (
                  <div
                    key={mem.id}
                    className={`p-4 rounded-xl border text-xs transition-all relative ${
                      mem.isRedFlag
                        ? 'bg-rose-50/50 border-rose-200 ring-1 ring-rose-200/60'
                        : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                    }`}
                  >
                    {/* Blob Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded text-[11px]">
                          Week {mem.gestationalWeek}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(mem.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      
                      {mem.isRedFlag && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
                          Red Flag Alert
                        </span>
                      )}
                    </div>

                    {/* Blob Payload */}
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {mem.summary}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-3">
                      {mem.rawDetails}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {mem.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Walrus Blob ID & Copy Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                      <span className="truncate max-w-[240px]">
                        Blob: <span className="text-slate-600 font-semibold">{mem.blobId}</span>
                      </span>
                      <button
                        onClick={() => handleCopy(mem.blobId, mem.id)}
                        className="inline-flex items-center text-rose-800 hover:text-rose-950 font-sans font-medium"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 mr-1 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy ID
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
              Verified On-Chain via Sui & Walrus
            </span>
            <span className="font-mono text-[11px]">Relayer: {WALRUS_MAINNET_AGENT_INFO.relayerUrl}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
