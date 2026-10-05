'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Send, Database, FileText, Loader2, CheckCircle2, Clock, AlertCircle, Sparkles, User, Activity } from 'lucide-react';
import { ChatMessage, Profile } from '@/lib/types';
import { FEATURED_MOTHERS } from '@/lib/cohort';

interface ChatInterfaceProps {
  profile: Profile;
  onMemoryChanged: () => void;
  onOpenVault: () => void;
  onOpenReport: () => void;
  onSwitchUser: () => void;
  onSelectMother?: (profile: Profile) => void;
  onOpenCustomModal?: () => void;
  blobCount?: number | null;
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  profile,
  onMemoryChanged,
  onOpenVault,
  onOpenReport,
  onSwitchUser,
  onSelectMother,
  onOpenCustomModal,
  blobCount,
}) => {
  const [withMemory, setWithMemory] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Match against cohort data for rich clinical context
  const currentCohort = useMemo(() => {
    return FEATURED_MOTHERS.find(
      (m) => m.profile.name.toLowerCase() === profile.name.toLowerCase()
    );
  }, [profile.name]);

  // Context-specific clinical starter prompts
  const starterPrompts = useMemo(() => {
    const n = profile.name.toLowerCase();
    if (n === 'ada') {
      return [
        'My feet are still swelling and I had a morning headache.',
        'What was my blood pressure yesterday?',
        'Compile my symptoms for my doctor visit tomorrow.',
      ];
    }
    if (n === 'blessing') {
      return [
        'Persistent morning nausea again; couldn\'t keep my iron pill down.',
        'How much water did I log over the last 3 days?',
        'Is ginger tea safe for morning sickness?',
      ];
    }
    if (n === 'chiamaka') {
      return [
        'Felt 4 kicks in the last hour, but feeling mild cramping.',
        'Are these Braxton-Hicks contractions or labor?',
        'Review my hospital delivery bag notes.',
      ];
    }
    return [
      'I\'ve had a headache that won\'t go away today.',
      'Checking my symptom history from Walrus.',
      'Compile a clinical briefing for my OB-GYN.',
    ];
  }, [profile.name]);

  // Initialize introductory message when patient or memory mode changes
  useEffect(() => {
    let intro = `Hello ${profile.name}. Tell me about anything you're feeling or wondering about, big or small. Every note is encrypted and preserved on Walrus Memory.`;
    if (withMemory) {
      if (profile.name.toLowerCase() === 'ada') {
        intro = `Hello Ada. I have your longitudinal records loaded from Walrus. You've been monitoring foot swelling, blood pressure patterns, and morning headaches for Week 30. How are you feeling today?`;
      } else if (profile.name.toLowerCase() === 'blessing') {
        intro = `Hello Blessing. I'm connected to your Walrus Memory space. You've been managing persistent nausea, tracking fluid intake, and iron supplement adherence for Week 18. How are you feeling today?`;
      } else if (profile.name.toLowerCase() === 'chiamaka') {
        intro = `Hello Chiamaka. Your Walrus records are active. We've been tracking fetal kick counts and Braxton-Hicks contractions for Week 38. How is the baby moving today?`;
      }
    } else {
      intro = `Hello ${profile.name}. Memory is OFF, so I won't recall or save anything. Each message is treated as if we've never spoken.`;
    }

    setMessages([
      {
        id: `intro-${profile.name}-${withMemory ? 'mem' : 'nomem'}`,
        sender: 'assistant',
        timestamp: now(),
        content: intro,
      },
    ]);
  }, [profile.name, withMemory]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const send = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    setMessages((p) => [...p, { id: `u-${Date.now()}`, sender: 'user', content: text, timestamp: now() }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, message: text, withMemory }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setMessages((p) => [
        ...p,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          content: data.reply,
          timestamp: now(),
          recalled: data.recalled,
          recorded: data.recorded,
        },
      ]);
      if (data.recorded?.status === 'saved' || data.recorded?.status === 'pending') {
        onMemoryChanged();
      }
    } catch (e: any) {
      setMessages((p) => [
        ...p,
        {
          id: `e-${Date.now()}`,
          sender: 'assistant',
          content: `Sorry, something went wrong: ${e.message}`,
          timestamp: now(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md flex flex-col h-[670px] sm:h-[730px] overflow-hidden">
      {/* 1. Patient Quick-Switcher Tab Bar */}
      <div className="bg-slate-100/90 px-4 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 custom-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 shrink-0 hidden sm:inline whitespace-nowrap">
            Patient:
          </span>
          {FEATURED_MOTHERS.map((m) => {
            const isSelected = profile.name.toLowerCase() === m.profile.name.toLowerCase();
            return (
              <button
                key={m.profile.name}
                type="button"
                onClick={() => onSelectMother && onSelectMother(m.profile)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 shadow-2xs whitespace-nowrap ${
                  isSelected
                    ? 'bg-rose-950 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{m.displayName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-rose-800 text-rose-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  W{m.profile.week}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={onOpenCustomModal}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
              !currentCohort
                ? 'bg-rose-950 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>+ Custom Patient</span>
          </button>
        </div>

        {/* Reset / Sign Out */}
        <button
          onClick={onSwitchUser}
          className="text-xs text-slate-500 hover:text-slate-800 underline shrink-0 hidden md:block whitespace-nowrap"
        >
          Reset Session
        </button>
      </div>

      {/* 2. Sub-Header: Clinical Focus & Actions */}
      <div className="px-5 sm:px-7 py-3.5 border-b border-slate-200/90 bg-slate-50/90 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight truncate">
              {currentCohort ? currentCohort.displayName : profile.name}
            </h3>
            {profile.week ? (
              <span className="text-[10px] font-bold text-rose-900 bg-rose-100/90 px-2 py-0.5 rounded-full whitespace-nowrap">
                Week {profile.week}
              </span>
            ) : null}
            {currentCohort && (
              <span className="text-xs text-slate-500 hidden sm:inline whitespace-nowrap">
                • {currentCohort.location}
              </span>
            )}
          </div>
          {currentCohort ? (
            <p className="text-xs text-slate-600 flex items-center gap-1.5 truncate">
              <Activity className="w-3.5 h-3.5 text-rose-700 shrink-0" />
              <span className="font-medium text-rose-950 truncate">Focus: {currentCohort.clinicalFocus}</span>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              PIN-secured Walrus memory space
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 shrink-0 flex-wrap">
          {/* Walrus Memory Toggle */}
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap shrink-0">
            <span className="text-xs font-semibold text-slate-700">
              {withMemory ? 'Walrus Memory: ON' : 'Memory: OFF'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={withMemory}
              onClick={() => setWithMemory(!withMemory)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                withMemory ? 'bg-rose-900' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition ${
                  withMemory ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Walrus Vault Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenVault}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <Database className="w-3.5 h-3.5 text-rose-700 shrink-0" />
            <span>Walrus Vault</span>
            {blobCount !== null && blobCount !== undefined && blobCount > 0 && (
              <span className="ml-1 text-[10px] bg-rose-900 text-white font-bold px-1.5 py-0.2 rounded-full">
                {blobCount}
              </span>
            )}
          </button>

          {/* Doctor's Report Modal Trigger */}
          <button
            type="button"
            onClick={onOpenReport}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-rose-700 shrink-0" />
            <span>Doctor&apos;s Report</span>
          </button>
        </div>
      </div>

      {/* 3. Messages Log */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-slate-100/60 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <span className={`text-[11px] font-bold mb-1.5 px-2 ${isUser ? 'text-rose-900' : 'text-slate-500'}`}>
                {isUser ? `You (${profile.name})` : 'LoveChild'}
              </span>
              <div
                className={`max-w-[92%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-rose-950 text-white shadow-xs'
                    : msg.isError
                    ? 'bg-rose-50 text-rose-900 border border-rose-200'
                    : 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Recalled Walrus Memories */}
                {!isUser && msg.recalled && msg.recalled.length > 0 && (
                  <details className="mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <summary className="cursor-pointer flex items-center text-rose-800 font-semibold hover:text-rose-950 transition-colors">
                      <Database className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      Remembered {msg.recalled.length} earlier note{msg.recalled.length > 1 ? 's' : ''} from Walrus
                    </summary>
                    <ul className="mt-2.5 space-y-2">
                      {msg.recalled.map((m) => (
                        <li key={m.blobId} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                          <div className="text-slate-800 font-normal leading-relaxed">{m.text}</div>
                          <div className="font-mono text-[10px] text-slate-400 mt-1 break-all">
                            Walrus blob: {m.blobId}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* Recorded to Walrus */}
                {!isUser && msg.recorded && msg.recorded.status !== 'skipped' && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs">
                    <div
                      className={`flex items-center font-semibold ${
                        msg.recorded.status === 'saved'
                          ? 'text-emerald-700'
                          : msg.recorded.status === 'pending'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {msg.recorded.status === 'saved' && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                      {msg.recorded.status === 'pending' && <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                      {msg.recorded.status === 'failed' && <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                      {msg.recorded.status === 'saved' && 'Saved to Walrus'}
                      {msg.recorded.status === 'pending' && 'Saving to Walrus (confirmed in background)'}
                      {msg.recorded.status === 'failed' && `Not saved: ${msg.recorded.error}`}
                    </div>
                    <div className="mt-1.5 text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl p-3 leading-relaxed">
                      {msg.recorded.note}
                    </div>
                    {msg.recorded.blobId && (
                      <div className="font-mono text-[10px] text-slate-400 mt-1 break-all">
                        Walrus blob: {msg.recorded.blobId}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-2">{msg.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2.5 text-slate-500 text-xs py-3 px-4 bg-white rounded-2xl max-w-xs border border-slate-200 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-rose-700 shrink-0" />
            <span>{withMemory ? 'Recalling notes & generating reply…' : 'Thinking…'}</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* 4. One-Click Suggested Prompt Chips */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50/90 border-t border-slate-200 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Try:</span>
        </span>
        {starterPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => send(p)}
            disabled={isTyping}
            className="text-xs bg-white hover:bg-rose-50 hover:text-rose-900 hover:border-rose-300 text-slate-700 px-3.5 py-1 rounded-full border border-slate-200 transition-colors whitespace-nowrap shrink-0 shadow-2xs disabled:opacity-50 font-medium"
          >
            &ldquo;{p}&rdquo;
          </button>
        ))}
      </div>

      {/* 5. Message Input Form */}
      <div className="p-4 sm:p-5 border-t border-slate-200/90 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center space-x-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Tell LoveChild how you're feeling as ${profile.name}…`}
            disabled={isTyping}
            className="flex-1 px-5 py-3 text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 bg-slate-50 font-normal"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-rose-900 hover:bg-rose-950 disabled:opacity-50 text-white rounded-full text-xs sm:text-sm font-bold flex items-center space-x-2 shrink-0 transition-all shadow-xs whitespace-nowrap"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
