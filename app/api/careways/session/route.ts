import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { CONSENT_COOKIE, SESSION_COOKIE, maskPhone, mayRemember, sessionPhone } from '../_lib/otp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Is there a remembered, verified number on this browser (and consent to use it)? Returns it masked only. */
export async function GET() {
  const jar = cookies()
  const phone = mayRemember(jar.get(CONSENT_COOKIE)?.value) ? sessionPhone(jar.get(SESSION_COOKIE)?.value) : null
  return NextResponse.json(phone ? { verified: true, phone: maskPhone(phone) } : { verified: false })
}

/** "Not you?" — forget the remembered number. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 })
  return res
}
