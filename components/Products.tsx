import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

const products = [
  {
    name: 'Momentum',
    href: '/momentum',
    icon: '/momentum/icon.png',
    platform: 'iOS · Coming soon to the App Store',
    pitch: 'A strength-training log for people who actually lift: one-tap sets, PR detection, a muscle map, and a gym alarm that rings even in Silent mode.',
    stack: ['SwiftUI', 'SwiftData', 'HealthKit', 'AlarmKit', 'WidgetKit', 'Firebase'],
    shot: '/momentum/home.webp',
  },
]

export default function Products() {
  return (
    <section id="products" className="section-divider px-4 sm:px-8 md:px-[60px] py-16 md:py-20">
      <SectionLabel>Products</SectionLabel>
      <div className="flex flex-col gap-[2px]">
        {products.map((p) => (
          <Reveal key={p.name}>
            <a
              href={p.href}
              className="group relative overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 bg-surface border border-border p-6 sm:p-10 transition-colors duration-200 hover:border-accent"
            >
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" width={56} height={56} className="w-14 h-14 rounded-[13px]" />
                    <div>
                      <h3 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight leading-none">{p.name}</h3>
                      <p className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase mt-2">{p.platform}</p>
                    </div>
                  </div>
                  <p className="font-mono text-[12px] sm:text-[13px] text-muted mt-6 leading-relaxed max-w-[560px]">{p.pitch}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] text-ink border border-border px-3 py-1.5 tracking-widest uppercase">
                      {s}
                    </span>
                  ))}
                  <span className="font-mono text-[11px] text-accent tracking-widest uppercase ml-auto pl-4 transition-transform duration-200 group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </div>
              <div className="hidden md:block w-[200px] -mb-24 rounded-t-[32px] border border-[#2a2a2a] bg-[#050505] p-[7px] pb-0 rotate-[4deg] transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.shot} alt={`${p.name} screenshot`} width={640} height={1391} loading="lazy" className="block w-full rounded-t-[26px]" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
