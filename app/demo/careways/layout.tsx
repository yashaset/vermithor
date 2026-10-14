import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import CookieConsent from '@/components/careways/CookieConsent'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--cw-serif',
  display: 'swap',
})
const sans = Manrope({ subsets: ['latin'], variable: '--cw-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Careways — Exclusive rates on stays, flights & chauffeurs',
  description:
    'Members’ rates on palace stays, premium flights and chauffeured cars. One search shows them all; each is booked on its own.',
  icons: { icon: '/careways/favicon.svg' },
  robots: { index: false, follow: false }, // demo route
}

export default function CarewaysLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      {children}
      <CookieConsent />
    </div>
  )
}
