import type { Metadata } from 'next'

export const SITE_URL = 'https://yashrawat.com'
/** The name Google shows above search results (with the favicon). The studio brand goes in alternateName. */
export const SITE_NAME = 'Yash Rawat'
export const AUTHOR = { name: 'Yash Rawat', url: SITE_URL }
/** The "y." mark: Google asks for a square image at least 112 px, on a solid background. */
/** Photo of Yash, for the Person (Google's profile box prefers a real photo). */
export const PHOTO = { '@type': 'ImageObject', url: `${SITE_URL}/brand/yash.jpg`, width: 600, height: 600 }
export const LOGO = { '@type': 'ImageObject', url: `${SITE_URL}/brand/icon-512.png`, width: 512, height: 512 }

/**
 * Per-page SEO: canonical URL plus Open Graph / Twitter tags for this exact page.
 * Every indexable page should set this, or it inherits the home page's sharing tags from the root layout.
 */
export function pageMeta({
  path,
  title,
  description,
  type = 'website',
  images,
}: {
  path: string
  /** Full title as it should appear when shared (no template applied). */
  title: string
  description: string
  type?: 'website' | 'article'
  /** Only needed when the page has no opengraph-image file. */
  images?: { url: string; width: number; height: number }[]
}): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type, locale: 'en_IN', ...(images ? { images } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
  }
}

/** Safe JSON for a <script type="application/ld+json">. */
export function jsonLdHtml(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}
