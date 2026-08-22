import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Continuous horizontal track. Used once, for the credibility strip.
 *
 * The children are rendered twice — the CSS animation translates the track by
 * exactly -50%, so the second copy is mid-frame when the first wraps and the
 * loop is seamless. The duplicate is aria-hidden so screen readers read the set
 * once. Animation pauses on hover and focus-within (see .u-marquee in
 * globals.css) so nothing scrolls away from a keyboard user mid-tab.
 *
 * The edge mask is functional, not decorative: without it logos hard-cut at the
 * viewport edge and read as broken layout.
 */

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  /** Reverse direction — used to offset a second row against the first. */
  reverse?: boolean;
  className?: string;
}

export function Marquee({ children, duration = 46, reverse = false, className }: MarqueeProps) {
  return (
    <div
      className={cn('u-marquee relative w-full overflow-hidden', className)}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="u-marquee-track"
        style={{
          ['--marquee-duration' as string]: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
