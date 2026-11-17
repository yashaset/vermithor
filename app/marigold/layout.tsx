import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'Marigold — A fast photo viewer for Mac',
    template: '%s · Marigold',
  },
  description:
    'Marigold opens any photo instantly and lets you flip through the whole folder with the arrow keys. JPEG, PNG, HEIC and camera RAW, with nothing uploaded anywhere.',
  icons: { icon: '/apps/marigold/icon.png', apple: '/apps/marigold/icon.png' },
}

export default function MarigoldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
