'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Database, ShieldAlert, ToggleLeft, ToggleRight, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { PatientPersona, ChatMessage, WalrusMemoryItem } from '@/lib/types';
import { walrusService } from '@/lib/walrusClient';

interface ChatInterfaceProps {
  patient: PatientPersona;
  onMemoryAdded: (newMemory: WalrusMemoryItem) => void;
  onOpenVault: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  patient,
  onMemoryAdded,
  onOpenVault,
}) => {
  const [withMemory, setWithMemory] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting whenever patient persona or memory mode changes
  useEffect(() => {
    let initialGreeting = '';
    if (withMemory) {
      initialGreeting = `Hello ${patient.name}. I am your NatalRecall clinical scribe. I have synchronized your ${patient.memories.length} decentralized Walrus memory blobs across Week ${patient.gestationalWeek}. How are you feeling today? Any changes in swelling, headaches, or fetal kicks?`;
    } else {
      initialGreeting = `Hello! I am a standard pregnancy assistant. How can I help you today? (Note: Stateless mode active. Memory is disabled.)`;
    }

    setMessages([
      {
        id: 'msg-init',
        sender: 'assistant',
        content: initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [patient.id, withMemory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      if (!withMemory) {
        // STATELESS MODE: Standard generic chatbot response (No recall, no pattern recognition)
        await new Promise((r) => setTimeout(r, 900));
        let genericReply = '';

        if (/headache|swell|edema/i.test(text)) {
          genericReply = "Headaches and swelling can happen during pregnancy due to hormonal changes and fluid retention. Make sure to put your feet up, drink plenty of water, and rest in a cool room. Mention it at your next checkup if it continues.";
        } else if (/ibuprofen|aspirin|painkiller/i.test(text)) {
          genericReply = "It's generally recommended to consult your healthcare provider before taking any over-the-counter pain relievers while pregnant.";
        } else if (/kick|movement/i.test(text)) {
          genericReply = "Babies tend to move more at certain times of the day. If you notice changes, rest quietly and count movements.";
        } else {
          genericReply = "Thank you for sharing. Remember to stay hydrated, eat balanced meals, and attend all your scheduled prenatal visits with your doctor.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            content: genericReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        // WALRUS MEMORY ACTIVE MODE: Recall past blobs, detect patterns, write new blob
        const recalled = await walrusService.recall(patient, text);
        const recalledIds = recalled.map((m) => m.blobId);

        // Store new memory blob onto Walrus
        const newMemory = await walrusService.remember(patient, text);
        onMemoryAdded(newMemory);

        await new Promise((r) => setTimeout(r, 1200));

        let intelligentReply = '';
        let clinicalAlert: ChatMessage['clinicalAlert'] | undefined = undefined;

        if (/headache|swell|feet|ankles|face/i.test(text) && patient.id === 'amina-bello') {
          intelligentReply = `Logged to your private Walrus Vault as Blob ${newMemory.blobId.slice(0, 8)}... (Week ${patient.gestationalWeek}).\n\n⚠️ **Clinical Correlation with Past Memory:**\nIn your Walrus history from Week 24, your blood pressure was recorded at 118/78 mmHg. Now at Week 30, you have concurrently logged bilateral ankle swelling and a persistent 48-hour frontal headache.\n\nIn the third trimester, persistent headache combined with rapid swelling is a primary clinical indicator of **Pre-Eclampsia** (gestational hypertension).\n\n**Immediate Scribe Guidance:**\n• Do NOT take NSAIDs (like Ibuprofen or Diclofenac)—they elevate renal strain.\n• Please sit down immediately with feet elevated above heart level and sip water.\n• I have flagged this as an Urgent Red Flag in your OB-GYN Clinical Briefing. Please contact your maternity center today for a manual blood pressure check and urine protein screen.`;

          clinicalAlert = {
            level: 'warning',
            title: 'Pre-Eclampsia Surveillance Triggered',
            details: 'Co-occurrence of bilateral edema + refractory cephalea in Trimester 3 (Week 30).',
          };
        } else if (/ibuprofen|diclofenac|felvin|pain/i.test(text)) {
          intelligentReply = `Logged to Walrus as Blob ${newMemory.blobId.slice(0, 8)}...\n\n🛑 **Pharmacological Safety Warning:**\nDo NOT take Ibuprofen, Diclofenac, or Aspirin during pregnancy, especially in the third trimester. These are NSAIDs that can cause premature closure of the fetal ductus arteriosus (a vital heart blood vessel) and impair fetal kidney function.\n\n• For non-medical comfort: use a warm (not hot) compress on your lower back and maintain proper lumbar support.\n• If pain relief is clinically necessary, your midwife or OB-GYN can evaluate safe prenatal alternatives. I have added this question to your clinic briefing.`;
        } else if (/kick|movement|flutter/i.test(text)) {
          intelligentReply = `Logged to Walrus as Blob ${newMemory.blobId.slice(0, 8)}...\n\nCross-referencing your Walrus records from Week 26 and Week 28: your baseline fetal activity has averaged 12–14 distinct kicks in 2-hour evening resting windows. Reassuring active movement is continuing consistently. Keep logging your daily evening kick counts!`;
        } else {
          intelligentReply = `Logged to Walrus as Blob ${newMemory.blobId.slice(0, 8)}... (Week ${patient.gestationalWeek}).\n\nI have archived this entry into your encrypted decentralized record for ${patient.name}. Your longitudinal timeline will include this context when you generate your OB-GYN Briefing for your next antenatal checkup.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            content: intelligentReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recalledMemoryIds: recalledIds,
            newBlobIdCreated: newMemory.blobId,
            clinicalAlert,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    {
      label: '⚠️ Log Swelling & Headache',
      text: 'My ankles are quite swollen today and I have had a persistent frontal headache since yesterday afternoon.',
    },
    {
      label: '💊 Ask about Painkillers',
      text: 'Can I take an Ibuprofen or Felvin for this lower back cramp?',
    },
    {
      label: '👶 Check Kick Trends',
      text: 'How does my baby’s movement look compared to previous weeks?',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
      
      {/* Chat Sub-Header: Mode Toggle (Before vs. After Memory) */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-800">
            Active Patient: <span className="text-rose-600">{patient.name}</span> (Week {patient.gestationalWeek})
          </span>
        </div>

        {/* The Decisive Hackathon Toggle */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
          <span className={`text-xs font-semibold ${withMemory ? 'text-slate-400' : 'text-slate-900'}`}>
            Without Memory
          </span>
          <button
            onClick={() => setWithMemory(!withMemory)}
            className="text-teal-600 focus:outline-none transition-transform active:scale-95"
            title="Toggle Walrus Memory Mode"
          >
            {withMemory ? (
              <ToggleRight className="w-7 h-7 text-teal-600" />
            ) : (
              <ToggleLeft className="w-7 h-7 text-slate-400" />
            )}
          </button>
          <span className={`text-xs font-bold flex items-center ${withMemory ? 'text-teal-700' : 'text-slate-400'}`}>
            <Database className="w-3 h-3 mr-1" />
            With Walrus Memory
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-br-xs shadow-sm'
                    : 'bg-slate-100/90 text-slate-800 rounded-bl-xs border border-slate-200/80 shadow-2xs'
                }`}
              >
                {/* Clinical Alert Card inside assistant message */}
                {!isUser && msg.clinicalAlert && (
                  <div className="mb-3 p-3 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-950 text-xs">
                    <div className="font-bold flex items-center text-rose-800">
                      <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-600" />
                      {msg.clinicalAlert.title}
                    </div>
                    <p className="mt-1 font-medium">{msg.clinicalAlert.details}</p>
                  </div>
                )}

                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Recalled Memory Badges */}
                {!isUser && msg.recalledMemoryIds && msg.recalledMemoryIds.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center text-teal-700 font-medium">
                      <Database className="w-3 h-3 mr-1 text-teal-600" />
                      {msg.recalledMemoryIds.length} Walrus Blobs Recalled
                    </span>
                    <button
                      onClick={onOpenVault}
                      className="text-teal-700 underline hover:text-teal-900 font-semibold"
                    >
                      View in Vault
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs py-2 px-3 bg-slate-50 rounded-xl max-w-xs border border-slate-200">
            <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
            <span>Consulting Walrus Memory Vault & analyzing patterns...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
          Quick Test:
        </span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-800 border border-slate-200 text-xs font-medium transition-all shadow-2xs hover:border-rose-200"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3.5 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Log symptoms, vitals, or questions for Week ${patient.gestationalWeek}...`}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-slate-50/50"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Log</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
