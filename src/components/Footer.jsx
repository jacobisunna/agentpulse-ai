import React from 'react';
import { Bot, ArrowUpRight, ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';
import { AGENCY_INFO, INDUSTRIES } from '../data/agencyData';

export function Footer({ onOpenBlueprint }) {
  return (
    <footer className="relative border-t border-white/10 bg-[#05070b] pt-16 pb-12 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070b] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-display text-white">
                Agent<span className="text-cyan-400">Pulse</span> AI
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We engineer, automate, and deploy bespoke multi-agent AI workforces that run your phone dispatch, 24/7 customer booking, supply reordering, and field estimates.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Vercel Edge Ready</span>
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero-Data Retention Option</span>
              </div>
            </div>
          </div>

          {/* Col 3: Industry Agents */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Industry Verticals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {INDUSTRIES.map((ind) => (
                <li key={ind.id}>
                  <a href="#industries" className="hover:text-cyan-400 transition-colors">
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & Capabilities */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Autonomous Tech
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Voice AI Latency Engine</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Zero-Hallucination Guardrails</a></li>
              <li><a href="#simulator" className="hover:text-cyan-400 transition-colors">Live Agent Sandbox</a></li>
              <li><a href="#calculator" className="hover:text-cyan-400 transition-colors">SMB ROI Calculator</a></li>
              <li><a href="#results" className="hover:text-cyan-400 transition-colors">Client Case Studies</a></li>
            </ul>
          </div>

          {/* Col 5: Hosting & Deployment */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Deploy & Host
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed for instantaneous global edge hosting on Vercel with GitHub repository synchronization.
            </p>
            <button
              onClick={onOpenBlueprint}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold hover:from-cyan-400 hover:to-indigo-500 shadow-md cursor-pointer transition-all"
            >
              <span>Build Your Agent</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} AgentPulse AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition-colors">SOC2 Type II</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
