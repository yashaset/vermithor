import type { Metadata } from 'next'
import DevlogPost from '@/components/studio/DevlogPost'
import { DocSection } from '@/components/momentum/DocPage'
import CodeBlock from '@/components/blog/CodeBlock'

const METADATA_CODE = `
// components/seo/site.ts: one helper for every page's canonical URL and share tags.
export function pageMeta({ path, title, description }: PageMetaInput): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: 'yash.apps', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// app/darkmatter/page.tsx
export const metadata = pageMeta({
  path: '/darkmatter',
  title: 'Darkmatter — A manual camera for iPhone',
  description: 'Full control over ISO, shutter speed, white balance and focus…',
})
`

const OG_CODE = `
// app/darkmatter/opengraph-image.tsx: Next.js turns this into the og:image tag.
import { ogSize, appOgImage } from '@/components/seo/ogImage'

export const size = ogSize // 1200 × 630
export const contentType = 'image/png'
export const alt = 'Darkmatter: a manual camera for iPhone'

export default function Image() {
  return appOgImage('darkmatter') // an ImageResponse drawn from the icon, name and accent colour
}
`

const SITEMAP_CODE = `
// app/sitemap.ts → /sitemap.xml, built from the same lists that draw the home page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/work'), changeFrequency: 'monthly', priority: 0.9 },
    ...APPS.filter((a) => a.href).map((a) => ({ url: url(a.href!), priority: 0.9 })),
    ...POSTS.filter((p) => p.href).map((p) => ({ url: url(p.href!), lastModified: new Date(p.date) })),
  ]
}
`

const ROBOTS_CODE = `
// app/robots.ts → /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/demo/'] },
    sitemap: \`\${SITE_URL}/sitemap.xml\`,
  }
}
`

const JSONLD_CODE = `
// Structured data in a Server Component: no library needed.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: app.name,
  operatingSystem: 'iOS',
  applicationCategory: 'MultimediaApplication',
  author: { '@type': 'Person', name: 'Yash Rawat', url: SITE_URL },
}

<script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
`

const URL_PATH = '/devlog/seo-with-claude'
const TITLE = 'Next.js SEO: how I did my site’s SEO using Claude'
const DESCRIPTION =
  'A practical Next.js SEO set-up for the App Router, done with Claude in an afternoon: the Metadata API and canonical URLs, opengraph-image.tsx share cards, a dynamic sitemap.ts, robots.ts and JSON-LD structured data. With code.'
const PUBLISHED = '2026-11-19'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · yash.apps Devlog` },
  description: DESCRIPTION,
  keywords: [
    'Next.js SEO',
    'nextjs seo',
    'Next.js App Router SEO',
    'Next.js metadata API',
    'Next.js sitemap',
    'Next.js robots.txt',
    'Next.js Open Graph image',
    'opengraph-image.tsx',
    'Next.js JSON-LD',
    'Next.js SEO checklist',
    'SEO with Claude',
    'AI for SEO',
  ],
  authors: [{ name: 'Yash Rawat', url: 'https://yashrawat.com' }],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: 'article',
    url: URL_PATH,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'yash.apps',
    publishedTime: PUBLISHED,
    authors: ['Yash Rawat'],
    tags: ['Next.js', 'SEO', 'Claude'],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const CHECKLIST = [
  'A unique title and meta description on every page (Metadata API)',
  'A canonical URL on every page (alternates.canonical)',
  'Open Graph and Twitter tags per page, not inherited from the layout',
  'A 1200 × 630 share image per page (opengraph-image.tsx)',
  'A sitemap generated from your data (app/sitemap.ts)',
  'A robots.txt that points to the sitemap and hides API routes (app/robots.ts)',
  'JSON-LD structured data for who you are and what each page is',
  'The sitemap submitted in Google Search Console',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  keywords: 'Next.js SEO, App Router, Metadata API, sitemap.ts, robots.ts, opengraph-image, JSON-LD',
  proficiencyLevel: 'Beginner',
  about: [
    { '@type': 'Thing', name: 'Next.js' },
    { '@type': 'Thing', name: 'Search engine optimization' },
  ],
  author: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  publisher: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  mainEntityOfPage: `https://yashrawat.com${URL_PATH}`,
}

const link = 'text-accent underline underline-offset-4'

export default function SeoWithClaudePost() {
  return (
    <DevlogPost
      path={URL_PATH}
      title={<>I did my <span className="text-accent">Next.js SEO</span> using Claude</>}
      meta="19 Nov 2026 · Yash Rawat · 6 min read"
      jsonLd={jsonLd}
    >
      <p className="text-[17px] sm:text-[18px] text-ink2 leading-[1.8]">
        This site is a Next.js App Router project, and for weeks its SEO was an afterthought. Paste a link to one of my app pages into
        WhatsApp and you got the home page&apos;s title and no picture. Google had no sitemap to read. So I opened the repo with Claude
        and asked it to fix the Next.js SEO properly. One afternoon and one commit later, every page describes itself. Here&apos;s the
        set-up, with the code, and what I still checked myself.
      </p>

      <DocSection n="1" title="Start with an SEO audit of the codebase">
        <p>
          I didn&apos;t hand it a generic SEO checklist. I asked it to read the codebase and tell me what was actually wrong. The answer
          was specific and a little embarrassing: the app, privacy and support pages had no canonical URL and no Open Graph tags of their
          own, so they all inherited the root layout&apos;s. There was no sitemap.xml, no robots.txt, and no structured data.
        </p>
        <p>
          That&apos;s the most common Next.js SEO mistake I&apos;ve seen: metadata set once in <code>app/layout.tsx</code> and never
          overridden, so every page shares the home page&apos;s title and preview.
        </p>
      </DocSection>

      <DocSection n="2" title="Next.js metadata: canonical URLs and Open Graph on every page">
        <p>
          The App Router&apos;s Metadata API does the heavy lifting; the trick is calling it on every page. One small helper takes a path,
          title and description and returns the canonical URL plus Open Graph and Twitter tags for that exact page. App titles now lead
          with what people search for (&ldquo;a manual camera for iPhone&rdquo;), not the way I talk about the apps.
        </p>
        <CodeBlock lang="ts" code={METADATA_CODE} />
      </DocSection>

      <DocSection n="3" title="Next.js Open Graph images with opengraph-image.tsx">
        <p>
          Drop an <code>opengraph-image.tsx</code> file into a route and Next.js generates the image and the <code>og:image</code> tag for
          you. Mine draw a 1200×630 card from each app&apos;s icon, name and accent colour with <code>ImageResponse</code>, so links
          unfurl properly in WhatsApp, iMessage, Slack and X, and a new app gets its card for free.
        </p>
        <CodeBlock lang="ts" code={OG_CODE} />
      </DocSection>

      <DocSection n="4" title="A dynamic Next.js sitemap with sitemap.ts">
        <p>
          My favourite change. <code>app/sitemap.ts</code> isn&apos;t a file I have to remember to update; it&apos;s built from the same
          app and devlog lists that draw the home page. When I published this post, it went into the sitemap automatically, with its
          date as <code>lastModified</code>.
        </p>
        <CodeBlock lang="ts" code={SITEMAP_CODE} />
      </DocSection>

      <DocSection n="5" title="robots.txt in Next.js with robots.ts">
        <p>
          A few lines in <code>app/robots.ts</code> point crawlers at the sitemap and keep API routes and client demos out of the index.
        </p>
        <CodeBlock lang="ts" code={ROBOTS_CODE} />
      </DocSection>

      <DocSection n="6" title="JSON-LD structured data in Next.js">
        <p>
          Structured data is the part I&apos;d never have done on my own. In the App Router it&apos;s just a{' '}
          <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code> rendered by a Server Component. The home page now says
          who I am, each app page is a <code>MobileApplication</code>, posts are articles, and the{' '}
          <a href="/work" className={link}>Work with me</a> page is a professional service with an FAQ. That&apos;s what search engines
          use for rich results and to tie everything back to one person.
        </p>
        <CodeBlock lang="ts" code={JSONLD_CODE} />
      </DocSection>

      <DocSection n="7" title="What I still did myself">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Read every diff. It&apos;s my site and my name on it; nothing went in that I didn&apos;t understand.</li>
          <li>Rewrote titles and descriptions that didn&apos;t sound like me. Claude drafts well, but I know how my users describe the apps.</li>
          <li>Checked the share cards by pasting real links into WhatsApp and iMessage, and the structured data in Google&apos;s Rich Results Test.</li>
          <li>Submitted the sitemap in Google Search Console. No tool can do the waiting for you.</li>
        </ul>
      </DocSection>

      <DocSection title="My Next.js SEO checklist">
        <ul className="flex flex-col gap-2 list-none">
          {CHECKLIST.map((c) => (
            <li key={c} className="flex gap-3">
              <span className="text-accent" aria-hidden>✓</span>
              {c}
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="The short version">
        <p>
          AI didn&apos;t do magic SEO. It did the careful, boring work I kept putting off, across 36 files, without missing a page,
          while I made the calls. Rankings take weeks to move, so I&apos;ll report back on whether any of it worked.
        </p>
        <p>
          Need the same for your Next.js site? <a href="/work/nextjs-developer" className={link}>I do this for clients →</a>
        </p>
      </DocSection>
    </DevlogPost>
  )
}
