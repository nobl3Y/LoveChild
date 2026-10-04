'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Database, FileText, Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { ChatMessage, Profile } from '@/lib/types';

interface ChatInterfaceProps {
  profile: Profile;
  onMemoryChanged: () => void;
  onOpenVault: () => void;
  onOpenReport: () => void;
  onSwitchUser: () => void;
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  profile,
  onMemoryChanged,
  onOpenVault,
  onOpenReport,
  onSwitchUser,
}) => {
  const [withMemory, setWithMemory] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'intro',
        sender: 'assistant',
        timestamp: now(),
        content: withMemory
          ? `Hello ${profile.name}. Tell me about anything you're feeling or wondering about, big or small. I'll write it down and keep it safe, so next time I remember it.`
          : `Hello ${profile.name}. Memory is OFF, so I won't recall or save anything. Each message is treated as if we've never spoken.`,
      },
    ]);
  }, [profile.name, withMemory]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const send = async () => {
    const text = input.trim();
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
      if (data.recorded?.status === 'saved' || data.recorded?.status === 'pending') onMemoryChanged();
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-[600px] sm:h-[680px] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 sm:px-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <div className="font-bold text-slate-900 text-sm tracking-tight truncate">
            {profile.name}
            {profile.week ? (
              <span className="ml-2 text-[10px] font-semibold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-full">
                Week {profile.week}
              </span>
            ) : null}
          </div>
          <button onClick={onSwitchUser} className="text-[11px] text-slate-500 underline hover:text-slate-800">
            Not you? Switch
          </button>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center space-x-2 bg-white px-2.5 py-1.5 rounded-full border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-700">
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
          <button
            onClick={onOpenReport}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold"
          >
            <FileText className="w-3.5 h-3.5 text-rose-700" />
            <span>Doctor&apos;s Report</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-100/60">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <span className={`text-[10px] font-bold mb-1 px-1.5 ${isUser ? 'text-rose-900' : 'text-slate-500'}`}>
                {isUser ? `You (${profile.name})` : 'LoveChild'}
              </span>
              <div
                className={`max-w-[92%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-rose-950 text-white'
                    : msg.isError
                    ? 'bg-rose-50 text-rose-900 border border-rose-200'
                    : 'bg-white text-slate-800 border border-slate-200/90'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* What LoveChild remembered from Walrus */}
                {!isUser && msg.recalled && msg.recalled.length > 0 && (
                  <details className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600">
                    <summary className="cursor-pointer flex items-center text-rose-800 font-semibold">
                      <Database className="w-3 h-3 mr-1 shrink-0" />
                      Remembered {msg.recalled.length} earlier note{msg.recalled.length > 1 ? 's' : ''} from Walrus
                    </summary>
                    <ul className="mt-2 space-y-1.5">
                      {msg.recalled.map((m) => (
                        <li key={m.blobId} className="bg-slate-50 border border-slate-200/80 rounded-md p-2">
                          <div>{m.text}</div>
                          <div className="font-mono text-[10px] text-slate-400 mt-0.5 break-all">blob {m.blobId}</div>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* What was written to Walrus from her message */}
                {!isUser && msg.recorded && msg.recorded.status !== 'skipped' && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                    <div
                      className={`flex items-center font-semibold ${
                        msg.recorded.status === 'saved'
                          ? 'text-emerald-700'
                          : msg.recorded.status === 'pending'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {msg.recorded.status === 'saved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {msg.recorded.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {msg.recorded.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {msg.recorded.status === 'saved' && 'Saved to Walrus'}
                      {msg.recorded.status === 'pending' && 'Saving to Walrus (still confirming)'}
                      {msg.recorded.status === 'failed' && `Not saved: ${msg.recorded.error}`}
                    </div>
                    <div className="mt-1 text-slate-600 bg-slate-50 border border-slate-200/80 rounded-md p-2">
                      {msg.recorded.note}
                    </div>
                    {msg.recorded.blobId && (
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 break-all">blob {msg.recorded.blobId}</div>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1.5">{msg.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-500 text-xs py-2.5 px-3.5 bg-white rounded-xl max-w-xs border border-slate-200">
            <Loader2 className="w-4 h-4 animate-spin text-rose-700 shrink-0" />
            <span>{withMemory ? 'Checking your notes and saving to Walrus…' : 'Thinking…'}</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-slate-200/90 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center space-x-2.5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell LoveChild how you're feeling…"
            disabled={isTyping}
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 bg-rose-900 hover:bg-rose-950 disabled:opacity-50 text-white rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
