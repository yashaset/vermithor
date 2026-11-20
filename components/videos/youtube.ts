import { cache } from 'react'
import { VIDEOS, type VideoEntry } from './videos'

export interface Video {
  id: string
  slug: string
  title: string
  description: string
  notes?: string
  /** ISO 8601, e.g. 2021-06-14T08:00:00-07:00 */
  uploadDate?: string
  /** Seconds */
  length?: number
  views?: number
  /** True when YouTube couldn't be read at build time and only the ID is known. */
  partial: boolean
}

const DAY = 60 * 60 * 24
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  // Skip YouTube's EU cookie-consent page.
  Cookie: 'CONSENT=YES+cb; SOCS=CAI',
}

function decodeEntities(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function jsonString(raw: string | undefined) {
  if (raw === undefined) return undefined
  try {
    return JSON.parse(`"${raw}"`) as string
  } catch {
    return undefined
  }
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 10)
    .join('-')
}

async function getText(url: string) {
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: DAY }, signal: AbortSignal.timeout(10_000) })
    return res.ok ? await res.text() : null
  } catch {
    return null
  }
}

/** Reads a video's details from its YouTube watch page; falls back to oEmbed (title only), then to the ID. */
async function load(entry: VideoEntry): Promise<Video> {
  const { id } = entry
  const html = await getText(`https://www.youtube.com/watch?v=${id}&hl=en`)
  const pick = (re: RegExp) => (html ? re.exec(html)?.[1] : undefined)

  let title =
    jsonString(pick(/"videoDetails":\{"videoId":"[^"]+","title":"((?:[^"\\]|\\.)*)"/)) ??
    (pick(/<meta name="title" content="([^"]*)"/) ? decodeEntities(pick(/<meta name="title" content="([^"]*)"/)!) : undefined)
  const description = jsonString(pick(/"shortDescription":"((?:[^"\\]|\\.)*)"/)) ?? ''
  const uploadDate =
    pick(/"uploadDate":"([^"]+)"/) ?? pick(/itemprop="uploadDate" content="([^"]+)"/) ?? pick(/"publishDate":"([^"]+)"/)
  const lengthRaw = pick(/"lengthSeconds":"(\d+)"/)
  const viewsRaw = pick(/"videoDetails":\{[^]*?"viewCount":"(\d+)"/)

  if (!title) {
    const oembed = await getText(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
    try {
      title = oembed ? (JSON.parse(oembed).title as string) : undefined
    } catch {}
  }

  const finalTitle = entry.title ?? title ?? 'Video'
  return {
    id,
    slug: entry.slug ?? (title || entry.title ? slugify(finalTitle) : id.toLowerCase()),
    title: finalTitle,
    description,
    notes: entry.notes,
    uploadDate,
    length: lengthRaw ? Number(lengthRaw) : undefined,
    views: viewsRaw ? Number(viewsRaw) : undefined,
    partial: !title && !entry.title,
  }
}

/** All videos, newest first (videos without a known date keep their order at the end). */
export const getVideos = cache(async (): Promise<Video[]> => {
  const videos = await Promise.all(VIDEOS.map(load))
  // Two videos can't share a URL.
  const seen = new Set<string>()
  for (const v of videos) {
    if (seen.has(v.slug)) v.slug = `${v.slug}-${v.id.toLowerCase()}`
    seen.add(v.slug)
  }
  return videos.sort((a, b) => (b.uploadDate ?? '').localeCompare(a.uploadDate ?? ''))
})

export async function getVideo(slug: string) {
  return (await getVideos()).find((v) => v.slug === slug || v.id === slug)
}

// Display helpers -------------------------------------------------------------

export const thumb = (id: string, size: 'hq' | 'maxres' = 'hq') =>
  `https://i.ytimg.com/vi/${id}/${size === 'hq' ? 'hqdefault' : 'maxresdefault'}.jpg`

/** 1432 → "23:52" */
export function clock(seconds?: number) {
  if (!seconds) return undefined
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`
}

/** 1432 → "PT23M52S" (schema.org duration) */
export function isoDuration(seconds?: number) {
  if (!seconds) return undefined
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}`
}

/** "2021-06-14T…" → "14 Jun 2021" */
export function prettyDate(iso?: string) {
  if (!iso) return undefined
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? undefined : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
