import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Section masthead: index + label on a hairline, then the headline, then an
 * optional lede. Shared across sections so the site has one editorial voice —
 * the sections differ in composition and colour, not in how they announce
 * themselves.
 *
 * Carries its own data-reveal attributes. Put a <RevealGroup> somewhere above it
 * and the eyebrow, headline and lede cascade in order. No wrapper needed here.
 *
 * `tone="light"` is for sections that sit on paper rather than ink.
 */

export interface SectionHeadingProps {
  /** Two-digit section index, e.g. "02". Rendered in signal orange. */
  index?: string;
  /** Short uppercase category, e.g. "SELECTED WORK". */
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Slot for an Action, sits opposite the headline on desktop. */
  action?: ReactNode;
  tone?: 'dark' | 'light';
  /** Headline scale. Section headings are 'lg'; page titles use 'xl'. */
  scale?: 'md' | 'lg' | 'xl';
  className?: string;
  /** Renders as an h1 on route pages, h2 inside the home page. */
  as?: 'h1' | 'h2';
}

const scaleClass = {
  md: 't-display-md',
  lg: 't-display-lg',
  xl: 't-display-xl',
} as const;

export function SectionHeading({
  index,
  label,
  title,
  lede,
  action,
  tone = 'dark',
  scale = 'lg',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const light = tone === 'light';

  return (
    <div className={cn('w-full', className)}>
      {(index || label) && (
        <div
          data-reveal="fade"
          className="mb-8 flex items-center gap-4 sm:mb-10 sm:gap-5"
        >
          {index && (
            <span className="font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-signal">
              {index}
            </span>
          )}
          {label && (
            <span
              className={cn(
                't-meta font-mono',
                light ? 'text-fg-on-paper-muted' : 'text-fg-tertiary',
              )}
            >
              {label}
            </span>
          )}
          <span
            aria-hidden
            className={cn(
              'h-px flex-1 origin-left',
              light ? 'bg-black/10' : 'bg-white/10',
            )}
          />
        </div>
      )}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Tag
          data-reveal="up"
          className={cn(
            'font-heading font-semibold t-balance',
            scaleClass[scale],
            light ? 'text-fg-on-paper' : 'text-fg-primary',
            lede ? 'max-w-[18ch] lg:max-w-[22ch]' : 'max-w-[24ch]',
          )}
        >
          {title}
        </Tag>

        {lede && (
          <p
            data-reveal="up"
            className={cn(
              't-body-lg t-pretty max-w-[52ch] lg:max-w-[38ch] lg:pb-2',
              light ? 'text-fg-on-paper-muted' : 'text-fg-secondary',
            )}
          >
            {lede}
          </p>
        )}

        {action && !lede && (
          <div data-reveal="fade" className="lg:pb-3">
            {action}
          </div>
        )}
      </div>

      {action && lede && (
        <div data-reveal="fade" className="mt-10">
          {action}
        </div>
      )}
    </div>
  );
}
