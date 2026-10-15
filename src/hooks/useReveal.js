import { useEffect } from 'react';

// Fades [data-reveal] elements up as they scroll into view. Elements rendered
// later (tab switches, modals) are picked up by the MutationObserver. Content is
// only hidden after this runs (html.reveal-ready), so nothing stays invisible
// if JavaScript fails.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    const observe = (scope) => {
      scope.querySelectorAll?.('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el));
    };

    observe(document);
    root.classList.add('reveal-ready');

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches('[data-reveal]:not(.is-revealed)')) io.observe(node);
          observe(node);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
