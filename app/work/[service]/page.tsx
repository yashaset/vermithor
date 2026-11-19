import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import AppIcon from '@/components/studio/AppIcon'
import { APPS } from '@/components/studio/apps'
import { SERVICES } from '@/components/studio/services'
import { sheetFor } from '@/components/sheet/links'
import { WORK_EMAIL } from '@/components/studio/config'
import { SITE_URL, jsonLdHtml, pageMeta } from '@/components/seo/site'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }))
}

export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = SERVICES.find((x) => x.slug === params.service)
  if (!s) return {}
  return {
    title: { absolute: s.seoTitle },
    description: s.description,
    keywords: s.keywords,
    ...pageMeta({ path: `/work/${s.slug}`, title: s.seoTitle, description: s.description, images: [{ url: '/work/opengraph-image', width: 1200, height: 630 }] }),
  }
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = SERVICES.find((x) => x.slug === params.service)
  if (!s) notFound()
  const apps = (s.proofApps ?? []).map((slug) => APPS.find((a) => a.slug === slug)).filter((a): a is (typeof APPS)[number] => !!a?.href)
  const url = `${SITE_URL}/work/${s.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        serviceType: s.h1,
        description: s.description,
        url,
        areaServed: 'Worldwide',
        provider: { '@id': `${SITE_URL}/#yash` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work with me', item: `${SITE_URL}/work` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
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
          <section className="pt-14 sm:pt-20 pb-16 sm:pb-24">
            <nav aria-label="Breadcrumb" className="text-[13px] text-faint">
              <a href="/work" className="hover:text-ink">Work with me</a> <span aria-hidden>/</span> <span className="text-ink2">{s.name}</span>
            </nav>
            <h1 className="mt-6 max-w-[900px] font-black text-[clamp(42px,6.4vw,84px)] leading-[0.98] tracking-[-0.045em]">{s.h1}</h1>
            <p className="mt-6 max-w-[640px] text-[clamp(18px,1.7vw,21px)] leading-normal text-muted">{s.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="/work#brief" className="px-6 py-3.5 rounded-full bg-lime text-onlime font-bold text-[15px] hover:brightness-95">Start a project</a>
              <a href={`mailto:${WORK_EMAIL}?subject=${encodeURIComponent(`${s.name} enquiry`)}`} className="px-6 py-3.5 rounded-full border border-line font-semibold text-[15px] hover:border-ink2">
                {WORK_EMAIL}
              </a>
            </div>
          </section>

          <section className="pb-20 sm:pb-28">
            <h2 className="text-[clamp(30px,3.6vw,44px)] font-black tracking-[-0.04em] mb-7">What I build</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {s.builds.map((b) => (
                <article key={b.title} className="rounded-[24px] bg-surface border border-border p-7 sm:p-9">
                  <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{b.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{b.body}</p>
                </article>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2 list-none" aria-label="Tech stack">
              {s.stack.map((t) => (
                <li key={t} className="px-3 py-1.5 rounded-md bg-ghost text-ink2 text-[13px] font-semibold">{t}</li>
              ))}
            </ul>
          </section>

          <section className="pb-20 sm:pb-28">
            <h2 className="text-[clamp(30px,3.6vw,44px)] font-black tracking-[-0.04em] mb-7">Work I&apos;ve shipped</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <Link key={app.slug} href={app.href!} {...sheetFor(app.href)} scroll={false} className="group flex items-center gap-5 rounded-[24px] bg-surface border border-border p-6 hover:border-line">
                  <AppIcon src={app.icon} size={60} />
                  <span className="min-w-0">
                    <span className="block text-[18px] font-bold group-hover:text-accent">{app.name}</span>
                    <span className="block text-[14px] text-muted">{app.platforms} · {app.category}</span>
                  </span>
                </Link>
              ))}
              {(s.proofExtra ?? []).map((p) => {
                const inner = (
                  <>
                    <span className="block text-[18px] font-bold group-hover:text-accent">{p.title}</span>
                    <span className="block mt-2 text-[15px] leading-relaxed text-muted">{p.body}</span>
                  </>
                )
                const cls = 'group block rounded-[24px] bg-surface border border-border p-6 sm:p-7'
                return p.href ? (
                  <a key={p.title} href={p.href} className={`${cls} hover:border-line`}>{inner}</a>
                ) : (
                  <div key={p.title} className={cls}>{inner}</div>
                )
              })}
            </div>
          </section>

          <section className="pb-20 sm:pb-28 flex flex-wrap gap-10">
            <h2 className="flex-[1_1_260px] text-[clamp(30px,3.6vw,44px)] font-black tracking-[-0.04em]">Questions</h2>
            <div className="flex-[999_1_560px] min-w-0 border-b border-border">
              {s.faq.map((f) => (
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

          <section className="rounded-[28px] bg-surface border border-border p-7 sm:p-14 flex flex-wrap justify-between items-center gap-8">
            <div className="flex-[1_1_380px]">
              <h2 className="text-[clamp(26px,3.2vw,40px)] font-black tracking-[-0.04em] leading-[1.05]">Let&apos;s talk about your project.</h2>
              <p className="mt-3 text-[16px] text-muted">A free 30-minute call, then a fixed plan and price.</p>
            </div>
            <a href="/work#brief" className="px-6 py-3.5 rounded-full bg-lime text-onlime font-bold text-[15px] hover:brightness-95">Send a brief →</a>
          </section>

          <nav aria-label="Other services" className="pt-14 flex flex-wrap gap-3 text-[14px]">
            <span className="text-faint">Also:</span>
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <a key={x.slug} href={`/work/${x.slug}`} className="text-accent hover:underline">{x.h1}</a>
            ))}
            <a href="/work" className="text-accent hover:underline">Full-stack (iOS + web)</a>
          </nav>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
