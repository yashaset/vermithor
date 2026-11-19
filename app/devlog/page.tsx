import type { Metadata } from 'next'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import DevlogList from '@/components/studio/DevlogList'
import { POSTS } from '@/components/studio/devlog'
import { APPS } from '@/components/studio/apps'
import { SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

const TITLE = 'Devlog — Building iOS apps and Next.js sites in the open · Yash Rawat'
const DESCRIPTION =
  'Notes from an independent developer building iPhone and Mac apps in SwiftUI and websites in Next.js: design decisions, bugs, launches, SEO and lessons learned along the way.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ['indie developer blog', 'iOS development blog', 'SwiftUI devlog', 'Next.js blog', 'building in public', 'indie app developer India'],
  ...pageMeta({ path: '/devlog', title: TITLE, description: DESCRIPTION }),
}

/** "12 Nov 2026" → "2026-11-12" for structured data. */
function isoDate(d: string) {
  const t = new Date(d)
  return Number.isNaN(t.getTime()) ? undefined : t.toISOString().slice(0, 10)
}

export default function DevlogIndex() {
  const published = POSTS.filter((p) => p.href)
  const upcoming = POSTS.filter((p) => !p.href)
  // Filter chips: only apps (and "Studio") that have at least one published post.
  const topics = Array.from(new Set(published.map((p) => p.app)))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/devlog#blog`,
        name: 'yash.apps Devlog',
        url: `${SITE_URL}/devlog`,
        description: DESCRIPTION,
        author: { '@id': `${SITE_URL}/#yash` },
        blogPost: published.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}${p.href}`,
          datePublished: isoDate(p.date),
          author: { '@type': 'Person', name: 'Yash Rawat', url: SITE_URL },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Devlog', item: `${SITE_URL}/devlog` },
        ],
      },
    ],
  }

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main>
          <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
            <h1 className="font-black text-[clamp(44px,7vw,88px)] leading-[0.98] tracking-[-0.045em]">Devlog</h1>
            <p className="mt-5 max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">
              Building iPhone and Mac apps in SwiftUI and this site in Next.js, in the open: design calls, bugs, launches and what I
              learned.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-faint">
              <span>{published.length} posts</span>
              <span aria-hidden>·</span>
              <span>
                Topics: {topics.map((t) => APPS.find((a) => a.slug === t)?.name ?? 'Studio').join(', ')}
              </span>
            </p>
          </section>

          <section aria-label="All posts" className="pb-16">
            <DevlogList posts={published} />
          </section>

          {upcoming.length > 0 && (
            <section className="pb-8">
              <h2 className="mb-2 text-[12px] font-bold tracking-[0.14em] uppercase text-faint">Writing soon</h2>
              <DevlogList posts={upcoming} />
            </section>
          )}
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
