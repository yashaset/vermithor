'use client'

import Link from 'next/link'
import b from './booking.module.css'
import s from './careways.module.css'
import { ENVELOPE_OFFER, Offer } from './data'
import OfferBooking from './OfferBooking'
import { useOffer } from './store'

/** Resolves the offer with admin edits applied (and offers created in the admin), then shows the booking page. */
export default function OfferBookingLoader({ id, serverOffer }: { id: string; serverOffer: Offer | null }) {
  const offer = useOffer(id, serverOffer)

  if (offer === undefined) {
    return (
      <div className={b.page}>
        <div className={s.wrap}>
          <div className={s.skel} style={{ height: 420, marginTop: 40 }} />
        </div>
      </div>
    )
  }

  if (offer === null) {
    return (
      <div className={b.page}>
        <div className={s.wrap} style={{ padding: '80px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <span className={s.eyebrow}>No longer available</span>
          <h1 className={b.sumTitle} style={{ fontSize: 44 }}>This rate has been taken down</h1>
          <p className={b.sumSub}>Members’ rates change often. Have a look at what’s available tonight.</p>
          <Link href="/demo/careways#results" className={s.goSm}>See members’ rates</Link>
        </div>
      </div>
    )
  }

  return <OfferBooking offer={offer} isEnvelope={offer.id === ENVELOPE_OFFER.id} />
}
