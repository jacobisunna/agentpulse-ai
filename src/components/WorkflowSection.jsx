import React from 'react';
import { ArrowRight, Bot, BrainCircuit, Cable, Network, ScanSearch, ShieldCheck } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/agencyData';

// One icon per pipeline phase (same order as WORKFLOW_STEPS)
const STEP_ICONS = [ScanSearch, BrainCircuit, Cable, Bot];

// Pipeline node colors follow the indigo → cyan → violet connector line
const NODE_COLORS = ['bg-indigo-500', 'bg-blue-500', 'bg-cyan-500', 'bg-violet-500'];

const STEP_DELAYS = ['0ms', '90ms', '180ms', '270ms'];

export function WorkflowSection() {
  const total = WORKFLOW_STEPS.length;

  return (
    <section
      id="architecture"
      className="relative isolate overflow-hidden border-y border-slate-200/70 bg-white/60 py-24"
    >
      {/* Faint blueprint grid fading out from the top */}
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-20">
          <div data-reveal className="eyebrow">
            <Network className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
            <span>Deployment pipeline</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '60ms' }} className="section-title">
            How we deploy your <span className="gradient-text">autonomous AI workforce</span>
          </h2>
          <p data-reveal style={{ '--reveal-delay': '120ms' }} className="section-lead">
            From your first discovery audit to fully autonomous agent operations in under 7 business days, with zero
            disruption to your current staff.
          </p>
        </div>

        {/* 4-step pipeline */}
        <div className="relative">
          {/* Connector line, drawn behind the cards at step-number height (lg+) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[44px] hidden h-[2px] rounded-full bg-gradient-to-r from-indigo-400/50 via-cyan-400/50 to-violet-400/50 lg:block"
          />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <li key={step.step} data-reveal style={{ '--reveal-delay': STEP_DELAYS[idx] ?? '0ms' }}>
                  <article className="spotlight-card card group flex h-full flex-col justify-between gap-6 p-6 transition-shadow duration-300 hover:shadow-lift">
                    <div className="space-y-4">
                      <div className="flex h-10 items-center justify-between gap-3">
                        <span className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent transition-[filter] duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(79,70,229,0.35)]">
                          {step.step}
                        </span>
                        <span
                          aria-hidden="true"
                          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        >
                          <StepIcon className="h-5 w-5" />
                        </span>
                      </div>

                      <span className="chip flex w-fit">{step.badge}</span>

                      <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-indigo-700">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-[11px] text-slate-500">
                      <span>
                        Phase {idx + 1} of {total}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-indigo-600"
                      />
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          {/* Pipeline nodes: one port on each card's leading edge, above the cards (lg+) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[45px] hidden grid-cols-4 gap-8 lg:grid"
          >
            {WORKFLOW_STEPS.map((step, idx) => (
              <div key={step.step} className="relative">
                <span
                  data-reveal
                  style={{ '--reveal-delay': STEP_DELAYS[idx] ?? '0ms' }}
                  className={`absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_4px_rgba(99,102,241,0.14),0_2px_6px_rgba(15,23,42,0.18)] ${
                    NODE_COLORS[idx % NODE_COLORS.length]
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Human escalation banner */}
        <div
          data-reveal
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-indigo-50/60 to-white p-6 shadow-soft sm:p-8 lg:flex-row lg:items-center"
        >
          <div className="flex items-start gap-4 sm:items-center">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-ink">Fail-safe human escalation matrix</h3>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                If an edge-case caller requires human empathy or high-level management, the agent transfers
                seamlessly to your staff's mobile in under 2 seconds with full call context.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>100% supervision guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
