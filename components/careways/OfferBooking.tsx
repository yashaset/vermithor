'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import b from './booking.module.css'
import s from './careways.module.css'
import { Bed, Car, Crest, Plane, Shield } from './icons'
import { BookingDetails, KIND_LABEL, Offer, destInfo, emptyDetails, inr, savePct } from './data'
import TicketForm from './TicketForm'
import { TicketErrors, validateDetails } from './validation'
import PhoneVerify from './PhoneVerify'

type Step = 'details' | 'verify' | 'done'

const addDays = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

const KindIcon = ({ o, size = 18 }: { o: Offer; size?: number }) =>
  o.kind === 'stay' ? <Bed size={size} /> : o.kind === 'flight' ? <Plane size={size} /> : <Car size={size} />

export default function OfferBooking({ offer: o, isEnvelope }: { offer: Offer; isEnvelope?: boolean }) {
  const [step, setStep] = useState<Step>('details')
  const [details, setDetails] = useState<BookingDetails>(emptyDetails)
  const [errors, setErrors] = useState<TicketErrors>({})
  const [phoneMasked, setPhoneMasked] = useState('')
  const [reference, setReference] = useState('')
  const [remembered, setRemembered] = useState<string | null>(null)
  const bookRef = useRef<HTMLElement>(null)
  const dest = destInfo(o.dest)

  // Prefill sensible dates on the client (avoids a server/client date mismatch).
  useEffect(() => {
    setDetails((d) => ({
      ...d,
      date: addDays(14),
      endDate: o.kind === 'stay' ? addDays(17) : '',
      pickup: o.kind === 'chauffeur' ? `${dest.label} airport (${dest.airport})` : '',
    }))
  }, [o.kind, dest.label, dest.airport])

  // No accounts: a verified number is remembered in an httpOnly cookie for 30 days.
  useEffect(() => {
    fetch('/api/careways/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { verified?: boolean; phone?: string }) => setRemembered(d.verified && d.phone ? d.phone : null))
      .catch(() => setRemembered(null))
  }, [])

  const forgetNumber = () => {
    setRemembered(null)
    fetch('/api/careways/session', { method: 'DELETE' }).catch(() => {})
  }

  const goTo = (next: Step) => {
    setStep(next)
    requestAnimationFrame(() => bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const continueToVerify = () => {
    const e = validateDetails(o, details)
    setErrors(e)
    if (Object.keys(e).length === 0) goTo('verify')
    else document.getElementById(`t-${Object.keys(e)[0]}`)?.focus()
  }

  // Phone verified → create the lead.
  const submitLead = async ({ phone, token }: { phone: string; token: string }) => {
    const res = await fetch('/api/careways/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // The offer as the guest saw it (prices may have been edited in the admin since deploy).
      body: JSON.stringify({ token, phone, offerId: o.id, offer: o, details }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'We couldn’t send your request. Please try again.')
    setPhoneMasked(data.phone)
    setReference(data.reference)
    goTo('done')
  }

  const STEPS: { id: Step; label: string }[] = [
    { id: 'details', label: o.kind === 'flight' ? 'Passenger details' : o.kind === 'stay' ? 'Guest details' : 'Trip details' },
    { id: 'verify', label: remembered ? 'Confirm' : 'Verify phone' },
    { id: 'done', label: 'Request sent' },
  ]
  const idx = STEPS.findIndex((x) => x.id === step)

  return (
    <div className={b.page}>
      <div className={s.wrap}>
        <Link href="/demo/careways#results" className={b.back}>← All members’ rates in {dest.label}</Link>

        {/* ---------- offer summary ---------- */}
        <section className={b.summary} aria-labelledby="offer-title">
          <div className={b.sumImg}>
            <Image src={o.image} alt="" fill priority unoptimized sizes="(max-width: 1000px) 100vw, 640px" />
            <span className={b.sumBadge}><Shield size={13} />Careways Verified</span>
            {isEnvelope && <span className={b.offerBadge}><Crest size={16} variant="mono" color="#0F1A3C" />Royal Envelope rate</span>}
          </div>
          <div className={b.sumBody}>
            <span className={s.kindTag}><KindIcon o={o} size={14} />{KIND_LABEL[o.kind]} · {dest.label}{o.route ? ` · ${o.route.cabin}` : ''}</span>
            <h1 id="offer-title" className={b.sumTitle}>{o.title}</h1>
            <p className={b.sumSub}>{o.subtitle}</p>
            <div className={b.incList}>
              {o.perks.map((p) => (
                <div key={p} className={b.inc}>
                  <span className={b.incIc}><KindIcon o={o} size={16} /></span>
                  <div><div className={b.incK}>Included</div><div className={b.incD}>{p}</div></div>
                </div>
              ))}
            </div>
            <div className={b.sumPrice}>
              <b>{inr(o.price)}</b>
              <s>{inr(o.was)}</s>
              <span className={s.save}>−{savePct(o)}%</span>
              <span>members’ rate, {o.unit}</span>
            </div>
          </div>
        </section>

        {/* ---------- booking ---------- */}
        <section ref={bookRef} className={b.bookSec} aria-labelledby="book-title">
          <div className={b.bookHead}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className={s.eyebrow}>Reserve · no payment now</span>
              <h2 id="book-title">
                {step === 'details' && 'Fill in your pass'}
                {step === 'verify' && 'One last step'}
                {step === 'done' && 'Your request is with us'}
              </h2>
            </div>
            <ol className={b.steps} aria-label="Progress">
              {STEPS.map((x, i) => (
                <li key={x.id} className={i === idx ? b.stepOn : i < idx ? b.stepDone : b.step} aria-current={i === idx ? 'step' : undefined}>
                  <i>{i < idx ? '✓' : i + 1}</i>{x.label}
                </li>
              ))}
            </ol>
          </div>

          {step === 'details' && (
            <TicketForm offer={o} details={details} onChange={(d) => { setDetails(d); if (Object.keys(errors).length) setErrors(validateDetails(o, d)) }} errors={errors} onSubmit={continueToVerify} />
          )}

          {step === 'verify' && (
            <PhoneVerify onVerified={submitLead} onBack={() => goTo('details')} remembered={remembered} onForget={forgetNumber} />
          )}

          {step === 'done' && (
            <div className={b.done}>
              <div className={b.doneMsg} role="status">
                <Crest size={60} shadow />
                <div>
                  <h3>Thank you, {details.name.trim().split(' ')[0]}.</h3>
                  <p>
                    Request <span className={b.ref}>{reference}</span> is with your concierge. We’ll call you on{' '}
                    <b>{phoneMasked}</b> to confirm availability and the final price. Nothing has been charged.
                  </p>
                </div>
              </div>
              <TicketForm
                offer={o}
                details={details}
                stamped={{ reference }}
                footer={
                  <>
                    <p className={b.fine}>Keep this reference handy: {reference}</p>
                    <Link href="/demo/careways#results" className={s.goSm}>Browse more members’ rates</Link>
                  </>
                }
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
