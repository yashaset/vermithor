import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import LiteYouTube from '@/components/videos/LiteYouTube'
import VideoCard from '@/components/videos/VideoCard'
import { CHANNEL_URL } from '@/components/videos/videos'
import { clock, getVideo, getVideos, isoDuration, prettyDate, thumb } from '@/components/videos/youtube'
import { SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return (await getVideos()).map((v) => ({ slug: v.slug }))
}

/** First sentence-ish of the description, for the meta description. */
function summary(text: string, max = 160) {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVideo(params.slug)
  if (!v) return {}
  const title = `${v.title} · Yash Rawat`
  const description = summary(v.notes || v.description) || `${v.title}: a video tutorial by Yash Rawat.`
  return {
    title: { absolute: title },
    description,
    // YouTube couldn't be read at build time: keep the bare page out of Google until the next build.
    ...(v.partial ? { robots: { index: false, follow: true } } : {}),
    ...pageMeta({
      path: `/videos/${v.slug}`,
      title,
      description,
      images: [{ url: thumb(v.id), width: 480, height: 360 }],
    }),
  }
}

/** Description text with links made clickable; YouTube descriptions are plain text. */
function Description({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim())
  return (
    <div className="flex flex-col gap-4 text-[16px] leading-relaxed text-ink2 break-words">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
            /^https?:\/\//.test(part) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline underline-offset-4">
                {part.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            ) : (
              part
            ),
          )}
        </p>
      ))}
    </div>
  )
}

export default async function VideoPage({ params }: Props) {
  const v = await getVideo(params.slug)
  if (!v) notFound()
  const others = (await getVideos()).filter((o) => o.id !== v.id).slice(0, 3)
  const url = `${SITE_URL}/videos/${v.slug}`
  const len = clock(v.length)
  const date = prettyDate(v.uploadDate)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Google needs uploadDate for video results, so only describe the video when it's known.
      ...(v.uploadDate
        ? [
            {
              '@type': 'VideoObject',
              '@id': `${url}#video`,
              name: v.title,
              description: summary(v.notes || v.description, 2000) || v.title,
              thumbnailUrl: [thumb(v.id, 'maxres'), thumb(v.id)],
              uploadDate: v.uploadDate,
              ...(v.length ? { duration: isoDuration(v.length) } : {}),
              embedUrl: `https://www.youtube.com/embed/${v.id}`,
              url,
              ...(v.views ? { interactionStatistic: { '@type': 'InteractionCounter', interactionType: { '@type': 'WatchAction' }, userInteractionCount: v.views } } : {}),
              author: { '@id': `${SITE_URL}/#yash` },
              inLanguage: 'en',
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Videos', item: `${SITE_URL}/videos` },
          { '@type': 'ListItem', position: 3, name: v.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main className="pt-12 sm:pt-16">
          <article className="max-w-[960px] mx-auto">
            <Link href="/videos" className="text-[11px] text-accent tracking-[0.2em] uppercase hover:underline underline-offset-4">
              ← Videos
            </Link>
            <h1 className="mt-5 font-extrabold text-[clamp(30px,4.6vw,52px)] leading-[1.05] tracking-tight">{v.title}</h1>
            {(date || len || v.views) && (
              <p className="mt-4 text-[13px] text-faint tabular-nums">
                {[date, len, v.views ? `${v.views.toLocaleString('en-IN')} views on YouTube` : null].filter(Boolean).join(' · ')}
              </p>
            )}

            <div className="mt-8">
              <LiteYouTube id={v.id} title={v.title} length={len} />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div>
                {v.notes && <p className="mb-6 text-[18px] leading-relaxed">{v.notes}</p>}
                {v.description ? (
                  <Description text={v.description} />
                ) : (
                  <p className="text-[16px] text-muted">
                    Watch it on{' '}
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} className="text-accent underline underline-offset-4">
                      YouTube
                    </a>
                    .
                  </p>
                )}
              </div>
              <aside className="flex flex-col gap-3 self-start rounded-[20px] bg-surface border border-border p-6">
                <p className="font-semibold">Need a hand with React?</p>
                <p className="text-[14px] leading-relaxed text-muted">I build React, Next.js and iOS apps for clients, start to finish.</p>
                <Link href="/work" className="mt-1 inline-flex self-start px-4 py-2.5 rounded-full bg-lime text-onlime font-bold text-[14px] hover:brightness-95">
                  Work with me
                </Link>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer me" className="text-[14px] font-semibold text-accent hover:underline underline-offset-4">
                  More on YouTube →
                </a>
              </aside>
            </div>
          </article>

          {others.length > 0 && (
            <nav aria-labelledby="more-videos" className="mt-20 pt-10 border-t border-border">
              <div className="flex flex-wrap justify-between items-baseline gap-4 mb-7">
                <h2 id="more-videos" className="text-[22px] sm:text-[26px] font-bold tracking-tight">More videos</h2>
                <Link href="/videos" className="text-[11px] text-accent tracking-[0.2em] uppercase hover:underline underline-offset-4">
                  All videos →
                </Link>
              </div>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((o) => (
                  <VideoCard key={o.id} v={o} />
                ))}
              </div>
            </nav>
          )}
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
