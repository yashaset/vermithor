import Link from 'next/link'
import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'
import { WORKBENCH, type StudioApp } from './apps'
import { appVars } from './appStyle'

/** The illustrated panel for an app. `h` sets its height so app pages can show it larger. */
export function Art({ app, h = 'h-[260px]' }: { app: StudioApp; h?: string }) {
  if (app.screenshots?.length) {
    const [a, b] = app.screenshots
    return (
      <div className={`app-tint ${h} flex justify-center items-start gap-3 pt-8 overflow-hidden`} style={appVars(app)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.src} alt={a.alt} width={640} height={1391} loading="lazy" className="w-[38%] rounded-[22px] border-[5px] border-black -rotate-[5deg] translate-y-[18px]" />
        {b && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.src} alt={b.alt} width={640} height={1391} loading="lazy" className="w-[38%] rounded-[22px] border-[5px] border-black rotate-[4deg]" />
        )}
      </div>
    )
  }
  if (app.slug === 'focusblock') {
    // A breathing circle with the leaf, like the app's focus screen.
    return (
      <div className={`app-tint ${h} flex items-center justify-center`} style={appVars(app)} aria-hidden>
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <span className="absolute inset-0 rounded-full motion-safe:animate-[breathe_10s_ease-in-out_infinite]" style={{ background: `${app.accent}26` }} />
          <span className="absolute inset-[22px] rounded-full motion-safe:animate-[breathe_10s_ease-in-out_infinite]" style={{ background: `${app.accent}33` }} />
          <span className="absolute inset-[44px] rounded-full bg-[#FAF7F1] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]" />
          <svg className="relative" width="54" height="54" viewBox="0 0 24 24" aria-hidden>
            <defs>
              <linearGradient id="fb-leaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#9DBBA5" />
                <stop offset="1" stopColor="#4A6A58" />
              </linearGradient>
            </defs>
            <path d="M20.5 3.5C11 3.5 4.5 7.6 4.5 14.3c0 1.9.6 3.5 1.7 4.7 1.3 1.2 2.9 1.7 4.7 1.7 6.6 0 9.6-7.4 9.6-17.2z" fill="url(#fb-leaf)" />
            <path d="M8 17.5c3-4.2 6.3-7.4 9.8-10.4" stroke="#F4EFE3" strokeOpacity="0.7" strokeWidth="1.1" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>
    )
  }
  if (app.slug === 'darkmatter') {
    // The aperture from the app icon over a shutter-speed dial, like the app's controls.
    const stops = ['1/60', '1/125', '1/250', '1/500', '1/1000']
    return (
      <div className={`app-tint ${h} flex flex-col items-center justify-center gap-6`} style={appVars(app)} aria-hidden>
        <svg className="app-accent" width="112" height="112" viewBox="20 20 60 60" aria-hidden>
          <defs>
            <mask id="mc-aperture" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <circle cx="50" cy="50" r="30" fill="#fff" />
              <path d="M52.4 38.8L60.9 46.4L58.5 57.7L47.6 61.2L39.1 53.6L41.5 42.3Z" fill="#000" />
              <path
                d="M41.5 42.3L73.8 31.8M52.4 38.8L77.7 61.5M60.9 46.4L53.9 79.8M58.5 57.7L26.2 68.2M47.6 61.2L22.3 38.5M39.1 53.6L46.1 20.2"
                stroke="#000"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </mask>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="currentColor" mask="url(#mc-aperture)" />
        </svg>
        <div className="flex items-end gap-5 [mask-image:linear-gradient(90deg,transparent,#000_25%,#000_75%,transparent)]">
          {stops.map((s, i) => (
            <span key={s} className="flex flex-col items-center gap-1.5 w-[52px]">
              <span className={`w-[2px] rounded-full ${i === 2 ? 'h-[14px] bg-current app-accent' : 'h-[9px] bg-current text-faint'}`} />
              <span className={`text-[13px] tabular-nums ${i === 2 ? 'font-bold app-accent' : 'font-medium text-faint'}`}>{s}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }
  if (app.slug === 'coindas') {
    // The daily safe-to-spend card from the app's Today screen, on warm paper.
    return (
      <div className={`app-tint ${h} flex items-center justify-center`} style={appVars(app)} aria-hidden>
        <div className="w-[232px] rounded-[22px] border-[5px] border-[#15161B] bg-[#F7F5F0] px-5 py-6 text-[#1A1A17] -rotate-[3deg] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
          <span className="block text-[9px] font-bold tracking-[0.18em] uppercase text-[#6B6860]">Safe to spend today</span>
          <span
            className="block mt-2 text-[50px] leading-none text-[#2F6B3F] tabular-nums"
            style={{ fontFamily: 'ui-serif, "New York", Georgia, serif' }}
          >
            ₹794
          </span>
          <span className="block mt-4 h-[3px] bg-[#E6E1D6]">
            <span className="block h-full w-[35%] bg-[#1A1A17]" />
          </span>
          <span className="mt-2 flex justify-between text-[9px] text-[#6B6860] tabular-nums">
            <span>Spent ₹420</span>
            <span>Limit ₹1,214</span>
          </span>
        </div>
      </div>
    )
  }
  if (app.slug === 'marigold') {
    // A Marigold window: one photo with the filmstrip underneath, like the app.
    const thumbs = ['#9CC3E0', '#F2B880', '#CFE3D4', '#1F2A44', '#F6D7C3']
    const chevron = (d: string, side: string) => (
      <span className={`absolute ${side} top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-black/55 border border-white/15 flex items-center justify-center text-white`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={d} />
        </svg>
      </span>
    )
    return (
      <div className={`app-tint ${h} flex items-center justify-center`} style={appVars(app)} aria-hidden>
        <div className="w-[300px] rounded-[12px] border border-[#3A3A3A] bg-[#141414] overflow-hidden -rotate-[2deg] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
          <div className="h-[24px] flex items-center gap-[5px] px-2.5 bg-[#262626] border-b border-black">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <span key={c} className="w-[7px] h-[7px] rounded-full" style={{ background: c }} />
            ))}
            <span className="ml-2 text-[9px] font-semibold text-[#E6E6E6]">IMG_2041.jpg</span>
            <span className="ml-auto text-[8px] text-[#A3A3A3] tabular-nums">3 of 12</span>
          </div>
          <div className="relative h-[132px] flex items-center justify-center">
            <svg width="171" height="114" viewBox="0 0 600 400" preserveAspectRatio="none" className="shadow-[0_6px_18px_rgba(0,0,0,0.5)]">
              <rect width="600" height="400" fill="#CFE3D4" />
              <circle cx="440" cy="110" r="40" fill="#FFFFFF" />
              <path d="M0 260 L120 170 L220 230 L330 140 L460 240 L600 180 L600 400 L0 400Z" fill="#6E9A7A" />
              <path d="M0 320 L150 250 L280 310 L420 260 L600 330 L600 400 L0 400Z" fill="#2E4F3A" />
            </svg>
            {chevron('m15 18-6-6 6-6', 'left-2.5')}
            {chevron('m9 18 6-6-6-6', 'right-2.5')}
          </div>
          <div className="h-[40px] flex items-center justify-center gap-1.5 bg-[#1C1C1C] border-t border-black">
            {thumbs.map((c, i) => (
              <span
                key={c}
                className="w-[36px] h-[24px] rounded-[3px]"
                style={{ background: c, opacity: i === 2 ? 1 : 0.6, boxShadow: i === 2 ? `0 0 0 2px ${app.accent}` : undefined }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return <div className={`app-tint ${h}`} style={appVars(app)} aria-hidden />
}

/** `wide` lays the card out side by side, for a row that holds a single card. */
export default function LineupCard({ app, wide = false }: { app: StudioApp; wide?: boolean }) {
  const primary = app.storeUrl
    ? { href: app.storeUrl, label: 'Get the app', external: true }
    : app.href
      ? { href: app.href, label: 'View app', external: false }
      : { href: '#notify', label: 'Notify me', external: false }
  // When the main button goes to the App Store, still link the app's own page if it has one.
  const secondary = app.storeUrl && app.href ? { href: app.href, label: 'Learn more' } : null

  return (
    <article
      id={`app-${app.slug}`}
      className={`scroll-mt-6 rounded-[28px] bg-surface border border-border overflow-hidden flex flex-col ${wide ? 'md:flex-row' : ''}`}
    >
      {wide ? (
        <div className="md:w-1/2 shrink-0">
          <Art app={app} h="h-[260px] md:h-full md:min-h-[340px]" />
        </div>
      ) : (
        <Art app={app} />
      )}
      <div className={`p-7 flex flex-col gap-3.5 flex-1 ${wide ? 'md:p-10 md:justify-center' : ''}`}>
        <div className="flex items-center gap-3.5">
          <AppIcon src={app.icon} size={56} />
          <div>
            <h3 className="text-[22px] font-extrabold tracking-tight leading-tight">{app.name}</h3>
            <p className="text-[13px] text-faint mt-0.5">
              {app.platforms} · {app.category}
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-relaxed text-ink2">{app.description}</p>
        <div className={`${wide ? 'md:mt-4' : 'mt-auto'} pt-2 flex flex-wrap items-center gap-2.5`}>
          <a
            href={primary.href}
            target={primary.external ? '_blank' : undefined}
            rel={primary.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center min-h-[44px] px-[18px] rounded-xl font-bold text-[14px] transition-transform hover:-translate-y-0.5"
            style={{ background: app.accent, color: app.accentInk }}
          >
            {primary.label}
            {primary.external && (
              <svg className="ml-1.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            )}
          </a>
          {secondary && (
            <a href={secondary.href} className="inline-flex items-center min-h-[44px] px-2 font-semibold text-[14px] text-ink2 hover:text-ink">
              {secondary.label} →
            </a>
          )}
          <span className="ml-auto">
            <StatusBadge app={app} />
          </span>
        </div>
      </div>
    </article>
  )
}

function WorkbenchIcon({ kind, size = 22 }: { kind: 'camera' | 'git'; size?: number }) {
  return kind === 'camera' ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.3 3.3 9 12M20.6 9.2l-9.7.2M17.6 18.6 12 9.6M9.7 20.7l5.2-8.7M3.4 14.8l9.6-.2M6.4 5.4l5.6 9" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <path d="M6 7.2v9.6M18 10.2c0 4-6 3-11 6.8" />
    </svg>
  )
}

export function NextAppCard() {
  return (
    <article id="app-next" className="scroll-mt-6 rounded-[28px] border-[1.5px] border-dashed border-line flex flex-col">
      <div className="h-[260px] flex items-center justify-center gap-5 border-b-[1.5px] border-dashed border-line text-faint" aria-hidden>
        {WORKBENCH.map((w) => (
          <span key={w.title} className="w-[84px] h-[84px] rounded-[19px] border-[1.5px] border-dashed border-line flex items-center justify-center">
            <WorkbenchIcon kind={w.icon} size={36} />
          </span>
        ))}
      </div>
      <div className="p-7 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-[22px] font-extrabold tracking-tight">On the workbench</h3>
          <p className="text-[13px] text-faint mt-0.5">Ideas taking shape</p>
        </div>
        <ul className="list-none flex flex-col gap-3.5">
          {WORKBENCH.map((w) => (
            <li key={w.title} className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-faint">
                <WorkbenchIcon kind={w.icon} />
              </span>
              <span>
                <span className="block text-[16px] font-semibold">
                  {w.title} <span className="text-[13px] font-medium text-faint">· {w.platform}</span>
                </span>
                <span className="block text-[15px] leading-snug text-muted mt-0.5">{w.blurb}</span>
              </span>
            </li>
          ))}
        </ul>
        <a href="#notify" className="mt-auto self-start inline-flex items-center min-h-[44px] font-semibold text-[14px] text-accent">
          Hear about them first →
        </a>
      </div>
    </article>
  )
}
