import type { Metadata } from 'next'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import VideoCard from '@/components/videos/VideoCard'
import { CHANNEL_URL } from '@/components/videos/videos'
import { getVideos } from '@/components/videos/youtube'
import { SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

const TITLE = 'Videos — React tutorials · Yash Rawat'
const DESCRIPTION =
  'React tutorials by Yash Rawat: infinite scrolling with a custom hook, and a beginner todo app with localStorage, explained step by step.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...pageMeta({ path: '/videos', title: TITLE, description: DESCRIPTION }),
}

export default async function VideosPage() {
  const videos = await getVideos()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/videos`,
        name: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/videos`,
        author: { '@id': `${SITE_URL}/#yash` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/videos/${v.slug}`, name: v.title })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Videos', item: `${SITE_URL}/videos` },
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
          <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-black text-[clamp(44px,7vw,88px)] leading-[0.98] tracking-[-0.045em]">Videos</h1>
              <p className="mt-5 max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">
                React tutorials, explained step by step. More on iOS and building my apps coming soon.
              </p>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-line font-semibold text-[14px] hover:border-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0033" aria-hidden>
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                <path fill="#fff" d="m9.6 15.6 6.3-3.6-6.3-3.6v7.2Z" />
              </svg>
              Subscribe on YouTube
            </a>
          </section>

          <section aria-label="All videos" className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 pb-8">
            {videos.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </section>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
