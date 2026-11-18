import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: APP_SEO.focusblock.title,
    template: '%s · FocusBlock',
  },
  description: APP_SEO.focusblock.description,
  icons: { icon: '/apps/focusblock/icon.png', apple: '/apps/focusblock/icon.png' },
}

export default function FocusBlockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
