export interface NavItem {
  label: string;
  href: string;
  /** Section id on the home page, used when the link should scroll instead of route. */
  anchor?: string;
}

/**
 * Primary navigation. Home carries condensed versions of each area and these
 * routes hold the full treatment, so the nav points at routes rather than
 * anchors — deep links stay shareable and each page keeps its own metadata.
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', anchor: 'services' },
  { label: 'Work', href: '/work', anchor: 'work' },
  { label: 'About', href: '/about', anchor: 'about' },
  { label: 'Contact', href: '/contact', anchor: 'contact' },
];

/** Section ids on the home page — used by in-page "view all" links and skip nav. */
export const homeSections = {
  hero: 'top',
  stats: 'globe-destination',
  positioning: 'positioning',
  services: 'services',
  work: 'work',
  about: 'about',
  cta: 'cta',
  contact: 'contact',
} as const;
