import React from 'react';
import { Cpu, Terminal, ArrowRight, ShieldCheck, Zap, Network, Bot } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/agencyData';

export function WorkflowSection() {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>Deployment Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            How We Deploy Your Autonomous AI Workforce
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From your first discovery audit to fully autonomous agent operations in under 7 business days—with zero disruption to your current staff.
          </p>
        </div>

        {/* 4 Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/80 p-6 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-display text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-white/10">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Phase {idx + 1} of 4</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Technical Architecture Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Fail-Safe Human Escalation Matrix</h4>
              <p className="text-xs text-slate-400">
                If an edge-case caller requires human empathy or high-level management, the agent transfers seamlessly to your staff mobile in under 2 seconds with full call context.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">100% Supervision Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
