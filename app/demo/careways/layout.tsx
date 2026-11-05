import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import CookieConsent from '@/components/careways/CookieConsent'

// Cormorant Garamond loads from a stylesheet, not next/font: Next 14.2's Google font loader
// crashes on its font file URLs at build time ("Cannot read properties of null (reading '1')").
const sans = Manrope({ subsets: ['latin'], variable: '--cw-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Careways — Exclusive rates on stays, flights & chauffeurs',
  description:
    'Members’ rates on palace stays, premium flights and chauffeured cars. One search shows them all; each is booked on its own.',
  icons: { icon: '/careways/favicon.svg' },
  robots: { index: false, follow: false }, // demo route
}

export const viewport: Viewport = { themeColor: '#0F0E0C' }

export default function CarewaysLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sans.variable}`}>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&display=swap" />
      <style>{":root{--cw-serif:'Cormorant Garamond'}"}</style>
      {/* Black behind the page too, so overscroll and the gaps around the page never flash the main site's colours. */}
      <style>{'html,body{background:#0F0E0C}'}</style>
      {children}
      <CookieConsent />
    </div>
  )
}
