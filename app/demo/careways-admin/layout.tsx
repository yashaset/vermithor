import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

// Cormorant Garamond loads from a stylesheet, not next/font: Next 14.2's Google font loader
// crashes on its font file URLs at build time ("Cannot read properties of null (reading '1')").
const sans = Manrope({ subsets: ['latin'], variable: '--cw-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'careways admin',
  icons: { icon: '/careways/favicon.svg' },
  robots: { index: false, follow: false },
}

export default function CarewaysAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sans.variable}`} data-no-grain>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&display=swap" />
      <style>{":root{--cw-serif:'Cormorant Garamond'}"}</style>
      {children}
    </div>
  )
}
