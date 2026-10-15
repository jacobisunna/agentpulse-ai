import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Sparkles,
  PhoneCall,
  MessageSquareText,
  CheckCircle2,
  ArrowRight,
  Play,
  Zap,
  Loader2,
  CalendarCheck,
  Pause,
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

// Conversations the hero demo cycles through
const SCENARIOS = [
  {
    business: 'Apex Auto Care',
    channel: 'Inbound call',
    Icon: PhoneCall,
    customer:
      'Hi! I need an oil change and a brake rotor inspection on my 2021 F-150 tomorrow afternoon. Do you have an open bay?',
    action: 'Tekmetric · Bay #3 open tomorrow, 2:30 PM',
    reply:
      "Yes! Bay #3 is open with our master brake tech tomorrow at 2:30 PM. I've reserved it and I'm texting your confirmation now.",
    outcome: 'Repair order booked',
    synced: ['Tekmetric', 'Twilio Voice', 'SMS'],
  },
  {
    business: 'Bistro Botanica',
    channel: 'Inbound call',
    Icon: PhoneCall,
    customer: 'Could I get a table for 6 this Saturday at 7:30? One of us is gluten-free.',
    action: 'Resy · Booth 14 held, 7:30 PM · allergy tag added',
    reply:
      "Done! A booth for 6 is held for Saturday at 7:30 PM, and I've flagged the gluten allergy for the kitchen. Want the confirmation by text?",
    outcome: 'Reservation confirmed',
    synced: ['Resy', 'Toast POS', 'SMS'],
  },
  {
    business: 'Evergreen Realty',
    channel: 'SMS lead',
    Icon: MessageSquareText,
    customer: "Saw the yard sign at 742 Evergreen Terrace. What's the price, and can I tour it Sunday?",
    action: 'MLS active · $895K · Sunday 2:30 & 4:00 open',
    reply:
      "It's listed at $895,000: 4 bed, 3 bath, 2,850 sq ft. I can get you in Sunday at 2:30 or 4:00 PM. Which works best?",
    outcome: 'Showing scheduled',
    synced: ['Follow Up Boss', 'MLS', 'Calendly'],
  },
];

const INTEGRATIONS = [
  'Toast',
  'Square',
  'Shopify',
  'OpenTable',
  'Resy',
  'Tekmetric',
  'Mitchell1',
  'Follow Up Boss',
  'Procore',
  'Buildertrend',
  'QuickBooks',
  'Twilio',
  'WhatsApp',
  'Klaviyo',
  'DoorDash',
  'Calendly',
];

const WAVE_BARS = 28;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function CallTimer() {
  const [seconds, setSeconds] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <span className="tabular-nums">
      {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}

// Phases: 0 customer speaks · 1 agent working · 2 action done · 3 agent replying · 4 resolved
function LiveCallCard() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(0);
  // Rotation stops for good once the visitor pauses or picks a conversation
  const [autoplay, setAutoplay] = useState(true);
  const [held, setHeld] = useState(false); // hovered or focused
  const [inView, setInView] = useState(true);
  const rootRef = useRef(null);
  const scenario = SCENARIOS[index];

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reset phase and typing together with the index, so no render pairs a new
  // scenario with the previous one's typing progress
  const showScenario = (i) => {
    setIndex(i);
    setPhase(reducedMotion ? 4 : 0);
    setTyped(reducedMotion ? Infinity : 0);
  };

  // Play the current conversation while the card is on screen
  useEffect(() => {
    if (reducedMotion) {
      setPhase(4);
      setTyped(Infinity);
      return undefined;
    }
    if (!inView) return undefined;
    setPhase(0);
    setTyped(0);
    const timers = [
      setTimeout(() => setPhase(1), 1300),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [index, reducedMotion, inView]);

  // Type the agent's reply out a couple of characters at a time
  useEffect(() => {
    if (phase !== 3) return undefined;
    if (typed >= scenario.reply.length) {
      setPhase(4);
      return undefined;
    }
    const id = setTimeout(() => setTyped((t) => t + 2), 24);
    return () => clearTimeout(id);
  }, [phase, typed, scenario.reply.length]);

  // Move on to the next conversation after a pause
  const rotating = autoplay && !reducedMotion && !held && inView;
  useEffect(() => {
    if (phase !== 4 || !rotating) return undefined;
    const id = setTimeout(() => showScenario((index + 1) % SCENARIOS.length), 3600);
    return () => clearTimeout(id);
    // showScenario only closes over reducedMotion, which is false whenever this runs
  }, [phase, rotating, index]);

  const ChannelIcon = scenario.Icon;
  const replyText = scenario.reply.slice(0, typed);

  return (
    <div
      ref={rootRef}
      className="mx-auto max-w-md"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <p className="sr-only">
        Example conversation: a caller asks Apex Auto Care for an oil change and brake inspection. The AgentPulse agent
        checks the shop&apos;s Tekmetric schedule, books Bay 3 for 2:30 PM tomorrow, and texts the customer a confirmation.
      </p>
      {/* Animated demo; the summary above is what assistive tech reads */}
      <div className="relative" aria-hidden="true">
        {/* Halo behind the card */}
        <div
          aria-hidden="true"
          className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-indigo-300/40 via-cyan-200/40 to-violet-300/40 blur-3xl"
        />

        <div className="spotlight-card rounded-3xl border border-slate-200/80 bg-white/90 shadow-lift backdrop-blur-xl">
          <div className="space-y-5 p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-[0_8px_18px_-6px_rgba(79,70,229,0.6)]">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-ink">AgentPulse Voice Core</h3>
                  <p key={scenario.business} className="flex animate-fade-in items-center gap-1.5 overflow-hidden font-mono text-[11px] text-slate-500">
                    <ChannelIcon className="h-3 w-3 shrink-0" />
                    <span className="min-w-0 truncate">
                      {scenario.channel} · {scenario.business}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <CallTimer />
              </div>
            </div>

            {/* Waveform */}
            <div className="inset-panel space-y-2.5 p-3.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                  Sub-400ms voice synthesis
                </span>
                <span className="font-semibold text-indigo-600">99.8% accuracy</span>
              </div>
              <div className="flex h-10 items-center justify-between gap-[3px]" aria-hidden="true">
                {Array.from({ length: WAVE_BARS }, (_, i) => (
                  <span
                    key={i}
                    className="h-full flex-1 origin-center animate-wave rounded-full bg-gradient-to-t from-indigo-500 to-cyan-400"
                    style={{
                      animationDelay: `${(i * 97) % 1100}ms`,
                      animationDuration: `${900 + ((i * 53) % 600)}ms`,
                      opacity: phase === 3 || phase === 0 ? 1 : 0.45,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div className="min-h-[268px] space-y-3 text-[13px] leading-relaxed">
              <div key={`c-${index}`} className="flex animate-fade-up items-start gap-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 font-mono text-[10px] font-semibold text-slate-600">
                  C
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-700">
                  “{scenario.customer}”
                </div>
              </div>

              {phase >= 1 && (
                <div
                  key={`a-${index}`}
                  className={`ml-9 flex animate-fade-up items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                    phase >= 2
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {phase >= 2 ? (
                    <Zap className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-slate-400" />
                  )}
                  <span className="truncate">{phase >= 2 ? scenario.action : 'Checking live systems…'}</span>
                </div>
              )}

              {phase >= 3 && (
                <div key={`r-${index}`} className="flex animate-fade-up flex-row-reverse items-start gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 font-mono text-[10px] font-semibold text-white">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tr-sm border border-indigo-100 bg-gradient-to-br from-indigo-50 to-cyan-50 px-3.5 py-2.5 text-slate-800">
                    “{replyText}
                    {phase === 3 ? (
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-indigo-500" />
                    ) : (
                      '”'
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-500">
              <span className="shrink-0">Synced with</span>
              <div key={`s-${index}`} className="flex animate-fade-in flex-wrap justify-end gap-1.5">
                {scenario.synced.map((tool) => (
                  <span key={tool} className="chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Outcome toast */}
        <div
          className={`absolute -right-3 -top-5 hidden items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 shadow-lift transition-all duration-500 sm:flex ${
            phase >= 4 ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <CalendarCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-800">{scenario.outcome}</span>
        </div>

        {/* Floating metric */}
        <div className="absolute -bottom-7 -left-6 hidden animate-float items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-lift backdrop-blur-xl sm:flex">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-[11px] text-slate-500">First-contact resolution</p>
            <p className="text-sm font-bold text-ink">99.4% across all sectors</p>
          </div>
        </div>
      </div>

      {/* Scenario switcher */}
      <div className="mt-12 flex items-center justify-center gap-2 sm:mt-14">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.business}
            type="button"
            onClick={() => {
              setAutoplay(false);
              showScenario(i);
            }}
            aria-label={`Show the ${s.business} conversation`}
            aria-pressed={i === index}
            className="group grid h-6 place-items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-gradient-to-r from-indigo-600 to-cyan-500' : 'w-3 bg-slate-300 group-hover:bg-slate-400'
              }`}
            />
          </button>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setAutoplay((on) => !on)}
            aria-label={autoplay ? 'Pause the demo rotation' : 'Resume the demo rotation'}
            className="ml-1 grid h-6 w-6 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            {autoplay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
        )}
      </div>
    </div>
  );
}

export function Hero({ onOpenBlueprint }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Aurora wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px]">
        <div className="absolute left-1/2 top-[-180px] h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.20),transparent)]" />
        <div className="absolute right-[4%] top-[140px] h-[420px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.16),transparent)]" />
        <div className="absolute left-[2%] top-[260px] h-[360px] w-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Headline & actions */}
          <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
            <div data-reveal className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Custom AI agents for small business</span>
            </div>

            <h1
              data-reveal
              style={{ '--reveal-delay': '60ms' }}
              className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-6xl md:text-[4.1rem]"
            >
              Hire AI agents that run your <span className="gradient-text">phones, bookings & dispatch</span> 24/7.
            </h1>

            <p
              data-reveal
              style={{ '--reveal-delay': '120ms' }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl lg:mx-0"
            >
              We design, build, and deploy custom AI agents for restaurants, boutiques, grocery stores, auto repair shops, real estate brokerages, and contractors. Never lose another customer to voicemail.
            </p>

            <div
              data-reveal
              style={{ '--reveal-delay': '180ms' }}
              className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row lg:justify-start"
            >
              <button
                type="button"
                onClick={onOpenBlueprint}
                data-magnetic
                data-cursor-label="Start"
                className="btn btn-primary w-full px-7 py-4 text-base sm:w-auto"
              >
                <span>Deploy your first agent</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <a href="#simulator" data-magnetic className="btn btn-secondary w-full px-6 py-4 text-base sm:w-auto">
                <Play className="h-4 w-4 fill-indigo-500/20 text-indigo-600" />
                <span>Try the live agent demo</span>
              </a>
            </div>

            <ul
              data-reveal
              style={{ '--reveal-delay': '240ms' }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 font-mono text-xs text-slate-600 lg:justify-start"
            >
              {['Zero-hold phone answering', 'Syncs with your POS & CRM', 'Live in under 7 days'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live demo card */}
          <div data-reveal style={{ '--reveal-delay': '200ms' }} className="lg:col-span-5">
            <LiveCallCard />
          </div>
        </div>

        {/* Impact stats */}
        <div
          data-reveal
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 shadow-soft backdrop-blur-xl md:grid-cols-4"
        >
          {AGENCY_INFO.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`space-y-1 border-slate-200/80 p-5 text-center md:p-6 md:text-left ${
                i < 2 ? 'border-b md:border-b-0' : ''
              } ${i % 2 === 0 ? 'border-r' : ''} ${i < 3 ? 'md:border-r' : 'md:border-r-0'}`}
            >
              <div className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{stat.value}</div>
              <div className="text-xs font-medium text-slate-600">{stat.label}</div>
              <div className="font-mono text-[11px] text-indigo-600">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Integrations marquee */}
        <div data-reveal className="mt-14">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
            Plugs straight into the software you already run
          </p>
          <div className="mask-fade-x group mt-5 overflow-hidden">
            <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={i >= INTEGRATIONS.length ? 'true' : undefined}
                  className="mr-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-soft"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
