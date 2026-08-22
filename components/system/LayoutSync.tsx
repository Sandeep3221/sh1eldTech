'use client';

import { useEffect } from 'react';
import { refresh } from '@/lib/motion';

/**
 * Re-measures every scroll-linked effect once the page has actually settled.
 *
 * The problem this solves: web fonts and images change element heights *after*
 * first paint, but no `resize` event fires. Anything that cached geometry on
 * mount — the scroll driver, and ScrollGlobe's hero/stats measurements — is then
 * working from stale numbers, which shows up as the globe starting a few pixels
 * off its anchor.
 *
 * A synthetic resize event is used deliberately: ScrollGlobe already listens for
 * `resize` and re-runs its own measureBoxes(). This re-syncs the protected Earth
 * animation without editing a single line of it.
 */
export function LayoutSync() {
  useEffect(() => {
    let cancelled = false;

    const sync = () => {
      if (cancelled) return;
      refresh();
      window.dispatchEvent(new Event('resize'));
    };

    // Fonts swapping in is the biggest single source of post-paint layout shift.
    if (document.fonts?.status === 'loaded') {
      sync();
    } else {
      document.fonts?.ready.then(sync).catch(() => undefined);
    }

    // Late-decoding images (the hero media, service photography).
    if (document.readyState === 'complete') {
      sync();
    } else {
      window.addEventListener('load', sync, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', sync);
    };
  }, []);

  return null;
}
