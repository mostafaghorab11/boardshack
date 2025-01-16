import fluid, {
  extract,
  FluidThemeConfig,
  fontSize,
  screens,
} from 'fluid-tailwind';
import type { Config } from 'tailwindcss';

export default {
  content: {
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './slices/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract,
  },
  theme: {
    fluid: (({ theme }) => ({
      defaultScreens: ['20rem', theme('screens.lg')],
    })) as FluidThemeConfig,
    extend: {
      screens,
      fontSize,
      colors: {
        'brand-blue': '#4876ff',
        'brand-lime': '#d9f154',
        'brand-navy': '#2e3192',
        'brand-orange': '#ff7347',
        'brand-pink': '#f7d0e9',
        'brand-purple': '#692e54',
        'brand-gray': '#fffdf9',
      },
      fontFamily: {
        sans: ['var(--font-bowlby-sc)'],
        mono: ['var(--font-dm-mono)'],
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
