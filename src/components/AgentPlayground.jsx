import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  Cpu, 
  ShieldCheck, 
  Layers,
  Flame
} from 'lucide-react';
import { INDUSTRIES } from '../data/agencyData';

export function AgentPlayground({ selectedIndustryId, onSelectIndustry }) {
  const currentIndustry = INDUSTRIES.find((ind) => ind.id === selectedIndustryId) || INDUSTRIES[0];

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [latency, setLatency] = useState(240);
  const [voiceActive, setVoiceActive] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize conversation when industry changes
  useEffect(() => {
    const initialPrompt = currentIndustry.interactivePrompts[0];
    setMessages([
      {
        role: 'system',
        content: `Loaded ${currentIndustry.name} Autonomous Agent Core v4.2. Synced with native APIs.`
      },
      {
        role: 'user',
        content: initialPrompt.userPrompt
      },
      {
        role: 'assistant',
        thought: initialPrompt.agentThought,
        action: initialPrompt.agentAction,
        content: initialPrompt.agentResponse
      }
    ]);
  }, [selectedIndustryId, currentIndustry]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendPrompt = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setLatency(Math.floor(Math.random() * 90) + 180);

    // Dynamic response simulation
    setTimeout(() => {
      let thought = `Parsing context for ${currentIndustry.name}. Checking customer CRM & real-time inventory API.`;
      let action = `API Action: Validated business constraints. Dispatched webhook payload to backend queue.`;
      let reply = `Thank you! I've processed your request for our ${currentIndustry.name.toLowerCase()} team. All parameters are verified and logged in our system. I've sent a direct confirmation to your mobile with instant details!`;

      // Check if matches known prompt
      const matched = currentIndustry.interactivePrompts.find(
        (p) => p.userPrompt.toLowerCase().trim() === text.toLowerCase().trim()
      );

      if (matched) {
        thought = matched.agentThought;
        action = matched.agentAction;
        reply = matched.agentResponse;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          thought,
          action,
          content: reply
        }
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleReset = () => {
    const initialPrompt = currentIndustry.interactivePrompts[0];
    setMessages([
      {
        role: 'system',
        content: `Agent initialized for ${currentIndustry.name}. Ready for voice & text queries.`
      },
      {
        role: 'user',
        content: initialPrompt.userPrompt
      },
      {
        role: 'assistant',
        thought: initialPrompt.agentThought,
        action: initialPrompt.agentAction,
        content: initialPrompt.agentResponse
      }
    ]);
  };

  return (
    <section id="simulator" className="py-24 relative overflow-hidden bg-slate-950/40">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Interactive AI Agent Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Test Drive An Agent in Real-Time
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experience how our agents converse with customers, execute internal API actions, and manage operations with zero wait times.
          </p>
        </div>

        {/* Industry Switcher Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => onSelectIndustry(ind.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                ind.id === currentIndustry.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {ind.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* The Sandbox Console */}
        <div className="max-w-4xl mx-auto spotlight-card rounded-2xl border border-white/10 bg-[#080d17]/90 shadow-2xl overflow-hidden">
          {/* Top Bar of Sandbox */}
          <div className="p-4 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>{currentIndustry.name} Agent</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                    LIVE REASONING
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">Model: OmniAgent-4.2 • Guardrails Engaged</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Latency: {latency}ms</span>
              </div>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="p-6 h-[420px] overflow-y-auto space-y-4 font-sans text-sm">
            {messages.map((msg, index) => {
              if (msg.role === 'system') {
                return (
                  <div key={index} className="text-center my-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-slate-900/80 text-slate-400 border border-white/5">
                      {msg.content}
                    </span>
                  </div>
                );
              }

              if (msg.role === 'user') {
                return (
                  <div key={index} className="flex items-start gap-3 justify-end">
                    <div className="max-w-[80%] bg-gradient-to-r from-cyan-600 to-indigo-600 text-white p-3.5 rounded-2xl rounded-tr-sm shadow-md">
                      <p className="leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="flex items-start gap-3 max-w-[90%]">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="space-y-2 w-full">
                    {/* Agent internal reasoning / action step */}
                    {msg.action && (
                      <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono text-indigo-300 space-y-1">
                        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>AUTONOMOUS ENGINE STEP:</span>
                        </div>
                        <p className="text-slate-300">{msg.action}</p>
                      </div>
                    )}

                    {/* Agent natural response */}
                    <div className="bg-slate-900/90 border border-white/10 p-4 rounded-2xl rounded-tl-sm text-slate-100 shadow-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">Reasoning & querying APIs...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts Pills */}
          <div className="px-6 py-3 bg-slate-950/80 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-mono shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Quick Prompts:
            </span>
            {currentIndustry.interactivePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(p.userPrompt)}
                className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer"
              >
                "{p.userPrompt.slice(0, 42)}..."
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-900 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask ${currentIndustry.name} agent anything...`}
                className="flex-1 bg-slate-950 border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white font-medium text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
