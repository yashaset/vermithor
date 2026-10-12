import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import { STUDIO_NAME } from '@/components/studio/config'

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
    url: '/',
    siteName: STUDIO_NAME,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="font-sans bg-bg text-ink">{children}</body>
    </html>
  )
}
