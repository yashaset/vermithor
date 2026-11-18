/** Photos are served from Unsplash's CDN (as Unsplash asks) and credited to each photographer. */
const UTM = 'utm_source=yash.apps&utm_medium=referral'

export default function UnsplashPhoto({
  id,
  alt,
  by,
  username,
  aspect = 'aspect-[16/9]',
  caption,
}: {
  id: string
  alt: string
  by: string
  username: string
  aspect?: string
  caption?: string
}) {
  const src = (w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=${w}`
  return (
    <figure className="flex flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src(1400)}
        srcSet={`${src(800)} 800w, ${src(1400)} 1400w, ${src(2000)} 2000w`}
        sizes="(max-width: 760px) 100vw, 720px"
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full ${aspect} object-cover rounded-[22px] border border-border bg-surface`}
      />
      <figcaption className="text-[12px] text-faint leading-relaxed">
        {caption && <span className="text-ink2">{caption} </span>}
        Photo by{' '}
        <a href={`https://unsplash.com/@${username}?${UTM}`} className="underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
          {by}
        </a>{' '}
        on{' '}
        <a href={`https://unsplash.com/?${UTM}`} className="underline underline-offset-2 hover:text-accent" target="_blank" rel="noopener noreferrer">
          Unsplash
        </a>
      </figcaption>
    </figure>
  )
}
