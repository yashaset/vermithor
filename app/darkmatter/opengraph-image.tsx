import { appOgImage, ogSize } from '@/components/seo/ogImage'

// Link-preview image for /darkmatter (and its privacy and support pages).
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Darkmatter app icon and tagline'

export default function Image() {
  return appOgImage('darkmatter')
}
