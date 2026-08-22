/**
 * scrollDriver — one scroll listener and one rAF for the entire site.
 *
 * Why this shape:
 *   Every scroll-linked effect on the page registers a `measure` and an
 *   `update`. Geometry reads happen ONLY in `measure` (on mount, on resize,
 *   and on explicit refresh). During scroll we run `update` alone, which does
 *   pure arithmetic on cached geometry and writes styles. That keeps reads and
 *   writes in separate phases, so scrolling never triggers layout thrash.
 *
 *   This mirrors how GSAP ScrollTrigger works internally (cache + refresh),
 *   which is what makes it swappable: replacing this file with ScrollTrigger
 *   equivalents would not require touching any section component.
 *
 * NOTE: components/3d/ScrollGlobe.tsx intentionally does NOT use this driver.
 * The Earth animation owns its own listener and is left exactly as it was.
 */

export interface ScrollState {
  /** Current window.scrollY. */
  scrollY: number;
  /** Viewport height in CSS pixels. */
  viewportH: number;
  /** Viewport width in CSS pixels, excluding the scrollbar. */
  viewportW: number;
}

export interface ScrollSubscriber {
  /** Read layout here. Called on register, on resize, and on refresh(). */
  measure?: (state: ScrollState) => void;
  /** Write styles here. Called every animation frame while scrolling. */
  update: (state: ScrollState) => void;
}

const subscribers = new Set<ScrollSubscriber>();

let frameHandle = 0;
let resizeHandle = 0;
let listening = false;
let needsMeasure = false;

const state: ScrollState = {
  scrollY: 0,
  viewportH: 0,
  viewportW: 0,
};

function readViewport(): void {
  state.scrollY = window.scrollY;
  // clientWidth excludes the classic scrollbar; innerWidth does not.
  state.viewportW = document.documentElement.clientWidth || window.innerWidth;
  state.viewportH = window.innerHeight;
}

function runFrame(): void {
  frameHandle = 0;
  readViewport();

  // Phase 1 — all reads, batched together.
  if (needsMeasure) {
    needsMeasure = false;
    subscribers.forEach((sub) => sub.measure?.(state));
  }

  // Phase 2 — all writes.
  subscribers.forEach((sub) => sub.update(state));
}

function requestFrame(): void {
  if (frameHandle !== 0) return;
  frameHandle = window.requestAnimationFrame(runFrame);
}

function handleScroll(): void {
  requestFrame();
}

function handleResize(): void {
  // Debounce to a frame: resize fires in bursts, and re-measuring is costly.
  if (resizeHandle !== 0) window.cancelAnimationFrame(resizeHandle);
  resizeHandle = window.requestAnimationFrame(() => {
    resizeHandle = 0;
    needsMeasure = true;
    requestFrame();
  });
}

function startListening(): void {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
}

function stopListening(): void {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
  if (frameHandle !== 0) {
    window.cancelAnimationFrame(frameHandle);
    frameHandle = 0;
  }
  if (resizeHandle !== 0) {
    window.cancelAnimationFrame(resizeHandle);
    resizeHandle = 0;
  }
}

/**
 * Register a scroll-linked effect. Returns an unsubscribe function.
 * The listener is attached on first subscriber and detached on last, so an
 * unmounted page leaves nothing behind.
 */
export function subscribe(sub: ScrollSubscriber): () => void {
  subscribers.add(sub);
  startListening();

  // Measure and paint this subscriber immediately so it is correct on mount
  // without waiting for the first scroll event.
  readViewport();
  sub.measure?.(state);
  sub.update(state);

  return () => {
    subscribers.delete(sub);
    if (subscribers.size === 0) stopListening();
  };
}

/**
 * Force every subscriber to re-read layout.
 * Call after fonts load, images decode, or a route/layout change resizes
 * content without firing a window resize.
 */
export function refresh(): void {
  if (typeof window === 'undefined') return;
  needsMeasure = true;
  requestFrame();
}

/** Read-only snapshot, for the rare consumer that needs it outside a frame. */
export function getScrollState(): Readonly<ScrollState> {
  if (typeof window !== 'undefined' && state.viewportH === 0) readViewport();
  return state;
}
