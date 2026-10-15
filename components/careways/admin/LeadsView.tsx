'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import a from './admin.module.css'
import { AIRPORTS, KIND_LABEL, Kind, inr } from '../data'
import { AdminLead, LEAD_STATUSES, LeadStatus } from './types'
import { KindIcon } from './OffersView'
import { IcChat, IcClose, IcCopy, IcDownload, IcPhone, IcRefresh, IcSearch, fmtDay, relTime } from './ui'

const stCls: Record<LeadStatus, string> = { new: a.st_new, contacted: a.st_contacted, confirmed: a.st_confirmed, lost: a.st_lost }
const label = (s: LeadStatus) => LEAD_STATUSES.find((x) => x.id === s)!.label

/** Human summary of when, per booking type. */
export function whenText(l: AdminLead) {
  const d = l.details
  if (l.offer.kind === 'stay') return `${fmtDay(d.date)} → ${fmtDay(d.endDate)}`
  if (l.offer.kind === 'flight') return d.endDate ? `${fmtDay(d.date)} ⇄ ${fmtDay(d.endDate)}` : `${fmtDay(d.date)} · one way`
  return `${fmtDay(d.date)} · ${d.time ?? ''}`
}
const guests = (l: AdminLead) => (l.details.adults ?? 0) + (l.details.children ?? 0)

function toCsv(leads: AdminLead[]) {
  const cols = ['reference', 'received', 'status', 'name', 'phone', 'type', 'offer', 'destination', 'quoted', 'unit', 'from', 'date', 'end_date', 'time', 'pickup', 'drop', 'adults', 'children', 'rooms', 'requests']
  const esc = (v: unknown) => {
    const s = v === undefined || v === null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const rows = leads.map((l) => [
    l.reference, l.createdAt, l.status, l.details.name, l.phone, l.offer.kind, l.offer.title, l.offer.dest, l.offer.price, l.offer.unit,
    l.details.from, l.details.date, l.details.endDate, l.details.time, l.details.pickup, l.details.drop,
    l.details.adults, l.details.children, l.details.rooms, l.details.requests,
  ].map(esc).join(','))
  return [cols.join(','), ...rows].join('\n')
}

function download(leads: AdminLead[]) {
  const blob = new Blob([toCsv(leads)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `careways-leads-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

interface Props {
  leads: AdminLead[] | null
  error: string | null
  onRefresh: () => void
  onStatus: (reference: string, status: LeadStatus) => void
  notify: (m: string) => void
}

export default function LeadsView({ leads, error, onRefresh, onStatus, notify }: Props) {
  const [show, setShow] = useState<'all' | LeadStatus>('all')
  const [kind, setKind] = useState<'all' | Kind>('all')
  const [q, setQ] = useState('')
  const [openRef, setOpenRef] = useState<string | null>(null)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads?.length ?? 0, new: 0, contacted: 0, confirmed: 0, lost: 0 }
    leads?.forEach((l) => c[l.status]++)
    return c
  }, [leads])

  const list = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/\s/g, '')
    return (leads ?? []).filter((l) =>
      (show === 'all' || l.status === show) &&
      (kind === 'all' || l.offer.kind === kind) &&
      (!t || `${l.reference}${l.details.name ?? ''}${l.phone}${l.offer.title}${l.offer.dest}`.toLowerCase().replace(/\s/g, '').includes(t)))
  }, [leads, show, kind, q])

  const open = leads?.find((l) => l.reference === openRef) ?? null

  return (
    <>
      <div className={a.toolbar}>
        <div className={a.pills} role="group" aria-label="Status">
          {(['all', ...LEAD_STATUSES.map((s) => s.id)] as const).map((s) => (
            <button key={s} type="button" className={show === s ? a.pillOn : a.pill} aria-pressed={show === s} onClick={() => setShow(s)}>
              {s === 'all' ? 'All' : label(s)} · {counts[s]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: '1 1 360px', justifyContent: 'flex-end' }}>
          <select className={a.select} value={kind} onChange={(e) => setKind(e.target.value as 'all' | Kind)} aria-label="Type">
            <option value="all">All types</option>
            <option value="stay">Stays</option>
            <option value="flight">Flights</option>
            <option value="chauffeur">Chauffeurs</option>
          </select>
          <label className={a.search}>
            <IcSearch size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, phone or reference" aria-label="Search requests" />
          </label>
        </div>
      </div>

      <div className={a.card}>
        <div className={a.cardHead}>
          <h2>{list.length} {list.length === 1 ? 'request' : 'requests'}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className={a.btnGhost} onClick={onRefresh}><IcRefresh size={16} />Refresh</button>
            <button type="button" className={a.btn} disabled={!list.length} onClick={() => { download(list); notify(`Exported ${list.length} requests`) }}>
              <IcDownload size={16} />Export CSV
            </button>
          </div>
        </div>

        {error && <div className={a.empty}><h3>Couldn’t load requests</h3><p style={{ margin: 0 }}>{error}</p></div>}
        {!error && leads === null && <div aria-busy="true"><div className={a.skelRow} /><div className={a.skelRow} /><div className={a.skelRow} /></div>}
        {!error && leads !== null && leads.length === 0 && (
          <div className={a.empty}>
            <h3>No requests yet</h3>
            <p style={{ margin: 0, maxWidth: 420 }}>When a guest verifies their phone and sends a request from the site, it lands here.</p>
            <Link href="/demo/careways" target="_blank" className={a.btnPrimary}>Make a test booking</Link>
          </div>
        )}

        {!error && leads !== null && leads.length > 0 && (
          <div className={a.tableWrap}>
            <table className={a.table}>
              <thead>
                <tr><th>Received</th><th>Guest</th><th>Request</th><th>When</th><th>Guests</th><th>Quoted</th><th>Status</th></tr>
              </thead>
              <tbody>
                {list.map((l) => (
                  <tr key={l.reference} className={a.rowClick} onClick={() => setOpenRef(l.reference)}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div className={a.cellTitle}>{relTime(l.createdAt)}</div>
                      <div className={a.cellSub}>{l.reference}</div>
                    </td>
                    <td style={{ minWidth: 160 }}>
                      <div className={a.cellTitle}>{l.details.name ?? '—'}</div>
                      <div className={a.cellSub}>{l.phone}</div>
                    </td>
                    <td style={{ minWidth: 240 }}>
                      <span className={a.tag}><KindIcon kind={l.offer.kind} />{KIND_LABEL[l.offer.kind]}</span>
                      <div className={a.cellTitle} style={{ marginTop: 6 }}>{l.offer.title}</div>
                      <div className={a.cellSub}>{l.offer.dest}</div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{whenText(l)}</td>
                    <td className={a.num}>{guests(l) || '—'}</td>
                    <td className={a.num}><b>{inr(l.offer.price)}</b><div className={a.cellSub}>{l.offer.unit}</div></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select className={a.statusSelect} value={l.status} aria-label={`Status for ${l.reference}`} onChange={(e) => onStatus(l.reference, e.target.value as LeadStatus)}>
                        {LEAD_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {list.length === 0 && <div className={a.empty}><h3>Nothing matches</h3><p style={{ margin: 0 }}>Try another filter.</p></div>}
          </div>
        )}
      </div>

      {open && <LeadDrawer lead={open} onClose={() => setOpenRef(null)} onStatus={onStatus} notify={notify} />}
    </>
  )
}

function LeadDrawer({ lead: l, onClose, onStatus, notify }: { lead: AdminLead; onClose: () => void; onStatus: Props['onStatus']; notify: Props['notify'] }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const d = l.details
  const digits = l.phone.replace(/\D/g, '')
  const rows: [string, string | number | undefined][] = [
    ['Reference', l.reference],
    ['Received', new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })],
    ['Guest', d.name],
    ['Phone', `${l.phone} · verified`],
    ['Type', KIND_LABEL[l.offer.kind]],
    ['Offer', l.offer.title],
    ['Destination', l.offer.dest],
    ['Quoted', `${inr(l.offer.price)} ${l.offer.unit}`],
    ...(l.offer.kind === 'stay' ? ([['Check-in', fmtDay(d.date)], ['Check-out', fmtDay(d.endDate)], ['Rooms', d.rooms]] as [string, string | number | undefined][]) : []),
    ...(l.offer.kind === 'flight' ? ([['From', `${AIRPORTS.find((x) => x.code === d.from)?.city ?? ''} (${d.from})`], ['Depart', fmtDay(d.date)], ['Return', d.endDate ? fmtDay(d.endDate) : 'One way']] as [string, string | number | undefined][]) : []),
    ...(l.offer.kind === 'chauffeur' ? ([['Pickup', d.pickup], ['Drop-off', d.drop], ['Date & time', `${fmtDay(d.date)} · ${d.time ?? ''}`]] as [string, string | number | undefined][]) : []),
    ['Adults', d.adults],
    ...(l.offer.kind !== 'chauffeur' ? ([['Children', d.children]] as [string, number | undefined][]) : []),
    ['Requests', d.requests || '—'],
  ]
  const summary = rows.map(([k, v]) => `${k}: ${v ?? ''}`).join('\n')

  return (
    <>
      <div className={a.scrim} onClick={onClose} />
      <aside className={a.drawer} role="dialog" aria-modal="true" aria-labelledby="ld-title">
        <div className={a.drawerHead}>
          <div>
            <div className={a.crumb}>{l.reference}</div>
            <h2 id="ld-title">{d.name ?? 'Request'}</h2>
          </div>
          <button type="button" className={a.iconBtn} aria-label="Close" onClick={onClose}><IcClose /></button>
        </div>
        <div className={a.drawerBody}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className={stCls[l.status]}>{label(l.status)}</span>
            <select className={a.statusSelect} value={l.status} aria-label="Status" onChange={(e) => onStatus(l.reference, e.target.value as LeadStatus)}>
              {LEAD_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div className={a.callRow}>
            <a className={a.btnPrimary} href={`tel:+${digits}`}><IcPhone size={16} />Call {l.phone}</a>
            <a className={a.btn} href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer"><IcChat size={16} />WhatsApp</a>
            <button type="button" className={a.btn} onClick={() => { navigator.clipboard?.writeText(summary); notify('Details copied') }}><IcCopy size={16} />Copy details</button>
          </div>
          <dl className={a.dl}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: 'contents' }}>
                <dt>{k}</dt>
                <dd>{v ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </>
  )
}
