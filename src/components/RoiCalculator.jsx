import React, { useEffect, useId, useRef, useState } from 'react';
import { Calculator, Clock, TrendingUp, Sparkles, ArrowRight, SlidersHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';

const BRAND_CONFETTI = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981'];

const formatNumber = (n) => n.toLocaleString('en-US');

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// Tweens a displayed number toward `value` with an ease-out curve. Retargets smoothly
// mid-flight (e.g. while a slider is dragged) and jumps straight to the value when the
// visitor prefers reduced motion.
function useAnimatedNumber(value, duration = 350) {
  const [display, setDisplay] = useState(value);
  const currentRef = useRef(value);

  useEffect(() => {
    const from = currentRef.current;
    if (from === value) return undefined;

    if (prefersReducedMotion()) {
      currentRef.current = value;
      setDisplay(value);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (value - from) * eased;
      currentRef.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return Math.round(display);
}

// Visual count-up for sighted users; screen readers get the settled value only.
function AnimatedNumber({ value, prefix = '', srSuffix = '' }) {
  const animated = useAnimatedNumber(value);
  return (
    <>
      <span aria-hidden="true">
        {prefix}
        {formatNumber(animated)}
      </span>
      <span className="sr-only">
        {prefix}
        {formatNumber(value)}
        {srSuffix}
      </span>
    </>
  );
}

function Slider({ label, value, min, max, step, onChange, display, valueText, minLabel, maxLabel }) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <span aria-hidden="true" className="shrink-0 font-mono text-base font-semibold tabular-nums text-indigo-700">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={valueText}
        className="range"
        style={{ '--fill': `${fill}%` }}
      />
      <div aria-hidden="true" className="flex justify-between font-mono text-[11px] text-slate-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function RoiCalculator({ onOpenBlueprint }) {
  const [inboundCalls, setInboundCalls] = useState(650);
  const [hourlyWage, setHourlyWage] = useState(24);
  const [dailyAdminHours, setDailyAdminHours] = useState(3.5);
  const [teamSize, setTeamSize] = useState(4);

  // Formulas
  // Average call handling & follow-up: 6 minutes (0.1 hours) per interaction
  const hoursOnCallsPerMonth = Math.round((inboundCalls * 0.1) + (dailyAdminHours * 22 * (teamSize * 0.4)));
  const agentAutomationRate = 0.88; // 88% autonomously resolved
  const monthlyHoursSaved = Math.round(hoursOnCallsPerMonth * agentAutomationRate);
  const monthlyLaborSaved = Math.round(monthlyHoursSaved * hourlyWage);
  const annualSavings = monthlyLaborSaved * 12;

  // Estimated recovered leads (assuming 18% of inbound calls were historically missed after-hours)
  const recoveredCalls = Math.round(inboundCalls * 0.18);
  const estimatedRecoveredRevenue = Math.round(recoveredCalls * 65); // $65 avg ticket across SMB

  const handleLockIn = (e) => {
    // Burst from the button itself; canvas-confetti skips this for reduced-motion visitors
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: BRAND_CONFETTI,
      disableForReducedMotion: true,
    });
    onOpenBlueprint();
  };

  return (
    <section id="calculator" className="relative isolate overflow-hidden py-24">
      {/* Soft brand wash behind the calculator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),rgba(99,102,241,0.06)_55%,transparent)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl space-y-5 text-center">
          <div data-reveal className="eyebrow">
            <Calculator className="h-3.5 w-3.5 text-emerald-600" />
            <span>SMB financial economics</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '70ms' }} className="section-title">
            Calculate your small business <span className="gradient-text">ROI</span>
          </h2>
          <p data-reveal style={{ '--reveal-delay': '140ms' }} className="section-lead">
            See how many hours and payroll dollars our autonomous agents can return to your business every single month.
          </p>
        </div>

        <div
          data-reveal
          style={{ '--reveal-delay': '200ms' }}
          className="spotlight-card card mx-auto max-w-5xl rounded-3xl p-6 shadow-lift sm:p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Inputs */}
            <div role="group" aria-labelledby="roi-inputs-title" className="space-y-8 lg:col-span-6">
              <p
                id="roi-inputs-title"
                className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-600"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600" />
                Your business profile
              </p>

              <Slider
                label="Monthly inbound calls & inquiries"
                value={inboundCalls}
                min={150}
                max={4000}
                step={50}
                onChange={setInboundCalls}
                display={formatNumber(inboundCalls)}
                valueText={`${formatNumber(inboundCalls)} calls and inquiries per month`}
                minLabel="150 calls"
                maxLabel="4,000+ calls"
              />

              <Slider
                label="Average staff hourly rate"
                value={hourlyWage}
                min={16}
                max={50}
                step={1}
                onChange={setHourlyWage}
                display={`$${hourlyWage}/hr`}
                valueText={`$${hourlyWage} per hour`}
                minLabel="$16/hr"
                maxLabel="$50/hr"
              />

              <Slider
                label="Daily hours spent on booking & phone tag"
                value={dailyAdminHours}
                min={1}
                max={8}
                step={0.5}
                onChange={setDailyAdminHours}
                display={`${dailyAdminHours} hrs/day`}
                valueText={`${dailyAdminHours} ${dailyAdminHours === 1 ? 'hour' : 'hours'} per day`}
                minLabel="1 hour"
                maxLabel="8 hours"
              />

              <Slider
                label="Location team size"
                value={teamSize}
                min={1}
                max={25}
                step={1}
                onChange={setTeamSize}
                display={`${teamSize} ${teamSize === 1 ? 'employee' : 'employees'}`}
                valueText={`${teamSize} ${teamSize === 1 ? 'employee' : 'employees'}`}
                minLabel="1 person"
                maxLabel="25 people"
              />
            </div>

            {/* Projected results */}
            <div className="space-y-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 sm:p-8 lg:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-4">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-indigo-700">
                  Estimated financial impact
                </span>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700">
                  88% autonomous resolution
                </span>
              </div>

              {/* Headline metric: monthly payroll savings */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">Estimated monthly payroll savings</p>
                <p className="font-display text-4xl font-bold tracking-tight text-ink tabular-nums sm:text-5xl">
                  <AnimatedNumber value={monthlyLaborSaved} prefix="$" />
                  <span className="ml-1 text-lg font-medium tracking-normal text-slate-500">/mo</span>
                </p>
              </div>

              {/* Secondary metrics */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <Clock className="h-4 w-4 text-indigo-600" />
                    <span>Hours recovered</span>
                  </div>
                  <p className="font-display text-2xl font-bold tabular-nums text-ink lg:text-xl xl:text-2xl">
                    <AnimatedNumber value={monthlyHoursSaved} />{' '}
                    <span className="text-xs font-medium text-slate-500">hrs/mo</span>
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span>Annual total value</span>
                  </div>
                  <p className="font-display text-2xl font-bold tabular-nums text-emerald-700 lg:text-xl xl:text-2xl">
                    <AnimatedNumber value={annualSavings} prefix="$" srSuffix=" per year" />
                  </p>
                </div>
              </div>

              {/* Missed-revenue recovery insight */}
              <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-[13px] leading-relaxed text-emerald-800">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p>
                  <strong className="font-semibold">Bonus revenue:</strong> By eliminating missed after-hours calls, you could
                  capture an estimated ~{formatNumber(recoveredCalls)} additional orders/bookings worth approximately{' '}
                  <strong className="font-semibold">${formatNumber(estimatedRecoveredRevenue)}/mo</strong> in gross sales.
                </p>
              </div>

              <p className="font-mono text-[11px] leading-relaxed text-slate-500">
                Estimates use typical small-business benchmarks; your results will vary.
              </p>

              <button
                type="button"
                onClick={handleLockIn}
                data-magnetic
                data-cursor-label="Blueprint"
                className="btn btn-primary w-full whitespace-normal px-4 py-4 text-center text-sm sm:px-6 sm:text-base"
              >
                <span>Lock in this ROI blueprint</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
