import AppLanding, { type LandingContent } from '@/components/studio/AppLanding'
import { APPS } from '@/components/studio/apps'
import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = pageMeta({ path: '/marigold', ...APP_SEO.marigold })

const app = APPS.find((a) => a.slug === 'marigold')!

const content: LandingContent = {
  eyebrow: 'Mac app · Photography',
  title: (
    <>
      Double-click a photo.
      <br />
      <span className="app-accent">Then just press →</span>
    </>
  ),
  lede: 'Marigold is a fast photo viewer for Mac. Open any photo and flip through the whole folder with the arrow keys. JPEG, PNG, HEIC and camera RAW, and it never uploads a thing.',
  store: 'Mac App Store',
  stats: [
    { value: '→', label: 'Next photo in the folder, instantly' },
    { value: 'RAW', label: 'CR3, NEF, ARW, DNG, RAF and more' },
    { value: '1 key', label: 'For zoom, rotate, full screen and more' },
    { value: '0', label: 'Network connections. It never goes online.' },
  ],
  features: [
    {
      title: 'The folder is the album',
      body: 'No library and no importing. Double-click a photo and every other photo in that folder is one arrow key away, with a filmstrip to show where you are.',
    },
    {
      title: 'Opens almost anything',
      body: 'JPEG, PNG, HEIC and HEIF, TIFF, animated GIF, WebP, BMP and AVIF, plus the camera RAW formats your Mac supports.',
    },
    {
      title: 'Keyboard first',
      body: '+ and − zoom, 0 fits and 1 shows 100%. L and R rotate, F goes full screen, T hides the filmstrip. Double-click flips between Fit and 100%.',
    },
    {
      title: 'Never edits your originals',
      body: 'Rotating only changes how a photo is shown. The file on disk stays exactly as it was, and phone photos already appear the right way up.',
    },
    {
      title: 'Cull without fear',
      body: 'Delete moves a photo to the Trash after asking, never deletes it for good. Put Back still works.',
    },
    {
      title: 'Your default in one click',
      body: 'Click “Make Default for All Photos” and every photo you double-click in Finder opens in Marigold.',
    },
  ],
  steps: [
    { title: 'Make it your default', body: 'One click when you first open Marigold, or use Open With → Marigold whenever you like.' },
    { title: 'Double-click any photo', body: 'From Finder, a card, a download, anywhere. It opens straight away.' },
    { title: 'Press the arrow keys', body: 'Marigold asks once to view that folder, remembers your answer, and the rest is →, →, →.' },
  ],
  privacy: {
    title: (
      <>
        Your photos
        <br />
        <span className="app-accent">never leave your Mac.</span>
      </>
    ),
    points: [
      'Marigold only shows photos already on your Mac. It never uploads, copies or shares them.',
      'It never connects to the internet. No account, nothing to sign in to.',
      'No ads, no analytics, no crash reporting, no tracking.',
      'It doesn’t read photo locations, camera details or other metadata for itself.',
    ],
  },
  cta: (
    <>
      Every photo, <span className="app-accent">one key away.</span>
    </>
  ),
  devlog: { href: '/devlog/why-marigold', title: 'The one thing I missed from Windows' },
}

export default function MarigoldPage() {
  return <AppLanding app={app} content={content} />
}
