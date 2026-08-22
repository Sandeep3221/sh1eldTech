'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { subscribe, type ScrollState } from './scrollDriver';
import { prefersReducedMotion } from './useReducedMotion';
import { progress as normalise } from '@/lib/utils';

/** Where a scrub range begins and ends, expressed against the viewport. */
export interface ScrubRange {
  /**
   * Start of the range.
   *  'enter'      — element top hits viewport bottom
   *  'enter-half' — element top hits viewport middle
   *  'top'        — element top hits viewport top (pinned sequences)
   *  'center'     — element centre hits viewport centre
   */
  start?: 'enter' | 'enter-half' | 'top' | 'center';
  /**
   * End of the range.
   *  'exit'       — element bottom leaves viewport top
   *  'exit-half'  — element centre leaves viewport top
   *  'bottom'     — element bottom hits viewport bottom
   *  'scroll'     — element height minus one viewport (native sticky sequences)
   */
  end?: 'exit' | 'exit-half' | 'bottom' | 'scroll';
}

export interface ScrubOptions<T extends HTMLElement = HTMLElement>
  extends ScrubRange {
  /**
   * Called with progress 0→1 whenever it changes.
   * Write styles here — this runs inside the shared rAF write phase.
   */
  onUpdate: (progress: number, state: ScrollState) => void;
  /** Skip updates smaller than this to avoid pointless style writes. */
  epsilon?: number;
  /** When true the effect is torn down (e.g. below a breakpoint). */
  disabled?: boolean;
  /**
   * Supply your own ref when the caller needs the element inside `onUpdate`.
   * Omit it and the hook creates one for you.
   */
  ref?: RefObject<T>;
}

/**
 * Maps an element's scroll position to a 0→1 progress value.
 *
 * Geometry is cached in `measure` and only refreshed on resize, so scrolling
 * costs one subtraction and one clamp per subscriber. `onUpdate` is held in a
 * ref so callers can pass an inline arrow without re-subscribing every render.
 */
export function useScrollScrub<T extends HTMLElement = HTMLElement>(
  options: ScrubOptions<T>,
): RefObject<T> {
  const {
    onUpdate,
    start = 'enter',
    end = 'exit',
    epsilon = 0.001,
    disabled = false,
    ref: externalRef,
  } = options;

  const internalRef = useRef<T>(null);
  const ref = externalRef ?? internalRef;

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    // Reduced motion: settle at the end state once and do no scroll work.
    if (prefersReducedMotion()) {
      onUpdateRef.current(1, {
        scrollY: 0,
        viewportH: window.innerHeight,
        viewportW: document.documentElement.clientWidth,
      });
      return;
    }

    let rangeStart = 0;
    let rangeEnd = 1;
    let last = -1;

    const unsubscribe = subscribe({
      measure(state) {
        const rect = el.getBoundingClientRect();
        const docTop = rect.top + state.scrollY;
        const height = rect.height;
        const vh = state.viewportH;

        switch (start) {
          case 'top':
            rangeStart = docTop;
            break;
          case 'enter-half':
            rangeStart = docTop - vh * 0.5;
            break;
          case 'center':
            rangeStart = docTop + height / 2 - vh / 2;
            break;
          case 'enter':
          default:
            rangeStart = docTop - vh;
            break;
        }

        switch (end) {
          case 'bottom':
            rangeEnd = docTop + height - vh;
            break;
          case 'exit-half':
            rangeEnd = docTop + height / 2;
            break;
          case 'scroll':
            rangeEnd = docTop + height - vh;
            break;
          case 'exit':
          default:
            rangeEnd = docTop + height;
            break;
        }

        // Guarantee a usable range even for zero-height or tiny elements.
        if (rangeEnd - rangeStart < 1) rangeEnd = rangeStart + 1;
      },
      update(state) {
        const value = normalise(state.scrollY, rangeStart, rangeEnd);
        if (Math.abs(value - last) < epsilon && last !== -1) return;
        last = value;
        onUpdateRef.current(value, state);
      },
    });

    return unsubscribe;
    // `ref` is either the caller's RefObject or the stable internal one — its
    // identity never changes, so listing it here is inert but keeps the
    // exhaustive-deps rule satisfied without an eslint-disable.
  }, [ref, start, end, epsilon, disabled]);

  return ref;
}
