import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, PhoneCall, CheckCircle2, ArrowRight, Play, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export function Hero({ onOpenBlueprint }) {
  const [activeCallTime, setActiveCallTime] = useState(24);
  const [simulatedVoiceWave, setSimulatedVoiceWave] = useState([35, 65, 85, 45, 95, 75, 40, 60, 90, 50, 70, 30]);

  // Voice wave animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCallTime((prev) => prev + 1);
      setSimulatedVoiceWave((prev) =>
        prev.map(() => Math.floor(Math.random() * 75) + 20)
      );
    }, 700);
    return () => clearInterval(timer);
  }, []);

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>NEXT-GEN AUTONOMOUS WORKFORCE FOR SMALL BUSINESS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.12]">
              Hire AI Agents That Run Your{' '}
              <span className="gradient-text-cyan">Phones, Bookings, & Dispatch</span> 24/7.
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              We design, build, and deploy custom autonomous AI agents for restaurants, boutiques, grocery stores, auto repair shops, real estate brokerages, and contractors. Never lose another customer to voicemail.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBlueprint}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Deploy Your First Agent</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#simulator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Test Live Agent Playground</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400 font-mono pt-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-Hold Phone Answering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Seamless POS/CRM Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deployed in Under 7 Days</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Live Agent Card */}
          <div className="lg:col-span-5 relative">
            {/* Glowing Backdrop Frame */}
            <div className="relative mx-auto max-w-md spotlight-card p-1 shadow-2xl shadow-cyan-950/40">
              <div className="bg-[#0b101c]/90 rounded-2xl p-6 border border-white/10 space-y-5">
                {/* Header of Simulated Agent Box */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white text-sm">AgentPulse Voice Core</h4>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">Channel: Dual Inbound Phone & Web</p>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                    <span>{formatSeconds(activeCallTime)}</span>
                  </div>
                </div>

                {/* Live Waveform Visualizer */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      Sub-400ms Voice Synthesis Active
                    </span>
                    <span className="text-cyan-400">99.8% Accuracy</span>
                  </div>

                  <div className="h-10 flex items-center justify-between gap-1 px-2">
                    {simulatedVoiceWave.map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-full transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Simulated Real-Time Transcript Stream */}
                <div className="space-y-3 font-sans text-xs">
                  {/* Customer speech bubble */}
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 shrink-0 font-mono">
                      C
                    </div>
                    <div className="bg-slate-900/90 border border-white/5 p-3 rounded-2xl rounded-tl-sm text-slate-200">
                      "Hi! I need an oil change and brake rotor inspection on my 2021 F-150 tomorrow afternoon. Do you have an open bay?"
                    </div>
                  </div>

                  {/* AI Agent Thought & Action */}
                  <div className="ml-8 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-[11px] font-mono text-indigo-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>[Action: Checked Tekmetric Bay #3 • Available 2:30 PM]</span>
                  </div>

                  {/* Agent Response */}
                  <div className="flex items-start gap-2.5 text-slate-300 flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] text-white shrink-0 font-mono">
                      AI
                    </div>
                    <div className="bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/20 p-3 rounded-2xl rounded-tr-sm text-cyan-50">
                      "Yes! We have Bay #3 open with our master brake tech tomorrow at 2:30 PM. I'll reserve the slot and text your digital confirmation right now!"
                    </div>
                  </div>
                </div>

                {/* Integration Badges at Bottom */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Synced with:</span>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800">Toast</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800">Shopify</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800">Tekmetric</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800">WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric Pill */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-950/50">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">First-Contact Resolution</p>
                <p className="text-sm font-bold text-white">99.4% Across All Sectors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Impact Stats Counter Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {AGENCY_INFO.stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
