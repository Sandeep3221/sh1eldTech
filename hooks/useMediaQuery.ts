'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query.
 *
 * Returns `false` on the server and on first client render so SSR and hydration
 * agree; the true value arrives in the effect on the same tick as paint. Any
 * layout that would break while briefly `false` should be expressed in CSS
 * instead of gated on this hook.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Breakpoints matching tailwind.config.ts, so JS and CSS never disagree. */
export const BREAKPOINTS = {
  xs: 380,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** True at tablet width and up — the threshold where pinned sequences turn on. */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
}
