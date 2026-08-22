import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * The single container in the system.
 *
 * Before this existed the site had three competing max-widths (max-w-7xl,
 * max-w-[1400px], max-w-4xl) with hand-written padding at every call site,
 * which is why mobile margins were inconsistent. Horizontal padding now comes
 * from one place: the --gutter custom property in globals.css.
 *
 *   default : reading + layout width, 1440px
 *   narrow  : long-form text, 880px — keeps line length readable
 *   bleed   : full viewport width, gutters only (for edge-to-edge media rows)
 *
 * Never add horizontal padding to a Container's parent or child. If content
 * needs to break the gutter, use width="bleed" and let the child own it.
 */

type ContainerWidth = 'default' | 'narrow' | 'bleed';

const widthClass: Record<ContainerWidth, string> = {
  default: 'u-container',
  narrow: 'u-container-narrow',
  bleed: 'u-bleed',
};

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
}

export function Container({
  as: Tag = 'div',
  width = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn(widthClass[width], className)} {...rest}>
      {children}
    </Tag>
  );
}
