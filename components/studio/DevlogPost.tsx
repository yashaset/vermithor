import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'

/** Reading-column layout for studio-wide devlog posts (not tied to one app). */
export default function DevlogPost({
  kicker = 'Studio · Devlog',
  title,
  meta,
  jsonLd,
  children,
}: {
  kicker?: string
  title: React.ReactNode
  meta?: string
  jsonLd?: object
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main className="pt-16 sm:pt-24 pb-10">
          <article className="max-w-[720px] mx-auto">
            {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
            <a href="/#devlog" className="text-[11px] text-accent tracking-[0.2em] uppercase hover:underline underline-offset-4">
              {kicker}
            </a>
            <h1 className="text-[clamp(40px,8vw,72px)] font-extrabold leading-[0.95] tracking-tight mt-6">{title}</h1>
            {meta && <p className="text-[11px] text-muted mt-5 tracking-wide">{meta}</p>}
            <div className="doc mt-12 flex flex-col gap-12">{children}</div>
          </article>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
