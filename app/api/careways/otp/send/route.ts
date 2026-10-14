import { NextResponse } from 'next/server'
import { INDIAN_MOBILE } from '@/components/careways/data'
import { OtpError, checkSendRate, sendCode } from '../../_lib/otp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { phone?: unknown } | null
  const phone = typeof body?.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
  if (!INDIAN_MOBILE.test(phone)) {
    return NextResponse.json({ error: 'Enter a 10-digit Indian mobile number' }, { status: 400 })
  }
  try {
    checkSendRate(phone)
    const { devCode } = await sendCode(phone)
    return NextResponse.json({ ok: true, ...(devCode ? { devCode } : {}) })
  } catch (e) {
    const status = e instanceof OtpError ? e.status : 502
    const error = e instanceof OtpError ? e.message : 'We couldn’t send the code. Please try again.'
    if (!(e instanceof OtpError)) console.error('[careways] send OTP failed', e)
    return NextResponse.json({ error }, { status })
  }
}
