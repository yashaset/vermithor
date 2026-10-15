import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { INDIAN_MOBILE } from '@/components/careways/data'
import { CONSENT_COOKIE, OtpError, checkCode, issueToken, mayRemember, sessionCookie } from '../../_lib/otp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { phone?: unknown; code?: unknown } | null
  const phone = typeof body?.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
  const code = typeof body?.code === 'string' ? body.code.replace(/\D/g, '') : ''
  if (!INDIAN_MOBILE.test(phone) || code.length !== 6) {
    return NextResponse.json({ error: 'Enter the 6-digit code' }, { status: 400 })
  }
  try {
    const ok = await checkCode(phone, code)
    if (!ok) return NextResponse.json({ error: 'That code didn’t match. Try again.' }, { status: 400 })
    const res = NextResponse.json({ ok: true, token: issueToken(phone) })
    // With consent, remember the verified number so the next request skips the code. No account is created.
    if (mayRemember(cookies().get(CONSENT_COOKIE)?.value)) res.cookies.set(sessionCookie(phone))
    return res
  } catch (e) {
    const status = e instanceof OtpError ? e.status : 502
    const error = e instanceof OtpError ? e.message : 'We couldn’t check the code. Please try again.'
    if (!(e instanceof OtpError)) console.error('[careways] verify OTP failed', e)
    return NextResponse.json({ error }, { status })
  }
}
