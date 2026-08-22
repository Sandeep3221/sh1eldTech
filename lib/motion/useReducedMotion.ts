'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion`.
 *
 * Returns false during SSR and on the very first client render so markup is
 * stable during hydration; the real value lands in an effect immediately after.
 * Consumers should treat `true` as "render the final state, skip the motion".
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Synchronous check for use inside effects, where hook state is not available. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
