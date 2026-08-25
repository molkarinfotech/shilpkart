import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f5f3',
          100: '#e9e6e1',
          200: '#d3ccc2',
          300: '#b3a89a',
          400: '#8c7f6f',
          500: '#6b6055',
          600: '#4f463d',
          700: '#3a332c',
          800: '#28221d',
          900: '#1c1712',
          950: '#100d0a',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f8f2e8',
          200: '#efe3cd',
          300: '#e2cfa9',
          400: '#d1b47c',
        },
        clay: {
          400: '#b8785a',
          500: '#a2603f',
          600: '#874c30',
          700: '#6b3a24',
        },
        moss: {
          400: '#7c8a63',
          500: '#647251',
          600: '#4f5c3f',
        },
        plum: {
          400: '#8a6a7a',
          500: '#725165',
          600: '#5c3f52',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
