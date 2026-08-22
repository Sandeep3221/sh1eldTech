/**
 * Motion layer — the single place scroll-linked behaviour is defined.
 *
 * Everything here is transform / opacity / clip-path only, driven by one shared
 * listener (scrollDriver) or IntersectionObserver. No layout properties are
 * animated anywhere.
 *
 * Swapping in GSAP later: replace the internals of `useReveal`,
 * `useScrollScrub` and `useParallax` with ScrollTrigger equivalents. Section
 * components consume only these three hooks plus the `data-reveal` attribute
 * contract, so none of them would need to change.
 *
 * Deliberately NOT routed through here: components/3d/ScrollGlobe.tsx. The Earth
 * animation keeps its own scroll listener and original maths, untouched.
 */

export { subscribe, refresh, getScrollState } from './scrollDriver';
export type { ScrollState, ScrollSubscriber } from './scrollDriver';

export { useReducedMotion, prefersReducedMotion } from './useReducedMotion';

export { useReveal } from './useReveal';
export type { RevealOptions } from './useReveal';

export { useScrollScrub } from './useScrollScrub';
export type { ScrubOptions, ScrubRange } from './useScrollScrub';

export { useParallax } from './useParallax';
export type { ParallaxOptions } from './useParallax';
