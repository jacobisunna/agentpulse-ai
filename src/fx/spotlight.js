// Feeds card-local pointer coordinates (--mx / --my) to every .spotlight-card
// under the pointer, so the border glow in index.css follows the cursor
// across each card rather than the viewport.
export function attachSpotlight() {
  let raf = 0;
  let x = -1;
  let y = -1;

  const update = () => {
    raf = 0;
    if (x < 0) return;
    // Hit-test instead of trusting the last event target: cards also move under
    // a resting pointer while the page scrolls
    const hit = document.elementFromPoint(x, y);
    let el = hit ? hit.closest('.spotlight-card') : null;
    while (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${x - r.left}px`);
      el.style.setProperty('--my', `${y - r.top}px`);
      el = el.parentElement ? el.parentElement.closest('.spotlight-card') : null;
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const onMove = (e) => {
    x = e.clientX;
    y = e.clientY;
    schedule();
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true, capture: true });
  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('scroll', schedule, { capture: true });
    cancelAnimationFrame(raf);
    document.querySelectorAll('.spotlight-card').forEach((el) => {
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    });
  };
}
