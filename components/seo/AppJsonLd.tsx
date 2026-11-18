import type { StudioApp } from '@/components/studio/apps'
import { APP_SEO } from './appSeo'
import { AUTHOR, SITE_URL, jsonLdHtml } from './site'

// App Store categories → schema.org applicationCategory values Google recognises.
const CATEGORY: Record<string, string> = {
  'Health & Fitness': 'HealthApplication',
  Productivity: 'BusinessApplication',
  'Photo & Video': 'MultimediaApplication',
  Photography: 'MultimediaApplication',
  Finance: 'FinanceApplication',
}

/** SoftwareApplication structured data for an app's landing page. */
export default function AppJsonLd({ app }: { app: StudioApp }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': app.device === 'mac' || app.platforms === 'Mac' ? 'SoftwareApplication' : 'MobileApplication',
    name: app.name,
    description: APP_SEO[app.slug]?.description ?? app.description,
    url: `${SITE_URL}${app.href ?? ''}`,
    image: `${SITE_URL}${app.icon}`,
    operatingSystem: app.platforms === 'Mac' ? 'macOS' : 'iOS',
    applicationCategory: CATEGORY[app.category] ?? app.category,
    author: { '@type': 'Person', ...AUTHOR },
    ...(app.storeUrl ? { downloadUrl: app.storeUrl, sameAs: [app.storeUrl] } : {}),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(data)} />
}
