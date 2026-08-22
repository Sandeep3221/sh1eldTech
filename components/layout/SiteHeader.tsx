'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Action } from '@/components/ui/Action';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { company } from '@/data/company';
import { navItems } from '@/data/nav';
import { subscribe } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Global header. Lives in app/layout.tsx, so it is present on every route —
 * previously it was nested inside HeroSection and the four sub-pages had no
 * navigation at all.
 *
 * It is fixed rather than in-flow, and the hero pads itself by --header-h. That
 * keeps the hero exactly one viewport tall, which matters: #hero-globe-anchor's
 * box is what ScrollGlobe measures to decide where the Earth starts.
 *
 * Contact appears once, as the CTA. A "CONTACT" link sitting next to a
 * "Let's talk" button pointing at the same page is the kind of duplication that
 * makes a nav look unconsidered.
 */

const SCROLLED_AFTER = 24;

export function SiteHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrolledRef = useRef(false);

  // Entrance runs on mount rather than off `.hero-ready`, so it also plays on
  // routes that have no hero.
  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  // Backdrop appears once the page has moved. Uses the shared scroll driver
  // instead of adding a listener, and the ref guard means setState fires only
  // when the threshold is actually crossed — not on every frame.
  useEffect(
    () =>
      subscribe({
        update: ({ scrollY }) => {
          const next = scrollY > SCROLLED_AFTER;
          if (next !== scrolledRef.current) {
            scrolledRef.current = next;
            setScrolled(next);
          }
        },
      }),
    [],
  );

  // Navigating with the menu open should close it.
  useEffect(() => setOpen(false), [pathname]);

  const links = navItems.filter((item) => item.href !== '/contact');
  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          'site-header fixed inset-x-0 top-0 z-50 h-[var(--header-h)]',
          mounted && 'is-mounted',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-[--dur-mid]',
            solid
              ? 'border-white/[0.07] bg-ink-900/80 backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
          aria-hidden
        />

        <div className="u-container flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${company.name} — home`}
            className="group shrink-0 font-heading text-base font-bold uppercase tracking-[-0.01em] text-fg-primary transition-colors duration-[--dur-mid] hover:text-mint sm:text-lg"
          >
            {company.name}
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-9 xl:gap-11">
              {links.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-active={active}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'nav-link relative block py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em]',
                        'transition-colors duration-[--dur-mid]',
                        active
                          ? 'text-fg-primary'
                          : 'text-fg-tertiary hover:text-fg-primary',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          'nav-link__rule absolute inset-x-0 bottom-0 block h-px',
                          active ? 'bg-mint' : 'bg-current',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Action
              href="/contact"
              variant={pathname === '/contact' ? 'outline' : 'primary'}
              className="hidden lg:inline-flex"
            >
              Let&apos;s talk
            </Action>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2.5 flex h-11 w-11 items-center justify-center text-fg-primary lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {/* Two rules crossing into an X — no third line, and it morphs
                  rather than swapping icons. */}
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    'absolute left-0 block h-px w-full bg-current',
                    'transition-transform duration-[--dur-mid] ease-[--ease-out-quart]',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-px w-full bg-current',
                    'transition-transform duration-[--dur-mid] ease-[--ease-out-quart]',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={navItems}
        pathname={pathname}
        triggerRef={triggerRef}
      />
    </>
  );
}
