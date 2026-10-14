import type { Metadata } from 'next'
import s from '@/components/careways/careways.module.css'
import OfferBookingLoader from '@/components/careways/OfferBookingLoader'
import { Footer, Header } from '@/components/careways/Sections'
import { ALL_OFFER_IDS, KIND_LABEL, findOffer } from '@/components/careways/data'

export function generateStaticParams() {
  return ALL_OFFER_IDS.map((id) => ({ id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const o = findOffer(params.id)
  return { title: o ? `${o.title} · ${KIND_LABEL[o.kind]} · careways` : 'careways' }
}

// Offers created in the admin panel (demo: saved in the browser) are resolved on the client.
export default function BookOfferPage({ params }: { params: { id: string } }) {
  return (
    <div className={s.root}>
      <Header />
      <main>
        <OfferBookingLoader id={params.id} serverOffer={findOffer(params.id)} />
      </main>
      <Footer />
    </div>
  )
}
