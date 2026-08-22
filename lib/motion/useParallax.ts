'use client';

import { useRef, type RefObject } from 'react';
import { useScrollScrub, type ScrubRange } from './useScrollScrub';
import { clamp } from '@/lib/utils';

export interface ParallaxOptions extends ScrubRange {
  /**
   * Total travel as a fraction of the element's own height.
   * Negative moves the element up as you scroll down (recedes / reads slower),
   * positive moves it down (leads / reads faster). Keep within ±0.3 — past that
   * parallax stops reading as depth and starts reading as a glitch.
   */
  amount?: number;
  /** Optional simultaneous scale that settles to 1, e.g. 1.12. */
  fromScale?: number;
  /** Disable below a breakpoint — parallax on phones mostly costs battery. */
  disabled?: boolean;
}

/**
 * Depth parallax. Writes one transform and nothing else.
 *
 * Layering convention used across this site: the background layer takes a
 * negative amount roughly double the foreground's. That difference is what
 * actually produces depth. More than two parallax layers per composition reads
 * as noise rather than dimension.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions = {},
): RefObject<T> {
  const {
    amount = -0.12,
    fromScale,
    disabled = false,
    start = 'enter',
    end = 'exit',
  } = options;

  const ref = useRef<T>(null);
  const lastTransform = useRef('');

  useScrollScrub<T>({
    ref,
    start,
    end,
    disabled,
    epsilon: 0.002,
    onUpdate: (p) => {
      const node = ref.current;
      if (!node) return;

      // Centre the travel so the element sits neutral at mid-viewport.
      const shift = (p - 0.5) * amount * 100;
      const transform =
        fromScale === undefined
          ? `translate3d(0, ${shift.toFixed(3)}%, 0)`
          : `translate3d(0, ${shift.toFixed(3)}%, 0) scale(${(
              fromScale + (1 - fromScale) * clamp(p, 0, 1)
            ).toFixed(4)})`;

      if (transform === lastTransform.current) return;
      lastTransform.current = transform;
      node.style.transform = transform;
    },
  });

  return ref;
}
