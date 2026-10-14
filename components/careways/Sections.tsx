'use client'

import Link from 'next/link'
import s from './careways.module.css'
import { ArrowUp, Clock, Crest, Envelope, Lock, Person, Rupee, Shield } from './icons'
import { CookieSettingsLink } from './CookieConsent'
import { useSiteContent } from './store'

export function Header() {
  return (
    <header className={s.hdr}>
      <div className={`${s.wrap} ${s.hdrIn}`}>
        <Link href="/demo/careways" className={s.brand} aria-label="Careways home">
          <Crest size={42} />
          <span className={s.wordmark}><b>careways</b><small>Travel, taken care of</small></span>
        </Link>
      </div>
    </header>
  )
}

const TRUST = [
  { Icon: Shield, title: 'Verified partners', body: 'Every hotel and chauffeur partner is vetted in person; flights only on licensed carriers. [Client’s inspection standard]' },
  { Icon: Rupee, title: 'One honest price', body: 'Taxes and fees shown upfront on every stay, flight and car. Nothing added at checkout. [Price promise terms]' },
  { Icon: Lock, title: 'Protected payments', body: 'Encrypted checkout and a clear refund policy. [Payment provider · compliance]' },
  { Icon: Person, title: 'A person, always', body: 'Your named concierge, reachable day or night, before and during the trip.' },
]

export function Trust() {
  const { trust } = useSiteContent()
  return (
    <section className={s.sec}>
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>{trust.eyebrow}</span>
          <h2>{trust.title}</h2>
        </div>
        <div className={s.trust}>
          {TRUST.map(({ Icon }, i) => ({ Icon, ...(trust.items[i] ?? TRUST[i]) })).map(({ Icon, title, body }) => (
            <div key={title} className={s.tr}>
              <span className={s.trIc}><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        {/* Replace with real, verified guest reviews before launch. */}
        <div className={s.quotes}>
          {[1, 2, 3].map((i) => (
            <figure key={i} className={s.q}>
              <blockquote>[Real guest review — short quote]</blockquote>
              <figcaption>[Guest name] · [City] · [Verified stay]</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const PERKS = [
  { Icon: Envelope, title: 'First access to sealed offers', body: 'Stay, flight and chauffeur rates that never appear publicly.' },
  { Icon: ArrowUp, title: 'Suite upgrades when available', body: '[Confirm with hotel partners]' },
  { Icon: Clock, title: 'Early check-in, late check-out', body: '[Confirm with hotel partners]' },
  { Icon: Person, title: 'A named concierge', body: 'One person who knows how you travel.' },
]

export function RoyalCircle() {
  return (
    <section id="circle" className={s.sec}>
      <div className={s.wrap}>
        <div className={s.circle}>
          <div className={s.circleIntro}>
            <Crest size={64} variant="reversed" />
            <span className={s.eyebrow} style={{ color: '#CDA85A' }}>Membership</span>
            <h2>The Careways Royal Circle</h2>
            <p>Membership by invitation or application. Members open the Royal Envelope first, every evening.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
              <button type="button" className={s.goSm}>Apply to join</button>
              <button type="button" className={s.btnLineLight}>Member benefits</button>
            </div>
          </div>
          <div>
            {PERKS.map(({ Icon, title, body }) => (
              <div key={title} className={s.perk}>
                <Icon />
                <div><b>{title}</b><span>{body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { contact } = useSiteContent()
  return (
    <footer className={s.ftr}>
      <div className={`${s.wrap} ${s.ftrIn}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className={s.brand}>
            <Crest size={36} />
            <span className={s.wordmark}><b style={{ fontSize: 26 }}>careways</b><small>Travel, taken care of</small></span>
          </span>
          <p className={s.ftrNote}>{contact.legal}</p>
        </div>
        <div><div className={s.eyebrow} style={{ marginBottom: 10 }}>Travel</div><Link href="/demo/careways#results">Members’ rates</Link><Link href="/demo/careways#envelope">Royal Envelope</Link><Link href="/demo/careways#collections">Collections</Link></div>
        <div><div className={s.eyebrow} style={{ marginBottom: 10 }}>Trust</div><a href="#">How we inspect</a><a href="#">Price promise</a><a href="#">Cancellation policy</a><CookieSettingsLink className={s.ftrLinkBtn} /></div>
        <div><div className={s.eyebrow} style={{ marginBottom: 10 }}>Contact</div><a href="#">Concierge 24/7</a><a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
      </div>
      <div className={s.wrap}>
        <div className={s.ftrBase}>Design demo · sample content and illustrations</div>
      </div>
    </footer>
  )
}
