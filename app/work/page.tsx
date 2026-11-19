import type { Metadata } from 'next'
import ProjectBrief from '@/components/studio/ProjectBrief'
import BusinessCard from '@/components/studio/BusinessCard'
import { APPS } from '@/components/studio/apps'
import { CONTACT_EMAIL, LINKS } from '@/components/studio/config'
import { AUTHOR, SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'

const TITLE = 'Hire a Freelance Full-Stack Developer in India (iOS, Next.js, React) · Yash Rawat'
const DESCRIPTION =
  'Hire Yash Rawat, a freelance full-stack developer in Delhi. Native iOS apps in SwiftUI, web apps in Next.js and React, from idea to App Store and production. Available for new projects.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'freelance full-stack developer',
    'hire full-stack developer India',
    'freelance developer Delhi',
    'freelance iOS developer',
    'freelance Next.js developer',
    'freelance React developer',
    'hire app developer India',
  ],
  ...pageMeta({ path: '/work', title: TITLE, description: DESCRIPTION }),
}

const SERVICES = [
  {
    n: '01',
    title: 'iOS apps',
    href: '/work/ios-app-developer',
    body: 'Native iPhone and Mac apps in Swift and SwiftUI, taken from first screen through App Review.',
  },
  {
    n: '02',
    title: 'Web apps & sites',
    href: '/work/nextjs-developer',
    body: 'Fast, search-friendly sites and products in Next.js, with SEO and performance built in.',
  },
  {
    n: '03',
    title: 'Full-stack products',
    href: '/work/react-developer',
    body: 'React front ends with the APIs, auth and admin behind them. One developer, end to end.',
  },
]

const FAQ = [
  {
    q: 'What kind of projects do you take on?',
    a: 'iPhone and Mac apps, Next.js and React web apps, and full-stack MVPs that need both. From a few weeks of focused work to an ongoing retainer.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. I work remotely from Delhi (IST), which overlaps with European working hours and US mornings. Billing in INR or USD.',
  },
  {
    q: 'Can you take over an existing codebase?',
    a: 'Yes: React/Next.js or Swift projects that need new features, a performance pass or someone to get them over the line.',
  },
  {
    q: 'Fixed price or hourly?',
    a: 'Fixed price for well-defined projects, a monthly retainer for ongoing product work. You’ll know the cost before anything starts.',
  },
]

/** A section with its label in a narrow left column on wide screens. */
function Row({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] py-14 sm:py-20 border-t border-border">
      <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-faint">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export default function WorkWithMe() {
  const work = [
    ...APPS.filter((a) => a.status === 'live' && a.href).map((a) => ({
      name: a.name,
      kind: `${a.platforms} app · SwiftUI`,
      note: a.category,
      href: a.href!,
    })),
    { name: 'Careways', kind: 'Client MVP · Next.js', note: 'Travel booking & admin', href: '/demo/careways' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/work#service`,
        name: 'Yash Rawat — Freelance full-stack development',
        url: `${SITE_URL}/work`,
        description: DESCRIPTION,
        email: CONTACT_EMAIL,
        areaServed: 'Worldwide',
        address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
        founder: { '@type': 'Person', '@id': `${SITE_URL}/#yash`, ...AUTHOR, sameAs: [LINKS.github, LINKS.linkedin] },
        knowsAbout: ['iOS development', 'Swift', 'SwiftUI', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Full-stack web development'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.body, url: `${SITE_URL}${s.href}` },
          })),
        },
      },
      { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />

        <main>
          {/* Intro */}
          <section className="pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28">
            <p className="flex items-center gap-2.5 text-[13px] text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden />
              Taking on new projects
            </p>
            <h1 className="mt-6 max-w-[880px] font-bold text-[clamp(36px,5.2vw,64px)] leading-[1.04] tracking-[-0.035em]">
              Freelance full-stack developer for iOS and the web.
            </h1>
            <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-muted">
              I design and build native iOS apps and Next.js and React products for founders and teams, from first idea to
              launch. You work directly with the person writing the code.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#contact" className="px-6 py-3 rounded-full bg-ink text-bg font-semibold text-[15px] hover:opacity-90 transition-opacity">
                Start a project
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[15px] text-ink2 underline decoration-line underline-offset-[6px] hover:decoration-ink">
                {CONTACT_EMAIL}
              </a>
            </div>
            <p className="mt-16 text-[13px] text-faint">
              Delhi, India · Remote worldwide · Front-end developer at Wheelseye, on interfaces used by 100K+ people a month
            </p>
          </section>

          <Row label="Services">
            <ul className="grid gap-px md:grid-cols-3 list-none">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="group block h-full md:pr-8">
                    <span className="text-[13px] text-faint tabular-nums">{s.n}</span>
                    <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em]">
                      {s.title}
                      <span className="inline-block ml-2 text-faint transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </a>
                </li>
              ))}
            </ul>
          </Row>

          <Row label="Selected work">
            <ul className="list-none border-b border-border">
              {work.map((w) => (
                <li key={w.name} className="border-t border-border first:border-t-0">
                  <a href={w.href} className="group grid grid-cols-[1fr_auto] sm:grid-cols-[200px_minmax(0,1fr)_auto] gap-x-6 gap-y-1 items-baseline py-5">
                    <span className="text-[17px] font-semibold group-hover:text-accent transition-colors">{w.name}</span>
                    <span className="hidden sm:block text-[15px] text-muted">{w.kind}</span>
                    <span className="text-[14px] text-faint text-right">{w.note}</span>
                    <span className="sm:hidden col-span-2 text-[14px] text-muted">{w.kind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Row>

          <Row label="How it works">
            <ol className="grid gap-8 sm:grid-cols-3 list-none">
              {[
                ['A short call', 'We talk through the idea, the users and what success looks like. Free, 30 minutes.'],
                ['A fixed plan', 'A written scope with milestones and one price, or a monthly rate for ongoing work.'],
                ['Weekly progress', 'Working builds every week, then launch, a clean handover and support after.'],
              ].map(([t, b]) => (
                <li key={t}>
                  <h3 className="text-[17px] font-semibold">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{b}</p>
                </li>
              ))}
            </ol>
          </Row>

          <section id="contact" className="scroll-mt-6 py-14 sm:py-20 border-t border-border">
            <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-faint">Start a project</h2>
            <div className="mt-10 grid gap-16 lg:gap-20 lg:grid-cols-2 items-center">
              <BusinessCard />
              <div className="min-w-0">
                <p className="text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] leading-snug">Tell me what you&apos;re building.</p>
                <p className="mt-2 mb-10 text-[16px] text-muted">A few lines is enough. I reply within 1–2 working days.</p>
                <ProjectBrief />
              </div>
            </div>
          </section>

          <Row label="Questions">
            <div className="max-w-[720px] border-b border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-t border-border first:border-t-0 py-5">
                  <summary className="flex justify-between gap-6 cursor-pointer list-none text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-faint transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Row>
        </main>

        <StudioFooter />
      </div>
    </div>
  )
}
