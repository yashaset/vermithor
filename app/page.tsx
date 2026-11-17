import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import AppIcon from '@/components/studio/AppIcon'
import StatusBadge from '@/components/studio/StatusBadge'
import LineupCard, { NextAppCard } from '@/components/studio/LineupCard'
import NotifyForm from '@/components/studio/NotifyForm'
import Reveal from '@/components/Reveal'
import { APPS, PHONE_APPS, MAC_APPS, WORKBENCH } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'
import { appVars } from '@/components/studio/appStyle'

export default function Home() {
  const live = PHONE_APPS.filter((a) => a.status === 'live').length
  const inWorks = PHONE_APPS.length - live
  const macLive = MAC_APPS.filter((a) => a.status === 'live').length
  const macInWorks = MAC_APPS.length - macLive

  return (
    <div className="overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />

        <main>
          {/* Hero */}
          <section className="relative pt-16 sm:pt-24 lg:pt-[120px] pb-16 sm:pb-24 text-center">
            <div className="relative">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line text-[13px] font-medium text-ink2">
                <span className="w-2 h-2 rounded-full bg-lime" aria-hidden />
                Independent app studio · Delhi
              </span>
              <h1 className="mt-7 mx-auto max-w-[940px] font-black text-[clamp(46px,7.4vw,104px)] leading-[0.98] tracking-[-0.045em]">
                Apps worth keeping on your home screen.
              </h1>
              <p className="mt-6 mx-auto max-w-[540px] text-[clamp(18px,1.7vw,21px)] leading-normal text-muted">
                I&apos;m Yash. I design, build and support every app here myself. No ads, no tracking, no filler.
              </p>

              {/* One row on desktop; scrolls sideways on small screens instead of wrapping. */}
              <ul className="list-none mt-12 sm:mt-[72px] mx-auto flex w-max max-w-full overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4 sm:gap-7 px-5 sm:px-10 py-6 rounded-[36px] bg-surface border border-border text-center">
                {[...PHONE_APPS, ...MAC_APPS].map((app) => (
                  <li key={app.slug} className="shrink-0 snap-start">
                    <a href={`#app-${app.slug}`} className="flex flex-col items-center gap-3 w-[96px] sm:w-[108px]">
                      <AppIcon src={app.icon} size={84} shadow />
                      <span className="font-semibold text-[15px]">{app.name}</span>
                      <StatusBadge app={app} variant="dot" />
                    </a>
                  </li>
                ))}
                <li className="shrink-0 snap-start pl-4 sm:pl-7 border-l border-border">
                  <a href="#app-next" className="flex flex-col items-center gap-3 w-[96px] sm:w-[108px]">
                    <span className="w-[84px] h-[84px] rounded-[19px] border-[1.5px] border-dashed border-line text-faint flex items-center justify-center" aria-hidden>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                    <span className="font-semibold text-[15px] text-muted">Up next</span>
                    <span className="text-[12px] text-faint whitespace-nowrap">{WORKBENCH.map((w) => w.title.replace(/^An? /, '')).join(' · ')}</span>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Lineup */}
          <section id="apps" className="scroll-mt-6 pb-20 sm:pb-32">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-7">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">For your phone</h2>
              <span className="text-[13px] text-faint">
                {live > 0 ? `${live} live · ${inWorks} on the way` : `${inWorks} apps on the way`}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PHONE_APPS.filter((a) => a.status === 'live').map((app) => (
                <Reveal key={app.slug} className="h-full">
                  <LineupCard app={app} />
                </Reveal>
              ))}
            </div>
            {inWorks > 0 && (
              <>
                <h3 className="mt-14 mb-5 text-[12px] font-bold tracking-[0.14em] uppercase text-faint">On the way</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  {PHONE_APPS.filter((a) => a.status !== 'live').map((app) => (
                    <Reveal key={app.slug} className="h-full">
                      <LineupCard app={app} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Mac apps */}
          <section id="mac" className="scroll-mt-6 pb-20 sm:pb-32">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-7">
              <div>
                <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">For your Mac</h2>
                <p className="mt-2 text-[16px] text-muted">Small, fast tools that feel at home on macOS.</p>
              </div>
              <span className="text-[13px] text-faint">
                {macLive > 0 ? `${macLive} live · ${macInWorks} on the way` : `${macInWorks} ${macInWorks === 1 ? 'app' : 'apps'} on the way`}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {MAC_APPS.map((app) => (
                <Reveal key={app.slug} className="h-full">
                  <LineupCard app={app} />
                </Reveal>
              ))}
              <Reveal className="h-full">
                <NextAppCard />
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
                const tag = app
                  ? { className: 'app-accent', style: { ...appVars(app), background: `${app.accent}26` } }
                  : { className: 'text-ink2 bg-border', style: undefined }
                const inner = (
                  <>
                    <span className="col-span-2 sm:col-span-1 text-[13px] text-faint tabular-nums">{p.date}</span>
                    <span>
                      <span className="block text-[18px] font-semibold">{p.title}</span>
                      <span className={`${tag.className} inline-block mt-2 text-[11px] font-bold px-2 py-[3px] rounded-md`} style={tag.style}>
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
                      <a href={p.href} className={`${cls} hover:text-accent`}>{inner}</a>
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
            <span aria-hidden className="shrink-0 w-24 h-24 rounded-full bg-lime text-onlime flex items-center justify-center font-display font-black text-[32px] tracking-tighter">
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
