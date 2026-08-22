'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

export interface RevealOptions {
  /**
   * Which descendants to reveal. Defaults to any `[data-reveal]` element,
   * which is how sections opt in declaratively.
   */
  selector?: string;
  /** Milliseconds added per element in DOM order. 0 disables staggering. */
  stagger?: number;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /**
   * Shrinks the viewport from the bottom so elements reveal slightly before
   * they are fully on screen. Negative bottom value = trigger earlier.
   */
  rootMargin?: string;
  /** Reveal once and stop observing. True for content; false is rarely wanted. */
  once?: boolean;
}

const REVEALED = 'is-revealed';

/**
 * Declarative scroll reveal.
 *
 * Mark elements with `data-reveal="up" | "fade" | "clip" | "clip-left" | "scale"`
 * and call this hook on their common ancestor. The CSS in globals.css owns the
 * start and end states; this hook only toggles the `.is-revealed` class, so the
 * whole thing stays transform/opacity/clip-path only and never touches layout.
 *
 * Reduced motion is handled in CSS, but we also reveal everything instantly here
 * so nothing depends on an observer callback for correctness.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    selector = '[data-reveal]',
    stagger = 0,
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const collect = (): HTMLElement[] => {
      const found = Array.from(root.querySelectorAll<HTMLElement>(selector));
      if (root.matches(selector)) found.unshift(root);
      return found;
    };

    const targets = collect();
    if (targets.length === 0) return;

    // Reduced motion: show final state immediately, register nothing.
    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add(REVEALED));
      return;
    }

    // Stagger is assigned per observed group, not globally, so a section that
    // scrolls into view as a block still cascades in DOM order.
    const revealOrder = new Map<Element, number>();
    targets.forEach((el, index) => revealOrder.set(el, index));

    const observer = new IntersectionObserver(
      (entries) => {
        // Sort so a batch entering together respects DOM order, not observer order.
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (revealOrder.get(a.target) ?? 0) - (revealOrder.get(b.target) ?? 0),
          );

        entering.forEach((entry, batchIndex) => {
          const el = entry.target as HTMLElement;
          if (stagger > 0) {
            el.style.setProperty('--reveal-delay', `${batchIndex * stagger}ms`);
          }
          el.classList.add(REVEALED);
          if (once) observer.unobserve(el);
        });

        if (!once) {
          entries
            .filter((entry) => !entry.isIntersecting)
            .forEach((entry) => entry.target.classList.remove(REVEALED));
        }
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, stagger, threshold, rootMargin, once]);

  return ref;
}
