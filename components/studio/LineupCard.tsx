import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'
import { WORKBENCH, type StudioApp } from './apps'
import { appVars } from './appStyle'

function Art({ app }: { app: StudioApp }) {
  if (app.screenshots?.length) {
    const [a, b] = app.screenshots
    return (
      <div className="app-tint h-[260px] flex justify-center items-start gap-3 pt-8 overflow-hidden" style={appVars(app)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.src} alt={a.alt} width={640} height={1391} loading="lazy" className="w-[38%] rounded-[22px] border-[5px] border-black -rotate-[5deg] translate-y-[18px]" />
        {b && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.src} alt={b.alt} width={640} height={1391} loading="lazy" className="w-[38%] rounded-[22px] border-[5px] border-black rotate-[4deg]" />
        )}
      </div>
    )
  }
  if (app.slug === 'sweetheart') {
    // der / die / das, colour-coded like the app and its icon.
    const words = [
      { w: 'der', bg: '#1565C0', r: '-rotate-[10deg]', y: 'translate-y-3' },
      { w: 'die', bg: '#C62828', r: 'rotate-0', y: '-translate-y-2' },
      { w: 'das', bg: '#2E7D32', r: 'rotate-[10deg]', y: 'translate-y-3' },
    ]
    return (
      <div className="app-tint h-[260px] flex items-center justify-center gap-3" style={appVars(app)} aria-hidden>
        {words.map((x) => (
          <span
            key={x.w}
            className={`font-display font-black text-white text-[30px] w-[92px] h-[124px] rounded-[18px] border-[5px] border-[#15161B] flex items-center justify-center ${x.r} ${x.y}`}
            style={{ background: x.bg }}
          >
            {x.w}
          </span>
        ))}
      </div>
    )
  }
  if (app.slug === 'focusblock') {
    // A breathing circle with the leaf, like the app's focus screen.
    return (
      <div className="app-tint h-[260px] flex items-center justify-center" style={appVars(app)} aria-hidden>
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
  if (app.slug === 'manualcam') {
    // The aperture from the app icon over a shutter-speed dial, like the app's controls.
    const stops = ['1/60', '1/125', '1/250', '1/500', '1/1000']
    return (
      <div className="app-tint h-[260px] flex flex-col items-center justify-center gap-6" style={appVars(app)} aria-hidden>
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
  return <div className="app-tint h-[260px]" style={appVars(app)} aria-hidden />
}

export default function LineupCard({ app }: { app: StudioApp }) {
  const primary = app.storeUrl
    ? { href: app.storeUrl, label: 'Get the app', external: true }
    : app.href
      ? { href: app.href, label: 'View app', external: false }
      : { href: '#notify', label: 'Notify me', external: false }

  return (
    <article id={`app-${app.slug}`} className="scroll-mt-6 rounded-[28px] bg-surface border border-border overflow-hidden flex flex-col">
      <Art app={app} />
      <div className="p-7 flex flex-col gap-3.5 flex-1">
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
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-2.5">
          <a
            href={primary.href}
            target={primary.external ? '_blank' : undefined}
            rel={primary.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center min-h-[44px] px-[18px] rounded-xl font-bold text-[14px] transition-transform hover:-translate-y-0.5"
            style={{ background: app.accent, color: app.accentInk }}
          >
            {primary.label}
          </a>
          <StatusBadge app={app} />
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
