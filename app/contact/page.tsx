import type { Metadata } from 'next'
import Link from 'next/link'
import ProjectBrief from '@/components/studio/ProjectBrief'
import BusinessCard from '@/components/studio/BusinessCard'
import AppIcon from '@/components/studio/AppIcon'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import { APPS } from '@/components/studio/apps'
import { CONTACT_EMAIL, LINKS } from '@/components/studio/config'
import { SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

const TITLE = 'Contact Yash Rawat · Freelance projects and app support'
const DESCRIPTION =
  'Get in touch with Yash Rawat, an independent iOS and full-stack developer in Delhi: start a freelance project, get help with one of my apps, or just say hi. I reply within 1–2 working days.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  ...pageMeta({ path: '/contact', title: TITLE, description: DESCRIPTION }),
}

const PROFILES = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'YouTube', href: LINKS.youtube },
  { label: 'Instagram', href: LINKS.instagram },
]

export default function ContactPage() {
  const supported = APPS.filter((a) => a.supportHref)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact`,
        url: `${SITE_URL}/contact`,
        name: TITLE,
        description: DESCRIPTION,
        mainEntity: {
          '@id': `${SITE_URL}/#yash`,
          '@type': 'Person',
          name: 'Yash Rawat',
          email: `mailto:${CONTACT_EMAIL}`,
          contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAIL, availableLanguage: ['English', 'Hindi'] },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
        ],
      },
    ],
  }

  return (
    <div className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main>
          <section className="pt-16 sm:pt-24 pb-14 sm:pb-20">
            <h1 className="font-black text-[clamp(44px,7vw,88px)] leading-[0.98] tracking-[-0.045em]">Contact</h1>
            <p className="mt-5 max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-normal text-muted">
              A new project, a question about one of my apps, or just hello. It all reaches me, and I reply within 1–2 working days.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-block text-[clamp(20px,2.4vw,28px)] font-semibold underline decoration-line underline-offset-[8px] hover:decoration-ink"
            >
              {CONTACT_EMAIL}
            </a>
          </section>

          {/* Freelance */}
          <section aria-labelledby="project" className="py-14 sm:py-20 border-t border-border">
            <h2 id="project" className="text-[12px] font-semibold tracking-[0.14em] uppercase text-faint">
              Start a project
            </h2>
            <div className="mt-10 grid gap-16 lg:gap-20 lg:grid-cols-2 items-center">
              <BusinessCard />
              <div className="min-w-0">
                <p className="text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] leading-snug">Tell me what you&apos;re building.</p>
                <p className="mt-2 mb-10 text-[16px] text-muted">
                  A few lines is enough. Want to know how I work first?{' '}
                  <Link href="/work" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    See services and process
                  </Link>
                  .
                </p>
                <ProjectBrief />
              </div>
            </div>
          </section>

          {/* App support */}
          {supported.length > 0 && (
            <section aria-labelledby="app-help" className="py-14 sm:py-20 border-t border-border">
              <h2 id="app-help" className="text-[12px] font-semibold tracking-[0.14em] uppercase text-faint">
                Help with an app
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 list-none">
                {supported.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={a.supportHref!}
                      className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-4 hover:border-line transition-colors"
                    >
                      <AppIcon src={a.icon} size={48} />
                      <span>
                        <span className="block font-semibold">{a.name} support</span>
                        <span className="block text-[13px] text-faint">FAQ and how to reach me</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Elsewhere */}
          <section aria-labelledby="elsewhere" className="py-14 sm:py-20 border-t border-border">
            <h2 id="elsewhere" className="text-[12px] font-semibold tracking-[0.14em] uppercase text-faint">
              Elsewhere
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3 list-none">
              {PROFILES.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center min-h-[44px] px-5 rounded-full border border-line font-semibold text-[15px] hover:border-ink"
                  >
                    {p.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
