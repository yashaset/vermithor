import Link from 'next/link'
import { sheetFor } from '@/components/sheet/links'
import StudioNav from './StudioNav'
import StudioFooter from './StudioFooter'
import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'
import { Art } from './LineupCard'
import { appVars } from './appStyle'
import type { StudioApp } from './apps'
import Reveal from '@/components/Reveal'
import AppJsonLd from '@/components/seo/AppJsonLd'

export interface LandingContent {
  /** Small line above the headline, e.g. "iPhone app · Productivity". */
  eyebrow: string
  title: React.ReactNode
  lede: string
  /** Which store the app ships on, used on the download button. */
  store: 'App Store' | 'Mac App Store'
  stats: { value: string; label: string }[]
  features: { title: string; body: string }[]
  steps?: { title: string; body: string }[]
  privacy: { title: React.ReactNode; points: string[] }
  cta: React.ReactNode
  /** Latest devlog post about this app, if there is one. */
  devlog?: { href: string; title: string }
}

function StoreCta({ app, store }: { app: StudioApp; store: LandingContent['store'] }) {
  if (app.storeUrl) {
    return (
      <a
        href={app.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 min-h-[52px] px-6 rounded-2xl font-bold text-[15px] transition-transform hover:-translate-y-0.5"
        style={{ background: app.accent, color: app.accentInk }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16" />
        </svg>
        Download on the {store}
      </a>
    )
  }
  return (
    <a
      href="/#notify"
      className="inline-flex items-center gap-2.5 min-h-[52px] px-6 rounded-2xl font-bold text-[15px] transition-transform hover:-translate-y-0.5"
      style={{ background: app.accent, color: app.accentInk }}
    >
      Tell me when it launches
    </a>
  )
}

/** Shared landing page for an app without screenshots yet: big illustrated hero, stats, features, privacy and a closing CTA. */
export default function AppLanding({ app, content }: { app: StudioApp; content: LandingContent }) {
  const c = content
  return (
    <div className="overflow-hidden" style={appVars(app)}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <AppJsonLd app={app} />
        <StudioNav />
        <main>
          {/* Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-14 pt-14 sm:pt-20 pb-16 sm:pb-24">
            <div>
              <div className="flex items-center gap-4">
                <AppIcon src={app.icon} size={64} alt={`${app.name} app icon`} shadow />
                <div>
                  <p className="text-[18px] font-extrabold tracking-tight">{app.name}</p>
                  <p className="text-[13px] text-faint">{c.eyebrow}</p>
                </div>
              </div>
              <h1 className="mt-8 font-black text-[clamp(42px,6vw,80px)] leading-[0.98] tracking-[-0.045em]">{c.title}</h1>
              <p className="mt-6 max-w-[500px] text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">{c.lede}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <StoreCta app={app} store={c.store} />
                <StatusBadge app={app} />
              </div>
              <p className="mt-5 text-[13px] text-faint">No ads · No tracking · Made by one person</p>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-border sm:[&>div>*]:scale-[1.3] [&>div>*]:origin-center">
              <Art app={app} h="h-[clamp(320px,44vw,500px)]" />
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {c.stats.map((s) => (
              <div key={s.label} className="rounded-[22px] bg-surface border border-border p-5 sm:p-7">
                <div className="font-display text-[34px] sm:text-[44px] font-black app-accent leading-none tabular-nums">{s.value}</div>
                <div className="mt-2.5 text-[13px] text-muted leading-snug">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Features */}
          <section id="features" className="scroll-mt-6 pt-20 sm:pt-32">
            <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">What it does</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.features.map((f, i) => (
                <Reveal key={f.title} className="h-full">
                  <div className="h-full rounded-[24px] bg-surface border border-border p-7">
                    <span className="font-display text-[13px] font-black app-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 text-[20px] font-extrabold tracking-tight">{f.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* How it works */}
          {c.steps && (
            <section className="pt-20 sm:pt-32">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">How it works</h2>
              <ol className="mt-8 grid gap-4 md:grid-cols-3 list-none">
                {c.steps.map((s, i) => (
                  <li key={s.title} className="rounded-[24px] border border-border p-7">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full font-display font-black text-[15px]"
                      style={{ background: app.accent, color: app.accentInk }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[20px] font-extrabold tracking-tight">{s.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Privacy */}
          <section className="mt-20 sm:mt-32 rounded-[28px] bg-surface border border-border p-7 sm:p-14 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-[12px] font-bold tracking-[0.14em] uppercase app-accent">Privacy</p>
              <h2 className="mt-4 text-[clamp(32px,4.4vw,56px)] font-black leading-[1] tracking-[-0.04em]">{c.privacy.title}</h2>
              {app.privacyHref && (
                <a href={app.privacyHref} className="inline-block mt-6 font-semibold text-[15px] app-accent hover:underline underline-offset-4">
                  Read the privacy policy →
                </a>
              )}
            </div>
            <ul className="flex flex-col gap-3 list-none">
              {c.privacy.points.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl border border-border bg-bg px-5 py-4 text-[15px] leading-relaxed">
                  <svg className="mt-[5px] shrink-0 app-accent" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12.5 10 17 19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Devlog */}
          {c.devlog && (
            <Link
              href={c.devlog.href}
              {...sheetFor(c.devlog.href)} scroll={false}
              className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-border p-6 sm:px-8 hover:border-line"
            >
              <span>
                <span className="block text-[12px] font-bold tracking-[0.14em] uppercase text-faint">From the devlog</span>
                <span className="block mt-1.5 text-[18px] font-semibold">{c.devlog.title}</span>
              </span>
              <span className="font-semibold text-[15px] app-accent">Read →</span>
            </Link>
          )}

          {/* CTA */}
          <section className="pt-20 sm:pt-32 pb-4 text-center flex flex-col items-center">
            <AppIcon src={app.icon} size={96} shadow />
            <h2 className="mt-8 max-w-[760px] font-black text-[clamp(38px,6vw,72px)] leading-[1] tracking-[-0.045em]">{c.cta}</h2>
            <div className="mt-9">
              <StoreCta app={app} store={c.store} />
            </div>
            <p className="mt-8 text-[14px] text-muted max-w-[460px] leading-relaxed">
              Designed, built and supported by{' '}
              <a href="/" className="text-ink underline underline-offset-4 decoration-line">
                Yash Rawat
              </a>
              . Questions or ideas?{' '}
              {app.supportHref ? (
                <a href={app.supportHref} className="text-ink underline underline-offset-4 decoration-line">
                  Get in touch
                </a>
              ) : (
                'Get in touch'
              )}
              .
            </p>
          </section>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
