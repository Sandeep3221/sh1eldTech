import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        /* Dark surfaces */
        ink: {
          900: '#08090C',
          800: '#0B0D12',
          700: '#10131A',
          600: '#161A23',
        },
        /* Light surfaces */
        paper: {
          100: '#F7F8FA',
          200: '#ECEEF2',
          300: '#DFE3E9',
        },
        /* The only two chromatic accents in the system */
        mint: {
          DEFAULT: '#A5F3FC',
          deep: '#67E8F9',
        },
        signal: {
          DEFAULT: '#FF5A1F',
        },
        /* Text. Literal hex rather than var() so opacity modifiers
           (text-fg-secondary/60) still work. Mirrors globals.css :root. */
        fg: {
          primary: '#F8FAFC',
          secondary: '#98A2B3',
          tertiary: '#6B7480',
          'on-paper': '#0F172A',
          'on-paper-muted': '#4A5461',
        },
        /* Retained for backwards compatibility with existing markup */
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
      borderColor: {
        hairline: 'rgba(255, 255, 255, 0.08)',
        'hairline-strong': 'rgba(255, 255, 255, 0.16)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        narrow: 'var(--container-narrow)',
      },
      borderRadius: {
        /* The large soft panel is a signature of the existing hero — naming it
           stops the value drifting between 32/36/40px across sections. */
        panel: '28px',
        'panel-lg': '36px',
        'panel-xl': '44px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      letterSpacing: {
        meta: '0.14em',
      },
    },
  },
  plugins: [],
};

export default config;
