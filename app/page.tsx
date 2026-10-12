import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import AppIcon from '@/components/studio/AppIcon'
import StatusBadge from '@/components/studio/StatusBadge'
import LineupCard, { NextAppCard } from '@/components/studio/LineupCard'
import NotifyForm from '@/components/studio/NotifyForm'
import Reveal from '@/components/Reveal'
import { APPS } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'

export default function Home() {
  const live = APPS.filter((a) => a.status === 'live').length
  const inWorks = APPS.length - live

  return (
    <div className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />

        <main>
          {/* Hero */}
          <section className="relative pt-16 sm:pt-24 lg:pt-[120px] pb-16 sm:pb-24 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-10 w-[1000px] h-[700px] -translate-x-1/2"
              style={{
                background: `radial-gradient(ellipse at 30% 60%, ${APPS[0].accent}1A, transparent 55%), radial-gradient(ellipse at 70% 60%, ${(APPS[1] ?? APPS[0]).accent}1A, transparent 55%)`,
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2A2A30] text-[13px] font-medium text-[#C8C8CE]">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden />
                Independent app studio · Delhi
              </span>
              <h1 className="mt-7 mx-auto max-w-[940px] font-black text-[clamp(46px,7.4vw,104px)] leading-[0.98] tracking-[-0.045em]">
                Apps worth keeping on your home screen.
              </h1>
              <p className="mt-6 mx-auto max-w-[540px] text-[clamp(18px,1.7vw,21px)] leading-normal text-muted">
                I&apos;m Yash. I design, build and support every app here myself. No ads, no tracking, no filler.
              </p>

              <ul className="list-none mt-12 sm:mt-[72px] mx-auto inline-flex flex-wrap justify-center gap-2 sm:gap-12 px-4 sm:px-11 py-6 rounded-[36px] bg-white/[0.04] border border-[#222227]">
                {APPS.map((app) => (
                  <li key={app.slug}>
                    <a href={`#app-${app.slug}`} className="flex flex-col items-center gap-3 w-[98px] sm:w-[120px]">
                      <AppIcon src={app.icon} size={84} glow={`${app.accent}80`} />
                      <span className="font-semibold text-[15px]">{app.name}</span>
                      <StatusBadge app={app} variant="dot" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#app-next" className="flex flex-col items-center gap-3 w-[98px] sm:w-[120px]">
                    <span className="w-[84px] h-[84px] rounded-[19px] border-[1.5px] border-dashed border-[#3A3A42] flex items-center justify-center" aria-hidden>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6E6E76" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className="font-semibold text-[15px] text-muted">Next app</span>
                    <span className="text-[12px] text-faint">On the workbench</span>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Lineup */}
          <section id="apps" className="scroll-mt-6 pb-20 sm:pb-32">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-7">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">The lineup</h2>
              <span className="text-[13px] text-faint">
                {live > 0 ? `${live} live · ${inWorks} on the way` : `${inWorks} apps on the way`}
              </span>
            </div>
            <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]">
              {APPS.map((app) => (
                <Reveal key={app.slug} className="h-full">
                  <LineupCard app={app} />
                </Reveal>
              ))}
              <Reveal className="h-full">
                <NextAppCard n={APPS.length + 1} />
              </Reveal>
            </div>
          </section>

          {/* Launch list */}
          <section id="notify" className="scroll-mt-6 rounded-[28px] bg-surface border border-border p-7 sm:p-14 flex flex-wrap justify-between gap-10">
            <div className="flex-[1_1_340px]">
              <h2 className="text-[clamp(28px,3.4vw,42px)] font-black tracking-[-0.04em] leading-[1.05]">One email per launch.</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted max-w-[380px]">
                Pick the apps you care about. No newsletter, no spam.
              </p>
            </div>
            <NotifyForm />
          </section>

          {/* Devlog */}
          <section id="devlog" className="scroll-mt-6 pt-20 sm:pt-32 flex flex-wrap gap-10">
            <div className="flex-[1_1_260px]">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">Devlog</h2>
              <p className="mt-3 text-muted text-[16px] leading-relaxed max-w-[300px]">
                Building every app in the open: design calls, bugs, launches.
              </p>
            </div>
            <ol className="flex-[999_1_560px] min-w-0 list-none border-b border-border">
              {POSTS.map((p) => {
                const app = APPS.find((a) => a.slug === p.app)
                const inner = (
                  <>
                    <span className="col-span-2 sm:col-span-1 text-[13px] text-faint tabular-nums">{p.date}</span>
                    <span>
                      <span className="block text-[18px] font-semibold">{p.title}</span>
                      <span
                        className="inline-block mt-2 text-[11px] font-bold px-2 py-[3px] rounded-md"
                        style={{ color: app?.accent ?? '#C8C8CE', background: `${app?.accent ?? '#C8C8CE'}1F` }}
                      >
                        {app?.name ?? 'Studio'}
                      </span>
                    </span>
                    <span className="text-[12px] text-faint whitespace-nowrap">{p.href ? '→' : 'Writing soon'}</span>
                  </>
                )
                const cls = 'grid grid-cols-[1fr_auto] sm:grid-cols-[110px_minmax(0,1fr)_auto] gap-x-5 gap-y-2 items-baseline py-[22px]'
                return (
                  <li key={p.title} className="border-t border-border">
                    {p.href ? (
                      <a href={p.href} className={`${cls} hover:text-white`}>{inner}</a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>

          {/* About */}
          <section id="about" className="scroll-mt-6 mt-20 sm:mt-32 rounded-[28px] bg-surface border border-border p-7 sm:p-14 flex flex-wrap gap-8 items-center">
            <span aria-hidden className="shrink-0 w-24 h-24 rounded-full bg-accent text-bg flex items-center justify-center font-display font-black text-[32px] tracking-tighter">
              YR
            </span>
            <div className="flex-[1_1_420px] min-w-0">
              <h2 className="text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.03em]">Hi, I&apos;m Yash. One developer, every pixel.</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted max-w-[680px]">
                An independent developer in Delhi. By day I build interfaces for 100K+ monthly users at Wheelseye; the rest of the
                time I design, build and support my own apps, and a real person answers every support email.
              </p>
            </div>
          </section>
        </main>

        <StudioFooter />
      </div>
    </div>
  )
}
