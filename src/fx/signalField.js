import { pointer, onPulse } from './pointer';

// "Signal field": a fixed lattice of points behind the page. Near the cursor the
// lattice bends outward like a lens, lights up in the brand gradient and reveals
// the circuit links between neighbours. Clicks send a shockwave through it, and
// small signals wander the grid on their own so the page feels alive at rest.

const TAU = Math.PI * 2;

// Brand gradient sampled left → right across the viewport
const STOPS = [
  [79, 70, 229], // indigo-600
  [37, 99, 235], // blue-600
  [8, 145, 178], // cyan-600
  [124, 58, 237], // violet-600
];
const LUT_SIZE = 48;
const LUT = Array.from({ length: LUT_SIZE }, (_, i) => {
  const t = (i / (LUT_SIZE - 1)) * (STOPS.length - 1);
  const k = Math.min(Math.floor(t), STOPS.length - 2);
  const f = t - k;
  const [a, b] = [STOPS[k], STOPS[k + 1]];
  const mix = (j) => Math.round(a[j] + (b[j] - a[j]) * f);
  return `rgb(${mix(0)}, ${mix(1)}, ${mix(2)})`;
});

const REST_COLOR = 'rgb(100, 116, 139)'; // slate-500
const REST_ALPHA = 0.3;
const RADIUS = 190; // cursor influence radius (px)
const LENS = 16; // max outward displacement near the cursor (px)
const LINK_MIN = 0.16; // energy needed before a neighbour link is drawn
const RIPPLE_SPEED = 0.95; // px per ms
const RIPPLE_LIFE = 1250; // ms
const RIPPLE_BAND = 52; // px thickness of the shockwave front
const SIGNAL_STEP = 80; // ms per hop for wandering signals
const PARALLAX = 0.18; // lattice scroll speed relative to the page

const ALPHA_LEVELS = 8;
const HUE_LEVELS = 4;

export function createSignalField(canvas) {
  const ctx = canvas.getContext('2d');
  // Pre-rendered resting lattice, blitted once per frame
  const layer = document.createElement('canvas');
  const lctx = layer.getContext('2d');

  let dpr = 1;
  let W = 0;
  let H = 0;
  let S = 30;
  let cols = 0;
  let rows = 0;
  let n = 0;
  let hx, hy, ox, oy, vx, vy, en, hue;
  let active = new Int32Array(0);
  let activeCount = 0;
  let shift = 0; // fractional parallax offset, 0 .. -S
  let wrapRows = 0; // whole lattice rows the parallax has scrolled past

  const ripples = [];
  const signals = [];
  let nextSignalAt = 0;
  let lastSparkAt = 0;

  const linkBuckets = Array.from({ length: ALPHA_LEVELS * HUE_LEVELS }, () => []);

  let raf = 0;
  let lastDraw = performance.now() - 16;
  let resizeTimer = 0;

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    S = W < 768 ? 26 : 30;
    cols = Math.ceil(W / S) + 1;
    rows = Math.ceil(H / S) + 2; // extra row covers the scroll parallax shift
    n = cols * rows;

    hx = new Float32Array(n);
    hy = new Float32Array(n);
    ox = new Float32Array(n);
    oy = new Float32Array(n);
    vx = new Float32Array(n);
    vy = new Float32Array(n);
    en = new Float32Array(n);
    hue = new Uint8Array(n);
    active = new Int32Array(n);
    activeCount = 0;
    signals.length = 0;

    const x0 = (W - (cols - 1) * S) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        hx[i] = x0 + c * S;
        hy[i] = S / 2 + r * S;
        const t = Math.min(1, Math.max(0, (hx[i] / W) * 0.82 + (hy[i] / H) * 0.18));
        hue[i] = Math.round(t * (LUT_SIZE - 1));
      }
    }

    layer.width = Math.round(W * dpr);
    layer.height = Math.round((H + S) * dpr);
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lctx.clearRect(0, 0, W, H + S);
    lctx.fillStyle = REST_COLOR;
    lctx.globalAlpha = REST_ALPHA;
    lctx.beginPath();
    for (let i = 0; i < n; i++) {
      if (hy[i] > H + S) continue;
      lctx.moveTo(hx[i] + 1, hy[i]);
      lctx.arc(hx[i], hy[i], 1, 0, TAU);
    }
    lctx.fill();
    lctx.globalAlpha = 1;

    const off = Math.max(0, window.scrollY) * PARALLAX;
    wrapRows = Math.floor(off / S);
    shift = -(off - wrapRows * S);
  }

  // The lattice drifts with scroll. Each time the offset passes a whole row, move
  // the per-dot state with it, so lit dots and signals stay put on screen.
  function updateParallax() {
    const off = Math.max(0, window.scrollY) * PARALLAX;
    const wrap = Math.floor(off / S);
    shift = -(off - wrap * S);
    const d = wrap - wrapRows;
    if (d === 0) return;
    wrapRows = wrap;

    const states = [ox, oy, vx, vy, en];
    if (Math.abs(d) >= rows) {
      states.forEach((arr) => arr.fill(0));
      signals.length = 0;
      return;
    }
    const k = Math.abs(d) * cols;
    states.forEach((arr) => {
      if (d > 0) {
        arr.copyWithin(0, k);
        arr.fill(0, n - k);
      } else {
        arr.copyWithin(k, 0, n - k);
        arr.fill(0, 0, k);
      }
    });
    for (let s = signals.length - 1; s >= 0; s--) {
      signals[s].r -= d;
      if (signals[s].r < 0 || signals[s].r >= rows) signals.splice(s, 1);
    }
  }

  function addSignal(c, r, dir, hops, now) {
    if (signals.length >= 10) return;
    signals.push({ c, r, dc: dir[0], dr: dir[1], hops, next: now });
  }

  const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function updateSignals(now, live) {
    // Ambient: a new signal every ~1s from a random point
    if (now >= nextSignalAt) {
      const c = (Math.random() * cols) | 0;
      const r = (Math.random() * rows) | 0;
      addSignal(c, r, DIRS[(Math.random() * 4) | 0], 7 + ((Math.random() * 10) | 0), now);
      nextSignalAt = now + 650 + Math.random() * 900;
    }

    // Fast cursor movement throws off sparks that race along the grid. Velocity is
    // only sampled on pointermove, so ignore it once the mouse has come to rest.
    const moving = now - pointer.lastMove < 60;
    const speed = moving ? Math.hypot(pointer.vx, pointer.vy) : 0;
    if (live && speed > 0.7 && now - lastSparkAt > 110) {
      lastSparkAt = now;
      const c = Math.round((pointer.x - hx[0]) / S);
      const r = Math.round((pointer.y - shift - hy[0]) / S);
      if (c >= 0 && c < cols && r >= 0 && r < rows) {
        // Perpendicular to the motion, so sparks fan out of the cursor trail
        const horizontal = Math.abs(pointer.vx) > Math.abs(pointer.vy);
        const dir = horizontal
          ? [0, Math.random() < 0.5 ? 1 : -1]
          : [Math.random() < 0.5 ? 1 : -1, 0];
        addSignal(c, r, dir, 4 + ((Math.random() * 5) | 0), now);
      }
    }

    for (let s = signals.length - 1; s >= 0; s--) {
      const sig = signals[s];
      while (now >= sig.next && sig.hops > 0) {
        const i = sig.r * cols + sig.c;
        if (en[i] < 0.85) en[i] = 0.85;
        // Mostly straight, sometimes turning 90°, like a trace on a circuit board
        if (Math.random() < 0.22) {
          const turn = Math.random() < 0.5 ? 1 : -1;
          const { dc, dr } = sig;
          sig.dc = -dr * turn;
          sig.dr = dc * turn;
        }
        sig.c += sig.dc;
        sig.r += sig.dr;
        sig.hops--;
        sig.next += SIGNAL_STEP;
        if (sig.c < 0 || sig.c >= cols || sig.r < 0 || sig.r >= rows) sig.hops = 0;
      }
      if (sig.hops <= 0) signals.splice(s, 1);
    }
  }

  function step(k, dtMs, live) {
    for (let j = ripples.length - 1; j >= 0; j--) {
      const rp = ripples[j];
      rp.age += dtMs;
      rp.r = rp.age * RIPPLE_SPEED;
      rp.power = Math.pow(Math.max(0, 1 - rp.age / RIPPLE_LIFE), 1.5);
      if (rp.age >= RIPPLE_LIFE) ripples.splice(j, 1);
    }

    const px = pointer.x;
    const py = pointer.y;
    const R2 = RADIUS * RADIUS;
    const decay = Math.pow(0.935, k);
    const stiff = 0.1 * k;
    const damp = Math.pow(0.8, k);
    const rippleCount = ripples.length;

    activeCount = 0;
    for (let i = 0; i < n; i++) {
      let e = en[i] * decay;
      let tx = 0;
      let ty = 0;
      const sx = hx[i];
      const sy = hy[i] + shift;

      if (live) {
        const dx = sx - px;
        const dy = sy - py;
        if (dx > -RADIUS && dx < RADIUS && dy > -RADIUS && dy < RADIUS) {
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / RADIUS;
            const s = f * f * (3 - 2 * f); // smoothstep falloff
            tx = (dx / d) * s * LENS;
            ty = (dy / d) * s * LENS;
            if (s > e) e = s;
          }
        }
      }

      for (let j = 0; j < rippleCount; j++) {
        const rp = ripples[j];
        const dx = sx - rp.x;
        const dy = sy - rp.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const band = Math.abs(d - rp.r);
        if (band < RIPPLE_BAND) {
          const w = (1 - band / RIPPLE_BAND) * rp.power;
          vx[i] += (dx / d) * w * 2.6 * k;
          vy[i] += (dy / d) * w * 2.6 * k;
          if (w * 0.95 > e) e = w * 0.95;
        }
      }

      vx[i] = (vx[i] + (tx - ox[i]) * stiff) * damp;
      vy[i] = (vy[i] + (ty - oy[i]) * stiff) * damp;
      ox[i] += vx[i] * k;
      oy[i] += vy[i] * k;
      en[i] = e < 0.004 ? 0 : e;

      if (e > 0.02 || ox[i] > 0.12 || ox[i] < -0.12 || oy[i] > 0.12 || oy[i] < -0.12) {
        active[activeCount++] = i;
      }
    }
  }

  function draw(live) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    ctx.drawImage(layer, 0, shift, W, H + S);

    // Punch out the resting copy of every dot that is about to be redrawn
    for (let a = 0; a < activeCount; a++) {
      const i = active[a];
      ctx.clearRect(hx[i] - 2, hy[i] + shift - 2, 4, 4);
    }

    // Soft aura under the cursor
    if (live) {
      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
      g.addColorStop(0, 'rgba(99, 102, 241, 0.10)');
      g.addColorStop(0.45, 'rgba(6, 182, 212, 0.045)');
      g.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(pointer.x - 260, pointer.y - 260, 520, 520);
    }

    // Circuit links between neighbouring energised dots, batched by alpha/hue
    for (let b = 0; b < linkBuckets.length; b++) linkBuckets[b].length = 0;
    for (let a = 0; a < activeCount; a++) {
      const i = active[a];
      const ei = en[i];
      if (ei < LINK_MIN) continue;
      const xi = hx[i] + ox[i];
      const yi = hy[i] + shift + oy[i];
      const hueLevel = ((hue[i] / LUT_SIZE) * HUE_LEVELS) | 0;
      // right neighbour
      if ((i + 1) % cols !== 0) {
        const j = i + 1;
        if (en[j] >= LINK_MIN) {
          const lv = Math.min(ALPHA_LEVELS - 1, (Math.min(ei, en[j]) * ALPHA_LEVELS) | 0);
          linkBuckets[lv * HUE_LEVELS + hueLevel].push(xi, yi, hx[j] + ox[j], hy[j] + shift + oy[j]);
        }
      }
      // neighbour below
      const j = i + cols;
      if (j < n && en[j] >= LINK_MIN) {
        const lv = Math.min(ALPHA_LEVELS - 1, (Math.min(ei, en[j]) * ALPHA_LEVELS) | 0);
        linkBuckets[lv * HUE_LEVELS + hueLevel].push(xi, yi, hx[j] + ox[j], hy[j] + shift + oy[j]);
      }
    }
    ctx.lineWidth = 1;
    for (let b = 0; b < linkBuckets.length; b++) {
      const seg = linkBuckets[b];
      if (!seg.length) continue;
      const lv = (b / HUE_LEVELS) | 0;
      const hl = b % HUE_LEVELS;
      ctx.globalAlpha = Math.pow((lv + 1) / ALPHA_LEVELS, 1.4) * 0.5;
      ctx.strokeStyle = LUT[Math.round(((hl + 0.5) / HUE_LEVELS) * (LUT_SIZE - 1))];
      ctx.beginPath();
      for (let s = 0; s < seg.length; s += 4) {
        ctx.moveTo(seg[s], seg[s + 1]);
        ctx.lineTo(seg[s + 2], seg[s + 3]);
      }
      ctx.stroke();
    }

    // Energised / displaced dots
    for (let a = 0; a < activeCount; a++) {
      const i = active[a];
      const e = en[i];
      const x = hx[i] + ox[i];
      const y = hy[i] + shift + oy[i];
      if (e < 0.05) {
        ctx.globalAlpha = REST_ALPHA;
        ctx.fillStyle = REST_COLOR;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, TAU);
        ctx.fill();
        continue;
      }
      ctx.fillStyle = LUT[hue[i]];
      if (e > 0.7) {
        // faint halo on the hottest points
        ctx.globalAlpha = (e - 0.7) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 3 + e * 4, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = Math.min(0.9, REST_ALPHA + e * 0.75);
      ctx.beginPath();
      ctx.arc(x, y, 1 + e * 1.9, 0, TAU);
      ctx.fill();
    }

    // Shockwave rings
    for (let j = 0; j < ripples.length; j++) {
      const rp = ripples[j];
      ctx.globalAlpha = rp.power * 0.4;
      ctx.strokeStyle = LUT[8];
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, TAU);
      ctx.stroke();
      if (rp.r > 24) {
        ctx.globalAlpha = rp.power * 0.22;
        ctx.strokeStyle = LUT[30];
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.8, 0, TAU);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);

    // Drop to ~30fps when nobody is interacting, to spare the battery
    const live = pointer.inside && pointer.type === 'mouse';
    const idle = !live || now - pointer.lastMove > 2500;
    if (idle && ripples.length === 0 && now - lastDraw < 32) return;
    const dtMs = Math.min(now - lastDraw, 50);
    lastDraw = now;

    updateParallax();
    updateSignals(now, live);
    step(dtMs / 16.667, dtMs, live);
    draw(live);
  }

  const offPulse = onPulse((x, y) => {
    if (ripples.length > 4) ripples.shift();
    ripples.push({ x, y, r: 0, age: 0, power: 1 });
  });

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 120);
  };

  // Moving the window to a display with a different scale changes devicePixelRatio
  // without a resize event; rebuild so the backing store stays sharp
  let dprQuery = null;
  const onDprChange = () => {
    build();
    watchDpr();
  };
  const watchDpr = () => {
    if (dprQuery) dprQuery.removeEventListener('change', onDprChange);
    dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    dprQuery.addEventListener('change', onDprChange);
  };

  build();
  watchDpr();
  window.addEventListener('resize', onResize);
  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      dprQuery.removeEventListener('change', onDprChange);
      offPulse();
    },
  };
}
