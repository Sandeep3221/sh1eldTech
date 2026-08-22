export interface Service {
  slug: string;
  title: string;
  /** Short category label shown beside the index. */
  discipline: string;
  /** One line, used as the editorial lead-in. */
  summary: string;
  /** Two to three sentences. Concrete, no filler. */
  description: string;
  /** Concrete deliverables, 4 each — these are what a client actually receives. */
  capabilities: string[];
  /**
   * Existing asset from /public/images, or null.
   * Cybersecurity has no photograph in the project, so it renders with a
   * typographic/graphic treatment instead of a placeholder image.
   */
  image: string | null;
  imageAlt: string;
}

/**
 * Cybersecurity leads the list because it is the company's namesake and its
 * sharpest differentiator; the six image-backed disciplines follow. Reordering
 * is a matter of moving an entry in this array — every services surface on the
 * site reads from here and derives its own numbering.
 */
export const services: Service[] = [

  {
    slug: 'web-development',
    title: 'Web Development',
    discipline: 'Engineering',
    summary: 'Sites that are still fast a year after launch.',
    description:
      'Typed end to end, built on Next.js. We set performance budgets up front — bundle size, image weight, database round trips — because retrofitting speed always costs more than designing for it.',
    capabilities: [
      'Next.js & React',
      'APIs & backend',
      'Performance budgets',
      'Analytics wiring',
    ],
    image: '/images/web-development.webp',
    imageAlt: 'Developer workspace with code on screen',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    discipline: 'Product design',
    summary: 'Fewer screens, clearer decisions.',
    description:
      'We map the path a person actually takes, cut the steps that only exist for internal reasons, and prototype before anything gets built. Handover is working components, not flat mockups.',
    capabilities: [
      'Flow & product design',
      'Design systems',
      'Prototyping',
      'Usability testing',
    ],
    image: '/images/ui-ux.webp',
    imageAlt: 'Interface design layouts and wireframes',
  },
  {
    slug: 'app-development',
    title: 'App Development',
    discipline: 'Mobile engineering',
    summary: 'One codebase, two stores, no compromise.',
    description:
      'Cross-platform apps that behave natively on both — real gestures, real offline state, real push. Builds go to TestFlight and Play internal tracks from week one so feedback starts before launch.',
    capabilities: [
      'React Native',
      'Offline-first sync',
      'Release pipelines',
      'Store submission',
    ],
    image: '/images/app-development.webp',
    imageAlt: 'Mobile application screens on a device',
  },
  {
    slug: 'branding',
    title: 'Branding',
    discipline: 'Identity',
    summary: 'An identity that survives contact with reality.',
    description:
      'Marks that hold at sixteen pixels and on a building. You get the system — type, colour, spacing, tone of voice — plus the rules for the situations nobody thought to ask about yet.',
    capabilities: [
      'Wordmark & identity',
      'Design system',
      'Brand guidelines',
      'Asset library',
    ],
    image: '/images/branding.webp',
    imageAlt: 'Brand identity materials and print collateral',
  },
  {
    slug: 'seo',
    title: 'SEO',
    discipline: 'Digital growth',
    summary: 'Rankings that come from structure, not tricks.',
    description:
      'Technical foundations first: crawlability, Core Web Vitals, schema, internal linking. Then content built around what people actually type. We report on enquiries, not vanity positions.',
    capabilities: [
      'Technical audit',
      'Core Web Vitals',
      'Content strategy',
      'Local search',
    ],
    image: '/images/seo.webp',
    imageAlt: 'Search performance analytics dashboard',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    discipline: 'Acquisition',
    summary: 'Spend you can trace to a result.',
    description:
      'Campaigns instrumented before they launch, so you know which channel earned the enquiry. We would rather cut a channel that is not working than defend it in next month’s report.',
    capabilities: [
      'Paid acquisition',
      'Lifecycle email',
      'Attribution setup',
      'Reporting',
    ],
    image: '/images/digital-marketing.webp',
    imageAlt: 'Marketing campaign performance charts',
  },
];

/** Look up a single service by slug — used by the services route. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
