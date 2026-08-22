import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LayoutSync } from '@/components/system/LayoutSync';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08090C',
};

export const metadata: Metadata = {
  title: {
    default: 'SH1ELD Tech — Security-first digital engineering',
    template: '%s — SH1ELD Tech',
  },
  description:
    'SH1ELD Tech builds secure digital products from Gangtok, Sikkim — cybersecurity, web and app engineering, design and growth.',
  keywords: [
    'Cybersecurity',
    'Penetration Testing',
    'Web Development',
    'App Development',
    'UI/UX Design',
    'SH1ELD Tech',
    'Sikkim',
  ],
  openGraph: {
    type: 'website',
    siteName: 'SH1ELD Tech',
    title: 'SH1ELD Tech — Security-first digital engineering',
    description:
      'Secure digital products, engineered from Gangtok, Sikkim. Cybersecurity, web and app development, design and growth.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SH1ELD Tech — Security-first digital engineering',
    description:
      'Secure digital products, engineered from Gangtok, Sikkim.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${spaceGrotesk.variable} dark`}
    >
      {/*
        No `overflow-x-hidden` here — globals.css sets `overflow-x: clip` on
        html/body instead. `hidden` makes the body a scroll container, which
        silently breaks every `position: sticky` on the page; `clip` prevents
        sideways overflow without that side effect.
      */}
      <body className="min-h-screen bg-ink-900 font-sans text-fg-primary antialiased overscroll-x-none">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper-100 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <LayoutSync />
      </body>
    </html>
  );
}
