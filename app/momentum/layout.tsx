import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: APP_SEO.momentum.title,
    template: '%s · Momentum',
  },
  description: APP_SEO.momentum.description,
  icons: { icon: '/momentum/icon.png', apple: '/momentum/icon.png' },
}

export default function MomentumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  )
}
