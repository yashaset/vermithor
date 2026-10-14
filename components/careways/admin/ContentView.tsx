'use client'

import { useEffect, useState } from 'react'
import a from './admin.module.css'
import { DESTINATIONS, Destination } from '../data'
import { DEFAULT_CONTENT, SiteContent } from '../store'
import { ImagePicker } from './ui'

interface Props {
  value: SiteContent
  onSave: (c: SiteContent) => void
}

/** Everything on the home page that isn't an offer: hero, collections, trust copy, contact details. */
export default function ContentView({ value, onSave }: Props) {
  const [d, setD] = useState<SiteContent>(value)
  useEffect(() => setD(value), [value])
  const dirty = JSON.stringify(d) !== JSON.stringify(value)

  const hero = <K extends keyof SiteContent['hero']>(k: K, v: SiteContent['hero'][K]) => setD((x) => ({ ...x, hero: { ...x.hero, [k]: v } }))
  const coll = (i: number, patch: Partial<SiteContent['collections'][number]>) =>
    setD((x) => ({ ...x, collections: x.collections.map((c, j) => (j === i ? { ...c, ...patch } : c)) }))
  const trustItem = (i: number, patch: Partial<SiteContent['trust']['items'][number]>) =>
    setD((x) => ({ ...x, trust: { ...x.trust, items: x.trust.items.map((t, j) => (j === i ? { ...t, ...patch } : t)) } }))
  const contact = <K extends keyof SiteContent['contact']>(k: K, v: string) => setD((x) => ({ ...x, contact: { ...x.contact, [k]: v } }))

  return (
    <div className={a.contentGrid}>
      {/* ---------- hero ---------- */}
      <div className={a.card}>
        <div className={a.cardHead}><h2>Hero</h2><span className={a.hint}>The first thing guests see, above the search</span></div>
        <div className={a.collRow} style={{ borderTop: 0 }}>
          <div className={a.formGrid} style={{ alignContent: 'start' }}>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="h-eyebrow">Small line above the headline</label>
              <input id="h-eyebrow" className={a.input} value={d.hero.eyebrow} maxLength={60} onChange={(e) => hero('eyebrow', e.target.value)} />
            </div>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="h-l1">Headline, first line</label>
              <input id="h-l1" className={a.input} value={d.hero.line1} maxLength={60} onChange={(e) => hero('line1', e.target.value)} />
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="h-l2">Second line</label>
              <input id="h-l2" className={a.input} value={d.hero.line2} maxLength={40} onChange={(e) => hero('line2', e.target.value)} />
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="h-em">…ending in gold</label>
              <input id="h-em" className={a.input} value={d.hero.emphasis} maxLength={30} onChange={(e) => hero('emphasis', e.target.value)} />
            </div>
            <div className={a.fieldWide}>
              <label className={a.label} htmlFor="h-sub">Supporting sentence</label>
              <textarea id="h-sub" className={a.input} style={{ minHeight: 76, padding: 12, resize: 'vertical' }} value={d.hero.sub} maxLength={220} onChange={(e) => hero('sub', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className={a.heroPv} aria-label="Hero preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.hero.image} alt="" />
              <span className={a.section} style={{ color: '#E9C978', margin: 0 }}>{d.hero.eyebrow}</span>
              <h3>{d.hero.line1}<br />{d.hero.line2} <em>{d.hero.emphasis}</em></h3>
            </div>
            <span className={a.label}>Background image</span>
            <ImagePicker value={d.hero.image} onChange={(v) => hero('image', v)} />
          </div>
        </div>
      </div>

      {/* ---------- collections ---------- */}
      <div className={a.card}>
        <div className={a.cardHead}><h2>Collections</h2><span className={a.hint}>Four tiles; each opens results for its destination</span></div>
        {d.collections.map((c, i) => (
          <div key={i} className={a.collRow}>
            <div className={a.formGrid} style={{ alignContent: 'start' }}>
              <div className={a.fieldWide}>
                <label className={a.label} htmlFor={`c-t-${i}`}>Tile {i + 1} title</label>
                <input id={`c-t-${i}`} className={a.input} value={c.title} maxLength={40} onChange={(e) => coll(i, { title: e.target.value })} />
              </div>
              <div className={a.field}>
                <label className={a.label} htmlFor={`c-s-${i}`}>Caption</label>
                <input id={`c-s-${i}`} className={a.input} value={c.sub} maxLength={40} onChange={(e) => coll(i, { sub: e.target.value })} />
              </div>
              <div className={a.field}>
                <label className={a.label} htmlFor={`c-d-${i}`}>Opens</label>
                <select id={`c-d-${i}`} className={a.input} value={c.dest} onChange={(e) => coll(i, { dest: e.target.value as Destination })}>
                  {DESTINATIONS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                </select>
              </div>
            </div>
            <ImagePicker value={c.image} onChange={(v) => coll(i, { image: v })} />
          </div>
        ))}
      </div>

      {/* ---------- trust ---------- */}
      <div className={a.card}>
        <div className={a.cardHead}><h2>Trust section</h2><span className={a.hint}>Four promises under “Why travellers trust careways”</span></div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className={a.formGrid}>
            <div className={a.field}>
              <label className={a.label} htmlFor="t-eyebrow">Small line</label>
              <input id="t-eyebrow" className={a.input} value={d.trust.eyebrow} maxLength={60} onChange={(e) => setD((x) => ({ ...x, trust: { ...x.trust, eyebrow: e.target.value } }))} />
            </div>
            <div className={a.field}>
              <label className={a.label} htmlFor="t-title">Heading</label>
              <input id="t-title" className={a.input} value={d.trust.title} maxLength={80} onChange={(e) => setD((x) => ({ ...x, trust: { ...x.trust, title: e.target.value } }))} />
            </div>
          </div>
          <div className={a.formGrid}>
            {d.trust.items.map((t, i) => (
              <div key={i} className={a.field} style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 12, gap: 8 }}>
                <input className={a.input} aria-label={`Promise ${i + 1} title`} value={t.title} maxLength={40} onChange={(e) => trustItem(i, { title: e.target.value })} />
                <textarea className={a.input} aria-label={`Promise ${i + 1} text`} style={{ minHeight: 64, padding: 10, resize: 'vertical' }} value={t.body} maxLength={160} onChange={(e) => trustItem(i, { body: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- contact ---------- */}
      <div className={a.card}>
        <div className={a.cardHead}><h2>Contact & footer</h2></div>
        <div style={{ padding: 20 }} className={a.formGrid}>
          <div className={a.field}>
            <label className={a.label} htmlFor="ct-phone">Concierge phone</label>
            <input id="ct-phone" className={a.input} value={d.contact.phone} maxLength={30} onChange={(e) => contact('phone', e.target.value)} />
          </div>
          <div className={a.field}>
            <label className={a.label} htmlFor="ct-email">Email</label>
            <input id="ct-email" className={a.input} value={d.contact.email} maxLength={80} onChange={(e) => contact('email', e.target.value)} />
          </div>
          <div className={a.fieldWide}>
            <label className={a.label} htmlFor="ct-legal">Company line (legal name, address, licence)</label>
            <input id="ct-legal" className={a.input} value={d.contact.legal} maxLength={200} onChange={(e) => contact('legal', e.target.value)} />
          </div>
        </div>
      </div>

      <div className={a.saveBar}>
        <span className={a.hint}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className={a.btnGhost} onClick={() => setD(DEFAULT_CONTENT)}>Restore defaults</button>
          <button type="button" className={a.btn} disabled={!dirty} onClick={() => setD(value)}>Discard</button>
          <button type="button" className={a.btnPrimary} disabled={!dirty} onClick={() => onSave(d)}>Publish changes</button>
        </div>
      </div>
    </div>
  )
}
