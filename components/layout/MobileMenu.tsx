'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { Action } from '@/components/ui/Action';
import { company } from '@/data/company';
import type { NavItem } from '@/data/nav';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn, padIndex } from '@/lib/utils';

/**
 * Full-height mobile navigation.
 *
 * Stays mounted and is hidden with `visibility: hidden` (see .menu-panel in
 * globals.css) rather than unmounted, which is what makes the exit animation
 * possible while still removing the panel from the tab order when closed.
 *
 * Sits at z-40, below the header at z-50, so the header's close button stays
 * visible and the panel reads as wiping down from underneath it. The focus trap
 * therefore has to include that button, which is why the trigger is passed in.
 */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement>;
}

export function MobileMenu({ open, onClose, items, pathname, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useScrollLock(open);

  /** Panel focusables plus the header toggle, which lives outside the panel. */
  const focusables = useCallback((): HTMLElement[] => {
    const inPanel = panelRef.current
      ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      : [];
    const trigger = triggerRef.current;
    return trigger ? [...inPanel, trigger] : inPanel;
  }, [triggerRef]);

  // Move focus in on open, and back to the toggle on close — but only if the
  // menu was actually open, so we never steal focus on first mount.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const first = focusables()[0];
      // Wait a frame: the panel is visibility:hidden until the class flips.
      const handle = requestAnimationFrame(() => first?.focus());
      return () => cancelAnimationFrame(handle);
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, focusables, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const list = focusables();
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, focusables]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      data-open={open}
      className="menu-panel fixed inset-0 z-40 flex flex-col bg-ink-900 pt-[var(--header-h)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <nav
        className="flex flex-1 flex-col justify-center px-gutter"
        aria-label="Mobile primary"
      >
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="border-t border-white/[0.07] last:border-b">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  style={{ ['--menu-delay' as string]: `${120 + index * 55}ms` }}
                  className={cn(
                    'menu-item group flex items-baseline gap-5 py-5 xs:py-6',
                    'transition-colors duration-[--dur-fast]',
                    active ? 'text-fg-primary' : 'text-fg-secondary active:text-fg-primary',
                  )}
                >
                  <span className="t-display-md font-heading font-semibold tracking-[-0.02em]">
                    {item.label}
                  </span>
                  {active && (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-mint" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="menu-item px-gutter pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
        style={{ ['--menu-delay' as string]: `${120 + items.length * 55}ms` }}
      >
        <div className="flex flex-col gap-1.5 pb-7">
          <a
            href={`mailto:${company.email}`}
            className="t-wrap-anywhere text-[0.9375rem] text-fg-secondary transition-colors hover:text-mint"
          >
            {company.email}
          </a>
          <a
            href={`tel:${company.phoneHref}`}
            className="font-mono text-[0.9375rem] text-fg-secondary transition-colors hover:text-mint"
          >
            {company.phone}
          </a>
        </div>
        <Action href="/contact" onClick={onClose} size="lg" full>
          Start a project
        </Action>
      </div>
    </div>
  );
}
