import { appOgImage, ogSize } from '@/components/seo/ogImage'

// Link-preview image for /focusblock (and its privacy and support pages).
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'FocusBlock app icon and tagline'

export default function Image() {
  return appOgImage('focusblock')
}
