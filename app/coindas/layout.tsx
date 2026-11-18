import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: APP_SEO.coindas.title,
    template: '%s · Coindas',
  },
  description: APP_SEO.coindas.description,
  icons: { icon: '/apps/coindas/icon.png', apple: '/apps/coindas/icon.png' },
}

export default function CoindasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
