type P = { size?: number; className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ------------------------------------------------------------------ */
/* Careways mark                                                        */
/* A heart drawn as a flight path: the part already flown is solid,     */
/* the route ahead is dotted, and the plane is mid-flight on the lobe.  */
/* ------------------------------------------------------------------ */

const FLOWN = 'M32 55 L13.5 36 C6.5 28.6 6.8 17.6 13.6 12.8 C20 8.4 28.6 11 32 20.5 C33.8 15.2 37.2 11.8 41.2 10.8'
const AHEAD = 'M51.4 13.4 C57.2 18.2 57.4 28.4 50.5 36 L32 55'
export const PLANE =
  'M6.2 0 C6.2 -.9 5.2 -1.15 4 -1.15 L1.2 -1.15 L-2.2 -6 L-4 -6 L-2.1 -1.15 L-4.6 -1.15 L-6 -3.1 L-7.1 -3.1 ' +
  'L-6.3 0 L-7.1 3.1 L-6 3.1 L-4.6 1.15 L-2.1 1.15 L-4 6 L-2.2 6 L1.2 1.15 L4 1.15 C5.2 1.15 6.2 .9 6.2 0 Z'
const PLANE_T = 'translate(46.4 11.4) rotate(12) scale(.92)'

/** Gradient definitions. Identical on every instance, so repeated ids are harmless. */
function MarkDefs() {
  return (
    <defs>
      <linearGradient id="cw-path" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#0F1A3C" />
        <stop offset=".6" stopColor="#1B2A57" />
        <stop offset="1" stopColor="#2F4C9C" />
      </linearGradient>
      <linearGradient id="cw-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F0D592" />
        <stop offset=".55" stopColor="#C9A04E" />
        <stop offset="1" stopColor="#A27B2D" />
      </linearGradient>
      <filter id="cw-lift" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#0F1A3C" floodOpacity=".22" />
      </filter>
    </defs>
  )
}

/** The Careways mark (kept as `Crest` so existing imports keep working). */
export function Crest({
  size = 40,
  variant = 'color',
  color = '#1B2A57',
  shadow = false,
  className,
  label,
}: {
  size?: number
  /** "color" on light backgrounds · "reversed" on navy · "mono" one colour for seals and stamps */
  variant?: 'color' | 'reversed' | 'mono'
  /** Mono colour */
  color?: string
  /** Kept for older call sites; no longer used. */
  knockout?: string
  shadow?: boolean
  className?: string
  label?: string
}) {
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true }
  const path = variant === 'mono' ? color : variant === 'reversed' ? '#FAF8F3' : 'url(#cw-path)'
  const gold = variant === 'mono' ? color : 'url(#cw-gold)'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...a11y}>
      {variant !== 'mono' && <MarkDefs />}
      <g filter={shadow ? 'url(#cw-lift)' : undefined}>
        <path d={FLOWN} stroke={path} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d={AHEAD} stroke={gold} strokeWidth="2.4" strokeLinecap="round" strokeDasharray=".1 4.6" />
        <path d={PLANE} transform={PLANE_T} fill={gold} />
      </g>
    </svg>
  )
}

export const Plane = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
)

export const Car = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M5 17h14v-5l-2-5H7l-2 5v5z" />
    <path d="M5 12h14" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="16.5" cy="17" r="1.5" />
  </svg>
)

export const Bed = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
    <circle cx="7" cy="11" r="2" />
  </svg>
)

export const Shield = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const Lock = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const Person = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
)

export const Rupee = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

export const Search = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2.4} className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
)

export const Envelope = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M4 4h16v16H4z" />
    <path d="M4 9l8 5 8-5" />
  </svg>
)

export const ArrowUp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

export const Clock = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
