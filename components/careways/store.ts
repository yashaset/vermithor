'use client'

/**
 * Demo content store shared by the admin panel and the public site.
 *
 * The admin saves offers and the Royal Envelope to this browser's localStorage; the public site reads the same
 * keys, so an edit in /demo/careways-admin shows up on /demo/careways straight away (same browser).
 * In production, swap these functions for API calls backed by a database. The shapes stay the same.
 */

import { useEffect, useState } from 'react'
import { ART, COLLECTIONS, Destination, ENVELOPE, ENVELOPE_OFFER, OFFERS, Offer } from './data'

/* ---------- editable site copy and images ---------- */

export interface SiteContent {
  hero: { eyebrow: string; line1: string; line2: string; emphasis: string; sub: string; image: string }
  collections: { title: string; sub: string; dest: Destination; image: string }[]
  trust: { eyebrow: string; title: string; items: { title: string; body: string }[] }
  contact: { phone: string; email: string; legal: string }
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    eyebrow: 'Members’ rates · By invitation',
    line1: 'Exclusive rates on stays,',
    line2: 'flights &',
    emphasis: 'chauffeurs.',
    sub: 'One search shows them all. Book a palace suite, a first-class seat or a car and driver — each at a rate you won’t find elsewhere.',
    image: ART.hero,
  },
  collections: COLLECTIONS.map((c) => ({ ...c })),
  trust: {
    eyebrow: 'Why travellers trust careways',
    title: 'Exclusive should never mean uncertain',
    items: [
      { title: 'Verified partners', body: 'Every hotel and chauffeur partner is vetted in person; flights only on licensed carriers.' },
      { title: 'One honest price', body: 'Taxes and fees shown upfront on every stay, flight and car. Nothing added at checkout.' },
      { title: 'Protected payments', body: 'Encrypted checkout and a clear refund policy.' },
      { title: 'A person, always', body: 'Your named concierge, reachable day or night, before and during the trip.' },
    ],
  },
  contact: { phone: '[Phone]', email: '[Email]', legal: '[Company legal name] · [Registered address] · [IATA / licence no.]' },
}

export type OfferStatus = 'live' | 'draft'
export type AdminOffer = Offer & { status: OfferStatus }
export interface EnvelopeConfig {
  offer: Offer
  /** ISO date-time when the offer closes */
  closesAt: string
  live: boolean
}

const OFFERS_KEY = 'cw-admin-offers-v1'
const ENVELOPE_KEY = 'cw-admin-envelope-v1'
const CONTENT_KEY = 'cw-admin-content-v1'
export const STORE_EVENT = 'cw:store'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
/** Returns false if the browser refused to store it (usually: uploaded images too large). */
function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new Event(STORE_EVENT))
    return true
  } catch {
    return false
  }
}

export const seedOffers = (): AdminOffer[] => OFFERS.map((o) => ({ ...o, status: 'live' }))
export const seedEnvelope = (): EnvelopeConfig => ({
  offer: ENVELOPE_OFFER,
  closesAt: new Date(Date.now() + ENVELOPE.closesIn * 1000).toISOString(),
  live: true,
})

export const loadOffers = (): AdminOffer[] => read<AdminOffer[]>(OFFERS_KEY) ?? seedOffers()
export const saveOffers = (list: AdminOffer[]) => write(OFFERS_KEY, list)
export const loadEnvelope = (): EnvelopeConfig => read<EnvelopeConfig>(ENVELOPE_KEY) ?? seedEnvelope()
export const saveEnvelope = (e: EnvelopeConfig) => write(ENVELOPE_KEY, e)
export const loadContent = (): SiteContent => {
  const c = read<Partial<SiteContent>>(CONTENT_KEY)
  return c ? { ...DEFAULT_CONTENT, ...c } as SiteContent : DEFAULT_CONTENT
}
export const saveContent = (c: SiteContent) => write(CONTENT_KEY, c)
export function resetDemo() {
  try {
    localStorage.removeItem(OFFERS_KEY)
    localStorage.removeItem(ENVELOPE_KEY)
    localStorage.removeItem(CONTENT_KEY)
    window.dispatchEvent(new Event(STORE_EVENT))
  } catch {
    /* ignore */
  }
}

/** Re-runs `fn` whenever the store changes (this tab or another). */
function useStore<T>(initial: T, fn: () => T) {
  const [v, setV] = useState<T>(initial)
  useEffect(() => {
    const load = () => setV(fn())
    load()
    window.addEventListener(STORE_EVENT, load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener(STORE_EVENT, load)
      window.removeEventListener('storage', load)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return v
}

/** Live offers for the public site (server-rendered with the defaults, then admin edits applied). */
export const useLiveOffers = () => useStore<Offer[]>(OFFERS, () => loadOffers().filter((o) => o.status === 'live'))

/** One offer by id, with admin edits applied. `undefined` while loading, `null` if missing or in draft. */
export function useOffer(id: string, fallback: Offer | null) {
  return useStore<Offer | null | undefined>(fallback ?? undefined, () => {
    const o = loadOffers().find((x) => x.id === id)
    if (o) return o.status === 'live' ? o : null
    if (id === ENVELOPE_OFFER.id) return loadEnvelope().offer
    return fallback
  })
}

export const useEnvelope = () => useStore<EnvelopeConfig>(seedEnvelope(), loadEnvelope)

/** Hero, collections, trust copy and contact details, as edited in the admin. */
export const useSiteContent = () => useStore<SiteContent>(DEFAULT_CONTENT, loadContent)
