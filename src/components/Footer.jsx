import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { INDUSTRIES } from '../data/agencyData';
import { Logo } from './Navbar';

const PLATFORM_LINKS = [
  { name: 'Voice AI latency engine', href: '#capabilities' },
  { name: 'Zero-hallucination guardrails', href: '#capabilities' },
  { name: 'Live agent sandbox', href: '#simulator' },
  { name: 'SMB ROI calculator', href: '#calculator' },
  { name: 'Client case studies', href: '#results' },
];

const HEADING_CLASS = 'font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-900';
const LINK_CLASS = 'text-sm text-slate-600 transition-colors hover:text-indigo-600';
const BADGE_CLASS =
  'inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600';

export function Footer({ onOpenBlueprint }) {
  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-200 bg-white pb-10 pt-16 [@media(hover:hover)_and_(pointer:fine)]:pb-20">
      {/* Faint brand glow along the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[320px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent)]"
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand & mission */}
          <div className="space-y-5 sm:col-span-2">
            <a href="#" className="group inline-flex rounded-xl" aria-label="AgentPulse AI home">
              <Logo compact />
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              We design, build, and deploy custom multi-agent AI workforces that run your phone dispatch, 24/7 customer
              booking, supply reordering, and field estimates.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className={BADGE_CLASS}>
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" aria-hidden="true" />
                <span>Live in under 7 days</span>
              </span>
              <span className={BADGE_CLASS}>
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                <span>Zero-data retention option</span>
              </span>
            </div>
          </div>

          {/* Industry agents */}
          <nav aria-label="Industry verticals" className="space-y-4">
            <h2 className={HEADING_CLASS}>Industry verticals</h2>
            <ul className="space-y-2.5">
              {INDUSTRIES.map((ind) => (
                <li key={ind.id}>
                  <a href="#industries" className={LINK_CLASS}>
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Platform & capabilities */}
          <nav aria-label="Platform" className="space-y-4">
            <h2 className={HEADING_CLASS}>Autonomous tech</h2>
            <ul className="space-y-2.5">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={LINK_CLASS}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get started */}
          <div className="space-y-4">
            <h2 className={HEADING_CLASS}>Get started</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Tell us how your business runs. We'll send back a custom agent blueprint.
            </p>
            <button
              type="button"
              onClick={onOpenBlueprint}
              data-magnetic
              className="btn btn-primary w-full px-4 py-2.5 text-xs"
            >
              <span>Build your agent</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom bar (legal items are plain text: no pages exist for them yet) */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-8 text-center font-mono text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} AgentPulse AI Inc. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Privacy Policy</span>
            <span aria-hidden="true">•</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">•</span>
            <span>SOC2 Type II</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
