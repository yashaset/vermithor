'use client'

import a from './admin.module.css'
import { KIND_LABEL, Kind, inr } from '../data'
import { AdminOffer, EnvelopeConfig } from '../store'
import { AdminLead, LEAD_STATUSES, View } from './types'
import { KindIcon } from './OffersView'
import { IcMail, IcPlus, relTime } from './ui'
import { whenText } from './LeadsView'

const stCls = { new: a.st_new, contacted: a.st_contacted, confirmed: a.st_confirmed, lost: a.st_lost } as const

interface Props {
  offers: AdminOffer[]
  envelope: EnvelopeConfig
  leads: AdminLead[] | null
  go: (v: View) => void
  newOffer: () => void
}

export default function OverviewView({ offers, envelope, leads, go, newOffer }: Props) {
  const live = offers.filter((o) => o.status === 'live')
  const week = Date.now() - 7 * 86400_000
  const thisWeek = leads?.filter((l) => Date.parse(l.createdAt) >= week).length ?? 0
  const fresh = leads?.filter((l) => l.status === 'new').length ?? 0
  const confirmed = leads?.filter((l) => l.status === 'confirmed').length ?? 0
  const avgSave = live.length ? Math.round(live.reduce((s, o) => s + (1 - o.price / o.was), 0) / live.length * 100) : 0
  const byKind = (['stay', 'flight', 'chauffeur'] as Kind[]).map((k) => ({ k, n: leads?.filter((l) => l.offer.kind === k).length ?? 0 }))
  const maxKind = Math.max(1, ...byKind.map((x) => x.n))
  const secsLeft = Math.max(0, Math.floor((Date.parse(envelope.closesAt) - Date.now()) / 1000))

  return (
    <>
      <div className={a.kpis}>
        <div className={a.kpi}>
          <span className={a.kpiLabel}>New requests</span>
          <span className={a.kpiVal}>{leads ? fresh : '…'}</span>
          <span className={a.kpiSub}>Waiting for a call back</span>
        </div>
        <div className={a.kpi}>
          <span className={a.kpiLabel}>Requests this week</span>
          <span className={a.kpiVal}>{leads ? thisWeek : '…'}</span>
          <span className={a.kpiSub}>{leads ? `${confirmed} confirmed so far` : ' '}</span>
        </div>
        <div className={a.kpi}>
          <span className={a.kpiLabel}>Offers on the site</span>
          <span className={a.kpiVal}>{live.length}</span>
          <span className={a.kpiSub}>{offers.length - live.length} in drafts</span>
        </div>
        <div className={a.kpi}>
          <span className={a.kpiLabel}>Average members’ saving</span>
          <span className={a.kpiVal}>{avgSave}%</span>
          <span className={a.kpiSub}>Across live offers</span>
        </div>
      </div>

      <div className={a.grid2}>
        <div className={a.card}>
          <div className={a.cardHead}>
            <h2>Latest requests</h2>
            <button type="button" className={a.btnGhost} onClick={() => go('leads')}>View all</button>
          </div>
          {leads === null && <div aria-busy="true"><div className={a.skelRow} /><div className={a.skelRow} /></div>}
          {leads !== null && leads.length === 0 && (
            <div className={a.empty}><h3>No requests yet</h3><p style={{ margin: 0 }}>They’ll appear here as soon as guests send one.</p></div>
          )}
          {leads !== null && leads.length > 0 && (
            <div className={a.tableWrap}>
              <table className={a.table}>
                <tbody>
                  {leads.slice(0, 6).map((l) => (
                    <tr key={l.reference} className={a.rowClick} onClick={() => go('leads')}>
                      <td style={{ minWidth: 150 }}>
                        <div className={a.cellTitle}>{l.details.name ?? '—'}</div>
                        <div className={a.cellSub}>{relTime(l.createdAt)}</div>
                      </td>
                      <td style={{ minWidth: 220 }}>
                        <span className={a.tag}><KindIcon kind={l.offer.kind} />{KIND_LABEL[l.offer.kind]}</span>
                        <div className={a.cellSub} style={{ marginTop: 4 }}>{l.offer.title} · {whenText(l)}</div>
                      </td>
                      <td><span className={stCls[l.status]}>{LEAD_STATUSES.find((s) => s.id === l.status)?.label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className={a.card}>
            <div className={a.cardHead}>
              <h2>Royal Envelope</h2>
              <span className={envelope.live ? a.st_live : a.st_draft}>{envelope.live ? (secsLeft ? 'Live' : 'Closed') : 'Hidden'}</span>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className={a.cellTitle} style={{ fontSize: 16 }}>{envelope.offer.title}</div>
              <div className={a.cellSub}>
                {inr(envelope.offer.price)} <span className={a.strike}>{inr(envelope.offer.was)}</span> · {envelope.offer.unit}
              </div>
              <div className={a.cellSub}>{secsLeft ? `Closes in ${Math.floor(secsLeft / 3600)} h ${Math.floor((secsLeft % 3600) / 60)} min` : 'Closed — set a new closing time'}</div>
            </div>
            <div className={a.quick}>
              <button type="button" className={a.btn} onClick={() => go('envelope')}><IcMail size={16} />Edit envelope</button>
              <button type="button" className={a.btnPrimary} onClick={newOffer}><IcPlus size={16} />New offer</button>
            </div>
          </div>

          <div className={a.card}>
            <div className={a.cardHead}><h2>Requests by type</h2></div>
            <div className={a.bars}>
              {byKind.map(({ k, n }) => (
                <div key={k} className={a.barRow}>
                  <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><KindIcon kind={k} />{KIND_LABEL[k]}s</span>
                  <div className={a.barTrack}><div className={a.barFill} style={{ width: `${(n / maxKind) * 100}%` }} /></div>
                  <span className={a.num} style={{ textAlign: 'right' }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
