import { pointer, onPress } from './pointer';

// Precision reticle cursor: an exact-position dot plus a spring-driven ring.
// Over buttons and links the ring morphs into a lock-on frame around the
// element (with corner brackets), elements marked [data-magnetic] lean toward
// the pointer, and [data-cursor-label] shows a small tag next to the frame.

const INTERACTIVE = [
  'a[href]',
  'button',
  '[role="button"]',
  '[role="tab"]',
  '[data-cursor]',
  'label[for]',
  'summary',
  'select',
  'input[type="range"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  'input[type="submit"]',
  'input[type="button"]',
].join(',');

const TEXT_ENTRY = [
  'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"])',
  'textarea',
  '[contenteditable="true"]',
].join(',');

const FREE_SIZE = 34;
const HOVER_SIZE = 56;
const LOCK_PAD = 6;
const MAX_LOCK_W = 520;
const MAX_LOCK_H = 120;
const MAGNET_PULL = 0.22;
const MAGNET_MAX = 10;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export function createCursor(root) {
  const ring = root.querySelector('.fx-cursor-ring');
  const shape = root.querySelector('.fx-cursor-ring-shape');
  const dot = root.querySelector('.fx-cursor-dot');
  const label = root.querySelector('.fx-cursor-label');
  const html = document.documentElement;

  let target = null;
  let isSlider = false;
  let targetRadius = 12;
  let magnetic = false;
  let labelText = '';
  let textMode = false;
  let mode = '';
  let shown = null;
  let nativeHidden = false;
  let labelShown = false;
  let needsSnap = true;
  let repick = false;
  let pressed = false;

  let rx = 0;
  let ry = 0;
  let rw = FREE_SIZE;
  let rh = FREE_SIZE;
  let rr = FREE_SIZE / 2;
  let stretch = 0;
  let angle = 0;
  let pressScale = 1;

  // el -> current magnetic offset, eased back to zero after the pointer leaves
  const magnets = new Map();

  let raf = 0;
  let lastT = performance.now();

  const setMode = (m) => {
    if (m === mode) return;
    mode = m;
    root.dataset.mode = m;
  };

  const release = () => {
    target = null;
    magnetic = false;
    labelText = '';
  };

  const pick = (el) => {
    if (!(el instanceof Element)) {
      release();
      textMode = false;
      return;
    }
    if (el.closest(TEXT_ENTRY)) {
      release();
      textMode = true;
      return;
    }
    textMode = false;
    const hit = el.closest(INTERACTIVE);
    if (!hit || hit.disabled) {
      release();
      return;
    }
    if (hit === target) return;
    target = hit;
    // A frame around a slider track looks odd while dragging the thumb
    isSlider = hit.matches('input[type="range"]');
    targetRadius = parseFloat(getComputedStyle(hit).borderTopLeftRadius) || 0;
    magnetic = hit.hasAttribute('data-magnetic');
    labelText = hit.getAttribute('data-cursor-label') || '';
    if (labelText) label.textContent = labelText;
  };

  const onOver = (e) => pick(e.target);
  const onScroll = () => {
    repick = true;
  };
  const offPress = onPress((down) => {
    pressed = down;
    root.dataset.pressed = down ? 'true' : 'false';
  });

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(now - lastT, 50);
    lastT = now;

    const isMouse = pointer.inside && pointer.type === 'mouse';
    if (isMouse !== nativeHidden) {
      nativeHidden = isMouse;
      html.classList.toggle('fx-cursor-on', isMouse);
    }
    const show = isMouse && !textMode;
    if (show !== shown) {
      shown = show;
      root.dataset.hidden = show ? 'false' : 'true';
    }
    if (!isMouse) {
      needsSnap = true;
      if (magnets.size) {
        magnets.forEach((_, el) => {
          el.style.transform = '';
        });
        magnets.clear();
      }
      return;
    }

    // Content can scroll under a resting pointer without any pointerover event
    if (repick) {
      repick = false;
      pick(document.elementFromPoint(pointer.x, pointer.y));
    }
    if (target && !target.isConnected) release();

    let tx = pointer.x;
    let ty = pointer.y;
    let tw = FREE_SIZE;
    let th = FREE_SIZE;
    let tr = FREE_SIZE / 2;
    let nextMode = 'free';

    if (target) {
      const rect = target.getBoundingClientRect();
      const lockable = rect.width > 0 && rect.width <= MAX_LOCK_W && rect.height <= MAX_LOCK_H && !isSlider;
      if (lockable) {
        nextMode = 'lock';
        const m = magnets.get(target);
        // Centre of the element without its current magnetic offset
        const cx = rect.left + rect.width / 2 - (m ? m.x : 0);
        const cy = rect.top + rect.height / 2 - (m ? m.y : 0);
        if (magnetic) {
          const entry = m || { x: 0, y: 0, gx: 0, gy: 0 };
          entry.gx = clamp((pointer.x - cx) * MAGNET_PULL, -MAGNET_MAX, MAGNET_MAX);
          entry.gy = clamp((pointer.y - cy) * MAGNET_PULL, -MAGNET_MAX, MAGNET_MAX);
          magnets.set(target, entry);
        }
        tx = rect.left + rect.width / 2;
        ty = rect.top + rect.height / 2;
        tw = rect.width + LOCK_PAD * 2;
        th = rect.height + LOCK_PAD * 2;
        tr = Math.min(targetRadius + LOCK_PAD, Math.min(tw, th) / 2);
      } else {
        nextMode = 'hover';
        tw = HOVER_SIZE;
        th = HOVER_SIZE;
        tr = HOVER_SIZE / 2;
      }
    }
    setMode(nextMode);

    // Ease magnetic elements toward their goal (or back home once released)
    const ma = 1 - Math.pow(1 - 0.2, dt / 16.667);
    magnets.forEach((m, el) => {
      const engaged = el === target && magnetic && nextMode === 'lock';
      const gx = engaged ? m.gx : 0;
      const gy = engaged ? m.gy : 0;
      m.x += (gx - m.x) * ma;
      m.y += (gy - m.y) * ma;
      if (!engaged && Math.abs(m.x) < 0.05 && Math.abs(m.y) < 0.05) {
        el.style.transform = '';
        magnets.delete(el);
      } else {
        el.style.transform = `translate3d(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px, 0)`;
      }
    });

    const a = 1 - Math.pow(1 - (nextMode === 'free' ? 0.3 : 0.24), dt / 16.667);
    if (needsSnap) {
      needsSnap = false;
      rx = tx;
      ry = ty;
      rw = tw;
      rh = th;
      rr = tr;
    }
    rx += (tx - rx) * a;
    ry += (ty - ry) * a;
    rw += (tw - rw) * a;
    rh += (th - rh) * a;
    rr += (tr - rr) * a;

    // Velocity stretch while free-flying; the stretch eases out when the mouse stops
    const moving = now - pointer.lastMove < 60;
    const speed = moving ? Math.hypot(pointer.vx, pointer.vy) : 0;
    const goalStretch = nextMode === 'free' ? Math.min(speed * 0.09, 0.34) : 0;
    stretch += (goalStretch - stretch) * a;
    if (speed > 0.05) angle = Math.atan2(pointer.vy, pointer.vx);
    pressScale += ((pressed ? 0.88 : 1) - pressScale) * (1 - Math.pow(1 - 0.35, dt / 16.667));

    ring.style.transform = `translate3d(${(rx - rw / 2).toFixed(2)}px, ${(ry - rh / 2).toFixed(2)}px, 0)`;
    ring.style.width = `${rw.toFixed(2)}px`;
    ring.style.height = `${rh.toFixed(2)}px`;
    ring.style.borderRadius = `${rr.toFixed(2)}px`;
    const sx = (1 + stretch) * pressScale;
    const sy = (1 - stretch * 0.55) * pressScale;
    shape.style.transform = `rotate(${angle.toFixed(3)}rad) scale(${sx.toFixed(3)}, ${sy.toFixed(3)}) rotate(${(-angle).toFixed(3)}rad)`;

    dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

    const wantLabel = Boolean(labelText) && nextMode === 'lock';
    if (wantLabel !== labelShown) {
      labelShown = wantLabel;
      label.classList.toggle('is-visible', wantLabel);
    }
    if (wantLabel) {
      label.style.transform = `translate3d(${(rx + rw / 2 - 6).toFixed(2)}px, ${(ry - rh / 2 - 24).toFixed(2)}px, 0)`;
    }
  }

  document.addEventListener('pointerover', onOver, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('scroll', onScroll);
      offPress();
      magnets.forEach((_, el) => {
        el.style.transform = '';
      });
      magnets.clear();
      html.classList.remove('fx-cursor-on');
    },
  };
}
