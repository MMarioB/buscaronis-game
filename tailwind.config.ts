import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ['Futura', 'sans-serif'],
        knockout: ['Knockout', 'sans-serif'],
      },
      colors: {
        desalia: {
          blue: '#4ECDC4',
          orange: '#FF6B35',
          pink: '#FF6B9D',
          yellow: '#FFC857',
        },
      },
    },
  },
  plugins: [],
};

export default config;
