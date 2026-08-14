import type { Config } from 'tailwindcss';

// Tokens Easynet mapeados para o Tailwind (ver src/design-system/tokens.ts).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: { DEFAULT: '#54A8D8', emph: '#2E8FC9' },
        primary: { DEFAULT: '#176FA6', hover: '#125781', active: '#0F4A6E' },
        navy: { DEFAULT: '#00243C', 800: '#0A3A57', 700: '#12587F' },
        ondark: { DEFAULT: '#E8F1F8', muted: '#9FB4C4' },
        app: '#F4F9FD',
        surface: '#FFFFFF',
        surfacealt: '#EEF4F9',
        line: '#D7E3ED',
        linestrong: '#B7C9D8',
        ink: { DEFAULT: '#0E2233', secondary: '#5A7183', muted: '#8798A6' },
        success: { DEFAULT: '#1F9D57', strong: '#15803D', bg: '#E6F6EC' },
        warning: { DEFAULT: '#F2A31C', strong: '#8A5A00', bg: '#FEF3E0' },
        danger: { DEFAULT: '#E23B3B', strong: '#C22A2A', bg: '#FCEAEA' },
        info: { DEFAULT: '#2E8FC9', strong: '#176FA6', bg: '#E3F1FB' },
      },
      fontFamily: { sans: ['"Inter Variable"', 'Inter', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'] },
      borderRadius: { DEFAULT: '8px', sm: '6px', lg: '16px' },
      boxShadow: {
        sm: '0 1px 2px rgba(0,36,60,.06)',
        md: '0 4px 16px rgba(0,36,60,.10)',
        focus: '0 0 0 3px rgba(46,143,201,.35)',
      },
    },
  },
  plugins: [],
} satisfies Config;
