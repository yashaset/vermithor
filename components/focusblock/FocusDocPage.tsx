import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import AppIcon from '@/components/studio/AppIcon'

/** Reading-column layout for FocusBlock's privacy and support pages, inside the studio shell. */
export default function FocusDocPage({
  kicker,
  title,
  meta,
  children,
}: {
  kicker: string
  title: React.ReactNode
  meta?: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main className="pt-16 sm:pt-24 pb-10">
          <article className="max-w-[720px] mx-auto">
            <div className="flex items-center gap-3">
              <AppIcon src="/apps/focusblock/icon.png" size={44} alt="" />
              <p className="text-[11px] text-accent tracking-[0.2em] uppercase">{kicker}</p>
            </div>
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
