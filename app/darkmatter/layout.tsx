import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: APP_SEO.darkmatter.title,
    template: '%s · Darkmatter',
  },
  description: APP_SEO.darkmatter.description,
  icons: { icon: '/apps/darkmatter/icon.png', apple: '/apps/darkmatter/icon.png' },
}

export default function DarkmatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
