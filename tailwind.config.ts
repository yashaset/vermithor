import type { Config } from 'tailwindcss'

/**
 * Typography matches the Momentum iOS app: SF Pro for text, SF Pro Rounded (heavy/black) for
 * display and numbers. Apple devices use the real system fonts; elsewhere Inter and Nunito stand in.
 */
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['ui-rounded', '"SF Pro Rounded"', 'var(--font-nunito)', '-apple-system', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#C9F43B',
        surface: '#111113',
        border: '#1E1E22',
        muted: '#A0A0A8',
        faint: '#6E6E76',
        ink: '#EDEDEF',
        bg: '#0A0A0B',
      },
    },
  },
  plugins: [],
}

export default config
