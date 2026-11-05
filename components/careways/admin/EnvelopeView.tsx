'use client'

import { useEffect, useState } from 'react'
import a from './admin.module.css'
import { inr } from '../data'
import { EnvelopeConfig } from '../store'
import { Crest } from '../icons'
import { ChipsInput, ImagePicker, Switch } from './ui'

const toLocalInput = (iso: string) => {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}
const left = (iso: string) => {
  const s = Math.max(0, Math.floor((Date.parse(iso) - Date.now()) / 1000))
  if (!s) return 'Closed'
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60)
  return h ? `Closes in ${h} h ${m} min` : `Closes in ${m} min`
}

export default function EnvelopeView({ value, onSave }: { value: EnvelopeConfig; onSave: (e: EnvelopeConfig, message: string) => void }) {
  const [d, setD] = useState<EnvelopeConfig>(value)
  const [open, setOpen] = useState(false)
  const [, tick] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => setD(value), [value])
  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 30_000); return () => clearInterval(t) }, [])

  const o = d.offer
  const setOffer = (patch: Partial<typeof o>) => setD((x) => ({ ...x, offer: { ...x.offer, ...patch } }))
  const money = (v: string) => Math.max(0, Math.round(Number(v.replace(/[^\d]/g, '')) || 0))
  const dirty = JSON.stringify(d) !== JSON.stringify(value)
  const pct = o.was > o.price && o.price > 0 ? Math.round((1 - o.price / o.was) * 100) : null

  const save = () => {
    if (o.title.trim().length < 3) return setError('Give the offer a name')
    if (!(o.price > 0) || !(o.was > o.price)) return setError('The public price must be higher than the sealed price')
    if (Date.parse(d.closesAt) <= Date.now()) return setError('Choose a closing time in the future')
    setError('')
    onSave(d, d.live ? 'Royal Envelope updated' : 'Royal Envelope saved (hidden)')
  }

  return (
    <div className={a.grid2}>
      <div className={a.card}>
        <div className={a.cardHead}>
          <h2>Tonight’s sealed offer</h2>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className={d.live ? a.st_live : a.st_draft}>{d.live ? 'Showing on site' : 'Hidden'}</span>
            <Switch checked={d.live} onChange={(v) => setD((x) => ({ ...x, live: v }))} label="Show the Royal Envelope on the site" />
          </div>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className={a.formGrid}>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="en-title">Offer name</label>
              <input id="en-title" className={a.input} value={o.title} maxLength={140} onChange={(e) => setOffer({ title: e.target.value })} />
            </div>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="en-sub">Details line</label>
              <input id="en-sub" className={a.input} value={o.subtitle} maxLength={200} onChange={(e) => setOffer({ subtitle: e.target.value })} />
            </div>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="en-perks">What’s included</label>
              <ChipsInput id="en-perks" value={o.perks} onChange={(v) => setOffer({ perks: v })} placeholder="Type and press Enter" />
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="en-price">Sealed price <span className={a.hint}>({o.unit})</span></label>
              <div className={a.prefix}><span>₹</span><input id="en-price" inputMode="numeric" value={o.price ? o.price.toLocaleString('en-IN') : ''} onChange={(e) => setOffer({ price: money(e.target.value) })} /></div>
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="en-was">Public price</label>
              <div className={a.prefix}><span>₹</span><input id="en-was" inputMode="numeric" value={o.was ? o.was.toLocaleString('en-IN') : ''} onChange={(e) => setOffer({ was: money(e.target.value) })} /></div>
              {pct !== null && <span className={a.hint}>Members save {pct}%</span>}
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="en-close">Closes at</label>
              <input id="en-close" type="datetime-local" className={a.input} value={toLocalInput(d.closesAt)}
                onChange={(e) => e.target.value && setD((x) => ({ ...x, closesAt: new Date(e.target.value).toISOString() }))} />
              <span className={a.hint}>{left(d.closesAt)}</span>
            </div>
            <div className={a.field} style={{ justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[3, 6, 12].map((h) => (
                  <button key={h} type="button" className={a.btn} onClick={() => setD((x) => ({ ...x, closesAt: new Date(Date.now() + h * 3600_000).toISOString() }))}>+{h} h</button>
                ))}
              </div>
            </div>
          </div>
          <span className={a.section}>Image</span>
          <ImagePicker value={o.image} onChange={(v) => setOffer({ image: v })} />
          {error && <p className={a.err} role="alert" style={{ margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className={a.btn} disabled={!dirty} onClick={() => { setD(value); setError('') }}>Discard</button>
            <button type="button" className={a.btnPrimary} disabled={!dirty} onClick={save}>Save envelope</button>
          </div>
        </div>
      </div>

      <div className={a.card}>
        <div className={a.cardHead}>
          <h2>Preview</h2>
          <button type="button" className={a.btnGhost} onClick={() => setOpen((v) => !v)}>{open ? 'Seal again' : 'Break the seal'}</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className={`${a.envPreview} ${open ? a.envOpen : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.image} alt="" />
            <div className={a.envBody}>
              <span className={a.section} style={{ color: '#E9C978', margin: 0 }}>Revealed for you</span>
              <h3>{o.title || 'Offer name'}</h3>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ textDecoration: 'line-through', opacity: .7 }}>{o.was ? inr(o.was) : '—'}</span>
                <b>{o.price ? inr(o.price) : '₹—'}</b>
                <span style={{ fontSize: 12, opacity: .8 }}>{o.unit}</span>
              </div>
            </div>
            <div className={a.curtainL} />
            <div className={a.curtainR} />
            <button type="button" className={a.seal} onClick={() => setOpen(true)} aria-label="Break the seal in the preview">
              <Crest size={46} variant="mono" color="#0F1A3C" />
            </button>
          </div>
          <p className={a.hint} style={{ margin: 0 }}>Guests see the sealed card first. The price counts down from the public price when they break the seal.</p>
        </div>
      </div>
    </div>
  )
}
