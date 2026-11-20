import Link from 'next/link'
import { clock, prettyDate, thumb, type Video } from './youtube'

export default function VideoCard({ v }: { v: Video }) {
  const len = clock(v.length)
  const date = prettyDate(v.uploadDate)
  return (
    <Link href={`/videos/${v.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-video overflow-hidden rounded-[18px] border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(v.id)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        {len && (
          <span className="absolute right-2.5 bottom-2.5 px-1.5 py-0.5 rounded-md bg-black/80 text-white text-[12px] font-semibold tabular-nums">{len}</span>
        )}
      </span>
      <span>
        <span className="block text-[17px] font-semibold leading-snug group-hover:text-accent">{v.title}</span>
        {(date || v.views) && (
          <span className="mt-1 block text-[13px] text-faint tabular-nums">
            {[date, v.views ? `${v.views.toLocaleString('en-IN')} views` : null].filter(Boolean).join(' · ')}
          </span>
        )}
      </span>
    </Link>
  )
}
