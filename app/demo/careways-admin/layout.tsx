import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--cw-serif', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--cw-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'careways admin',
  icons: { icon: '/careways/favicon.svg' },
  robots: { index: false, follow: false },
}

export default function CarewaysAdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>
}
