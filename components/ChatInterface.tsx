'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Database, ShieldAlert, ToggleLeft, ToggleRight, Loader2, Info } from 'lucide-react';
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
      initialGreeting = `Hello ${patient.name}. I am here to help you keep track of your pregnancy. Tell me about any problem you're facing today, big or small. I will remember the details, how you felt, and when it started, so your doctor has the full picture on clinic day.`;
    } else {
      initialGreeting = `Hello! I am in standard chat mode. Memory is turned off for this test, so I will not remember details across your visits.`;
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
        await new Promise((r) => setTimeout(r, 800));
        let genericReply = '';

        if (/headache|swell|edema/i.test(text)) {
          genericReply = "Headaches and swelling can happen during pregnancy due to hormonal changes and fluid retention. Make sure to rest, elevate your feet, and stay hydrated. Let your doctor know at your next visit if it continues.";
        } else if (/ibuprofen|aspirin|painkiller|felvin/i.test(text)) {
          genericReply = "It is generally best to consult your doctor or midwife before taking any over-the-counter pain medications while pregnant.";
        } else if (/kick|movement/i.test(text)) {
          genericReply = "Babies tend to have active and quiet periods. If you feel like movement has decreased, lie down quietly on your side and count.";
        } else {
          genericReply = "Thank you for sharing. Remember to stay hydrated, rest when you can, and bring this up at your next routine checkup.";
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

        await new Promise((r) => setTimeout(r, 1000));

        let intelligentReply = '';
        let clinicalAlert: ChatMessage['clinicalAlert'] | undefined = undefined;

        if (/headache|swell|feet|ankles|face/i.test(text) && patient.id === 'amina-bello') {
          intelligentReply = `I have logged this in your health journal.\n\nLooking back at your notes: in Week 24, your blood pressure was borderline at 118/78 mmHg. Now in Week 30, you have had persistent forehead headaches alongside sudden swelling in both ankles.\n\nIn the third trimester, a persistent headache paired with sudden swelling is a well-known warning sign for Pre-Eclampsia (pregnancy high blood pressure).\n\nWhat to do right now:\n• Please sit down with your feet propped up above hip level and drink water.\n• Do not take Ibuprofen or strong painkillers, as they can stress your kidneys and elevate blood pressure.\n• I have added this directly to your Doctor's Briefing as an important topic for today. Please contact your clinic or midwife for a quick blood pressure and urine check.`;

          clinicalAlert = {
            level: 'warning',
            title: 'Clinical Notice for Your Next Visit',
            details: 'Persistent headache combined with sudden ankle swelling in Week 30 flagged for doctor review.',
          };
        } else if (/ibuprofen|diclofenac|felvin|pain/i.test(text)) {
          intelligentReply = `I have recorded this question in your notes.\n\nPlease do not take Ibuprofen, Felvin, or Diclofenac during pregnancy, especially in the third trimester. These medications can affect the baby's developing circulation and kidney function.\n\n• For safe relief right now: try applying a warm cloth to your lower back, resting with a pillow between your knees, or taking a warm shower.\n• If you need medicine for pain, your doctor can advise on safe options like paracetamol based on your current stage. I have noted this on your visit summary.`;
        } else if (/kick|movement|flutter/i.test(text)) {
          intelligentReply = `I checked your previous logs from Week 26 and Week 28: your baby has consistently averaged 12 to 14 active movements during your 2-hour evening quiet times. Your movement patterns look steady and reassuring. Continue counting during your regular evening rest periods.`;
        } else {
          intelligentReply = `I have saved this note to your private record for Week ${patient.gestationalWeek}. All the specifics—the time, how it felt, and what you noted—are safely kept and will appear in your visit summary for the doctor.`;
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
      label: 'Headache & swollen ankles',
      text: 'My ankles are quite swollen today and I have had a persistent frontal headache since yesterday afternoon.',
    },
    {
      label: 'Pain reliever safety question',
      text: 'Can I take an Ibuprofen or Felvin for this lower back cramp?',
    },
    {
      label: 'Baby movement pattern',
      text: 'How does my baby’s movement look compared to previous weeks?',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col h-[640px] overflow-hidden">
      
      {/* Chat Sub-Header: Mode Toggle */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-700"></span>
          <span className="text-xs font-bold text-slate-800">
            Active Mother: <span className="text-rose-900">{patient.name}</span> (Week {patient.gestationalWeek})
          </span>
        </div>

        {/* Clean Mode Toggle */}
        <div className="flex items-center space-x-2.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className={`text-xs font-medium ${withMemory ? 'text-slate-400' : 'text-slate-900 font-bold'}`}>
            Memory Off (Forgetful)
          </span>
          <button
            onClick={() => setWithMemory(!withMemory)}
            className="text-rose-700 focus:outline-none transition-transform active:scale-95"
            title="Toggle Memory Mode"
          >
            {withMemory ? (
              <ToggleRight className="w-6 h-6 text-rose-700" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-slate-400" />
            )}
          </button>
          <span className={`text-xs font-bold ${withMemory ? 'text-rose-900' : 'text-slate-400'}`}>
            Memory On (Holds Details)
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-rose-900 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80 shadow-xs'
                }`}
              >
                {/* Clinical Alert Card inside assistant message */}
                {!isUser && msg.clinicalAlert && (
                  <div className="mb-3 p-3.5 rounded-xl border-l-4 border-rose-700 bg-rose-50 text-rose-950 text-xs">
                    <div className="font-bold flex items-center text-rose-900">
                      <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-700" />
                      {msg.clinicalAlert.title}
                    </div>
                    <p className="mt-1 font-normal text-rose-900/90 leading-relaxed">{msg.clinicalAlert.details}</p>
                  </div>
                )}

                <div className="whitespace-pre-line font-normal">{msg.content}</div>

                {/* Recalled Memory Badges */}
                {!isUser && msg.recalledMemoryIds && msg.recalledMemoryIds.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center text-rose-800 font-semibold">
                      <Database className="w-3 h-3 mr-1 text-rose-700" />
                      {msg.recalledMemoryIds.length} past records connected
                    </span>
                    <button
                      onClick={onOpenVault}
                      className="text-slate-600 underline hover:text-slate-900 font-medium"
                    >
                      View journal records
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-500 text-xs py-2.5 px-3.5 bg-white rounded-xl max-w-xs border border-slate-200 shadow-2xs">
            <Loader2 className="w-4 h-4 animate-spin text-rose-700" />
            <span>Reviewing past records and context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-5 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
          Quick test:
        </span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-900 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-200/90 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Tell me about any problem you're facing, big or small (Week ${patient.gestationalWeek})...`}
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 bg-slate-50/50"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 bg-rose-800 hover:bg-rose-900 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
