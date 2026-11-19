import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { APPS, type StudioApp } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'
import { STUDIO_NAME } from '@/components/studio/config'
import { APP_SEO } from './appSeo'

/** Share-card images (link previews), drawn at build time by the opengraph-image.tsx files. */
export const ogSize = { width: 1200, height: 630 }

/** #RRGGBB → rgba(), which the image renderer handles reliably. */
function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

async function iconData(src: string) {
  const buf = await readFile(join(process.cwd(), 'public', src))
  return `data:image/png;base64,${buf.toString('base64')}`
}

function Footer({ accent }: { accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, color: '#a0a0a8' }}>
      <div style={{ width: 14, height: 14, borderRadius: 7, background: accent }} />
      {`${STUDIO_NAME} · yashrawat.com`}
    </div>
  )
}

export async function appOgImage(slug: string) {
  const app = APPS.find((a) => a.slug === slug) as StudioApp
  const tagline = (APP_SEO[slug]?.title ?? app.name).split(' — ')[1] ?? app.description
  const icon = await iconData(app.icon)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: `linear-gradient(135deg, #0a0a0b 40%, ${rgba(app.accent, 0.25)})`,
          color: '#ededef',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} width={168} height={168} style={{ borderRadius: 38 }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3 }}>{app.name}</div>
            <div style={{ fontSize: 32, color: '#a0a0a8' }}>{`${app.platforms} · ${app.category}`}</div>
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, maxWidth: 1000 }}>{tagline}</div>
        <Footer accent={app.accent} />
      </div>
    ),
    ogSize,
  )
}

export async function postOgImage(href: string) {
  const post = POSTS.find((p) => p.href === href)
  const app = APPS.find((a) => a.slug === post?.app)
  const accent = app?.accent ?? '#C9F43B'
  const icon = app ? await iconData(app.icon) : null
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0a0a0b',
          color: '#ededef',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 30, color: accent, letterSpacing: 4, textTransform: 'uppercase' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {icon && <img src={icon} width={64} height={64} style={{ borderRadius: 15 }} alt="" />}
          {`${app?.name ?? 'Studio'} · Devlog`}
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1040 }}>{post?.title ?? 'Devlog'}</div>
        <Footer accent={accent} />
      </div>
    ),
    ogSize,
  )
}

export async function studioOgImage() {
  const apps = APPS.filter((a) => a.href)
  const icons = await Promise.all(apps.map((a) => iconData(a.icon)))
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0a0a0b',
          color: '#ededef',
        }}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          {icons.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} width={112} height={112} style={{ borderRadius: 25 }} alt="" />
          ))}
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>
          Apps worth keeping on your home screen.
        </div>
        <Footer accent="#C9F43B" />
      </div>
    ),
    ogSize,
  )
}

export async function workOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: `linear-gradient(135deg, #0a0a0b 45%, ${rgba('#C9F43B', 0.22)})`,
          color: '#ededef',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, color: '#C9F43B', letterSpacing: 4, textTransform: 'uppercase' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#C9F43B' }} />
          Available for freelance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1040 }}>Full-stack developer for iOS and the web.</div>
          <div style={{ marginTop: 24, fontSize: 34, color: '#a0a0a8' }}>SwiftUI · Next.js · React · TypeScript</div>
        </div>
        <Footer accent="#C9F43B" />
      </div>
    ),
    ogSize,
  )
}
