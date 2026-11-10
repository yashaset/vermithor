import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'FocusBlock — A calm app blocker for iPhone',
    template: '%s · FocusBlock',
  },
  description:
    'FocusBlock keeps distracting apps out of reach during focus sessions and quiet hours. Built on Apple Screen Time. No account, no ads, no tracking.',
  icons: { icon: '/apps/focusblock/icon.png', apple: '/apps/focusblock/icon.png' },
}

export default function FocusBlockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
