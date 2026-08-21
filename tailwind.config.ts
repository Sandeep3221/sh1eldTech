import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0A0B0E',
          card: '#111319',
          border: 'rgba(255, 255, 255, 0.08)',
          light: '#ECEEF2',
          'light-border': 'rgba(0, 0, 0, 0.08)',
        },
        brand: {
          mint: '#A5F3FC',
          cyan: '#38BDF8',
          dark: '#0A0B0E',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
