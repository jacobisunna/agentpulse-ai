import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Apple, 
  Wrench, 
  Building2, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Bot,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INDUSTRIES } from '../data/agencyData';

const iconMap = {
  Utensils,
  ShoppingBag,
  Apple,
  Wrench,
  Building2,
  Hammer
};

export function IndustryShowcase({ onSelectIndustryForSimulator, onOpenBlueprint }) {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);

  const currentIndustry = INDUSTRIES.find((ind) => ind.id === activeTab) || INDUSTRIES[0];
  const IconComponent = iconMap[currentIndustry.icon] || Bot;

  return (
    <section id="industries" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Tailored By Vertical</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Engineered For Every Main Street Business
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We don't sell generic chatbots. We build deeply customized, domain-specific AI agents connected directly to the software your business uses every day.
          </p>
        </div>

        {/* Industry Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start lg:justify-center">
          {INDUSTRIES.map((ind) => {
            const TabIcon = iconMap[ind.icon] || Bot;
            const isActive = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/5 hover:border-white/20'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive Display */}
        <div className="spotlight-card border border-white/10 rounded-3xl bg-[#090e18]/80 p-6 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column: High-Fidelity Imagery with Overlay Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={currentIndustry.heroImage}
                  alt={currentIndustry.name}
                  className="w-full h-72 sm:h-84 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {currentIndustry.badge}
                  </span>
                </div>

                {/* Overlaid Metric */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Benchmark Impact:</span>
                    <span className="text-emerald-400 font-semibold">{currentIndustry.sampleMetric}</span>
                  </div>
                </div>
              </div>

              {/* Secondary thumbnail preview & integrations */}
              <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Native Software Integrations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentIndustry.integrations.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-300 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Column: The 4 Autonomous Agents Built for This Vertical */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {currentIndustry.name}
                    </h3>
                    <p className="text-sm text-cyan-300 font-medium">{currentIndustry.tagline}</p>
                  </div>
                </div>
              </div>

              {/* 4 Agent Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentIndustry.agents.map((agent, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-colors group space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <Bot className="w-4 h-4 text-cyan-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-white text-sm leading-snug">{agent.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
                    <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{agent.impact}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons for this industry */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#simulator"
                  onClick={() => onSelectIndustryForSimulator(currentIndustry.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
                >
                  <span>Test {currentIndustry.name} Agent Live</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenBlueprint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-colors"
                >
                  <span>Request Custom Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
