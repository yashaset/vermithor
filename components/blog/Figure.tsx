import Image from 'next/image'

const UTM = 'utm_source=yash_apps&utm_medium=referral'

/**
 * A Medium-style image for devlog posts: optional wide breakout, caption and Unsplash credit.
 * `src` is an images.unsplash.com URL (query string optional); `photo` is the unsplash.com/photos/<slug> page.
 */
export default function Figure({
  src,
  alt,
  caption,
  credit,
  aspect = '16 / 10',
  wide = false,
  priority = false,
}: {
  src: string
  alt: string
  caption?: React.ReactNode
  credit?: { name: string; username: string; photo: string }
  aspect?: string
  wide?: boolean
  priority?: boolean
}) {
  return (
    <figure className={wide ? 'lg:-mx-24' : undefined}>
      <div className="relative w-full overflow-hidden rounded-[6px] bg-surface border border-border" style={{ aspectRatio: aspect }}>
        <Image
          src={src.split('?')[0] + '?auto=format&fit=crop&q=75'}
          alt={alt}
          fill
          priority={priority}
          sizes={wide ? '(min-width: 1024px) 912px, 100vw' : '(min-width: 768px) 720px, 100vw'}
          className="object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-faint">
          {caption}
          {caption && credit && ' '}
          {credit && (
            <span className="whitespace-nowrap">
              Photo by{' '}
              <a href={`https://unsplash.com/@${credit.username}?${UTM}`} className="underline underline-offset-2 hover:text-ink">
                {credit.name}
              </a>{' '}
              on{' '}
              <a href={`${credit.photo}?${UTM}`} className="underline underline-offset-2 hover:text-ink">
                Unsplash
              </a>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
