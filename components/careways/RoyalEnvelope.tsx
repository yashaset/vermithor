'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import s from './careways.module.css'
import { Crest } from './icons'
import { ENVELOPE, inr } from './data'
import { useEnvelope } from './store'

const pad = (n: number) => String(n).padStart(2, '0')

export default function RoyalEnvelope() {
  const env = useEnvelope() // set in the admin panel
  const o = env.offer
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(o.was)
  const [secs, setSecs] = useState(ENVELOPE.closesIn)
  const raf = useRef<number>()

  // Countdown to the closing time set in the admin.
  useEffect(() => {
    const tick = () => setSecs(Math.max(0, Math.floor((Date.parse(env.closesAt) - Date.now()) / 1000)))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [env.closesAt])

  // Keep the sealed price in step with admin edits.
  useEffect(() => { if (!open) setPrice(o.was) }, [o.was, open])

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current) }, [])

  if (!env.live) return null

  const reveal = () => {
    if (open) return
    setOpen(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPrice(o.price); return }
    // Count the price down once the curtains have parted.
    const from = o.was, to = o.price, delay = 1100, dur = 1500
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start - delay) / dur))
      const e = 1 - Math.pow(1 - p, 4)
      setPrice(Math.round((from - (from - to) * e) / 100) * 100)
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }

  const reseal = () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    setOpen(false)
    setPrice(o.was)
  }

  return (
    <section id="envelope" className={s.sec}>
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>The Royal Envelope</span>
          <h2>One sealed offer, opened by you alone</h2>
          <p>Each evening, one rate is reserved and never published. Break the seal to see it.</p>
        </div>

        <div className={`${s.env} ${open ? s.open : ''}`}>
          <div className={s.curL} aria-hidden><span className={s.curCap}>Sealed</span></div>
          <div className={s.curR} aria-hidden><span className={s.curCap}>only tonight</span></div>
          <button type="button" className={s.seal} onClick={reveal} aria-label="Break the seal to reveal tonight’s offer" aria-expanded={open}>
            <Crest size={58} variant="mono" color="#0F0E0C" />
            <span className={s.sealLabel}>Break the seal</span>
          </button>

          <div className={s.envIn} aria-live="polite" aria-hidden={!open}>
            <div className={s.envPhoto}>
              <div className={s.photo}>
                <Image src={o.image} alt="" fill unoptimized sizes="(max-width: 1000px) 100vw, 640px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className={s.envBody}>
              <span className={`${s.revealTag} ${s.ri} ${s.d1}`}>Revealed for you</span>
              <div className={`${s.ri} ${s.d2}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3 className={s.envName}>{o.title}</h3>
                <p className={s.envMeta}>{o.subtitle}</p>
              </div>
              <div className={`${s.envChips} ${s.ri} ${s.d3}`}>
                {o.perks.map((p) => <span key={p} className={s.envChip}>{p}</span>)}
              </div>
              <div className={`${s.priceRow} ${s.ri} ${s.d4}`}>
                <span className={s.strike}><span className="sr-only">Usually </span>{inr(o.was)}</span>
                <span className={s.envPrice}>{inr(price)}</span>
                <span className={s.envUnit}>{o.unit}, tonight only</span>
              </div>
              <div className={`${s.ctaRow} ${s.ri} ${s.d5}`}>
                <Link href={`/demo/careways/book/${o.id}`} className={s.goSm} tabIndex={open ? 0 : -1}>Claim this rate</Link>
                <div className={s.timer} aria-label={`Offer closes in ${Math.floor(secs / 3600)} hours ${Math.floor((secs % 3600) / 60)} minutes`}>
                  <div className={s.timebox}><b>{pad(Math.floor(secs / 3600))}</b><span>HRS</span></div>
                  <div className={s.timebox}><b>{pad(Math.floor((secs % 3600) / 60))}</b><span>MIN</span></div>
                  <div className={s.timebox}><b>{pad(secs % 60)}</b><span>SEC</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.resealRow}>
          <button type="button" className={s.btnLine} onClick={reseal}>Seal it again</button>
        </div>
      </div>
    </section>
  )
}
