'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import a from './admin.module.css'
import { Crest } from '../icons'
import { AdminOffer, EnvelopeConfig, SiteContent, loadContent, loadEnvelope, loadOffers, resetDemo, saveContent, saveEnvelope, saveOffers } from '../store'
import ContentView from './ContentView'
import { AdminLead, LeadStatus, View } from './types'
import OverviewView from './OverviewView'
import OffersView from './OffersView'
import OfferEditor, { blankOffer } from './OfferEditor'
import EnvelopeView from './EnvelopeView'
import LeadsView from './LeadsView'
import { IcExternal, IcGrid, IcInbox, IcMail, IcPage, IcPlus, IcReset, IcTag, Toast } from './ui'

const FULL = 'Not saved: browser storage is full. Use smaller images (the demo keeps them in this browser).'

const VIEWS: { id: View; label: string; title: string; crumb: string; Icon: typeof IcGrid }[] = [
  { id: 'overview', label: 'Overview', title: 'Good to see you', crumb: 'careways admin', Icon: IcGrid },
  { id: 'offers', label: 'Offers & pricing', title: 'Offers & pricing', crumb: 'Stays · flights · chauffeurs', Icon: IcTag },
  { id: 'content', label: 'Site content', title: 'Site content', crumb: 'Hero · collections · trust · contact', Icon: IcPage },
  { id: 'envelope', label: 'Royal Envelope', title: 'Royal Envelope', crumb: 'The sealed offer of the night', Icon: IcMail },
  { id: 'leads', label: 'Requests', title: 'Requests', crumb: 'Verified leads from the site', Icon: IcInbox },
]

export default function AdminApp() {
  const [view, setView] = useState<View>('overview')
  const [ready, setReady] = useState(false)
  const [offers, setOffers] = useState<AdminOffer[]>([])
  const [envelope, setEnvelope] = useState<EnvelopeConfig | null>(null)
  const [content, setContent] = useState<SiteContent | null>(null)
  const [leads, setLeads] = useState<AdminLead[] | null>(null)
  const [leadsError, setLeadsError] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ offer: AdminOffer; isNew: boolean } | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const notify = useCallback((m: string) => {
    setToast(m)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const refreshLeads = useCallback(async () => {
    setLeadsError(null)
    try {
      const res = await fetch('/api/careways/admin/leads', { cache: 'no-store' })
      if (!res.ok) throw new Error(res.status === 401 ? 'Not signed in to the admin.' : `Server said ${res.status}`)
      const data = (await res.json()) as { leads: AdminLead[] }
      setLeads(data.leads)
    } catch (e) {
      setLeadsError((e as Error).message)
      setLeads([])
    }
  }, [])

  // Load the demo store (browser) and requests (server), and follow #hash for the current section.
  useEffect(() => {
    setOffers(loadOffers())
    setEnvelope(loadEnvelope())
    setContent(loadContent())
    setReady(true)
    refreshLeads()
    const fromHash = () => {
      const h = window.location.hash.slice(1) as View
      if (VIEWS.some((v) => v.id === h)) setView(h)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [refreshLeads])

  const go = (v: View) => {
    setView(v)
    history.replaceState(null, '', `#${v}`)
    window.scrollTo({ top: 0 })
  }

  const updateOffers = (list: AdminOffer[], message?: string) => {
    setOffers(list)
    if (!saveOffers(list)) notify(FULL)
    else if (message) notify(message)
  }

  const saveOffer = (o: AdminOffer) => {
    const exists = offers.some((x) => x.id === o.id)
    updateOffers(exists ? offers.map((x) => (x.id === o.id ? o : x)) : [o, ...offers], exists ? 'Changes saved' : o.status === 'live' ? 'Offer created and live' : 'Offer saved as draft')
    setEditing(null)
  }
  const deleteOffer = (o: AdminOffer) => {
    if (!window.confirm(`Delete “${o.title}”? This can’t be undone.`)) return
    updateOffers(offers.filter((x) => x.id !== o.id), 'Offer deleted')
    setEditing(null)
  }

  const setStatus = async (reference: string, status: LeadStatus) => {
    const before = leads
    setLeads((ls) => ls?.map((l) => (l.reference === reference ? { ...l, status } : l)) ?? ls)
    try {
      const res = await fetch('/api/careways/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference, status }) })
      if (!res.ok) throw new Error()
      notify('Status updated')
    } catch {
      setLeads(before)
      notify('Couldn’t update — try again')
    }
  }

  const current = VIEWS.find((v) => v.id === view)!
  const newCount = leads?.filter((l) => l.status === 'new').length ?? 0

  return (
    <div className={a.root}>
      <aside className={a.side} aria-label="Admin">
        <div className={a.brand}>
          <Crest size={30} variant="reversed" />
          <b>careways</b>
          <small>Admin</small>
        </div>
        <nav style={{ display: 'contents' }}>
          {VIEWS.map(({ id, label, Icon }) => (
            <button key={id} type="button" className={view === id ? a.navOn : a.navBtn} aria-current={view === id ? 'page' : undefined} onClick={() => go(id)}>
              <Icon />{label}
              {id === 'leads' && newCount > 0 && <span className={a.navCount}>{newCount}</span>}
            </button>
          ))}
        </nav>
        <div className={a.sideFoot}>
          <Link href="/demo/careways" target="_blank" className={a.sideLink}><IcExternal size={16} />View live site</Link>
          <button type="button" className={a.sideLink} onClick={() => {
            if (!window.confirm('Reset offers and the Royal Envelope to the original demo content?')) return
            resetDemo(); setOffers(loadOffers()); setEnvelope(loadEnvelope()); setContent(loadContent()); notify('Demo content reset')
          }}><IcReset size={16} />Reset demo content</button>
        </div>
      </aside>

      <div className={a.main}>
        <div className={a.demoBar}>
          <b>Demo admin.</b> Offer and envelope changes are saved in this browser and show on the site straight away in this browser.
          Requests are real, from the booking flow.
        </div>
        <header className={a.top}>
          <div>
            <div className={a.crumb}>{current.crumb}</div>
            <h1 className={a.h1}>{current.title}</h1>
          </div>
          <div className={a.topActions}>
            {(view === 'offers' || view === 'overview') && (
              <button type="button" className={a.btnPrimary} onClick={() => setEditing({ offer: blankOffer(), isNew: true })}><IcPlus size={16} />New offer</button>
            )}
          </div>
        </header>

        <main className={a.content}>
          {!ready || !envelope || !content ? (
            <div className={a.card} aria-busy="true"><div className={a.skelRow} /><div className={a.skelRow} /><div className={a.skelRow} /></div>
          ) : (
            <>
              {view === 'overview' && (
                <OverviewView offers={offers} envelope={envelope} leads={leads} go={go} newOffer={() => setEditing({ offer: blankOffer(), isNew: true })} />
              )}
              {view === 'offers' && <OffersView offers={offers} onChange={updateOffers} onEdit={(o) => setEditing(o ? { offer: o, isNew: false } : { offer: blankOffer(), isNew: true })} />}
              {view === 'envelope' && (
                <EnvelopeView value={envelope} onSave={(e, m) => { setEnvelope(e); notify(saveEnvelope(e) ? m : FULL) }} />
              )}
              {view === 'content' && (
                <ContentView value={content} onSave={(c) => { setContent(c); notify(saveContent(c) ? 'Published to the site' : FULL) }} />
              )}
              {view === 'leads' && <LeadsView leads={leads} error={leadsError} onRefresh={refreshLeads} onStatus={setStatus} notify={notify} />}
            </>
          )}
        </main>
      </div>

      {editing && (
        <OfferEditor offer={editing.offer} isNew={editing.isNew} onSave={saveOffer} onDelete={deleteOffer} onClose={() => setEditing(null)} />
      )}
      <Toast message={toast} />
    </div>
  )
}
