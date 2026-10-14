import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg-primary)',
        foreground: 'var(--color-text-primary)',
        surface: 'var(--color-bg-secondary)',
        'surface-subtle': 'var(--color-bg-subtle)',
        muted: 'var(--color-text-secondary)',
        'muted-foreground': 'var(--color-text-muted)',
        caption: 'var(--color-text-caption)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        'cinema-gold': 'var(--color-cinema-gold)',
        neutral: {
          50: '#fbf9f5',
          100: '#f4f0e6',
          200: '#e2dacb',
          300: '#b5a995',
          400: '#4a453e',
          500: '#2d2a25',
          600: '#1f1c18',
          700: '#141311',
          800: '#0a0a09',
          900: '#000000',
          950: '#000000',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        editorial: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.06em',
        'tighter': '-0.04em',
        'editorial': '-0.035em',
        'widest-editorial': '0.22em',
        'ultra-wide': '0.3em',
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'spring-gentle': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        'micro': '250ms',
        'element': '550ms',
        'title': '850ms',
        'transition': '1100ms',
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'elevation': 'var(--shadow-elevation)',
        'cinema': 'var(--shadow-cinema)',
      }
    },
  },
  plugins: [],
};
export default config;
