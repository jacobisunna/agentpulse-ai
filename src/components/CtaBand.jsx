import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const POINTS = ['Custom-built for your business', 'Works with your existing tools', 'Human handoff built in'];

// Hairline grid tuned for the dark panel (.bg-grid-pattern is tuned for light surfaces)
const GRID_STYLE = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)',
  maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)',
};

// Closing call to action: the one high-contrast moment before the footer
export function CtaBand({ onOpenBlueprint }) {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 shadow-lift sm:px-12 sm:py-20 lg:py-24"
        >
          {/* Decorative brand glows + grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0" style={GRID_STYLE} />
            <div className="absolute -left-40 -top-48 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.4),transparent)]" />
            <div className="absolute -bottom-56 -right-32 h-[560px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.3),transparent)]" />
            <div className="absolute -top-32 right-[18%] h-[380px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.3),transparent)]" />
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live in under 7 days
            </span>

            <h2
              id="cta-heading"
              className="mt-6 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-[3.25rem]"
            >
              Ready to put your{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                phones, bookings & dispatch
              </span>{' '}
              on autopilot?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              We custom-build an AI agent around how your business runs, connect it to the tools you already use, and
              hand off to your team whenever a human is needed. You can be live in under 7 days.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenBlueprint}
                data-magnetic
                data-cursor-label="Start"
                className="btn w-full bg-white px-7 py-4 text-base text-ink shadow-lift hover:bg-indigo-50 focus-visible:outline-white sm:w-auto"
              >
                <span>Build your agent</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <a
                href="#simulator"
                data-magnetic
                className="btn w-full border border-white/20 px-6 py-4 text-base text-white hover:bg-white/10 focus-visible:outline-white sm:w-auto"
              >
                <Play className="h-4 w-4 fill-white/20" aria-hidden="true" />
                <span>Try the live agent demo</span>
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-slate-300">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
