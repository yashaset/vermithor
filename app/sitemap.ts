import type { MetadataRoute } from 'next'
import { APPS } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'
import { SITE_URL } from '@/components/seo/site'

/** /sitemap.xml, built from the app and devlog lists: new apps and posts are added automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`
  const posts = POSTS.filter((p) => p.href)
  const latestPost = posts.map((p) => new Date(p.date)).sort((a, b) => b.getTime() - a.getTime())[0]

  return [
    { url: url('/'), lastModified: latestPost, changeFrequency: 'weekly', priority: 1 },
    { url: url('/work'), changeFrequency: 'monthly', priority: 0.9 },
    ...APPS.filter((a) => a.href).map((a) => ({ url: url(a.href!), changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: url(p.href!), lastModified: new Date(p.date), changeFrequency: 'yearly' as const, priority: 0.7 })),
    ...APPS.flatMap((a) => [a.supportHref, a.privacyHref])
      .filter((h): h is string => !!h)
      .map((h) => ({ url: url(h), changeFrequency: 'yearly' as const, priority: 0.3 })),
  ]
}
