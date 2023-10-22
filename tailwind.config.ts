import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['--var(--font-nunito)'],
      },
      colors: {
        primary: {
          50: '#EBF9FA',
          100: '#C2EBEE',
          200: '#A4E2E6',
          300: '#7BD4DB',
          400: '#61CCD4',
          500: '#3ABFC9',
          600: '#35AEB7',
          700: '#29888F',
          800: '#20696F',
          900: '#185054',
        },
        secondary: {
          50: '#EDEDF7',
          100: '#C8C7E6',
          200: '#ADACD9',
          300: '#8786C8',
          400: '#706EBD',
          500: '#4C4AAD',
          600: '#45439D',
          700: '#36357B',
          800: '#2A295F',
          900: '#201F49',
        },
      },
    },
  },
  plugins: [],
}
export default config
