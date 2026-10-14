'use client'

import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import b from './booking.module.css'
import s from './careways.module.css'
import { Lock, Person, Shield } from './icons'
import { INDIAN_MOBILE } from './data'

const LEN = 6
const RESEND_AFTER = 30

interface Props {
  /** Called once the number is verified; resolves when the lead is saved.
   *  With a remembered number, phone and token are empty and the server uses the cookie. */
  onVerified: (args: { phone: string; token: string }) => Promise<void>
  onBack: () => void
  /** Masked number remembered on this browser (from the cw_session cookie), if any. */
  remembered?: string | null
  onForget?: () => void
}

export default function PhoneVerify({ onVerified, onBack, remembered, onForget }: Props) {
  const [phone, setPhone] = useState('')
  const [phase, setPhase] = useState<'remembered' | 'phone' | 'code'>(remembered ? 'remembered' : 'phone')
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(''))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [devCode, setDevCode] = useState<string | null>(null)
  const [wait, setWait] = useState(0)
  const boxes = useRef<(HTMLInputElement | null)[]>([])

  // The remembered number can arrive after mount; switch to it if nothing has been typed yet.
  useEffect(() => {
    if (remembered && phase === 'phone' && !phone) setPhase('remembered')
  }, [remembered]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (wait <= 0) return
    const t = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  const send = async (e?: FormEvent) => {
    e?.preventDefault()
    setError('')
    if (!INDIAN_MOBILE.test(phone)) {
      setError('Enter a 10-digit Indian mobile number')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/careways/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not send the code')
      setDevCode(data.devCode ?? null)
      setDigits(Array(LEN).fill(''))
      setPhase('code')
      setWait(RESEND_AFTER)
      setTimeout(() => boxes.current[0]?.focus(), 50)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const verify = async (code: string) => {
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/careways/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'That code didn’t match')
      await onVerified({ phone, token: data.token })
    } catch (err) {
      setError((err as Error).message)
      setDigits(Array(LEN).fill(''))
      boxes.current[0]?.focus()
    } finally {
      setBusy(false)
    }
  }

  const setDigit = (i: number, v: string) => {
    const ch = v.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = ch
    setDigits(next)
    if (ch && i < LEN - 1) boxes.current[i + 1]?.focus()
    if (next.every(Boolean)) verify(next.join(''))
  }

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) boxes.current[i - 1]?.focus()
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const code = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN)
    if (code.length === LEN) {
      e.preventDefault()
      setDigits(code.split(''))
      verify(code)
    }
  }

  return (
    <div className={b.verify}>
      <div className={b.verifyAside}>
        <span className={s.eyebrow} style={{ color: '#CDA85A' }}>Step 2 · Verify your number</span>
        <h3>Your concierge will call this number</h3>
        <p>We verify it once so your request reaches a real person, and so no one else can request a journey in your name.</p>
        <ul>
          <li><Shield size={18} />Used only for this booking</li>
          <li><Lock size={18} />Never shared or sold</li>
          <li><Person size={18} />A named concierge calls you back</li>
        </ul>
      </div>

      <div className={b.verifyMain}>
        {phase === 'remembered' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className={b.fieldLabel}>Verified on this device</span>
            <div className={b.phoneRow} style={{ padding: '16px', fontWeight: 700, fontSize: 22, letterSpacing: '.06em' }}>{remembered}</div>
            <p style={{ margin: 0, color: 'var(--ink2)', fontSize: 14 }}>No code needed — we’ll call this number.</p>
            {error && <p className={b.formErr} role="alert">{error}</p>}
            <div className={b.actions}>
              <button type="button" className={s.goSm} disabled={busy} onClick={async () => {
                setError(''); setBusy(true)
                try { await onVerified({ phone: '', token: '' }) }
                catch (err) { setError((err as Error).message) }
                finally { setBusy(false) }
              }}>
                {busy ? <span className={b.spin} /> : null}Send request
              </button>
              <button type="button" className={b.linkBtn} onClick={() => { onForget?.(); setPhase('phone'); setError('') }}>Not you? Use another number</button>
              <button type="button" className={b.linkBtn} onClick={onBack}>Edit details</button>
            </div>
          </div>
        ) : phase === 'phone' ? (
          <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 18 }} noValidate>
            <label htmlFor="v-phone" className={b.fieldLabel}>Mobile number</label>
            <div className={b.phoneRow}>
              <span className={b.cc}>+91</span>
              <input id="v-phone" className={b.phoneInput} inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210"
                value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                aria-invalid={!!error} aria-describedby={error ? 'v-err' : undefined} />
            </div>
            {error && <p className={b.formErr} id="v-err" role="alert">{error}</p>}
            <div className={b.actions}>
              <button type="submit" className={s.goSm} disabled={busy}>{busy ? <span className={b.spin} /> : null}Send code</button>
              <button type="button" className={b.linkBtn} onClick={onBack}>Edit traveller details</button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ margin: 0, color: 'var(--ink2)' }}>
              Enter the 6-digit code sent to <b style={{ color: 'var(--ink)' }}>+91 {phone.slice(0, 5)} {phone.slice(5)}</b>
            </p>
            <div className={b.otp} role="group" aria-label="One-time code">
              {digits.map((v, i) => (
                <input key={i} ref={(el) => { boxes.current[i] = el }} className={b.otpBox} value={v} inputMode="numeric"
                  autoComplete={i === 0 ? 'one-time-code' : 'off'} maxLength={1} aria-label={`Digit ${i + 1}`} disabled={busy}
                  onChange={(e) => setDigit(i, e.target.value)} onKeyDown={(e) => onKey(i, e)} onPaste={onPaste} />
              ))}
            </div>
            {devCode && <p className={b.devNote}>Development mode: no SMS is sent. Your code is <b>{devCode}</b>.</p>}
            {error && <p className={b.formErr} role="alert">{error}</p>}
            <div className={b.actions}>
              <button type="button" className={s.goSm} disabled={busy || digits.some((d) => !d)} onClick={() => verify(digits.join(''))}>
                {busy ? <span className={b.spin} /> : null}Verify &amp; send request
              </button>
              <button type="button" className={b.linkBtn} disabled={wait > 0 || busy} onClick={() => send()}>
                {wait > 0 ? `Resend in ${wait}s` : 'Resend code'}
              </button>
              <button type="button" className={b.linkBtn} onClick={() => { setPhase('phone'); setError('') }}>Change number</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
