'use client'

import { useState } from 'react'

/**
 * YouTube embed that loads only a thumbnail until someone presses play, so pages stay fast
 * (the real player is ~1 MB of script). Uses youtube-nocookie.com.
 */
export default function LiteYouTube({ id, title, length }: { id: string; title: string; length?: string }) {
  const [playing, setPlaying] = useState(false)
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[20px] sm:rounded-[28px] bg-black border border-border">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            onError={() => setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            onLoad={(e) => {
              // YouTube serves a 120 px grey placeholder when there's no maxres thumbnail.
              if (e.currentTarget.naturalWidth <= 120) setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Corner button, so it never covers the thumbnail's own title text. */}
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 inline-flex items-center gap-2.5 h-12 sm:h-14 pl-2 pr-5 rounded-full bg-lime text-onlime font-bold text-[15px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-onlime text-lime flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            Play{length ? <span className="font-semibold tabular-nums opacity-70">{length}</span> : null}
          </span>
        </button>
      )}
    </div>
  )
}
