import { ogSize, postOgImage } from '@/components/seo/ogImage'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'I did my Next.js SEO using Claude'

export default function Image() {
  return postOgImage('/devlog/seo-with-claude')
}
