'use client'

import { FormEvent, useEffect, useState } from 'react'
import a from './admin.module.css'
import { AIRPORTS, ART, Cabin, DESTINATIONS, Destination, KIND_LABEL, Kind, inr, destInfo } from '../data'
import { AdminOffer } from '../store'
import { ChipsInput, IcClose, IcTrash, ImagePicker, Switch } from './ui'
import { KindIcon } from './OffersView'

const UNITS: Record<Kind, string[]> = {
  stay: ['per night'],
  flight: ['per traveller', 'whole aircraft'],
  chauffeur: ['one way', 'per day', 'per trip', 'per hour'],
}
const CABINS: Cabin[] = ['Economy', 'Business', 'First', 'Private jet']
const city = (code: string) => AIRPORTS.find((x) => x.code === code)?.city ?? code
const flightTitle = (from: string, dest: Destination) => `${city(from)} → ${dest}`

type Errors = Partial<Record<'title' | 'price' | 'was' | 'route', string>>

export function blankOffer(): AdminOffer {
  return {
    id: '', kind: 'stay', dest: 'Udaipur', title: '', subtitle: '', perks: [], price: 0, was: 0,
    unit: 'per night', image: ART.lake, status: 'draft',
  }
}

interface Props {
  offer: AdminOffer
  isNew: boolean
  onSave: (o: AdminOffer) => void
  onDelete: (o: AdminOffer) => void
  onClose: () => void
}

export default function OfferEditor({ offer, isNew, onSave, onDelete, onClose }: Props) {
  const [d, setD] = useState<AdminOffer>(offer)
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = <K extends keyof AdminOffer>(k: K, v: AdminOffer[K]) => setD((x) => ({ ...x, [k]: v }))

  const setKind = (kind: Kind) => setD((x) => {
    const next: AdminOffer = { ...x, kind, unit: UNITS[kind].includes(x.unit) ? x.unit : UNITS[kind][0] }
    if (kind === 'flight') {
      next.route = x.route ?? { from: 'DEL', to: destInfo(x.dest).airport, cabin: 'Business' }
      next.title = flightTitle(next.route.from, x.dest)
      next.image = ART.jet
    } else {
      next.route = undefined
      if (x.kind === 'flight') next.title = ''
      next.image = kind === 'chauffeur' ? ART.car : (x.image === ART.jet || x.image === ART.car ? ART.lake : x.image)
    }
    return next
  })

  const setDest = (dest: Destination) => setD((x) => {
    if (x.kind !== 'flight' || !x.route) return { ...x, dest }
    const auto = x.title === flightTitle(x.route.from, x.dest)
    const route = { ...x.route, to: destInfo(dest).airport }
    return { ...x, dest, route, title: auto ? flightTitle(route.from, dest) : x.title }
  })

  const setRoute = (patch: Partial<NonNullable<AdminOffer['route']>>) => setD((x) => {
    if (!x.route) return x
    const auto = x.title === flightTitle(x.route.from, x.dest)
    const route = { ...x.route, ...patch }
    const unit = patch.cabin ? (patch.cabin === 'Private jet' ? 'whole aircraft' : 'per traveller') : x.unit
    return { ...x, route, unit, title: auto ? flightTitle(route.from, x.dest) : x.title }
  })

  const validate = (o: AdminOffer): Errors => {
    const e: Errors = {}
    if (o.title.trim().length < 3) e.title = 'Give the offer a name'
    if (!(o.price > 0)) e.price = 'Enter the members’ price'
    if (!(o.was > 0)) e.was = 'Enter the public price'
    else if (o.price >= o.was) e.was = 'Must be higher than the members’ price'
    if (o.kind === 'flight' && o.route && o.route.from === o.route.to) e.route = 'Departure and arrival are the same'
    return e
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(d)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const id = d.id || `${destInfo(d.dest).airport.toLowerCase()}-${d.kind[0]}-${Date.now().toString(36)}`
    onSave({ ...d, id, title: d.title.trim(), subtitle: d.subtitle.trim() })
  }

  const pct = d.was > 0 && d.price > 0 && d.price < d.was ? Math.round((1 - d.price / d.was) * 100) : null
  const money = (v: string) => Math.max(0, Math.round(Number(v.replace(/[^\d]/g, '')) || 0))

  return (
    <>
      <div className={a.scrim} onClick={onClose} />
      <aside className={a.drawer} role="dialog" aria-modal="true" aria-labelledby="ed-title">
        <form onSubmit={submit} noValidate style={{ display: 'contents' }}>
          <div className={a.drawerHead}>
            <div>
              <div className={a.crumb}>{isNew ? 'New offer' : 'Edit offer'}</div>
              <h2 id="ed-title">{d.title || 'Untitled offer'}</h2>
            </div>
            <button type="button" className={a.iconBtn} aria-label="Close" onClick={onClose}><IcClose /></button>
          </div>

          <div className={a.drawerBody}>
            {/* live preview, as it appears in search results */}
            <div className={a.preview} aria-label="Preview">
              <span className={a.section} style={{ marginTop: 0 }}>Preview in search results</span>
              <div className={a.pvRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt="" className={a.pvImg} />
                <div className={a.pvMid}>
                  <span className={a.tag} style={{ alignSelf: 'flex-start' }}><KindIcon kind={d.kind} />{KIND_LABEL[d.kind]}{d.route ? ` · ${d.route.cabin}` : ''}</span>
                  <div className={a.pvTitle}>{d.title || 'Offer name'}</div>
                  <div className={a.cellSub}>{d.subtitle || 'Area · room, airline or vehicle'}</div>
                </div>
                <div className={a.pvPrice}>
                  <span className={a.strike} style={{ fontSize: 12 }}>{d.was ? inr(d.was) : '—'}</span>
                  <b>{d.price ? inr(d.price) : '₹—'}</b>
                  <span className={a.cellSub}>{d.unit}{pct !== null ? ` · −${pct}%` : ''}</span>
                </div>
              </div>
            </div>

            <span className={a.section}>What it is</span>
            <div className={a.seg} role="radiogroup" aria-label="Type">
              {(['stay', 'flight', 'chauffeur'] as Kind[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={d.kind === k} className={d.kind === k ? a.segOn : a.segBtn} onClick={() => setKind(k)}>
                  <KindIcon kind={k} size={14} />{KIND_LABEL[k]}
                </button>
              ))}
            </div>

            <div className={a.formGrid}>
              <div className={a.field}>
                <label className={a.label} htmlFor="ed-dest">Destination</label>
                <select id="ed-dest" className={a.input} value={d.dest} onChange={(e) => setDest(e.target.value as Destination)}>
                  {DESTINATIONS.map((x) => <option key={x.id} value={x.id}>{x.label}, {x.region}</option>)}
                </select>
              </div>
              <div className={a.field}>
                <label className={a.label} htmlFor="ed-unit">Priced</label>
                <select id="ed-unit" className={a.input} value={d.unit} onChange={(e) => set('unit', e.target.value)}>
                  {UNITS[d.kind].map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              {d.kind === 'flight' && d.route && (
                <>
                  <div className={a.field}>
                    <label className={a.label} htmlFor="ed-from">Flying from</label>
                    <select id="ed-from" className={`${a.input} ${errors.route ? a.inputErr : ''}`} value={d.route.from} onChange={(e) => setRoute({ from: e.target.value })}>
                      {AIRPORTS.map((x) => <option key={x.code} value={x.code}>{x.city} ({x.code})</option>)}
                    </select>
                    {errors.route && <span className={a.err}>{errors.route}</span>}
                  </div>
                  <div className={a.field}>
                    <label className={a.label} htmlFor="ed-cabin">Cabin</label>
                    <select id="ed-cabin" className={a.input} value={d.route.cabin} onChange={(e) => setRoute({ cabin: e.target.value as Cabin })}>
                      {CABINS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              )}

              <div className={a.fieldWide}>
                <label className={a.label} htmlFor="ed-title">{d.kind === 'stay' ? 'Hotel name' : d.kind === 'flight' ? 'Title' : 'Service name'}</label>
                <input id="ed-title" className={`${a.input} ${errors.title ? a.inputErr : ''}`} value={d.title} maxLength={140}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder={d.kind === 'stay' ? 'e.g. The Lake Palace' : d.kind === 'flight' ? 'New Delhi → Udaipur' : 'e.g. Airport transfer, luxury SUV'} />
                {errors.title && <span className={a.err}>{errors.title}</span>}
              </div>
              <div className={a.fieldWide}>
                <label className={a.label} htmlFor="ed-sub">Details line</label>
                <input id="ed-sub" className={a.input} value={d.subtitle} maxLength={200} onChange={(e) => set('subtitle', e.target.value)}
                  placeholder={d.kind === 'stay' ? 'Area · room type' : d.kind === 'flight' ? 'Airline · 09:30 → 10:55 · non-stop' : 'Vehicle · duration · route'} />
              </div>
              <div className={a.fieldWide}>
                <label className={a.label} htmlFor="ed-perks">What’s included</label>
                <ChipsInput id="ed-perks" value={d.perks} onChange={(v) => set('perks', v)} placeholder="Type and press Enter — e.g. Breakfast" />
                <span className={a.hint}>Up to 6. Shown as small tags under the offer.</span>
              </div>
            </div>

            <span className={a.section}>Pricing</span>
            <div className={a.formGrid}>
              <div className={a.field}>
                <label className={a.label} htmlFor="ed-price">Members’ price</label>
                <div className={`${a.prefix} ${errors.price ? a.inputErr : ''}`}>
                  <span>₹</span>
                  <input id="ed-price" inputMode="numeric" value={d.price ? d.price.toLocaleString('en-IN') : ''} onChange={(e) => set('price', money(e.target.value))} placeholder="0" />
                </div>
                {errors.price && <span className={a.err}>{errors.price}</span>}
              </div>
              <div className={a.field}>
                <label className={a.label} htmlFor="ed-was">Public price <span className={a.hint}>(struck through)</span></label>
                <div className={`${a.prefix} ${errors.was ? a.inputErr : ''}`}>
                  <span>₹</span>
                  <input id="ed-was" inputMode="numeric" value={d.was ? d.was.toLocaleString('en-IN') : ''} onChange={(e) => set('was', money(e.target.value))} placeholder="0" />
                </div>
                {errors.was ? <span className={a.err}>{errors.was}</span> : pct !== null && <span className={a.hint}>Members save {pct}%</span>}
              </div>
            </div>

            <span className={a.section}>Image</span>
            <ImagePicker value={d.image} onChange={(v) => set('image', v)} />
            <span className={a.hint}>Demo illustrations. In production this becomes an upload.</span>

            <span className={a.section}>Visibility</span>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Switch checked={d.status === 'live'} onChange={(v) => set('status', v ? 'live' : 'draft')} label="Show on the site" />
              <span>{d.status === 'live' ? 'Live on the site' : 'Draft — hidden from the site'}</span>
            </div>
          </div>

          <div className={a.drawerFoot}>
            {!isNew ? (
              <button type="button" className={a.btnDanger} onClick={() => onDelete(d)}><IcTrash size={16} />Delete</button>
            ) : <span />}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className={a.btn} onClick={onClose}>Cancel</button>
              <button type="submit" className={a.btnPrimary}>{isNew ? 'Create offer' : 'Save changes'}</button>
            </div>
          </div>
        </form>
      </aside>
    </>
  )
}
