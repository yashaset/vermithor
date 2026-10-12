import { STATUS_LABEL, type StudioApp } from './apps'
import { appVars } from './appStyle'

export default function StatusBadge({ app, variant = 'pill' }: { app: StudioApp; variant?: 'pill' | 'dot' }) {
  if (variant === 'dot') {
    return (
      <span className="app-accent inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold whitespace-nowrap" style={appVars(app)}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden />
        {STATUS_LABEL[app.status]}
      </span>
    )
  }
  return (
    <span
      className="app-accent text-[11px] font-bold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-full"
      style={{ ...appVars(app), background: `${app.accent}26` }}
    >
      {STATUS_LABEL[app.status]}
    </span>
  )
}
