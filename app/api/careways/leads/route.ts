import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { BookingDetails, Cabin, DESTINATIONS, INDIAN_MOBILE, Offer, emptyDetails, findOffer } from '@/components/careways/data'
import { validateDetails } from '@/components/careways/validation'
import { CONSENT_COOKIE, SESSION_COOKIE, maskPhone, mayRemember, sessionCookie, sessionPhone, tokenValid } from '../_lib/otp'
import { newReference, saveLead } from '../_lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const str = (v: unknown, max: number) => (typeof v === 'string' && v.trim() && v.length <= max ? v.trim() : null)
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v > 0 && v < 1e8 ? Math.round(v) : null)

/** Accepts an offer snapshot from the client only if it has a sane shape. */
function sanitizeOffer(x: unknown): Offer | null {
  if (!x || typeof x !== 'object') return null
  const o = x as Record<string, unknown>
  const kind = o.kind === 'stay' || o.kind === 'flight' || o.kind === 'chauffeur' ? o.kind : null
  const dest = DESTINATIONS.find((d) => d.id === o.dest)?.id ?? null
  const id = str(o.id, 64), title = str(o.title, 140), subtitle = str(o.subtitle, 200) ?? '', unit = str(o.unit, 40)
  const price = num(o.price), was = num(o.was)
  if (!kind || !dest || !id || !title || !unit || !price || !was) return null
  const perks = Array.isArray(o.perks) ? o.perks.filter((p): p is string => typeof p === 'string' && p.length <= 60).slice(0, 8) : []
  let route: Offer['route']
  if (kind === 'flight') {
    const r = (o.route ?? {}) as Record<string, unknown>
    const cabin = ['Economy', 'Business', 'First', 'Private jet'].includes(r.cabin as string) ? (r.cabin as Cabin) : null
    const from = str(r.from, 3), to = str(r.to, 3)
    if (!cabin || !from || !to) return null
    route = { from, to, cabin }
  }
  return { id, kind, dest, title, subtitle, perks, price, was, unit, image: '', route }
}

/**
 * Creates a lead. The phone must be verified, either by the remembered-number cookie
 * or by a fresh token from /api/careways/otp/verify for the same phone.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { token?: unknown; phone?: unknown; offerId?: unknown; details?: Partial<BookingDetails> }
    | null
  const jar = cookies()
  const consented = mayRemember(jar.get(CONSENT_COOKIE)?.value)
  const remembered = consented ? sessionPhone(jar.get(SESSION_COOKIE)?.value) : null
  const given = typeof body?.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
  let phone: string
  if (given && INDIAN_MOBILE.test(given) && tokenValid(body?.token, given)) phone = given
  else if (!given && remembered) phone = remembered
  else return NextResponse.json({ error: 'Please verify your phone number again.' }, { status: 401 })

  // Prefer the offer exactly as the guest saw it (admin edits are client-side in the demo); fall back to the catalogue.
  const offer = sanitizeOffer(body?.offer) ?? (typeof body?.offerId === 'string' ? findOffer(body.offerId) : null)
  if (!offer) return NextResponse.json({ error: 'This offer is no longer available.' }, { status: 404 })

  // Keep only known fields, with the right types.
  const base = emptyDetails()
  const raw = body?.details ?? {}
  const details: BookingDetails = {
    ...base,
    ...Object.fromEntries(
      Object.entries(raw).filter(([k, v]) => k in base && typeof v === typeof base[k as keyof BookingDetails]),
    ),
  }
  const errors = validateDetails(offer, details)
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Some details need another look.', errors }, { status: 422 })
  }

  // Send only the fields that matter for this kind of booking.
  const pick = (keys: (keyof BookingDetails)[]) => Object.fromEntries(keys.map((k) => [k, details[k]]))
  const fields: Record<string, (keyof BookingDetails)[]> = {
    stay: ['name', 'date', 'endDate', 'adults', 'children', 'rooms', 'requests'],
    flight: ['name', 'from', 'date', 'endDate', 'adults', 'children', 'requests'],
    chauffeur: ['name', 'pickup', 'drop', 'date', 'time', 'adults', 'requests'],
  }

  const lead = {
    reference: newReference(),
    createdAt: new Date().toISOString(),
    source: 'careways-demo' as const,
    phone: `+91${phone}`,
    offer: { id: offer.id, kind: offer.kind, title: offer.title, dest: offer.dest, price: offer.price, unit: offer.unit },
    details: pick(fields[offer.kind]),
  }

  try {
    await saveLead(lead)
  } catch (e) {
    console.error('[careways] saving lead failed', e)
    return NextResponse.json({ error: 'We couldn’t send your request. Please try again.' }, { status: 502 })
  }
  const res = NextResponse.json({ ok: true, reference: lead.reference, phone: maskPhone(phone) })
  if (consented) res.cookies.set(sessionCookie(phone)) // keep remembering this number for another 30 days
  return res
}
