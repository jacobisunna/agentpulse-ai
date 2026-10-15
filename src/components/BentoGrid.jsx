import React from 'react';
import { Cpu, Globe2, PhoneForwarded, Radio, RefreshCw, ShieldCheck } from 'lucide-react';

// Light tinted category pills, one per capability card
const PILL_TONES = {
  cyan: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-700',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
};

const INTEGRATIONS = ['Toast', 'Square', 'Shopify', 'Tekmetric', 'Procore'];

// Deterministic waveform: varied bar heights, staggered timing (same rhythm as the Hero waveform)
const WAVE_BARS = Array.from({ length: 36 }, (_, i) => ({
  height: 35 + ((i * 29) % 65),
  delay: (i * 97) % 1100,
  duration: 900 + ((i * 53) % 600),
}));

function CategoryPill({ tone, children }) {
  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] font-medium ${PILL_TONES[tone]}`}>
      {children}
    </span>
  );
}

// Grid cell: the wrapper carries the scroll reveal, the card inside keeps its own hover transitions
function BentoCell({ className = '', delay = '0ms', children }) {
  return (
    <div data-reveal style={{ '--reveal-delay': delay }} className={className}>
      <article className="spotlight-card card flex h-full flex-col justify-between gap-6 rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lift sm:p-8">
        {children}
      </article>
    </div>
  );
}

function Callout({ dotClass, textClass, children }) {
  return (
    <div className={`inset-panel flex items-center gap-2 p-3.5 font-mono text-[11px] font-medium ${textClass}`}>
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
      <span>{children}</span>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="capabilities" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div data-reveal className="eyebrow">
            <Cpu className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
            <span>Under the hood</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '60ms' }} className="section-title">
            Cutting-edge <span className="gradient-text">AI infrastructure</span>
          </h2>
          <p data-reveal style={{ '--reveal-delay': '120ms' }} className="section-lead">
            Engineered with enterprise-level fault tolerance, sub-second latency, and strict guardrails designed for real
            business operations.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Voice engine (8 cols) */}
          <BentoCell className="col-span-12 lg:col-span-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CategoryPill tone="cyan">Sub-400ms voice synthesis</CategoryPill>
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-emerald-700">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Natural human cadence
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                Human-grade inbound &amp; outbound voice calling
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Trained to handle interruptions, cross-talk, heavy background kitchen or garage noise, and multi-turn
                conversations without awkward pauses or robotic delays.
              </p>
            </div>

            {/* Live audio track: stacks on small screens, single strip on lg+ */}
            <div className="inset-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 p-4 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
              <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-2 font-mono text-xs text-slate-600">
                <Radio className="h-4 w-4 shrink-0 animate-pulse text-indigo-600" aria-hidden="true" />
                <span className="truncate">Whisper + dual-LLM pipeline</span>
              </div>

              <div
                aria-hidden="true"
                className="mask-fade-x col-span-2 row-start-2 flex h-10 items-center justify-between gap-[3px] overflow-hidden lg:col-span-1 lg:col-start-2 lg:row-start-1"
              >
                {WAVE_BARS.map((bar, i) => (
                  <span
                    key={i}
                    className="w-[3px] shrink-0 origin-center animate-wave rounded-full bg-gradient-to-t from-indigo-500 to-cyan-400"
                    style={{
                      height: `${bar.height}%`,
                      animationDelay: `${bar.delay}ms`,
                      animationDuration: `${bar.duration}ms`,
                    }}
                  />
                ))}
              </div>

              <span className="col-start-2 row-start-1 hidden justify-self-end whitespace-nowrap font-mono text-xs font-semibold text-indigo-600 sm:block lg:col-start-3">
                &lt; 380ms latency
              </span>
            </div>
          </BentoCell>

          {/* Zero-hallucination guardrails (4 cols) */}
          <BentoCell className="col-span-12 md:col-span-6 lg:col-span-4" delay="90ms">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CategoryPill tone="violet">Deterministic safety</CategoryPill>
                <ShieldCheck className="h-5 w-5 text-violet-600" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">Zero-hallucination guardrails</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Hard-coded mathematical bounds ensure the AI never quotes incorrect pricing, offers unapproved discounts,
                or promises services outside your scope.
              </p>
            </div>

            <Callout dotClass="bg-emerald-500" textClass="text-emerald-700">
              100% policy-compliant execution
            </Callout>
          </BentoCell>

          {/* Bi-directional POS / CRM sync (4 cols) */}
          <BentoCell className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CategoryPill tone="indigo">Live webhook mesh</CategoryPill>
                <RefreshCw className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">Direct two-way sync</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Reads live inventory and writes confirmed appointments, takeout tickets, and repair orders straight into
                your existing software.
              </p>
            </div>

            <ul aria-label="Supported integrations" className="flex flex-wrap gap-1.5">
              {INTEGRATIONS.map((name) => (
                <li key={name} className="chip">
                  {name}
                </li>
              ))}
            </ul>
          </BentoCell>

          {/* 95+ languages (4 cols) */}
          <BentoCell className="col-span-12 md:col-span-6 lg:col-span-4" delay="90ms">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CategoryPill tone="sky">Global fluency</CategoryPill>
                <Globe2 className="h-5 w-5 text-sky-600" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">95+ languages &amp; accents</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Instantly detects when a customer speaks Spanish, Mandarin, French, Vietnamese, or Arabic and answers
                with native dialect fluency.
              </p>
            </div>

            <Callout dotClass="bg-sky-500" textClass="text-sky-700">
              Auto-detects language in &lt; 0.5 seconds
            </Callout>
          </BentoCell>

          {/* Instant human fallback (4 cols) */}
          <BentoCell className="col-span-12 md:col-span-6 lg:col-span-4" delay="180ms">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CategoryPill tone="amber">Supervisor handoff</CategoryPill>
                <PhoneForwarded className="h-5 w-5 text-amber-600" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">Intelligent human handoff</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                If an edge case or high-value VIP customer requires personal attention, the call transfers instantly with
                live audio summaries to your mobile.
              </p>
            </div>

            <Callout dotClass="bg-amber-500" textClass="text-amber-700">
              Zero customer frustration guarantee
            </Callout>
          </BentoCell>
        </div>
      </div>
    </section>
  );
}
