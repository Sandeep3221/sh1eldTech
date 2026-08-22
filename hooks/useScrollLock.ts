'use client';

import { useEffect } from 'react';

/**
 * Locks page scroll while `locked` is true — for the mobile menu overlay.
 *
 * Compensates for the disappearing scrollbar by padding the body, otherwise the
 * whole layout shifts sideways the moment the menu opens. Restores the exact
 * previous inline values on unlock rather than assuming they were empty, so it
 * composes safely if anything else ever touches body style.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
