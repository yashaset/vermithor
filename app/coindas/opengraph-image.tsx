import { appOgImage, ogSize } from '@/components/seo/ogImage'

// Link-preview image for /coindas (and its privacy and support pages).
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Coindas app icon and tagline'

export default function Image() {
  return appOgImage('coindas')
}
