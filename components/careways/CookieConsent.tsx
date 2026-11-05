'use client'

import { CSSProperties, useCallback, useEffect, useState } from 'react'
import c from './cookie.module.css'
import { PLANE } from './icons'

/**
 * Cookie consent for the Careways demo.
 *
 * - "essential": only this choice itself (cw_consent) is stored. The verified number is NOT remembered.
 * - "all": the verified number may be remembered for 30 days (httpOnly cw_session, set by the server).
 *
 * The server reads cw_consent before setting cw_session (see app/api/careways/_lib/otp.ts).
 */

export type Consent = 'all' | 'essential'
export const CONSENT_COOKIE = 'cw_consent'
const OPEN_EVENT = 'cw:cookie-settings'
const MAX_AGE = 60 * 60 * 24 * 180 // 180 days

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`))
  return m?.[1] === 'all' || m?.[1] === 'essential' ? m[1] : null
}

function writeConsent(v: Consent) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${v}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
}

const ROUTE = 'M-20 48 C 90 2, 300 2, 412 42'
const STARS: [number, number, number][] = [[34, 14, 1], [118, 30, .8], [170, 10, 1.2], [236, 26, .8], [300, 12, 1], [356, 30, .9], [72, 40, .7]]

/** Crumbs that break off the cookie and float up: drift (x), rise (y), size, delay, spin. */
const CRUMBS = [
  { x: -14, y: -44, s: 4, d: 0, r: 200 },
  { x: 10, y: -52, s: 3, d: .5, r: -160, dark: true },
  { x: -4, y: -60, s: 2.5, d: 1.1, r: 240 },
  { x: 18, y: -38, s: 3.5, d: 1.6, r: 180 },
  { x: -20, y: -30, s: 2.5, d: 2.1, r: -220, dark: true },
  { x: 4, y: -48, s: 4.5, d: 2.6, r: 160 },
  { x: -10, y: -56, s: 2, d: 3.1, r: -200 },
  { x: 22, y: -58, s: 2.5, d: 3.6, r: 260, dark: true },
]

function CookieIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3a9 9 0 1 0 9 9 3.2 3.2 0 0 1-3.4-3.1A3.2 3.2 0 0 1 14.6 5.6 3 3 0 0 1 12 3z" fill="#E9C978" stroke="#7A5E22" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8.5" cy="10" r="1.2" fill="#5A3E1A" />
      <circle cx="12.5" cy="15.5" r="1.3" fill="#5A3E1A" />
      <circle cx="7.8" cy="15" r=".9" fill="#5A3E1A" />
      <circle cx="16.5" cy="13" r=".9" fill="#5A3E1A" />
    </svg>
  )
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [remember, setRemember] = useState(false)

  // First visit: ask after a short pause. Later: reopen from the footer's "Cookie settings".
  useEffect(() => {
    const existing = readConsent()
    let t: ReturnType<typeof setTimeout> | undefined
    if (!existing) t = setTimeout(() => setOpen(true), 900)
    const reopen = () => {
      const now = readConsent()
      setRemember(now === 'all')
      setExpanded(true)
      setClosing(false)
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => {
      if (t) clearTimeout(t)
      window.removeEventListener(OPEN_EVENT, reopen)
    }
  }, [])

  const decide = useCallback((v: Consent) => {
    writeConsent(v)
    // Withdrawing consent also forgets any remembered number.
    if (v === 'essential') fetch('/api/careways/session', { method: 'DELETE' }).catch(() => {})
    setClosing(true)
    setTimeout(() => { setOpen(false); setClosing(false); setExpanded(false) }, 340)
  }, [])

  if (!open) return null

  return (
    <section className={`${c.card} ${closing ? c.closing : ''}`} role="dialog" aria-modal="false" aria-labelledby="cw-cookie-title" aria-describedby="cw-cookie-text">
      <div className={c.sky} aria-hidden>
        <svg viewBox="0 0 392 54" preserveAspectRatio="none">
          {STARS.map(([x, y, r], i) => (
            <circle key={i} className={c.star} cx={x} cy={y} r={r} fill="#E3C68C" opacity=".6" style={{ animationDelay: `${i * .4}s` }} />
          ))}
          <path className={c.route} d={ROUTE} stroke="#C9A04E" strokeWidth="2" strokeLinecap="round" fill="none" />
          <g>
            <path d={PLANE} fill="#E3C68C" transform="scale(1.15)" />
            <animateMotion dur="2.4s" fill="freeze" rotate="auto" path={ROUTE} keyPoints="0;0.66" keyTimes="0;1" calcMode="spline" keySplines=".2 .7 .3 1" />
          </g>
        </svg>
      </div>

      <div className={c.body}>
        <div className={c.head}>
          <span className={c.badge}>
            <span className={c.cookie}><CookieIcon /></span>
            <span className={c.crumbs} aria-hidden>
              {CRUMBS.map((k, i) => (
                <i key={i} className={k.dark ? c.crumbDark : undefined}
                  style={{ '--x': `${k.x}px`, '--y': `${k.y}px`, '--s': `${k.s}px`, '--d': `${k.d}s`, '--r': `${k.r}deg` } as CSSProperties} />
              ))}
            </span>
          </span>
          <h2 id="cw-cookie-title" className={c.title}>Just one cookie</h2>
        </div>
        <p id="cw-cookie-text" className={c.text}>
          No accounts, no tracking. With your permission we remember your verified number for 30 days, so your next request
          needs no code.
        </p>

        {expanded && (
          <div className={c.prefs}>
            <div className={c.pref}>
              <div className={c.prefText}>
                <b>Essential</b>
                <span>Keeps the booking form secure and saves this choice. Always on.</span>
              </div>
              <button type="button" role="switch" aria-checked="true" aria-label="Essential cookies, always on" className={c.switch} disabled />
            </div>
            <div className={c.pref}>
              <div className={c.prefText}>
                <b id="cw-remember">Remember my number</b>
                <span>Skip the SMS code on this device for 30 days.</span>
              </div>
              <button type="button" role="switch" aria-checked={remember} aria-labelledby="cw-remember" className={c.switch} onClick={() => setRemember((v) => !v)} />
            </div>
          </div>
        )}

        <div className={c.actions}>
          {expanded ? (
            <button type="button" className={c.primary} onClick={() => decide(remember ? 'all' : 'essential')}>Save choices</button>
          ) : (
            <button type="button" className={c.primary} onClick={() => decide('all')}>Accept</button>
          )}
          <button type="button" className={c.secondary} onClick={() => decide('essential')}>Essential only</button>
        </div>

        <div className={c.foot}>
          {!expanded ? (
            <button type="button" className={c.link} onClick={() => setExpanded(true)}>Choose what to allow</button>
          ) : <span />}
          <span className={c.fine}>Change any time in the footer</span>
        </div>
      </div>
    </section>
  )
}

/** Footer link that reopens the card. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={`${c.settingsLink} ${className ?? ''}`} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  )
}
