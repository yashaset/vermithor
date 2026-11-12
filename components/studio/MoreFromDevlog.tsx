import { POSTS } from './devlog'
import { APPS } from './apps'
import { appVars } from './appStyle'

/** "More from the devlog" list for the bottom of a post: every other published post (those with an href). */
export default function MoreFromDevlog({ current }: { current: string }) {
  const others = POSTS.filter((p) => p.href && p.href !== current)
  if (others.length === 0) return null

  return (
    <nav aria-labelledby="more-devlog" className="mt-20 pt-10 border-t border-border">
      <div className="flex flex-wrap justify-between items-baseline gap-4">
        <h2 id="more-devlog" className="text-[22px] sm:text-[26px] font-bold tracking-tight">More from the devlog</h2>
        <a href="/#devlog" className="text-[11px] text-accent tracking-[0.2em] uppercase hover:underline underline-offset-4">
          All posts →
        </a>
      </div>
      <ul className="list-none mt-4 border-b border-border">
        {others.map((p) => {
          const app = APPS.find((a) => a.slug === p.app)
          return (
            <li key={p.href} className="border-t border-border first:border-t-0">
              <a href={p.href} className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-2 items-baseline py-5 hover:text-accent">
                <span>
                  <span className="block text-[17px] font-semibold">{p.title}</span>
                  <span className="mt-2 flex items-center gap-3 text-[12px] text-faint">
                    <span
                      className={`${app ? 'app-accent' : 'text-ink2 bg-border'} inline-block text-[11px] font-bold px-2 py-[3px] rounded-md`}
                      style={app ? { ...appVars(app), background: `${app.accent}26` } : undefined}
                    >
                      {app?.name ?? 'Studio'}
                    </span>
                    <span className="tabular-nums">{p.date}</span>
                  </span>
                </span>
                <span className="text-[14px] text-faint" aria-hidden>→</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
