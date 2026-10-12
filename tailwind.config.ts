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
      // Theme tokens: values live in app/globals.css and switch between dark and light.
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        line: 'var(--line)',
        ghost: 'var(--ghost)',
        nav: 'var(--nav)',
        ink: 'var(--ink)',
        ink2: 'var(--ink2)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)', // accent text/links: lime on dark, deep green on light
        lime: '#C9F43B', // Momentum lime, for fills (always with onlime text)
        onlime: '#0A0A0B',
      },
    },
  },
  plugins: [],
}

export default config
