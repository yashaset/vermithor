import crypto from 'node:crypto'

/**
 * Phone verification for the Careways demo.
 *
 * - With Twilio Verify configured (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID)
 *   a real SMS is sent and checked by Twilio.
 * - Without it, a code is generated here, kept in memory and logged to the server console.
 *   Outside production it is also returned to the browser so the flow can be tried end to end.
 *   In production this fallback is refused unless CAREWAYS_ALLOW_DEV_OTP=1.
 *
 * The in-memory store suits local dev and a single server; use Twilio (or Redis) on serverless hosts.
 */

const SECRET = process.env.CAREWAYS_SECRET || 'careways-dev-secret-change-me'
const CODE_TTL_MS = 5 * 60_000
const TOKEN_TTL_MS = 15 * 60_000
const MAX_ATTEMPTS = 5
const MAX_SENDS = 5
const SEND_WINDOW_MS = 15 * 60_000

type Entry = { hash: string; expires: number; attempts: number }
const g = globalThis as unknown as { __cwOtp?: Map<string, Entry>; __cwSends?: Map<string, number[]> }
const codes = (g.__cwOtp ??= new Map())
const sends = (g.__cwSends ??= new Map())

const hmac = (s: string) => crypto.createHmac('sha256', SECRET).update(s).digest('hex')
const safeEqual = (a: string, b: string) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))

export const isProd = process.env.NODE_ENV === 'production'
export const twilioConfigured = () =>
  !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID)

async function twilio(path: 'Verifications' | 'VerificationCheck', params: Record<string, string>) {
  const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')
  const res = await fetch(`https://verify.twilio.com/v2/Services/${process.env.TWILIO_VERIFY_SERVICE_SID}/${path}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
    cache: 'no-store',
  })
  const data = (await res.json().catch(() => ({}))) as { status?: string; message?: string }
  if (!res.ok) throw new Error(data.message || 'SMS provider error')
  return data
}

export class OtpError extends Error {
  constructor(message: string, public status = 400) {
    super(message)
  }
}

/** Throws OtpError(429) when a number has asked for too many codes recently. */
export function checkSendRate(phone: string) {
  const now = Date.now()
  const recent = (sends.get(phone) ?? []).filter((t) => now - t < SEND_WINDOW_MS)
  if (recent.length >= MAX_SENDS) throw new OtpError('Too many codes requested. Try again in a few minutes.', 429)
  recent.push(now)
  sends.set(phone, recent)
}

export async function sendCode(phone: string): Promise<{ devCode?: string }> {
  if (twilioConfigured()) {
    await twilio('Verifications', { To: `+91${phone}`, Channel: 'sms' })
    return {}
  }
  if (isProd && process.env.CAREWAYS_ALLOW_DEV_OTP !== '1') {
    throw new OtpError('SMS isn’t set up yet. Please call us instead.', 503)
  }
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0')
  codes.set(phone, { hash: hmac(`${phone}:${code}`), expires: Date.now() + CODE_TTL_MS, attempts: 0 })
  console.info(`[careways] OTP for +91${phone}: ${code}`)
  return isProd ? {} : { devCode: code }
}

export async function checkCode(phone: string, code: string): Promise<boolean> {
  if (twilioConfigured()) {
    const r = await twilio('VerificationCheck', { To: `+91${phone}`, Code: code })
    return r.status === 'approved'
  }
  const entry = codes.get(phone)
  if (!entry || entry.expires < Date.now()) throw new OtpError('That code has expired. Request a new one.')
  if (++entry.attempts > MAX_ATTEMPTS) {
    codes.delete(phone)
    throw new OtpError('Too many attempts. Request a new code.', 429)
  }
  const ok = safeEqual(entry.hash, hmac(`${phone}:${code}`))
  if (ok) codes.delete(phone)
  return ok
}

/* ---------- remembered number (no accounts, just a signed cookie) ---------- */

export const CONSENT_COOKIE = 'cw_consent'
/** True only if the visitor accepted "Remember my number" in the cookie card. */
export const mayRemember = (consent: string | undefined) => consent === 'all'

export const SESSION_COOKIE = 'cw_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days, in seconds

export function sessionCookie(phone: string) {
  const exp = Date.now() + SESSION_MAX_AGE * 1000
  return {
    name: SESSION_COOKIE,
    value: `${phone}.${exp}.${hmac(`session:${phone}:${exp}`)}`,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: isProd,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}

/** The verified phone stored in the cookie, or null if missing, expired or tampered with. */
export function sessionPhone(value: string | undefined): string | null {
  if (!value) return null
  const [phone, expStr, sig] = value.split('.')
  const exp = Number(expStr)
  if (!phone || !exp || !sig || exp < Date.now()) return null
  return safeEqual(sig, hmac(`session:${phone}:${exp}`)) ? phone : null
}

export const maskPhone = (p: string) => `+91 ${p.slice(0, 2)}••• ••${p.slice(7)}`

/** Short-lived proof that this browser verified this phone number. */
export function issueToken(phone: string) {
  const exp = Date.now() + TOKEN_TTL_MS
  return `${exp}.${hmac(`verified:${phone}:${exp}`)}`
}

export function tokenValid(token: unknown, phone: string) {
  if (typeof token !== 'string') return false
  const [expStr, sig] = token.split('.')
  const exp = Number(expStr)
  if (!exp || !sig || exp < Date.now()) return false
  return safeEqual(sig, hmac(`verified:${phone}:${exp}`))
}
