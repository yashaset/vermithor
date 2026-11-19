import Link from 'next/link'
import { sheetFor } from '@/components/sheet/links'
import { APPS } from './apps'
import { appVars } from './appStyle'
import type { Post } from './devlog'

/** Devlog rows: date, title and app tag. Used on the home page (latest few) and on /devlog (all). */
export default function DevlogList({ posts }: { posts: Post[] }) {
  return (
    <ol className="list-none border-b border-border">
      {posts.map((p) => {
        const app = APPS.find((a) => a.slug === p.app)
        const tag = app
          ? { className: 'app-accent', style: { ...appVars(app), background: `${app.accent}26` } }
          : { className: 'text-ink2 bg-border', style: undefined }
        const inner = (
          <>
            <span className="col-span-2 sm:col-span-1 text-[13px] text-faint tabular-nums">{p.date}</span>
            <span>
              <span className="block text-[18px] font-semibold">{p.title}</span>
              <span className={`${tag.className} inline-block mt-2 text-[11px] font-bold px-2 py-[3px] rounded-md`} style={tag.style}>
                {app?.name ?? 'Studio'}
              </span>
            </span>
            <span className="text-[12px] text-faint whitespace-nowrap">{p.href ? '→' : 'Writing soon'}</span>
          </>
        )
        const cls = 'grid grid-cols-[1fr_auto] sm:grid-cols-[110px_minmax(0,1fr)_auto] gap-x-5 gap-y-2 items-baseline py-[22px]'
        return (
          <li key={p.title} className="border-t border-border">
            {p.href ? (
              <Link href={p.href} {...sheetFor(p.href)} scroll={false} className={`${cls} hover:text-accent`}>{inner}</Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
