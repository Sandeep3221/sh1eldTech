'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The only call-to-action in the system.
 *
 * Colour discipline: primary is paper-on-ink — maximum contrast, no hue. Mint is
 * reserved for interaction states (hover, focus, active links) and signal orange
 * for indices. A CTA that introduces a third colour would make the palette
 * arbitrary, which is the thing we are trying to avoid.
 *
 * Every size is at least 44px tall so touch targets pass on mobile.
 * The arrow moves on hover; nothing scales, lifts or bounces.
 */

type Variant = 'primary' | 'outline' | 'inline';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-sans font-medium ' +
  'transition-colors duration-[--dur-mid] ease-[--ease-out-quart] ' +
  'focus:outline-none disabled:pointer-events-none disabled:opacity-45';

const variantClass: Record<Variant, string> = {
  primary:
    'rounded-full bg-paper-100 text-ink-900 hover:bg-white ' +
    'shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset]',
  outline:
    'rounded-full border border-white/15 text-fg-primary ' +
    'hover:border-white/35 hover:bg-white/[0.05]',
  inline:
    'text-fg-primary hover:text-mint px-0 py-1 gap-2 ' +
    'after:absolute after:left-0 after:-bottom-px after:h-px after:w-full ' +
    'after:origin-left after:scale-x-100 after:bg-white/25 ' +
    'after:transition-[background-color] after:duration-[--dur-mid] ' +
    'hover:after:bg-mint',
};

const sizeClass: Record<Size, string> = {
  md: 'min-h-11 px-6 text-[0.8125rem] tracking-[0.02em]',
  lg: 'min-h-14 px-8 text-[0.9375rem] tracking-[0.01em]',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing glyph. 'diagonal' for navigation, 'right' for progression, 'none' to omit. */
  arrow?: 'diagonal' | 'right' | 'none';
  /** Stretch to the container width — used in the mobile menu and form footer. */
  full?: boolean;
  className?: string;
}

type AsLink = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  >;

type AsButton = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >;

export type ActionProps = AsLink | AsButton;

function Glyph({ arrow }: { arrow: 'diagonal' | 'right' }) {
  const shared =
    'shrink-0 transition-transform duration-[--dur-mid] ease-[--ease-out-quart]';
  return arrow === 'diagonal' ? (
    <ArrowUpRight
      aria-hidden
      className={cn(shared, 'h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5')}
    />
  ) : (
    <ArrowRight aria-hidden className={cn(shared, 'h-4 w-4 group-hover:translate-x-1')} />
  );
}

export function Action(props: ActionProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    arrow = variant === 'inline' ? 'right' : 'diagonal',
    full = false,
    className,
    ...rest
  } = props;

  const classes = cn(
    base,
    variantClass[variant],
    variant === 'inline' ? 'min-h-11 text-[0.9375rem]' : sizeClass[size],
    full && 'w-full',
    className,
  );

  const content = (
    <>
      <span className={variant === 'inline' ? undefined : 'whitespace-nowrap'}>{children}</span>
      {arrow !== 'none' && <Glyph arrow={arrow} />}
    </>
  );

  if (typeof props.href === 'string') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const external = /^(https?:|mailto:|tel:)/.test(props.href);

    if (external) {
      return (
        <a href={props.href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
