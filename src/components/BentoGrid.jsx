import React from 'react';
import { 
  Radio, 
  ShieldCheck, 
  RefreshCw, 
  Globe2, 
  PhoneForwarded, 
  Sparkles, 
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';
import { CAPABILITIES_BENTO } from '../data/agencyData';

export function BentoGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Cutting-Edge AI Infrastructure
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineered with enterprise-level fault tolerance, sub-second latency, and strict guardrails designed for real business operations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Bento Item 1: Voice Engine (8 cols) */}
          <div className="col-span-12 lg:col-span-8 spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  Sub-400ms Voice Synthesis
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Natural Human Cadence
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Human-Grade Inbound & Outbound Voice Calling
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Trained to handle interruptions, cross-talk, heavy background kitchen or garage noise, and multi-turn conversations without awkward pauses or robotic delays.
              </p>
            </div>

            {/* Visual audio wave track */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Whisper + Dual-LLM Pipeline</span>
              </div>
              <div className="flex items-center gap-1">
                {[40, 70, 95, 30, 80, 50, 90, 65, 35, 75, 45, 85, 60, 40, 70].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-full"
                    style={{ height: `${h * 0.35}px` }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-cyan-400">&lt; 380ms Latency</span>
            </div>
          </div>

          {/* Bento Item 2: Zero-Hallucination (4 cols) */}
          <div className="col-span-12 lg:col-span-4 spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  Deterministic Safety
                </span>
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Zero-Hallucination Guardrails
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hard-coded mathematical bounds ensure the AI never quotes incorrect pricing, offers unapproved discounts, or promises services outside your scope.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% Policy Compliant Execution</span>
            </div>
          </div>

          {/* Bento Item 3: Bi-directional POS / CRM Sync (4 cols) */}
          <div className="col-span-12 lg:col-span-4 spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                  Live Webhook Mesh
                </span>
                <RefreshCw className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Direct Two-Way Sync
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reads live inventory and writes confirmed appointments, takeout tickets, and repair orders straight into your existing software.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10">Toast</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10">Square</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10">Shopify</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10">Tekmetric</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10">Procore</span>
            </div>
          </div>

          {/* Bento Item 4: 95+ Languages (4 cols) */}
          <div className="col-span-12 lg:col-span-4 spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-950/80 text-sky-300 border border-sky-500/30">
                  Global Fluency
                </span>
                <Globe2 className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                95+ Languages & Accents
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly detects when a customer speaks Spanish, Mandarin, French, Vietnamese, or Arabic and answers with native dialect fluency.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] font-mono text-sky-300">
              Auto-detects language in &lt; 0.5 seconds
            </div>
          </div>

          {/* Bento Item 5: Instant Human Fallback (4 cols) */}
          <div className="col-span-12 lg:col-span-4 spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-950/80 text-amber-300 border border-amber-500/30">
                  Supervisor Handoff
                </span>
                <PhoneForwarded className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Intelligent Human Handoff
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an edge case or high-value VIP customer requires personal attention, the call transfers instantly with live audio summaries to your mobile.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] font-mono text-amber-300">
              Zero customer frustration guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
