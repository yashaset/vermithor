import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: APP_SEO.marigold.title,
    template: '%s · Marigold',
  },
  description: APP_SEO.marigold.description,
  icons: { icon: '/apps/marigold/icon.png', apple: '/apps/marigold/icon.png' },
}

export default function MarigoldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
