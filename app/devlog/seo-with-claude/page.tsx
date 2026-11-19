import type { Metadata } from 'next'
import DevlogPost from '@/components/studio/DevlogPost'
import { DocSection } from '@/components/momentum/DocPage'
import CodeBlock from '@/components/blog/CodeBlock'

const SITEMAP_CODE = `
// app/sitemap.ts: built from the same lists that draw the home page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/work'), changeFrequency: 'monthly', priority: 0.9 },
    ...APPS.filter((a) => a.href).map((a) => ({ url: url(a.href!), priority: 0.9 })),
    ...POSTS.filter((p) => p.href).map((p) => ({ url: url(p.href!), lastModified: new Date(p.date) })),
  ]
}
`

const PAGE_META_CODE = `
// One helper, called by every page that should show up in search.
export const metadata = pageMeta({
  path: '/darkmatter',
  title: 'Darkmatter — A manual camera for iPhone',
  description: 'Full control over ISO, shutter speed, white balance and focus…',
})
`

const URL_PATH = '/devlog/seo-with-claude'
const TITLE = 'I did my SEO using Claude'
const DESCRIPTION =
  'How I used Claude to fix the SEO on my Next.js portfolio in an afternoon: canonical URLs, share images, a sitemap built from data, robots.txt and structured data, and what I still checked myself.'
const PUBLISHED = '2026-11-19'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · yash.apps Devlog` },
  description: DESCRIPTION,
  keywords: [
    'SEO with Claude',
    'AI for SEO',
    'Next.js SEO',
    'Next.js sitemap',
    'Open Graph images Next.js',
    'structured data JSON-LD',
    'indie developer SEO',
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
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  publisher: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  mainEntityOfPage: `https://yashrawat.com${URL_PATH}`,
}

const link = 'text-accent underline underline-offset-4'

export default function SeoWithClaudePost() {
  return (
    <DevlogPost
      path={URL_PATH}
      title={<>I did my SEO using <span className="text-accent">Claude</span></>}
      meta="19 Nov 2026 · Yash Rawat"
      jsonLd={jsonLd}
    >
      <p className="text-[17px] sm:text-[18px] text-ink2 leading-[1.8]">
        I&apos;d spent weeks on the apps and almost no time on how anyone would find them. Paste a link to one of my app pages into
        WhatsApp and you got the home page&apos;s title and no picture. Google had no sitemap to read. So I opened the repo with Claude
        and asked it to fix the SEO. One afternoon and one commit later, every page on this site describes itself properly. Here&apos;s
        what changed, and what I still did myself.
      </p>

      <DocSection n="1" title="Start with an audit, not a checklist">
        <p>
          I didn&apos;t hand it a generic SEO checklist. I asked it to read the codebase and tell me what was actually wrong. The answer
          was specific and a little embarrassing: the app, privacy and support pages had no canonical URL and no sharing tags of their own,
          so they all inherited the home page&apos;s. There was no sitemap, no robots.txt, and nothing telling Google that these were
          apps made by one person.
        </p>
        <p>
          That audit was the most useful part. It turned &ldquo;do SEO&rdquo; into a short list of real problems on my own pages.
        </p>
      </DocSection>

      <DocSection n="2" title="Every page describes itself">
        <p>
          The fix was one small helper. Each page passes its path, title and description, and gets back a canonical URL plus Open Graph
          and Twitter tags for that exact page. The app titles and descriptions now live in one file, written the way people search
          (&ldquo;a manual camera for iPhone&rdquo;), not the way I talk about the apps.
        </p>
        <CodeBlock lang="ts" code={PAGE_META_CODE} />
      </DocSection>

      <DocSection n="3" title="Share cards drawn by code">
        <p>
          Links now unfurl with a proper image. The home page, each app and devlog posts like this one get a 1200×630 card, drawn at build
          time from the app&apos;s icon, name and accent colour. I didn&apos;t open a design tool once, and a new app gets its card for
          free.
        </p>
      </DocSection>

      <DocSection n="4" title="A sitemap that can’t go stale">
        <p>
          My favourite change. The sitemap isn&apos;t a file I have to remember to update; it&apos;s built from the same app and devlog
          lists that draw the home page. When I published this post, it was added to the sitemap automatically. Robots.txt points
          Google at it and keeps the API routes and client demos out of the index.
        </p>
        <CodeBlock lang="ts" code={SITEMAP_CODE} />
      </DocSection>

      <DocSection n="5" title="Telling Google who made this">
        <p>
          Structured data is the part I&apos;d never have done on my own. The home page now says, in JSON-LD, that this is one developer in
          Delhi with a list of apps. Each app page is marked up as a mobile or Mac application, posts as blog posts, and the new{' '}
          <a href="/work" className={link}>Work with me</a> page as a professional service. That&apos;s the information search engines
          use for richer results and to connect everything back to one person.
        </p>
      </DocSection>

      <DocSection n="6" title="What I still did myself">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Read every diff. It&apos;s my site and my name on it; nothing went in that I didn&apos;t understand.</li>
          <li>Rewrote titles and descriptions that didn&apos;t sound like me. Claude drafts well, but I know how my users describe the apps.</li>
          <li>Checked the share cards by pasting real links into WhatsApp and iMessage, and the structured data in Google&apos;s Rich Results Test.</li>
          <li>Submitted the sitemap in Google Search Console. No tool can do the waiting for you.</li>
        </ul>
      </DocSection>

      <DocSection title="The short version">
        <p>
          AI didn&apos;t do magic SEO. It did the careful, boring work I kept putting off, across 36 files, without missing a page,
          while I made the calls. Rankings take weeks to move, so I&apos;ll report back on whether any of it worked.
        </p>
        <p>
          Want the same for your product? <a href="/work" className={link}>Work with me →</a>
        </p>
      </DocSection>
    </DevlogPost>
  )
}
