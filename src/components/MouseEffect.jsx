import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { attachPointer } from '../fx/pointer';
import { createSignalField } from '../fx/signalField';
import { createCursor } from '../fx/cursor';
import { attachSpotlight } from '../fx/spotlight';

const FX_STORAGE_KEY = 'agentpulse:fx';

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

function readStoredPreference() {
  try {
    return localStorage.getItem(FX_STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

// Interactive pointer layer: the signal-field canvas behind the page, the
// reticle cursor on top, and card spotlights. Everything runs in rAF loops
// outside React. The layer stays off for touch screens, reduced motion, and
// high-contrast / forced-colors modes (where replacing the OS pointer would
// hurt visibility).
export function MouseEffect() {
  const [enabled, setEnabled] = useState(readStoredPreference);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const forcedColors = useMediaQuery('(forced-colors: active)');
  const moreContrast = useMediaQuery('(prefers-contrast: more)');
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  const supported = finePointer && !reducedMotion && !forcedColors && !moreContrast;
  const active = enabled && supported;

  useEffect(() => {
    try {
      localStorage.setItem(FX_STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      // storage can be unavailable (private mode); the toggle still works for this visit
    }
  }, [enabled]);

  useEffect(() => {
    if (!active) return undefined;
    const root = document.documentElement;
    root.classList.add('fx-on');
    const detachPointer = attachPointer();
    const field = createSignalField(canvasRef.current);
    const cursor = createCursor(cursorRef.current);
    const detachSpotlight = attachSpotlight();
    return () => {
      field.destroy();
      cursor.destroy();
      detachSpotlight();
      detachPointer();
      root.classList.remove('fx-on');
    };
  }, [active]);

  if (!supported) return null;

  return (
    <>
      {active && (
        <>
          <canvas ref={canvasRef} className="fx-field" aria-hidden="true" />
          <div ref={cursorRef} className="fx-cursor" data-hidden="true" aria-hidden="true">
            <div className="fx-cursor-ring">
              <div className="fx-cursor-ring-shape" />
              <span className="fx-corner tl" />
              <span className="fx-corner tr" />
              <span className="fx-corner bl" />
              <span className="fx-corner br" />
            </div>
            <div className="fx-cursor-dot" />
            <div className="fx-cursor-label" />
          </div>
        </>
      )}

      {/* Portaled to the end of <body> so it is the last tab stop, not the first */}
      {createPortal(
        <button
          type="button"
          onClick={() => setEnabled((v) => !v)}
          aria-pressed={enabled}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/85 py-1.5 pl-2 pr-3.5 font-mono text-[11px] font-medium uppercase tracking-wider text-slate-600 shadow-soft backdrop-blur-md transition-colors hover:text-slate-900"
          title="Toggle interactive cursor effects"
        >
          <span
            className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
              enabled ? 'bg-gradient-to-r from-indigo-600 to-cyan-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute h-3 w-3 rounded-full bg-white shadow transition-transform ${
                enabled ? 'translate-x-3.5' : 'translate-x-0.5'
              }`}
            />
          </span>
          <span>Interactive FX</span>
        </button>,
        document.body
      )}
    </>
  );
}
