import type { Metadata } from 'next'
import Link from 'next/link'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import AppIcon from '@/components/studio/AppIcon'
import ProjectBrief from '@/components/studio/ProjectBrief'
import Reveal from '@/components/Reveal'
import { APPS } from '@/components/studio/apps'
import { sheetFor } from '@/components/sheet/links'
import { CONTACT_EMAIL, LINKS } from '@/components/studio/config'
import { AUTHOR, SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

const TITLE = 'Work with me — Freelance full-stack developer (iOS, Next.js, React) · Yash Rawat'
const DESCRIPTION =
  'Hire Yash Rawat, a freelance full-stack developer in Delhi. Native iOS apps in SwiftUI, web apps in Next.js and React, from idea to App Store and production. Available for new projects.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...pageMeta({ path: '/work', title: TITLE, description: DESCRIPTION }),
}

const SERVICES = [
  {
    title: 'Native iOS apps',
    body: 'SwiftUI apps that feel at home on iPhone and Mac: widgets, haptics, offline-first data, and the whole App Store submission handled for you.',
    tags: ['Swift', 'SwiftUI', 'WidgetKit', 'App Store'],
  },
  {
    title: 'Web apps & sites',
    body: 'Fast, accessible Next.js and React front ends, from marketing sites that rank to dashboards people use every day.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Full-stack MVPs',
    body: 'The whole product, end to end: APIs, auth and OTP flows, admin panels, deploys. Built to launch quickly and grow without a rewrite.',
    tags: ['Node.js', 'API routes', 'Auth', 'Vercel'],
  },
  {
    title: 'Product design & polish',
    body: 'I design what I build. Bring a Figma file or just an idea; I’ll shape the flows, sweat the details and handle SEO and performance.',
    tags: ['UI/UX', 'Figma', 'SEO', 'Core Web Vitals'],
  },
]

const STEPS = [
  { title: 'Intro call', body: 'A free 30-minute call about what you’re building, who it’s for and what success looks like.' },
  { title: 'Scope & quote', body: 'A short written plan with milestones and a fixed price, or a monthly rate for ongoing work.' },
  { title: 'Build in the open', body: 'Weekly demos on a live preview link or TestFlight build, so you always see real progress.' },
  { title: 'Launch & support', body: 'App Store submission or production deploy, a clean handover, and support after launch.' },
]

const FAQ = [
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

export default function WorkWithMe() {
  const shipped = APPS.filter((a) => a.status === 'live' && a.href)

  const jsonLd = {
    '@context': 'https://schema.org',
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
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.body } })),
    },
  }

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />

        <main>
          {/* Hero */}
          <section className="pt-16 sm:pt-24 lg:pt-[110px] pb-16 sm:pb-24">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line text-[13px] font-medium text-ink2">
              <span className="relative flex w-2 h-2" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-lime motion-safe:animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-lime" />
              </span>
              Available for freelance projects · Remote from Delhi
            </span>
            <h1 className="mt-7 max-w-[980px] font-black text-[clamp(44px,7vw,96px)] leading-[0.98] tracking-[-0.045em]">
              Full-stack developer for iOS and the web.
            </h1>
            <p className="mt-6 max-w-[620px] text-[clamp(18px,1.7vw,21px)] leading-normal text-muted">
              I&apos;m Yash. I design and build native iOS apps in SwiftUI and web products in Next.js and React, from first
              sketch to App Store and production. You work directly with the person writing the code.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#brief" className="px-6 py-3.5 rounded-full bg-lime text-onlime font-bold text-[15px] hover:brightness-95">
                Start a project
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="px-6 py-3.5 rounded-full border border-line font-semibold text-[15px] hover:border-ink2">
                {CONTACT_EMAIL}
              </a>
            </div>

            <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[24px] overflow-hidden border border-border bg-border">
              {[
                { k: `${shipped.length} apps`, v: 'designed, built and shipped solo' },
                { k: '100K+', v: 'monthly users on interfaces I build at Wheelseye' },
                { k: 'iOS + Web', v: 'one developer across both platforms' },
                { k: '1–2 days', v: 'to a reply on every enquiry' },
              ].map((s) => (
                <div key={s.k} className="bg-surface p-6 sm:p-8">
                  <dt className="font-display font-black text-[clamp(26px,3vw,38px)] tracking-[-0.03em]">{s.k}</dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-muted">{s.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Services */}
          <section id="services" className="scroll-mt-6 pb-20 sm:pb-32">
            <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em] mb-7">What I can build for you</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} className="h-full">
                  <article className="h-full rounded-[24px] bg-surface border border-border p-7 sm:p-9">
                    <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 list-none">
                      {s.tags.map((t) => (
                        <li key={t} className="px-2.5 py-1 rounded-md bg-ghost text-ink2 text-[12px] font-semibold">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Selected work */}
          <section id="work" className="scroll-mt-6 pb-20 sm:pb-32">
            <div className="flex flex-wrap justify-between items-baseline gap-4 mb-7">
              <div>
                <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">Proof, not promises</h2>
                <p className="mt-2 text-[16px] text-muted">Real products I&apos;ve designed, built and shipped myself.</p>
              </div>
              <Link href="/#apps" className="text-[14px] text-accent hover:underline">All apps →</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shipped.map((app) => (
                <Link
                  key={app.slug}
                  href={app.href!}
                  {...sheetFor(app.href)}
                  scroll={false}
                  className="group flex items-center gap-5 rounded-[24px] bg-surface border border-border p-6 hover:border-line"
                >
                  <AppIcon src={app.icon} size={64} />
                  <span className="min-w-0">
                    <span className="block text-[18px] font-bold group-hover:text-accent">{app.name}</span>
                    <span className="block text-[14px] text-muted">{app.platforms} · SwiftUI · {app.category}</span>
                  </span>
                </Link>
              ))}
              <a
                href="/demo/careways"
                className="group md:col-span-2 lg:col-span-3 flex flex-wrap items-center justify-between gap-5 rounded-[24px] bg-surface border border-border p-6 sm:p-8 hover:border-line"
              >
                <span className="min-w-0 flex-[1_1_420px]">
                  <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-faint">Client MVP · Next.js</span>
                  <span className="block mt-2 text-[22px] font-extrabold tracking-[-0.02em] group-hover:text-accent">Careways — luxury travel booking</span>
                  <span className="block mt-2 text-[15px] leading-relaxed text-muted max-w-[640px]">
                    Members&apos; rates on stays, flights and chauffeurs: search, booking passes, phone OTP verification and a full admin for
                    offers, content and leads.
                  </span>
                </span>
                <span className="text-[14px] font-semibold text-accent whitespace-nowrap">View live demo →</span>
              </a>
            </div>
          </section>

          {/* Process */}
          <section id="process" className="scroll-mt-6 pb-20 sm:pb-32">
            <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em] mb-7">How we&apos;d work together</h2>
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 list-none">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-[24px] border border-border p-7">
                  <span className="font-display font-black text-[15px] text-accent tabular-nums">0{i + 1}</span>
                  <h3 className="mt-3 text-[19px] font-bold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Brief */}
          <section id="brief" className="scroll-mt-6 rounded-[28px] bg-surface border border-border p-7 sm:p-14 flex flex-wrap gap-12">
            <div className="flex-[1_1_300px]">
              <h2 className="text-[clamp(28px,3.4vw,42px)] font-black tracking-[-0.04em] leading-[1.05]">Have a project in mind?</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted max-w-[360px]">
                Tell me a little about it. Rough ideas are fine; we&apos;ll shape the rest on a call.
              </p>
              <div className="mt-8 flex flex-col gap-2.5 text-[15px]">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink2 hover:text-accent">{CONTACT_EMAIL}</a>
                <a href={LINKS.linkedin} className="text-ink2 hover:text-accent">LinkedIn →</a>
                <a href={LINKS.github} className="text-ink2 hover:text-accent">GitHub →</a>
              </div>
            </div>
            <ProjectBrief />
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-6 pt-20 sm:pt-32 flex flex-wrap gap-10">
            <h2 className="flex-[1_1_260px] text-[clamp(32px,4vw,48px)] font-black tracking-[-0.04em]">Questions</h2>
            <div className="flex-[999_1_560px] min-w-0 border-b border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-t border-border py-[22px]">
                  <summary className="flex justify-between gap-6 cursor-pointer list-none text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-faint transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted max-w-[640px]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <StudioFooter />
      </div>
    </div>
  )
}
