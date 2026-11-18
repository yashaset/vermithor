import { ogSize, studioOgImage } from '@/components/seo/ogImage'

// Default link-preview image for the site (pages without their own).
export const size = ogSize
export const contentType = 'image/png'
export const alt = 'yash.apps: apps worth keeping on your home screen'

export default function Image() {
  return studioOgImage()
}
