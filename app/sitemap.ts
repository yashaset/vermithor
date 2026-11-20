import type { MetadataRoute } from 'next'
import { APPS } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'
import { SITE_URL } from '@/components/seo/site'
import { SERVICES } from '@/components/studio/services'
import { getVideos } from '@/components/videos/youtube'

/** /sitemap.xml, built from the app and devlog lists: new apps and posts are added automatically. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path}`
  const posts = POSTS.filter((p) => p.href)
  const latestPost = posts.map((p) => new Date(p.date)).sort((a, b) => b.getTime() - a.getTime())[0]
  const videos = await getVideos()

  return [
    { url: url('/'), lastModified: latestPost, changeFrequency: 'weekly', priority: 1 },
    { url: url('/devlog'), lastModified: latestPost, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/work'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/videos'), changeFrequency: 'monthly', priority: 0.7 },
    ...videos.filter((v) => !v.partial).map((v) => ({
      url: url(`/videos/${v.slug}`),
      ...(v.uploadDate ? { lastModified: new Date(v.uploadDate) } : {}),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...SERVICES.map((s) => ({ url: url(`/work/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...APPS.filter((a) => a.href).map((a) => ({ url: url(a.href!), changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: url(p.href!), lastModified: new Date(p.date), changeFrequency: 'yearly' as const, priority: 0.7 })),
    ...APPS.flatMap((a) => [a.supportHref, a.privacyHref])
      .filter((h): h is string => !!h)
      .map((h) => ({ url: url(h), changeFrequency: 'yearly' as const, priority: 0.3 })),
  ]
}
