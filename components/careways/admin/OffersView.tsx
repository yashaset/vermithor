'use client'

import { useMemo, useState } from 'react'
import a from './admin.module.css'
import { DESTINATIONS, KIND_LABEL, Kind, inr, savePct } from '../data'
import { AdminOffer } from '../store'
import { Bed, Car, Plane } from '../icons'
import { IcCopy, IcEdit, IcPlus, IcSearch, IcTrash, Switch } from './ui'

export const KindIcon = ({ kind, size = 13 }: { kind: Kind; size?: number }) =>
  kind === 'stay' ? <Bed size={size} /> : kind === 'flight' ? <Plane size={size} /> : <Car size={size} />

type Show = 'all' | Kind

interface Props {
  offers: AdminOffer[]
  onChange: (list: AdminOffer[], message?: string) => void
  onEdit: (o: AdminOffer | null) => void
}

export default function OffersView({ offers, onChange, onEdit }: Props) {
  const [show, setShow] = useState<Show>('all')
  const [dest, setDest] = useState<string>('all')
  const [q, setQ] = useState('')

  const counts = useMemo(() => {
    const c: Record<Show, number> = { all: offers.length, stay: 0, flight: 0, chauffeur: 0 }
    offers.forEach((o) => c[o.kind]++)
    return c
  }, [offers])

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return offers.filter((o) =>
      (show === 'all' || o.kind === show) &&
      (dest === 'all' || o.dest === dest) &&
      (!t || `${o.title} ${o.subtitle} ${o.dest}`.toLowerCase().includes(t)))
  }, [offers, show, dest, q])

  const toggle = (o: AdminOffer, live: boolean) =>
    onChange(offers.map((x) => (x.id === o.id ? { ...x, status: live ? 'live' : 'draft' } : x)), live ? 'Published to the site' : 'Moved to drafts')
  const duplicate = (o: AdminOffer) => {
    const copy: AdminOffer = { ...o, id: `${o.id}-copy-${Date.now().toString(36)}`, title: `${o.title} (copy)`, status: 'draft' }
    const i = offers.findIndex((x) => x.id === o.id)
    onChange([...offers.slice(0, i + 1), copy, ...offers.slice(i + 1)], 'Duplicated as a draft')
  }
  const remove = (o: AdminOffer) => {
    if (window.confirm(`Delete “${o.title}”? This can’t be undone.`)) onChange(offers.filter((x) => x.id !== o.id), 'Offer deleted')
  }

  const SHOWS: { id: Show; label: string }[] = [
    { id: 'all', label: 'All' }, { id: 'stay', label: 'Stays' }, { id: 'flight', label: 'Flights' }, { id: 'chauffeur', label: 'Chauffeurs' },
  ]

  return (
    <>
      <div className={a.toolbar}>
        <div className={a.pills} role="group" aria-label="Type">
          {SHOWS.map((s) => (
            <button key={s.id} type="button" className={show === s.id ? a.pillOn : a.pill} aria-pressed={show === s.id} onClick={() => setShow(s.id)}>
              {s.label} · {counts[s.id]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: '1 1 360px', justifyContent: 'flex-end' }}>
          <select className={a.select} value={dest} onChange={(e) => setDest(e.target.value)} aria-label="Destination">
            <option value="all">All destinations</option>
            {DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
          <label className={a.search}>
            <IcSearch size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search offers" aria-label="Search offers" />
          </label>
        </div>
      </div>

      <div className={a.card}>
        <div className={a.tableWrap}>
          <table className={a.table}>
            <thead>
              <tr>
                <th>Offer</th><th>Type</th><th>Destination</th><th>Members’ rate</th><th>Public</th><th>Saving</th><th>On site</th><th><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className={a.rowClick} onClick={() => onEdit(o)}>
                  <td>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 260 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.image} alt="" className={a.thumb} />
                      <div>
                        <div className={a.cellTitle}>{o.title}</div>
                        <div className={a.cellSub}>{o.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={a.tag}><KindIcon kind={o.kind} />{KIND_LABEL[o.kind]}{o.route ? ` · ${o.route.cabin}` : ''}</span></td>
                  <td>{o.dest}</td>
                  <td className={a.num}><b>{inr(o.price)}</b><div className={a.cellSub}>{o.unit}</div></td>
                  <td className={`${a.num} ${a.strike}`}>{inr(o.was)}</td>
                  <td><span className={a.save}>−{savePct(o)}%</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Switch checked={o.status === 'live'} onChange={(v) => toggle(o, v)} label={`Show ${o.title} on the site`} />
                      <span className={o.status === 'live' ? a.st_live : a.st_draft}>{o.status === 'live' ? 'Live' : 'Draft'}</span>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <button type="button" className={a.iconBtn} aria-label={`Edit ${o.title}`} onClick={() => onEdit(o)}><IcEdit size={16} /></button>
                      <button type="button" className={a.iconBtn} aria-label={`Duplicate ${o.title}`} onClick={() => duplicate(o)}><IcCopy size={16} /></button>
                      <button type="button" className={a.iconBtn} aria-label={`Delete ${o.title}`} onClick={() => remove(o)}><IcTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <div className={a.empty}>
              <h3>No offers match</h3>
              <p style={{ margin: 0 }}>Try another filter, or add a new offer.</p>
              <button type="button" className={a.btnPrimary} onClick={() => onEdit(null)}><IcPlus size={16} />New offer</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
