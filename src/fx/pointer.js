// Shared pointer state for every interactive effect. It is mutated in place by a
// single set of window listeners and read from requestAnimationFrame loops, so
// pointer movement never triggers a React render.
export const pointer = {
  x: -10000,
  y: -10000,
  vx: 0, // smoothed velocity, px per ms
  vy: 0,
  inside: false, // pointer is currently over the page
  down: false,
  type: 'mouse',
  lastMove: 0,
};

const pulseListeners = new Set();
const pressListeners = new Set();

// Fires on every primary-button press with the click coordinates.
export function onPulse(fn) {
  pulseListeners.add(fn);
  return () => pulseListeners.delete(fn);
}

// Fires with true/false as the primary button goes down/up.
export function onPress(fn) {
  pressListeners.add(fn);
  return () => pressListeners.delete(fn);
}

let refCount = 0;
let detach = null;

export function attachPointer() {
  if (refCount++ === 0) detach = install();
  return () => {
    if (--refCount === 0 && detach) {
      detach();
      detach = null;
    }
  };
}

function install() {
  let lastT = 0;

  const move = (e) => {
    const now = performance.now();
    if (pointer.inside && now - lastT < 100) {
      const dt = Math.max(1, now - lastT);
      pointer.vx = pointer.vx * 0.55 + ((e.clientX - pointer.x) / dt) * 0.45;
      pointer.vy = pointer.vy * 0.55 + ((e.clientY - pointer.y) / dt) * 0.45;
    } else {
      pointer.vx = 0;
      pointer.vy = 0;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.type = e.pointerType || 'mouse';
    pointer.inside = true;
    pointer.lastMove = now;
    lastT = now;
  };

  const down = (e) => {
    if (e.button !== 0) return;
    pointer.down = true;
    pointer.type = e.pointerType || 'mouse';
    pulseListeners.forEach((fn) => fn(e.clientX, e.clientY));
    pressListeners.forEach((fn) => fn(true));
  };

  const up = () => {
    if (!pointer.down) return;
    pointer.down = false;
    pressListeners.forEach((fn) => fn(false));
  };

  // relatedTarget is null when the pointer leaves the window entirely
  const out = (e) => {
    if (!e.relatedTarget) pointer.inside = false;
  };
  const blur = () => {
    pointer.inside = false;
    up();
  };

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', down, { passive: true });
  window.addEventListener('pointerup', up, { passive: true });
  window.addEventListener('pointercancel', up, { passive: true });
  window.addEventListener('pointerout', out, { passive: true });
  window.addEventListener('blur', blur);

  return () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerdown', down);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    window.removeEventListener('pointerout', out);
    window.removeEventListener('blur', blur);
    pointer.inside = false;
    pointer.down = false;
  };
}
