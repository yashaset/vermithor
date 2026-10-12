import type { CSSProperties } from 'react'
import type { StudioApp } from './apps'

/** Inline CSS variables read by the .app-accent / .app-tint classes in globals.css. */
export function appVars(app: StudioApp): CSSProperties {
  return { '--a-d': app.accent, '--a-l': app.accentLight, '--t-d': app.tint, '--t-l': app.tintLight } as CSSProperties
}
