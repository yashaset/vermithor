import { STATUS_LABEL, type StudioApp } from './apps'

export default function StatusBadge({ app, variant = 'pill' }: { app: StudioApp; variant?: 'pill' | 'dot' }) {
  if (variant === 'dot') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold whitespace-nowrap" style={{ color: app.accent }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: app.accent }} aria-hidden />
        {STATUS_LABEL[app.status]}
      </span>
    )
  }
  return (
    <span
      className="text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-full"
      style={{ color: app.accent, background: `${app.accent}1F` }}
    >
      {STATUS_LABEL[app.status]}
    </span>
  )
}
