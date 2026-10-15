import React, { useRef, useState } from 'react';
import {
  Utensils,
  ShoppingBag,
  Apple,
  Wrench,
  Building2,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Bot,
  Layers,
  ChevronRight,
  TrendingUp,
  Plug,
} from 'lucide-react';
import { INDUSTRIES } from '../data/agencyData';

const iconMap = {
  Utensils,
  ShoppingBag,
  Apple,
  Wrench,
  Building2,
  Hammer,
};

const PANEL_ID = 'industry-panel';
const tabId = (id) => `industry-tab-${id}`;
const pad = (n) => String(n).padStart(2, '0');

export function IndustryShowcase({ onSelectIndustryForSimulator, onOpenBlueprint }) {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const tabRefs = useRef([]);

  const foundIndex = INDUSTRIES.findIndex((ind) => ind.id === activeTab);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const currentIndustry = INDUSTRIES[activeIndex];
  const IconComponent = iconMap[currentIndustry.icon] || Bot;

  // Arrow keys / Home / End move between tabs (automatic activation)
  const handleTabKeyDown = (event) => {
    const last = INDUSTRIES.length - 1;
    let next;
    switch (event.key) {
      case 'ArrowRight':
        next = activeIndex === last ? 0 : activeIndex + 1;
        break;
      case 'ArrowLeft':
        next = activeIndex === 0 ? last : activeIndex - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(INDUSTRIES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="industries" className="relative isolate overflow-hidden py-20 sm:py-24">
      {/* Soft brand wash behind the deep-dive panel */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-48 -z-10 h-[640px]">
        <div className="absolute left-1/2 top-0 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.10),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-3xl space-y-5 text-center sm:mb-12">
          <div data-reveal className="eyebrow">
            <Layers aria-hidden="true" className="h-3.5 w-3.5 text-indigo-500" />
            <span>Tailored by vertical</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '70ms' }} className="section-title">
            Engineered for every <span className="gradient-text">Main Street</span> business
          </h2>
          <p data-reveal style={{ '--reveal-delay': '140ms' }} className="section-lead mx-auto max-w-2xl">
            We don’t sell generic chatbots. We build deeply customized, domain-specific AI agents connected directly
            to the software your business uses every day.
          </p>
        </div>

        {/* Industry tabs (scrolls horizontally on small screens) */}
        <div
          data-reveal
          style={{ '--reveal-delay': '210ms' }}
          className="scrollbar-none -mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:overflow-visible"
        >
          <div role="tablist" aria-label="Industries" className="mx-auto flex w-max gap-2 px-1 pb-4 pt-1">
            {INDUSTRIES.map((ind, i) => {
              const TabIcon = iconMap[ind.icon] || Bot;
              const isActive = i === activeIndex;
              return (
                <button
                  key={ind.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(ind.id)}
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(ind.id)}
                  onKeyDown={handleTabKeyDown}
                  className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-ink bg-ink text-white shadow-lift'
                      : 'border-line bg-white text-slate-600 shadow-soft hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <TabIcon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{ind.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active industry deep-dive */}
        <div data-reveal style={{ '--reveal-delay': '280ms' }}>
          <div
            role="tabpanel"
            id={PANEL_ID}
            aria-labelledby={tabId(currentIndustry.id)}
            tabIndex={0}
            className="spotlight-card card rounded-3xl p-5 shadow-lift sm:p-8 lg:p-10"
          >
            <div
              key={activeTab}
              className="grid animate-fade-up grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              {/* Visual column: photo with overlaid specs + integrations */}
              <div className="space-y-4 lg:col-span-5">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-soft">
                  <img
                    src={currentIndustry.heroImage}
                    alt={currentIndustry.name}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80 lg:h-96"
                  />
                  {/* Darkens only the bottom of the photo so the overlay stays legible */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
                  />

                  {/* Overlaid badge */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-3 py-1 font-mono text-[11px] font-semibold text-slate-800 shadow-soft backdrop-blur-md">
                      <IconComponent aria-hidden="true" className="h-3.5 w-3.5 text-indigo-600" />
                      {currentIndustry.badge}
                    </span>
                  </div>

                  {/* Overlaid metric */}
                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/60 bg-white/85 px-3.5 py-3 shadow-soft backdrop-blur-md">
                    <p className="font-mono text-[11px] text-slate-600">Benchmark impact</p>
                    <p className="mt-0.5 flex items-start gap-1.5 text-sm font-semibold leading-snug text-emerald-800">
                      <TrendingUp aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{currentIndustry.sampleMetric}</span>
                    </p>
                  </div>
                </div>

                {/* Native integrations */}
                <div className="inset-panel space-y-2.5 p-4">
                  <p className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-slate-600">
                    <Plug aria-hidden="true" className="h-3.5 w-3.5 text-indigo-500" />
                    Native software integrations
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {currentIndustry.integrations.map((tool) => (
                      <li key={tool} className="chip bg-white">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Content column: the agents built for this vertical */}
              <div className="space-y-6 lg:col-span-7">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.55)]">
                    <IconComponent aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="font-mono text-[11px] font-medium text-indigo-600">
                      Vertical {pad(activeIndex + 1)}/{pad(INDUSTRIES.length)} · {currentIndustry.agents.length} custom
                      agents
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      {currentIndustry.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{currentIndustry.tagline}</p>
                  </div>
                </div>

                {/* Agent cards */}
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {currentIndustry.agents.map((agent) => (
                    <li
                      key={agent.title}
                      className="group flex flex-col gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 transition-transform duration-200 group-hover:scale-110">
                          <Bot aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <h4 className="pt-1 text-sm font-semibold leading-snug text-slate-900">{agent.title}</h4>
                      </div>
                      <p className="text-[13px] leading-relaxed text-slate-600">{agent.desc}</p>
                      <p className="mt-auto flex items-center gap-1.5 border-t border-slate-200/70 pt-2.5 font-mono text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{agent.impact}</span>
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Actions for this industry */}
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href="#simulator"
                    onClick={() => onSelectIndustryForSimulator(currentIndustry.id)}
                    data-magnetic
                    data-cursor-label="Demo"
                    className="btn btn-primary w-full px-6 py-3 text-sm sm:w-auto"
                  >
                    <span>Test {currentIndustry.shortName} agent live</span>
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={onOpenBlueprint}
                    className="btn btn-secondary w-full px-5 py-3 text-sm sm:w-auto"
                  >
                    <span>Request custom architecture</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
