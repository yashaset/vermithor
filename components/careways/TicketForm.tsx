'use client'

import { FormEvent, ReactNode } from 'react'
import b from './booking.module.css'
import s from './careways.module.css'
import { Bed, Car, Crest, Plane } from './icons'
import { AIRPORTS, BookingDetails, Offer, destInfo, inr } from './data'
import { TicketErrors, nightsBetween } from './validation'

export type { TicketErrors }

const todayISO = () => new Date().toISOString().slice(0, 10)

const fmtDate = (iso: string) =>
  iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—'

/** Deterministic barcode from a string, purely decorative. */
function Barcode({ seed }: { seed: string }) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const bars: { x: number; w: number }[] = []
  let x = 0
  while (x < 260) {
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    const w = 1 + ((h >>> 3) & 3)
    bars.push({ x, w })
    x += w + 1 + ((h >>> 7) & 3)
  }
  return (
    <svg className={b.barcode} viewBox="0 0 260 46" preserveAspectRatio="none" aria-hidden>
      {bars.map((r, i) => <rect key={i} x={r.x} y="0" width={r.w} height="46" fill="currentColor" />)}
    </svg>
  )
}

function Stepper({ id, value, min, max, onChange, disabled }: { id: string; value: number; min: number; max: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <div className={b.stepper} role="group" aria-labelledby={id}>
      <button type="button" className={b.stepBtn} aria-label="Fewer" disabled={disabled || value <= min} onClick={() => onChange(value - 1)}>−</button>
      <span className={b.stepVal} aria-live="polite">{value}</span>
      <button type="button" className={b.stepBtn} aria-label="More" disabled={disabled || value >= max} onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}

const PASS_NAME = { stay: 'Stay voucher', flight: 'Boarding pass', chauffeur: 'Chauffeur ticket' } as const
const STUB_BAND = { stay: 'Check-in · Check-out', flight: 'Boarding · Seat · Gate', chauffeur: 'Pickup · Drop · Driver' } as const

interface Props {
  offer: Offer
  details: BookingDetails
  onChange?: (d: BookingDetails) => void
  errors?: TicketErrors
  onSubmit?: () => void
  /** Confirmation mode: fields become read-only and the pass is stamped. */
  stamped?: { reference: string }
  footer?: ReactNode
}

export default function TicketForm({ offer: o, details: d, onChange, errors = {}, onSubmit, stamped, footer }: Props) {
  const ro = !!stamped
  const set = <K extends keyof BookingDetails>(k: K, v: BookingDetails[K]) => onChange?.({ ...d, [k]: v })
  const dest = destInfo(o.dest)
  const nights = nightsBetween(d.date, d.endDate)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  const cls = (base: string, k: keyof BookingDetails) => `${base} ${errors[k] ? b.fieldErr : ''}`
  const err = (k: keyof BookingDetails) => (errors[k] ? <span className={b.err} id={`err-${k}`}>{errors[k]}</span> : null)
  const aria = (k: keyof BookingDetails) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined })

  const dateField = (k: 'date' | 'endDate', label: string, wide = false, min?: string) => (
    <div className={cls(wide ? b.fieldWide : b.field, k)}>
      <label htmlFor={`t-${k}`}>{label}</label>
      {ro ? <span className={b.readonly}>{fmtDate(d[k])}</span> : (
        <input id={`t-${k}`} type="date" value={d[k]} min={min} onChange={(e) => set(k, e.target.value)} {...aria(k)} />
      )}
      {err(k)}
    </div>
  )

  const textField = (k: 'pickup' | 'drop', label: string, placeholder: string) => (
    <div className={cls(b.fieldWide, k)}>
      <label htmlFor={`t-${k}`}>{label}</label>
      {ro ? <span className={b.readonly}>{d[k]}</span> : (
        <input id={`t-${k}`} value={d[k]} maxLength={120} placeholder={placeholder} onChange={(e) => set(k, e.target.value)} {...aria(k)} />
      )}
      {err(k)}
    </div>
  )

  const counter = (k: 'adults' | 'children' | 'rooms', label: string, min: number, max: number) => (
    <div className={cls(b.fieldThird, k)}>
      <span className={b.fieldLabel} id={`t-${k}`}>{label}</span>
      <Stepper id={`t-${k}`} value={d[k]} min={min} max={max} onChange={(v) => set(k, v)} disabled={ro} />
      {err(k)}
    </div>
  )

  return (
    <div className={b.ticketWrap}>
      {stamped && <div className={b.stamp} aria-hidden>Requested<small>{stamped.reference}</small></div>}
      <form className={b.ticket} onSubmit={submit} noValidate aria-label={`${PASS_NAME[o.kind]} details`}>
        {/* ---------- main part of the pass ---------- */}
        <div className={b.main}>
          <div className={b.band}>
            <span className={b.bandBrand}>
              <Crest size={28} variant="gold" />
              <b>careways</b>
            </span>
            <span className={b.bandTag}>{PASS_NAME[o.kind]} · {dest.label}</span>
          </div>

          <div className={b.fields}>
            <div className={cls(b.fieldWide, 'name')}>
              <label htmlFor="t-name">{o.kind === 'flight' ? 'Passenger' : 'Lead guest'} · name as on ID</label>
              {ro ? <span className={`${b.readonly} ${b.nameInput}`}>{d.name}</span> : (
                <input id="t-name" className={b.nameInput} value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" autoComplete="name" {...aria('name')} />
              )}
              {err('name')}
            </div>

            {o.kind === 'stay' && (
              <>
                {dateField('date', 'Check-in', false, todayISO())}
                {dateField('endDate', 'Check-out', false, d.date || todayISO())}
                {counter('adults', 'Adults', 1, 8)}
                {counter('children', 'Children', 0, 6)}
                {counter('rooms', 'Rooms', 1, 4)}
              </>
            )}

            {o.kind === 'flight' && (
              <>
                <div className={cls(b.field, 'from')}>
                  <label htmlFor="t-from">From</label>
                  {ro ? <span className={b.readonly}>{AIRPORTS.find((a) => a.code === d.from)?.city} ({d.from})</span> : (
                    <select id="t-from" value={d.from} onChange={(e) => set('from', e.target.value)} {...aria('from')}>
                      {AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
                    </select>
                  )}
                  {err('from')}
                </div>
                <div className={b.field}>
                  <span className={b.fieldLabel}>To</span>
                  <span className={b.readonly}>{dest.label} ({o.route?.to})</span>
                </div>
                {dateField('date', 'Depart', false, todayISO())}
                {dateField('endDate', 'Return · optional', false, d.date || todayISO())}
                {counter('adults', 'Adults', 1, 9)}
                {counter('children', 'Children', 0, 6)}
                <div className={b.fieldThird}>
                  <span className={b.fieldLabel}>Cabin</span>
                  <span className={b.readonly}>{o.route?.cabin}</span>
                </div>
              </>
            )}

            {o.kind === 'chauffeur' && (
              <>
                {textField('pickup', 'Pickup point', 'Airport, hotel or address')}
                {textField('drop', 'Drop-off', 'Hotel, address or “round trip”')}
                {dateField('date', 'Date', false, todayISO())}
                <div className={cls(b.field, 'time')}>
                  <label htmlFor="t-time">Pickup time</label>
                  {ro ? <span className={b.readonly}>{d.time}</span> : (
                    <input id="t-time" type="time" value={d.time} onChange={(e) => set('time', e.target.value)} {...aria('time')} />
                  )}
                  {err('time')}
                </div>
                {counter('adults', 'Passengers', 1, 6)}
                <div className={b.fieldTwoThirds}>
                  <span className={b.fieldLabel}>Vehicle</span>
                  <span className={b.readonly}>{o.title}</span>
                </div>
              </>
            )}

            <div className={b.fieldWide}>
              <label htmlFor="t-req">Special requests · optional</label>
              {ro ? <span className={b.readonly}>{d.requests || '—'}</span> : (
                <input id="t-req" value={d.requests} maxLength={240} onChange={(e) => set('requests', e.target.value)}
                  placeholder={o.kind === 'stay' ? 'Anniversary, dietary needs, early check-in…' : o.kind === 'flight' ? 'Meal preference, wheelchair assistance…' : 'Child seat, extra luggage, stops on the way…'} />
              )}
            </div>
          </div>

          <div className={b.mainFoot}>
            {footer ?? (
              <>
                <p className={b.fine}>No payment now. Your concierge confirms availability and the final price before anything is charged.</p>
                <button type="submit" className={s.goSm}>Continue</button>
              </>
            )}
          </div>
        </div>

        {/* ---------- tear-off stub ---------- */}
        <aside className={b.stub} aria-label="Pass summary">
          <div className={b.stubBand}>{STUB_BAND[o.kind]}</div>
          <div className={b.stubBody}>
            {o.kind === 'flight' && (
              <div className={b.route}>
                <div className={b.code}><b>{d.from || '—'}</b><span>{AIRPORTS.find((a) => a.code === d.from)?.city ?? ''}</span></div>
                <div className={b.routeLine} aria-hidden><i /><Plane size={18} /><i /></div>
                <div className={b.code} style={{ textAlign: 'right' }}><b>{o.route?.to}</b><span>{dest.label}</span></div>
              </div>
            )}
            {o.kind === 'stay' && (
              <div className={b.route}>
                <div className={b.code}><b>{fmtDate(d.date).split(' ')[0] || '—'}</b><span>{fmtDate(d.date).split(' ')[1] ?? ''} · in</span></div>
                <div className={b.routeLine} aria-hidden><i /><Bed size={18} /><i /></div>
                <div className={b.code} style={{ textAlign: 'right' }}><b>{fmtDate(d.endDate).split(' ')[0] || '—'}</b><span>{fmtDate(d.endDate).split(' ')[1] ?? ''} · out</span></div>
              </div>
            )}
            {o.kind === 'chauffeur' && (
              <div className={b.route}>
                <div className={b.code}><b>{d.time || '—'}</b><span>{fmtDate(d.date)}</span></div>
                <div className={b.routeLine} aria-hidden><i /><Car size={18} /><i /></div>
                <div className={b.code} style={{ textAlign: 'right' }}><b>{dest.airport}</b><span>{dest.label}</span></div>
              </div>
            )}

            <dl className={b.kv} style={{ margin: 0 }}>
              <div style={{ gridColumn: 'span 2' }}><dt>{o.kind === 'flight' ? 'Passenger' : 'Guest'}</dt><dd className={b.passenger}>{d.name.trim() || '—'}</dd></div>
              {o.kind === 'stay' && (
                <>
                  <div><dt>Nights</dt><dd>{nights || '—'}</dd></div>
                  <div><dt>Guests · Rooms</dt><dd>{d.adults + d.children} · {d.rooms}</dd></div>
                  <div style={{ gridColumn: 'span 2' }}><dt>Hotel</dt><dd>{o.title}</dd></div>
                  <div style={{ gridColumn: 'span 2' }}><dt>Room</dt><dd>{o.subtitle.split(' · ').pop()}</dd></div>
                </>
              )}
              {o.kind === 'flight' && (
                <>
                  <div><dt>Depart</dt><dd>{fmtDate(d.date)}</dd></div>
                  <div><dt>Return</dt><dd>{d.endDate ? fmtDate(d.endDate) : 'One way'}</dd></div>
                  <div><dt>Travellers</dt><dd>{d.adults + d.children}</dd></div>
                  <div><dt>Cabin</dt><dd>{o.route?.cabin}</dd></div>
                  <div style={{ gridColumn: 'span 2' }}><dt>Flight</dt><dd>{o.subtitle}</dd></div>
                </>
              )}
              {o.kind === 'chauffeur' && (
                <>
                  <div style={{ gridColumn: 'span 2' }}><dt>Pickup</dt><dd>{d.pickup || '—'}</dd></div>
                  <div style={{ gridColumn: 'span 2' }}><dt>Drop-off</dt><dd>{d.drop || '—'}</dd></div>
                  <div><dt>Passengers</dt><dd>{d.adults}</dd></div>
                  <div><dt>Vehicle</dt><dd>{o.subtitle.split(' · ')[0]}</dd></div>
                </>
              )}
            </dl>

            <div className={b.stubPrice}>
              <b>{inr(o.price)}</b>
              <span>members’ rate {o.unit} · final quote by your concierge</span>
            </div>
            <Barcode seed={`${o.id}-${d.name}-${d.date}`} />
          </div>
        </aside>
      </form>
    </div>
  )
}
