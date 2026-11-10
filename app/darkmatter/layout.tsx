import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'Darkmatter — A manual camera for iPhone',
    template: '%s · Darkmatter',
  },
  description:
    'Darkmatter gives you full control over ISO, shutter speed, white balance and focus, shoots RAW and ProRAW, and paints light trails. No account, no ads, no tracking.',
  icons: { icon: '/apps/darkmatter/icon.png', apple: '/apps/darkmatter/icon.png' },
}

export default function DarkmatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
