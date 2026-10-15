import React, { useState, useEffect, useRef } from 'react';
import { Bot, Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Industries', href: '#industries' },
  { name: 'Live Demo', href: '#simulator' },
  { name: 'ROI Calculator', href: '#calculator' },
  { name: 'How It Works', href: '#architecture' },
  { name: 'Results', href: '#results' },
];

export function Logo({ compact = false }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.55)] transition-transform duration-300 group-hover:scale-105">
        <Bot className="h-5 w-5 text-white transition-transform group-hover:rotate-6" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
      </span>
      <span>
        <span className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Agent<span className="gradient-text">Pulse</span>
          </span>
          <span className="rounded-md border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-indigo-700">
            AI
          </span>
        </span>
        {!compact && (
          <span className="hidden text-[11px] tracking-wide text-slate-600 sm:block">Custom AI agents for small business</span>
        )}
      </span>
    </span>
  );
}

export function Navbar({ onOpenBlueprint }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = '';
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        });
        setActiveHref(best ? `#${best}` : '');
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close the mobile drawer on Escape or when the viewport grows past the breakpoint
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMobileMenuOpen(false);
      // The focused link unmounts with the drawer; hand focus back to the toggle
      menuButtonRef.current?.focus();
    };
    const onResize = () => window.innerWidth >= 768 && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  const elevated = scrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        elevated
          ? 'border-b border-slate-200/70 bg-white/75 py-3 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="group rounded-xl" aria-label="AgentPulse AI home">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 px-1.5 py-1.5 shadow-soft backdrop-blur-md md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ink text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Status + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Agents online 24/7</span>
            </div>

            <button
              type="button"
              onClick={onOpenBlueprint}
              data-magnetic
              className="btn btn-primary px-5 py-2.5 text-sm"
            >
              <span>Build Your Agent</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-xl border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-soft hover:text-slate-900 md:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="mx-4 mt-3 max-h-[calc(100dvh-6rem)] animate-pop-in space-y-4 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lift backdrop-blur-2xl md:hidden"
        >
          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-[11px] text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>All agents operational</span>
          </div>

          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-indigo-700"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => {
                // Focus the toggle first so the modal restores focus there, not to <body>
                menuButtonRef.current?.focus();
                setMobileMenuOpen(false);
                onOpenBlueprint();
              }}
              className="btn btn-primary w-full px-5 py-3 text-sm"
            >
              <span>Build Your Agent Blueprint</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
