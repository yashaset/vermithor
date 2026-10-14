'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import s from './careways.module.css'
import { Bed, Car, Plane, Search, Shield } from './icons'
import { DESTINATIONS, Destination, KIND_LABEL, Kind, Offer, inr, savePct } from './data'
import RoyalEnvelope from './RoyalEnvelope'
import { useLiveOffers, useSiteContent } from './store'

type Sort = 'rec' | 'low' | 'high'
type Show = 'all' | Kind
const SORTS: { id: Sort; label: string }[] = [
  { id: 'rec', label: 'Recommended' },
  { id: 'low', label: 'Price ↑' },
  { id: 'high', label: 'Price ↓' },
]
const SHOWS: { id: Show; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'stay', label: 'Stays' },
  { id: 'flight', label: 'Flights' },
  { id: 'chauffeur', label: 'Chauffeurs' },
]
const LIMIT = 6

export const KindIcon = ({ kind, size = 14 }: { kind: Kind; size?: number }) =>
  kind === 'stay' ? <Bed size={size} /> : kind === 'flight' ? <Plane size={size} /> : <Car size={size} />

function OfferRow({ o, index }: { o: Offer; index: number }) {
  return (
    <article className={s.jrow} style={{ animationDelay: `${index * 0.07}s` }}>
      <div className={s.jimg}>
        <Image src={o.image} alt="" fill unoptimized sizes="(max-width: 1000px) 100vw, 280px" className={s.jimgIn} />
        <span className={s.badge}><Shield size={13} />Careways Verified</span>
        {o.route && (
          <div className={s.routeArt} aria-hidden>
            <b>{o.route.from}</b><i /><Plane size={18} /><i /><b>{o.route.to}</b>
          </div>
        )}
      </div>
      <div className={s.jmid}>
        <span className={s.kindTag}><KindIcon kind={o.kind} />{KIND_LABEL[o.kind]}{o.route ? ` · ${o.route.cabin}` : ''}</span>
        <h3 className={s.jname}>{o.title}</h3>
        <p className={s.jsub}>{o.subtitle}</p>
        <div className={s.chips}>
          {o.perks.map((p) => <span key={p} className={s.chip}>{p}</span>)}
        </div>
      </div>
      <div className={s.jprice}>
        <span className={s.memberLabel}>Members’ rate</span>
        <div>
          <div className={s.wasRow}>
            <span className={s.was}><span className="sr-only">Usually </span>{inr(o.was)}</span>
            <span className={s.save}>−{savePct(o)}%</span>
          </div>
          <div className={s.jpriceVal} style={{ marginTop: 4 }}>{inr(o.price)}</div>
          <div className={s.jpriceUnit}>{o.unit}</div>
        </div>
        <Link href={`/demo/careways/book/${o.id}`} className={s.btnRoyal}>View &amp; reserve</Link>
      </div>
    </article>
  )
}

/** Hero search, mixed results, the Royal Envelope and collections share the search state. */
export default function Experience() {
  const [dest, setDest] = useState<Destination>('Udaipur')
  const [destInput, setDestInput] = useState<Destination>('Udaipur')
  const [sort, setSort] = useState<Sort>('rec')
  const [show, setShow] = useState<Show>('all')
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const resultsRef = useRef<HTMLElement>(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const offers = useLiveOffers() // defaults, plus any edits made in the admin panel
  const content = useSiteContent()
  const forDest = useMemo(() => offers.filter((o) => o.dest === dest), [offers, dest])
  const counts = useMemo(() => {
    const c: Record<Show, number> = { all: forDest.length, stay: 0, flight: 0, chauffeur: 0 }
    forDest.forEach((o) => c[o.kind]++)
    return c
  }, [forDest])
  const list = useMemo(() => {
    const l = forDest.filter((o) => show === 'all' || o.kind === show)
    if (sort === 'low') l.sort((a, b) => a.price - b.price)
    if (sort === 'high') l.sort((a, b) => b.price - a.price)
    return l
  }, [forDest, show, sort])
  const shown = showAll ? list : list.slice(0, LIMIT)

  const load = (d: Destination, scroll = false) => {
    clearTimeout(timer.current)
    setDest(d)
    setDestInput(d)
    setShowAll(false)
    setShow('all')
    setLoading(true)
    timer.current = setTimeout(() => setLoading(false), 900) // stands in for the API call
    if (scroll) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    load(destInput, true)
  }

  return (
    <>
      {/* ---------- Hero + big search ---------- */}
      <section id="top" className={s.hero}>
        <div className={s.heroArt} aria-hidden>
          <Image src={content.hero.image} alt="" fill priority unoptimized sizes="100vw" className={s.heroImg} />
          <div className={s.heroShade} />
        </div>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <div className={s.orn} aria-hidden>
            <i />
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0 L14 7 L7 14 L0 7 Z" fill="currentColor" /></svg>
            <i />
          </div>
          <span className={s.eyebrow} style={{ color: '#CDA85A' }}>{content.hero.eyebrow}</span>
          <h1 className={s.heroTitle}>
            {content.hero.line1}
            <br />
            {content.hero.line2} <em>{content.hero.emphasis}</em>
          </h1>
          <p className={s.heroSub}>{content.hero.sub}</p>

          <form className={s.sbar} onSubmit={onSearch} role="search">
            <div className={s.sf}>
              <label htmlFor="cw-dest">Destination</label>
              <select id="cw-dest" value={destInput} onChange={(e) => setDestInput(e.target.value as Destination)}>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>{d.label}, {d.region}</option>
                ))}
              </select>
            </div>
            <div className={s.sf}>
              <label htmlFor="cw-dates">Dates</label>
              <input id="cw-dates" defaultValue="13 – 16 Nov" />
            </div>
            <div className={s.sf}>
              <label htmlFor="cw-pax">Guests</label>
              <input id="cw-pax" defaultValue="2 adults" />
            </div>
            <div className={s.sf}>
              <label htmlFor="cw-from">Flying from</label>
              <input id="cw-from" defaultValue="New Delhi (DEL)" />
            </div>
            <button type="submit" className={s.go}>
              <Search />
              Search
            </button>
          </form>

          <div className={s.incl}>
            <span><Bed />Stays</span>
            <span><Plane />Flights</span>
            <span><Car />Chauffeurs</span>
            <span>— all in one search</span>
          </div>
        </div>
      </section>

      {/* ---------- Accreditation row ---------- */}
      <div className={s.pressrow}>
        <div className={`${s.wrap} ${s.pressrowIn}`}>
          <span className={s.eyebrow}>Accredited &amp; recognised</span>
          {['[IATA accreditation]', '[Tourism board]', '[Press feature]', '[Payment security]', '[Hotel group partner]'].map((l) => (
            <span key={l} className={s.logoSlot}>{l}</span>
          ))}
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <section id="results" ref={resultsRef} className={s.sec} style={{ paddingTop: 72 }}>
        <div className={s.wrap}>
          <div className={s.resTop}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className={s.eyebrow}>Your search · 13–16 Nov · 2 guests</span>
              <h2 className={s.resTitle}>Members’ rates in <em>{dest}</em></h2>
            </div>
            <div className={s.pills} role="group" aria-label="Destination">
              {DESTINATIONS.map((d) => (
                <button key={d.id} type="button" className={d.id === dest ? s.pillOn : s.pill} aria-pressed={d.id === dest} onClick={() => load(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.resBar}>
            <div className={s.toolbar}>
              <span className={s.toolbarLabel}>Show</span>
              <div className={s.pills} role="group" aria-label="Show">
                {SHOWS.map((o) => (
                  <button key={o.id} type="button" className={o.id === show ? s.pillOn : s.pill} aria-pressed={o.id === show}
                    onClick={() => { setShow(o.id); setShowAll(false) }} disabled={o.id !== 'all' && counts[o.id] === 0}>
                    {o.label} · {loading ? '…' : counts[o.id]}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.toolbar}>
              <span className={s.toolbarLabel}>Sort</span>
              <div className={s.pills} role="group" aria-label="Sort">
                {SORTS.map((o) => (
                  <button key={o.id} type="button" className={o.id === sort ? s.pillOn : s.pill} aria-pressed={o.id === sort} onClick={() => setSort(o.id)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className={s.jlist} aria-busy="true">
              <div className={s.skel} /><div className={s.skel} /><div className={s.skel} />
            </div>
          ) : (
            <>
              <div className={s.jlist} key={`${dest}-${sort}-${show}`} aria-live="polite">
                {shown.map((o, k) => <OfferRow key={o.id} o={o} index={k} />)}
              </div>
              {!showAll && list.length > LIMIT && (
                <div className={s.more}>
                  <button type="button" className={s.btnLine} onClick={() => setShowAll(true)}>
                    Show all {list.length} in {dest}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <RoyalEnvelope />

      {/* ---------- Collections ---------- */}
      <section id="collections" className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.eyebrow}>Collections</span>
            <h2>Chosen by hand, never by algorithm</h2>
          </div>
          <div className={s.coll}>
            {content.collections.map((c) => (
              <button key={c.title} type="button" className={s.tile} onClick={() => load(c.dest, true)}>
                <Image src={c.image} alt="" fill unoptimized sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 320px" className={s.tileBg} />
                <span className={s.tileCap}><b>{c.title}</b><span>{c.sub}</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
