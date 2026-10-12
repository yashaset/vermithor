import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'Momentum — Gym Workout Log for iPhone',
    template: '%s · Momentum',
  },
  description:
    'Momentum is a fast strength-training log for iPhone: log sets in seconds, track PRs and estimated 1RM, see every muscle you trained, and wake up to a real gym alarm. No ads, no tracking.',
  icons: { icon: '/momentum/icon.png', apple: '/momentum/icon.png' },
  openGraph: {
    title: 'Momentum — Gym Workout Log for iPhone',
    description: 'Log every set in seconds, watch your lifts climb, and never miss a gym day.',
    url: '/momentum',
    siteName: 'Momentum',
    images: [{ url: '/momentum/og.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/momentum/og.jpg'] },
}

export default function MomentumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  )
}
