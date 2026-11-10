import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yashrawat.com'),
  title: {
    default: 'ManualCam — A manual camera for iPhone',
    template: '%s · ManualCam',
  },
  description:
    'ManualCam gives you full control over ISO, shutter speed, white balance and focus, shoots RAW and ProRAW, and paints light trails. No account, no ads, no tracking.',
  icons: { icon: '/apps/manualcam/icon.png', apple: '/apps/manualcam/icon.png' },
}

export default function ManualCamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
