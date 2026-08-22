/**
 * SELECTED WORK — SAMPLE CONTENT
 * ============================================================================
 * Every `image` below points at a generated placeholder in
 * /public/images/placeholders/. They are deliberately marked on-canvas so no
 * one mistakes them for finished work.
 *
 * TO SWAP IN A REAL PROJECT:
 *   1. Drop the image in /public/images/work/
 *   2. Change the `image` path on that entry — nothing else
 *   3. Update title / category / year / summary in the same object
 *
 * Titles and copy here are provisional sample content. No client names, metrics
 * or outcomes are claimed, because inventing those would be worse than an
 * obvious placeholder.
 *
 * Aspect ratio: placeholders are 3:2 (1620×1080). Keeping replacements at the
 * same ratio means no layout adjustment is needed.
 * ============================================================================
 */

export interface Project {
  slug: string;
  title: string;
  /** Discipline mix, shown as the project's category line. */
  category: string;
  /** Delivery year, shown as metadata. */
  year: string;
  /** One or two sentences describing the scope of work. */
  summary: string;
  /** ▼ REPLACE ME — path to the project image. */
  image: string;
  imageAlt: string;
  /** Scope tags shown on hover / in the metadata row. */
  scope: string[];
  /**
   * Editorial weight. 'feature' spans the full container and leads a row;
   * 'standard' sits in the offset two-column rhythm. Alternating these is what
   * keeps the section from reading as a grid.
   */
  weight: 'feature' | 'standard';
}

export const projects: Project[] = [
  {
    slug: 'security-operations-dashboard',
    title: 'Security Operations Dashboard',
    category: 'Product design · Engineering',
    year: '2025',
    summary:
      'A monitoring surface for an internal security team — live event triage, severity routing, and an audit trail that holds up in review.',
    image: '/images/placeholders/work-01.webp',
    imageAlt: 'Placeholder image for the Security Operations Dashboard project',
    scope: ['UI/UX', 'Next.js', 'Design system'],
    weight: 'feature',
  },
  {
    slug: 'logistics-platform',
    title: 'Regional Logistics Platform',
    category: 'Web development',
    year: '2025',
    summary:
      'Consignment tracking and dispatch scheduling for freight moving through mountain routes, built to stay usable on patchy connections.',
    image: '/images/placeholders/work-02.webp',
    imageAlt: 'Placeholder image for the Regional Logistics Platform project',
    scope: ['Next.js', 'Offline-first', 'APIs'],
    weight: 'standard',
  },
  {
    slug: 'commerce-rebuild',
    title: 'Commerce Rebuild',
    category: 'Engineering · SEO',
    year: '2024',
    summary:
      'A storefront rebuilt around Core Web Vitals and structured data, replacing a template that could not be made fast.',
    image: '/images/placeholders/work-03.webp',
    imageAlt: 'Placeholder image for the Commerce Rebuild project',
    scope: ['Performance', 'Technical SEO', 'CMS'],
    weight: 'standard',
  },
  {
    slug: 'identity-system',
    title: 'Identity System',
    category: 'Branding',
    year: '2024',
    summary:
      'A wordmark, type system and asset library for a technology company that needed one identity across signage, product and print.',
    image: '/images/placeholders/work-04.webp',
    imageAlt: 'Placeholder image for the Identity System project',
    scope: ['Identity', 'Guidelines', 'Assets'],
    weight: 'feature',
  },
  {
    slug: 'field-health-app',
    title: 'Field Health App',
    category: 'Mobile engineering',
    year: '2023',
    summary:
      'A cross-platform app for health workers recording visits away from network coverage, syncing when a signal returns.',
    image: '/images/placeholders/work-05.webp',
    imageAlt: 'Placeholder image for the Field Health App project',
    scope: ['React Native', 'Sync', 'Accessibility'],
    weight: 'standard',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
