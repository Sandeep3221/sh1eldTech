/**
 * Company facts. Every value here was already present in the codebase
 * (footer, stats section, metadata) — nothing is invented.
 * Treat this as the single source of truth for contact details and figures.
 */

export const company = {
  name: 'SH1ELD Tech',
  wordmark: 'SH1ELD',
  wordmarkAccent: 'TECH',
  tagline: 'Security-first digital engineering',
  email: 'sh1eldtech011@gmail.com',
  phone: '+91 9547250772',
  phoneHref: '+919547250772',
  founded: 2021,
} as const;

export const locations = [
  {
    label: 'Cybersecurity Centre',
    role: 'Training & operations',
    lines: ['SH1ELD CyberSecurity Centre', 'Children Park, Tibet Road', 'Gangtok, East Sikkim'],
  },
  {
    label: 'Research & Development',
    role: 'Product engineering',
    lines: ['AIC SMUTBI, 5th Floor, F Block', 'SMIT Campus, Majitar', 'East Sikkim'],
  },
] as const;

/**
 * The four figures the stats composition reports.
 * `value` is the number the counter animates to; `display` handles anything
 * that is not a plain integer.
 */
export const stats = [
  {
    id: 'code',
    value: 14893,
    suffix: '+',
    label: 'Lines of code written',
  },
  {
    id: 'hq',
    display: 'Sikkim',
    label: 'Gangtok, India — HQ',
  },
  {
    id: 'projects',
    value: 10,
    suffix: '+',
    label: 'Projects delivered',
  },
  {
    id: 'uptime',
    value: 99.9,
    decimals: 1,
    suffix: '%',
    label: 'Secure system reliability',
  },
] as const;

/** Client and recognition logo tiles already shipped in /public/images. */
export const clientLogos = [
  '/images/cli1.jpg',
  '/images/cli2.jpg',
  '/images/cli3.jpg',
  '/images/cli4.png',
  '/images/cli5.jpg',
  '/images/cli6.jpg',
] as const;

export const recognitionLogos = [
  '/images/rec1.jpg',
  '/images/rec2.jpg',
  '/images/rec3.jpg',
  '/images/rec4.jpeg',
  '/images/rec5.png',
  '/images/rec6.png',
] as const;
