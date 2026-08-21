import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
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
  themeColor: '#07090E',
};

export const metadata: Metadata = {
  title: 'SH1ELD Tech — Digital Products & Technology Solutions',
  description:
    'SH1ELD Tech builds digital products, technology solutions, and secure digital experiences for modern businesses.',
  keywords: [
    'Digital Products',
    'Web Development',
    'Cybersecurity',
    'Technology Solutions',
    'SH1ELD Tech',
  ],
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
      <body className="bg-[#08090C] text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen overflow-x-hidden overscroll-x-none">
        {children}
      </body>
    </html>
  );
}
