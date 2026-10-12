import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'
import type { StudioApp } from './apps'

function Art({ app }: { app: StudioApp }) {
  if (app.screenshots?.length) {
    const [a, b] = app.screenshots
    return (
      <div className="h-[260px] flex justify-center items-start gap-3 pt-8 overflow-hidden" style={{ background: app.tint }}>
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
      <div className="h-[260px] flex items-center justify-center gap-3" style={{ background: app.tint }} aria-hidden>
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
  return <div className="h-[260px]" style={{ background: app.tint }} aria-hidden />
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
        <p className="text-[16px] leading-relaxed text-[#B4B4BC]">{app.description}</p>
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

export function NextAppCard({ n }: { n: number }) {
  return (
    <article id="app-next" className="scroll-mt-6 rounded-[28px] border-[1.5px] border-dashed border-[#2E2E34] flex flex-col">
      <div className="h-[260px] flex items-center justify-center border-b-[1.5px] border-dashed border-[#2E2E34]" aria-hidden>
        <span className="font-display font-black text-[96px] tracking-tighter text-[#26262B]">{String(n).padStart(2, '0')}</span>
      </div>
      <div className="p-7 flex flex-col gap-3.5 flex-1">
        <h3 className="text-[22px] font-extrabold tracking-tight">Next app</h3>
        <p className="text-[16px] leading-relaxed text-muted">
          Something new is taking shape on the workbench. People on the launch list hear about it first.
        </p>
        <a href="#notify" className="mt-auto self-start inline-flex items-center min-h-[44px] font-semibold text-[14px] text-accent">
          Join the launch list →
        </a>
      </div>
    </article>
  )
}
