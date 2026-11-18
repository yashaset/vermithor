import { ogSize, postOgImage } from '@/components/seo/ogImage'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Why I build for iPhone first'

export default function Image() {
  return postOgImage('/devlog/why-ios')
}
