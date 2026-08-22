'use client';

import type { ElementType, HTMLAttributes } from 'react';
import { useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Reveal root. Any descendant carrying `data-reveal="up|fade|clip|clip-left|scale"`
 * animates in when it enters the viewport, staggered in DOM order.
 *
 *   <RevealGroup>
 *     <p data-reveal="up">first</p>
 *     <p data-reveal="up">second — 90ms later</p>
 *   </RevealGroup>
 *
 * One observer per group rather than one per element. Wrap a section, not every
 * paragraph — reveals are TERTIARY motion and should not compete with the globe.
 *
 * Under prefers-reduced-motion useReveal marks everything revealed immediately,
 * so nothing is ever stuck invisible.
 */

export interface RevealGroupProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** ms between siblings entering together. 0 disables stagger. */
  stagger?: number;
  /** Fraction of the element that must be visible before it triggers. */
  threshold?: number;
  /** Shrink the viewport from the bottom so reveals fire before the edge. */
  rootMargin?: string;
  /** Re-animate on every entry instead of once. Off by default. */
  repeat?: boolean;
}

export function RevealGroup({
  as: Tag = 'div',
  stagger = 90,
  threshold = 0.15,
  rootMargin = '0px 0px -12% 0px',
  repeat = false,
  className,
  children,
  ...rest
}: RevealGroupProps) {
  const ref = useReveal<HTMLElement>({
    stagger,
    threshold,
    rootMargin,
    once: !repeat,
  });

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
