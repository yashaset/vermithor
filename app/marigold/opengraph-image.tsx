import { appOgImage, ogSize } from '@/components/seo/ogImage'

// Link-preview image for /marigold (and its privacy and support pages).
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Marigold app icon and tagline'

export default function Image() {
  return appOgImage('marigold')
}
