import MomentumNav from './MomentumNav'
import MomentumFooter from './MomentumFooter'

/** Reading-column layout shared by the privacy and support pages. */
export default function DocPage({
  kicker,
  title,
  meta,
  children,
}: {
  kicker: string
  title: React.ReactNode
  meta?: string
  children: React.ReactNode
}) {
  return (
    <>
      <MomentumNav />
      <main className="px-4 sm:px-10 md:px-[60px] pt-32 pb-20">
        <article className="max-w-[720px] mx-auto">
          <p className="text-[11px] text-accent tracking-[0.2em] uppercase">{kicker}</p>
          <h1 className="text-[clamp(40px,8vw,72px)] font-extrabold leading-[0.95] tracking-tight mt-4">{title}</h1>
          {meta && <p className="text-[11px] text-muted mt-5 tracking-wide">{meta}</p>}
          <div className="doc mt-12 flex flex-col gap-12">{children}</div>
        </article>
      </main>
      <MomentumFooter />
    </>
  )
}

export function DocSection({ n, title, children }: { n?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[22px] sm:text-[26px] font-bold tracking-tight flex items-baseline gap-3">
        {n && <span className="text-[11px] text-muted font-normal">{n}</span>}
        {title}
      </h2>
      <div className="text-[12px] sm:text-[13px] text-[#b9b6ae] leading-[1.8] flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function DocTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-border bg-surface">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="text-[10px] text-muted tracking-widest uppercase font-normal px-4 py-3 border-b border-border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0] + r[1]}>
              {r.map((c, i) => (
                <td key={i} className="text-[11px] sm:text-[12px] text-ink px-4 py-3 border-b border-border align-top leading-relaxed">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
