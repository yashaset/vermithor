import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import { STUDIO_NAME } from '@/components/studio/config'
import { themeInitScript } from '@/components/ThemeToggle'
import SheetHost from '@/components/sheet/SheetHost'

// Fallbacks only: Apple devices render the real SF Pro / SF Pro Rounded, like the Momentum app.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false })
const nunito = Nunito({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-nunito', display: 'swap', preload: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: `${STUDIO_NAME} — Independent apps by Yash Rawat`,
  description:
    'Apps worth keeping on your home screen. Yash Rawat is an independent developer in Delhi who designs, builds and supports every app himself. No ads, no tracking.',
  openGraph: {
    title: `${STUDIO_NAME} — Independent apps by Yash Rawat`,
    description: 'Apps worth keeping on your home screen.',
    siteName: STUDIO_NAME,
    type: 'website',
    locale: 'en_IN',
  },
  authors: [{ name: 'Yash Rawat', url: 'https://yashrawat.com' }],
  creator: 'Yash Rawat',
}

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        {/* Devlog typewriter fonts (Courier Prime, Special Elite). Loaded as a stylesheet, not next/font:
            next/font's build-time download of these fails on Vercel. The font files load only on pages that use them. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Special+Elite&display=swap"
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f6f7f3" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0b" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans bg-bg text-ink">
        {children}
        {modal}
        <SheetHost />
      </body>
    </html>
  )
}
