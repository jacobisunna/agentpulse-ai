import React, { useEffect, useId, useRef, useState } from 'react';
import {
  X,
  Check,
  CheckCircle2,
  CircleAlert,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Utensils,
  ShoppingBag,
  Apple,
  Wrench,
  Building2,
  Hammer,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INDUSTRIES } from '../data/agencyData';
import { submitLead } from '../lib/submitLead';

// Maps the icon names stored in agencyData to components
const INDUSTRY_ICONS = { Utensils, ShoppingBag, Apple, Wrench, Building2, Hammer };

const PAIN_POINTS = [
  'Missed phone calls during peak hours',
  'After-hours inquiry loss & unanswered voicemails',
  'Manual table booking & schedule double-booking',
  'Repetitive menu, pricing, and FAQ questions',
  'Time-consuming material or service quotes',
  'Inventory replenishment and vendor order delays',
  'Unanswered negative reviews across Google & Yelp',
];

const MONTHLY_VOLUMES = ['Under 250', '250–500', '500–1,000', '1,000–2,500', '2,500+'];

const STEPS = ['Industry', 'Bottlenecks', 'Contact details'];

const CONFETTI_COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981'];

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const TILE_IDLE = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50';
const TILE_SELECTED = 'border-indigo-400 bg-indigo-50 text-indigo-900 ring-4 ring-indigo-100';

const CONTROL =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm transition-[border-color,box-shadow] placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 [&:user-invalid]:border-rose-300';

export function BlueprintModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  // Mounting a fresh dialog on every open resets all of its state
  return <BlueprintDialog onClose={onClose} />;
}

function BlueprintDialog({ onClose }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const hintId = `${uid}-pain-hint`;
  const fieldId = (name) => `${uid}-${name}`;

  const panelRef = useRef(null);
  const bodyRef = useRef(null);
  const formRef = useRef(null);
  const stepHeadingRef = useRef(null);
  const firstFieldRef = useRef(null);
  const submitRef = useRef(null);
  const successHeadingRef = useRef(null);
  const pendingFocusRef = useRef(null);
  const backdropPressRef = useRef(false);
  const inFlightRef = useRef(false);
  const mountedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
  const [selectedPains, setSelectedPains] = useState([PAIN_POINTS[0]]);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    monthlyVolume: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | error | success
  const [delivered, setDelivered] = useState(false);
  // Exactly what was sent, so the confirmation never shows edits made mid-request
  const [submitted, setSubmitted] = useState(null);

  const industry = INDUSTRIES.find((ind) => ind.id === selectedIndustry) ?? INDUSTRIES[0];
  const submitting = status === 'submitting';
  const noPains = selectedPains.length === 0;

  // A late network response must never update a dialog that has been closed
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Lock page scroll and move focus into the dialog; put both back on close
  useEffect(() => {
    const { body, documentElement } = document;
    const previouslyFocused = document.activeElement;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, []);

  // Escape closes; Tab / Shift+Tab cycle within the panel
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !e.isComposing) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active !== panel && panel.contains(active);

      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // After a step or status change, send focus somewhere meaningful (the old
  // control has usually unmounted, which would otherwise drop focus to <body>)
  useEffect(() => {
    const target = pendingFocusRef.current;
    if (!target) return;
    pendingFocusRef.current = null;
    if (target !== 'submit' && bodyRef.current) bodyRef.current.scrollTop = 0;
    const refs = { heading: stepHeadingRef, field: firstFieldRef, submit: submitRef, success: successHeadingRef };
    refs[target].current?.focus({ preventScroll: target !== 'submit' });
  }, [step, status]);

  const goToStep = (next, focus = 'heading') => {
    pendingFocusRef.current = focus;
    setStep(next);
  };

  const togglePain = (pain) =>
    setSelectedPains((prev) => (prev.includes(pain) ? prev.filter((p) => p !== pain) : [...prev, pain]));

  const updateField = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendLead = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus('submitting');
    const lead = {
      businessName: formData.businessName.trim(),
      contactName: formData.contactName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      monthlyVolume: formData.monthlyVolume,
      industry: industry.id,
      industryName: industry.name,
      painPoints: PAIN_POINTS.filter((p) => selectedPains.includes(p)),
    };
    try {
      const result = await submitLead(lead);
      if (!mountedRef.current) return;
      setSubmitted(lead);
      setDelivered(result.delivered);
      pendingFocusRef.current = 'success';
      setStatus('success');
      if (result.delivered) {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
      }
    } catch (err) {
      console.error('[AgentPulse] Blueprint request failed:', err);
      if (!mountedRef.current) return;
      pendingFocusRef.current = 'submit';
      setStatus('error');
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLead();
  };

  const handleRetry = () => {
    if (formRef.current?.reportValidity()) sendLead();
  };

  // Only a press that starts and ends on the backdrop itself closes the dialog,
  // so dragging a text selection out of an input does not dismiss it
  const handleBackdropPointerDown = (e) => {
    backdropPressRef.current = e.target === e.currentTarget;
  };
  const handleBackdropClick = (e) => {
    if (backdropPressRef.current && e.target === e.currentTarget) onClose();
    backdropPressRef.current = false;
  };

  const firstName = (submitted?.contactName ?? '').split(/\s+/)[0];
  const workflowCount = submitted?.painPoints.length ?? 0;

  return (
    <div
      role="presentation"
      onPointerDown={handleBackdropPointerDown}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative flex max-h-[90vh] w-full max-w-2xl animate-pop-in flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift outline-none"
      >
        {/* Brand bar */}
        <div aria-hidden="true" className="h-1 shrink-0 bg-gradient-to-r from-indigo-600 via-cyan-500 to-violet-500" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 z-10 grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white/90 text-slate-500 shadow-soft backdrop-blur transition-colors hover:border-slate-300 hover:text-slate-900 sm:right-5 sm:top-6"
        >
          <X className="h-5 w-5" />
        </button>

        <div ref={bodyRef} className="overflow-y-auto overscroll-contain">
          {status !== 'success' ? (
            <div className="space-y-6 p-6 sm:p-10">
              {/* Header */}
              <div className="space-y-3 pr-10">
                <div className="eyebrow">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Custom agent blueprint</span>
                </div>
                <h2 id={titleId} className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Design your custom AI workforce
                </h2>
                <p id={descId} className="text-sm leading-relaxed text-slate-600">
                  Tell us about your operations and we&apos;ll map out an agent architecture and ROI projection
                  tailored to the tools you already use.
                </p>
              </div>

              {/* Stepper (screen readers get the step from each step's heading instead) */}
              <div className="space-y-2" aria-hidden="true">
                <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-slate-600">
                  <span>
                    Step {step} of {STEPS.length}
                  </span>
                  <span className="font-semibold text-indigo-600">{STEPS[step - 1]}</span>
                </div>
                <div className="flex gap-2">
                  {STEPS.map((name, i) => (
                    <span
                      key={name}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        i < step ? 'bg-gradient-to-r from-indigo-600 to-cyan-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: industry */}
              {step === 1 && (
                <div key="step-1" className="animate-fade-up space-y-4">
                  <h3
                    id={`${uid}-q1`}
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="text-base font-semibold text-slate-900 outline-none"
                  >
                    <span className="sr-only">Step 1 of 3: </span>
                    Which industry matches your business?
                  </h3>

                  <div role="group" aria-labelledby={`${uid}-q1`} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {INDUSTRIES.map((ind) => {
                      const selected = ind.id === selectedIndustry;
                      const Icon = INDUSTRY_ICONS[ind.icon] ?? Sparkles;
                      return (
                        <button
                          key={ind.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSelectedIndustry(ind.id)}
                          className={`relative flex flex-col items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                            selected ? TILE_SELECTED : TILE_IDLE
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 place-items-center rounded-lg border transition-colors ${
                              selected
                                ? 'border-indigo-200 bg-white text-indigo-600'
                                : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-tight">{ind.shortName}</span>
                            <span
                              className={`mt-1 block font-mono text-[11px] leading-snug ${
                                selected ? 'text-indigo-700' : 'text-slate-600'
                              }`}
                            >
                              {ind.badge}
                            </span>
                          </span>
                          <CheckCircle2
                            className={`absolute right-3 top-3 h-4 w-4 text-indigo-600 transition-opacity ${
                              selected ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      data-magnetic
                      className="btn btn-primary w-full px-6 py-3 text-sm sm:w-auto"
                    >
                      <span>Next: bottlenecks</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: pain points */}
              {step === 2 && (
                <div key="step-2" className="animate-fade-up space-y-4">
                  <div className="space-y-1">
                    <h3
                      id={`${uid}-q2`}
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="text-base font-semibold text-slate-900 outline-none"
                    >
                      <span className="sr-only">Step 2 of 3: </span>
                      What are your biggest daily bottlenecks?
                    </h3>
                    <p className="text-sm text-slate-600">Select all that apply.</p>
                  </div>

                  <div role="group" aria-labelledby={`${uid}-q2`} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {PAIN_POINTS.map((pain) => {
                      const checked = selectedPains.includes(pain);
                      return (
                        <button
                          key={pain}
                          type="button"
                          aria-pressed={checked}
                          onClick={() => togglePain(pain)}
                          className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm leading-snug transition-all duration-200 ${
                            checked ? TILE_SELECTED : TILE_IDLE
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-px grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors ${
                              checked ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          <span>{pain}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <BackButton onClick={() => goToStep(1)} />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <p
                        id={hintId}
                        aria-live="polite"
                        className={`text-center font-mono text-[11px] sm:text-right ${
                          noPains ? 'text-amber-700' : 'text-slate-600'
                        }`}
                      >
                        {noPains
                          ? 'Select at least one to continue'
                          : `${workflowCount} selected`}
                      </p>
                      <button
                        type="button"
                        onClick={() => goToStep(3, 'field')}
                        disabled={noPains}
                        aria-describedby={hintId}
                        data-magnetic
                        className="btn btn-primary w-full px-6 py-3 text-sm sm:w-auto"
                      >
                        <span>Next: contact details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: contact details */}
              {step === 3 && (
                <form
                  key="step-3"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  aria-busy={submitting}
                  aria-labelledby={`${uid}-q3`}
                  className="animate-fade-up space-y-5"
                >
                  <h3
                    id={`${uid}-q3`}
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="text-base font-semibold text-slate-900 outline-none"
                  >
                    <span className="sr-only">Step 3 of 3: </span>
                    Where should we send your blueprint?
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field id={fieldId('business')} label="Business name">
                      <input
                        ref={firstFieldRef}
                        id={fieldId('business')}
                        name="businessName"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="e.g. Apex Auto Care"
                        value={formData.businessName}
                        onChange={updateField('businessName')}
                        className={`${CONTROL} text-slate-900`}
                      />
                    </Field>

                    <Field id={fieldId('name')} label="Your name">
                      <input
                        id={fieldId('name')}
                        name="contactName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Marcus Vance"
                        value={formData.contactName}
                        onChange={updateField('contactName')}
                        className={`${CONTROL} text-slate-900`}
                      />
                    </Field>

                    <Field id={fieldId('email')} label="Work email">
                      <input
                        id={fieldId('email')}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="marcus@apexrepair.com"
                        value={formData.email}
                        onChange={updateField('email')}
                        className={`${CONTROL} text-slate-900`}
                      />
                    </Field>

                    <Field id={fieldId('phone')} label="Direct phone (for voice demo)">
                      <input
                        id={fieldId('phone')}
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="(555) 234-5678"
                        value={formData.phone}
                        onChange={updateField('phone')}
                        className={`${CONTROL} text-slate-900`}
                      />
                    </Field>

                    <Field id={fieldId('volume')} label="Monthly calls & inquiries" className="sm:col-span-2">
                      <div className="relative">
                        <select
                          id={fieldId('volume')}
                          name="monthlyVolume"
                          required
                          value={formData.monthlyVolume}
                          onChange={updateField('monthlyVolume')}
                          className={`${CONTROL} appearance-none pr-10 [&_option]:text-slate-900 ${
                            formData.monthlyVolume ? 'text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          <option value="" disabled>
                            Select a range
                          </option>
                          {MONTHLY_VOLUMES.map((volume) => (
                            <option key={volume} value={volume}>
                              {volume}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </Field>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex animate-fade-up items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
                    >
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      <div className="flex-1 space-y-2.5">
                        <div className="space-y-0.5">
                          <p className="font-semibold">We couldn&apos;t send your request.</p>
                          <p>Check your connection and try again. Your answers are still here.</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:border-rose-300 hover:bg-rose-100"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <BackButton onClick={() => goToStep(2)} disabled={submitting} />
                    <button
                      ref={submitRef}
                      type="submit"
                      disabled={submitting}
                      data-magnetic
                      className="btn btn-primary w-full px-7 py-3 text-sm disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating…</span>
                        </>
                      ) : (
                        <>
                          <span>Generate my blueprint</span>
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Confirmation */
            <div className="animate-pop-in space-y-6 p-6 text-center sm:p-12">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-soft">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h2
                  id={titleId}
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="font-display text-2xl font-bold tracking-tight text-ink outline-none sm:text-3xl"
                >
                  {delivered ? 'Blueprint request received' : 'Your blueprint summary'}
                </h2>
                <p id={descId} className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                  Thank you
                  {firstName && (
                    <>
                      , <strong className="font-semibold text-slate-900">{firstName}</strong>
                    </>
                  )}
                  .{' '}
                  {delivered ? (
                    <>
                      Your custom <strong className="font-semibold text-slate-900">{industry.name}</strong> agent
                      blueprint is now in the works.
                    </>
                  ) : (
                    <>
                      Here&apos;s what you told us about your{' '}
                      <strong className="font-semibold text-slate-900">{industry.name}</strong> business.
                    </>
                  )}
                </p>
              </div>

              <dl className="inset-panel mx-auto max-w-md divide-y divide-slate-200/80 px-4 text-left text-sm">
                <SummaryRow label="Business" value={submitted?.businessName || 'Your business'} />
                <SummaryRow label="Industry" value={industry.name} />
                <SummaryRow
                  label="Workflows"
                  value={`${workflowCount} automated flow${workflowCount === 1 ? '' : 's'}`}
                  valueClassName="text-emerald-700"
                />
                <SummaryRow label="Monthly volume" value={submitted?.monthlyVolume} />
              </dl>

              <p className="mx-auto max-w-md text-sm text-slate-600">
                {delivered ? (
                  <>
                    Our lead AI solutions engineer will reach out to{' '}
                    <strong className="break-all font-semibold text-slate-900">{submitted?.email}</strong> with your full
                    blueprint and an interactive sandbox link.
                  </>
                ) : (
                  // No lead endpoint is configured, so nothing left the browser: say so instead of promising contact
                  <>Online requests aren&apos;t connected yet, so this summary wasn&apos;t sent to our team.</>
                )}
              </p>

              <button type="button" onClick={onClose} className="btn btn-primary w-full px-7 py-3 text-sm sm:w-auto">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function BackButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-1.5 self-center rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>
  );
}

function SummaryRow({ label, value, valueClassName = 'text-slate-900' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-slate-600">{label}</dt>
      <dd className={`min-w-0 break-words text-right font-semibold ${valueClassName}`}>{value}</dd>
    </div>
  );
}
