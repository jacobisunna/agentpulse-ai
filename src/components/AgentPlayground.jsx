import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  CheckCircle2,
  RotateCcw,
  Cpu,
  Flame,
  Utensils,
  ShoppingBag,
  Apple,
  Wrench,
  Building2,
  Hammer,
} from 'lucide-react';
import { INDUSTRIES } from '../data/agencyData';

const INDUSTRY_ICONS = { Utensils, ShoppingBag, Apple, Wrench, Building2, Hammer };

const REPLY_DELAY_MS = 1100;
const PROMPT_PREVIEW_CHARS = 44;

let messageSeq = 0;
const createMessage = (fields) => ({ id: `msg-${++messageSeq}`, ...fields });

// The scripted opening exchange shown on load, on industry change and on reset.
// Seeded messages are flagged so the log knows to show them from the top.
function createConversation(industry) {
  const [opening] = industry.interactivePrompts;
  return [
    createMessage({
      role: 'system',
      seeded: true,
      content: `${industry.shortName} agent core v4.2 loaded · native APIs synced`,
    }),
    createMessage({ role: 'user', seeded: true, content: opening.userPrompt }),
    createMessage({
      role: 'assistant',
      seeded: true,
      thought: opening.agentThought,
      action: opening.agentAction,
      content: opening.agentResponse,
    }),
  ];
}

function createReply(industry, text) {
  const normalized = text.toLowerCase();
  const matched = industry.interactivePrompts.find((p) => p.userPrompt.toLowerCase().trim() === normalized);
  if (matched) {
    return createMessage({
      role: 'assistant',
      thought: matched.agentThought,
      action: matched.agentAction,
      content: matched.agentResponse,
    });
  }
  return createMessage({
    role: 'assistant',
    thought: `Parsing context for ${industry.name}. Checking customer CRM & real-time inventory API.`,
    action: 'API Action: Validated business constraints. Dispatched webhook payload to backend queue.',
    content: `Thank you! I've processed your request for our ${industry.shortName.toLowerCase()} team. All parameters are verified and logged in our system, and I've sent a confirmation to your mobile with the details.`,
  });
}

// Shortens a quick prompt at a word boundary; only adds an ellipsis when something was cut.
function previewPrompt(text) {
  if (text.length <= PROMPT_PREVIEW_CHARS) return text;
  const cut = text.slice(0, PROMPT_PREVIEW_CHARS);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > PROMPT_PREVIEW_CHARS * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.replace(/[\s,.;:!?-]+$/, '')}…`;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

function AgentAvatar() {
  return (
    <div
      aria-hidden="true"
      className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600"
    >
      <Bot className="h-4 w-4" />
    </div>
  );
}

function ChatMessage({ message }) {
  if (message.role === 'system') {
    return (
      <div className="flex animate-fade-up justify-center">
        <span className="inline-flex max-w-full items-center gap-1.5 text-balance rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-center font-mono text-[11px] text-slate-600">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
          {message.content}
        </span>
      </div>
    );
  }

  if (message.role === 'user') {
    return (
      <div className="flex animate-fade-up justify-end">
        <p className="max-w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-3 leading-relaxed text-white shadow-[0_12px_24px_-14px_rgba(79,70,229,0.7)] sm:max-w-[75%]">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className="flex animate-fade-up items-start gap-3 sm:max-w-[88%]">
      <AgentAvatar />
      <div className="min-w-0 flex-1 space-y-2">
        {/* Internal reasoning + the API action the agent took */}
        {(message.thought || message.action) && (
          <div className="space-y-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 font-mono text-xs leading-relaxed">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-indigo-700">
              <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
              AUTONOMOUS ENGINE STEP
            </p>
            {message.thought && (
              <p className="flex gap-2 break-words text-slate-600">
                <span aria-hidden="true" className="text-indigo-500">›</span>
                <span className="min-w-0">{message.thought}</span>
              </p>
            )}
            {message.action && (
              <p className="flex gap-2 break-words text-slate-700">
                <span aria-hidden="true" className="text-indigo-500">→</span>
                <span className="min-w-0">{message.action}</span>
              </p>
            )}
          </div>
        )}

        <p className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 leading-relaxed text-slate-800 shadow-soft">
          {message.content}
        </p>
      </div>
    </div>
  );
}

// Remounted (via key) whenever the industry changes, so every conversation starts
// clean and an in-flight reply for the previous industry is cancelled on unmount.
function SandboxConsole({ industry }) {
  const [messages, setMessages] = useState(() => createConversation(industry));
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [latency, setLatency] = useState(240);
  const logRef = useRef(null);
  const replyTimerRef = useRef(null);
  const inputRef = useRef(null);

  const cancelPendingReply = () => {
    clearTimeout(replyTimerRef.current);
    replyTimerRef.current = null;
  };

  // Drop any pending reply when the console unmounts (industry switch or page teardown)
  useEffect(() => () => clearTimeout(replyTimerRef.current), []);

  // Scroll ONLY the chat log. (scrollIntoView would also scroll the window and
  // yank the whole page down to this section on load.)
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;

    // A freshly seeded conversation reads top-down, with no animation
    if (messages.every((m) => m.seeded)) {
      log.scrollTo({ top: 0 });
      return;
    }

    // Follow the newest turn; if it is taller than the log, stop at its first line.
    // Layout offsets (not scrollHeight) keep the fade-up transform from skewing the target.
    const newest = log.lastElementChild;
    if (!newest) return;
    const padBottom = parseFloat(getComputedStyle(log).paddingBottom) || 0;
    const bottom = newest.offsetTop + newest.offsetHeight + padBottom - log.clientHeight;
    const top = Math.max(0, Math.min(bottom, newest.offsetTop - 16));
    log.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [messages, isTyping]);

  const handleSendPrompt = (promptText) => {
    const fromInput = promptText === undefined;
    const text = (fromInput ? inputValue : promptText).trim();
    if (isTyping || replyTimerRef.current || !text) return;

    const userMessage = createMessage({ role: 'user', content: text });
    setMessages((prev) => [...prev, userMessage]);
    if (fromInput) setInputValue('');
    setIsTyping(true);
    setLatency(Math.floor(Math.random() * 90) + 180);

    replyTimerRef.current = setTimeout(() => {
      replyTimerRef.current = null;
      const reply = createReply(industry, text);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, REPLY_DELAY_MS);
  };

  const handleReset = () => {
    cancelPendingReply();
    setIsTyping(false);
    setMessages(createConversation(industry));
  };

  return (
    <div className="spotlight-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lift">
      {/* Console top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/80 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-[0_8px_18px_-6px_rgba(79,70,229,0.6)]">
            <Bot className="h-[18px] w-[18px]" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-white bg-emerald-400"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-sm font-semibold text-ink">
                <span className="sm:hidden">{industry.shortName} Agent</span>
                <span className="hidden sm:inline">{industry.name} Agent</span>
              </h3>
              <span className="rounded-md border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-indigo-700">
                LIVE REASONING
              </span>
            </div>
            <p className="mt-0.5 truncate font-mono text-[11px] text-slate-500">
              Model: OmniAgent-4.2 · Guardrails engaged
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="chip">
            <Zap className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
            <span className="tabular-nums">Latency: {latency}ms</span>
          </span>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset conversation"
            title="Reset conversation"
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-soft transition-colors hover:border-indigo-200 hover:text-indigo-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Chat log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label={`Conversation with the ${industry.shortName} agent`}
        className="relative h-[440px] space-y-4 overflow-y-auto px-4 py-6 text-sm sm:h-[460px] sm:px-6"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex animate-fade-up items-start gap-3">
            <AgentAvatar />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-soft">
              <span aria-hidden="true" className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
              <span aria-hidden="true" className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
              <span aria-hidden="true" className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
              <span className="ml-2 font-mono text-xs text-slate-600">Reasoning &amp; querying APIs…</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200/80 bg-slate-50/70 px-4 py-3 text-xs sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-medium text-slate-600">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
          Quick prompts
        </span>
        {industry.interactivePrompts.map((p) => (
          <button
            key={p.userPrompt}
            type="button"
            onClick={() => handleSendPrompt(p.userPrompt)}
            // aria-disabled rather than disabled: disabling the focused chip would drop keyboard focus
            aria-disabled={isTyping}
            aria-label={p.userPrompt}
            title={p.userPrompt}
            className="max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 shadow-soft transition-colors hover:border-indigo-200 hover:text-indigo-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:border-slate-200 aria-disabled:hover:text-slate-600"
          >
            “{previewPrompt(p.userPrompt)}”
          </button>
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt();
          // Send disables itself once the input clears; keep focus in the composer
          inputRef.current?.focus();
        }}
        className="flex items-center gap-2 border-t border-slate-200/80 p-3 sm:gap-3 sm:p-4"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask the ${industry.shortName} agent anything…`}
          aria-label={`Message the ${industry.shortName} agent`}
          autoComplete="off"
          enterKeyHint="send"
          maxLength={280}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-shadow placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        />
        <button
          type="submit"
          data-magnetic
          disabled={isTyping || !inputValue.trim()}
          className="btn btn-primary shrink-0 px-5 py-3 text-sm"
        >
          <span>Send</span>
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export function AgentPlayground({ selectedIndustryId, onSelectIndustry }) {
  const currentIndustry = INDUSTRIES.find((ind) => ind.id === selectedIndustryId) || INDUSTRIES[0];

  return (
    <section
      id="simulator"
      className="relative isolate overflow-hidden border-y border-slate-200/70 bg-white/60 py-24"
    >
      {/* Faint grid + brand glow behind the console */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_55%_at_50%_55%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[460px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.13),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <div data-reveal className="eyebrow">
            <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
            <span>Interactive AI agent sandbox</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '70ms' }} className="section-title">
            Test-drive an agent in <span className="gradient-text">real time</span>
          </h2>
          <p data-reveal style={{ '--reveal-delay': '140ms' }} className="section-lead">
            Experience how our agents converse with customers, execute internal API actions, and manage operations with
            zero wait times.
          </p>
        </div>

        {/* Industry switcher */}
        <div
          data-reveal
          style={{ '--reveal-delay': '210ms' }}
          role="group"
          aria-label="Choose an industry"
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {INDUSTRIES.map((ind) => {
            const isActive = ind.id === currentIndustry.id;
            const Icon = INDUSTRY_ICONS[ind.icon] || Bot;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => onSelectIndustry(ind.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                  isActive
                    ? 'border-ink bg-ink text-white shadow-lift'
                    : 'border-slate-200 bg-white text-slate-600 shadow-soft hover:border-indigo-200 hover:text-indigo-700'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {ind.shortName}
              </button>
            );
          })}
        </div>

        {/* The sandbox console */}
        <div data-reveal style={{ '--reveal-delay': '280ms' }} className="mx-auto max-w-4xl">
          <SandboxConsole key={currentIndustry.id} industry={currentIndustry} />
        </div>
      </div>
    </section>
  );
}
