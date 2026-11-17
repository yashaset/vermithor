import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'Coindas — Know what’s safe to spend today',
    template: '%s · Coindas',
  },
  description:
    'Coindas turns one monthly budget into a single daily number. Fixed costs are set aside first, leftovers roll into tomorrow, and no bank login is needed.',
  icons: { icon: '/apps/coindas/icon.png', apple: '/apps/coindas/icon.png' },
}

export default function CoindasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
