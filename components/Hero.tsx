'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  target: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { target: 100, suffix: 'K+', label: 'Monthly Operators Served' },
  { target: 90,  suffix: '+',  label: 'Lighthouse Score Achieved' },
  { target: 50,  suffix: '%',  label: 'Bundle Size Reduced' },
  { target: 150, suffix: 'K+', label: 'Lines Migrated to TypeScript' },
]

function useCounter(target: number, suffix: string, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let cur = 0
    const step = target / 50
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setValue(Math.floor(cur))
      if (cur >= target) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [active, target])
  return `${value}${suffix}`
}

function StatCard({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const display = useCounter(stat.target, stat.suffix, active)
  return (
    <div
      className={`bg-surface border border-border p-6 opacity-0 animate-fade-up stat-card-${index + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="text-[40px] font-extrabold text-accent leading-none">{display}</div>
      <div className="font-mono text-[10px] text-muted mt-1.5 uppercase tracking-widest">{stat.label}</div>
    </div>
  )
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-between px-[60px] py-[100px] border-b md:border-b-0 md:border-r border-border">
        <div>
          <p className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">
            Software Engineer (UI) · Delhi, India
          </p>
          <h1 className="text-[clamp(52px,7vw,110px)] font-extrabold leading-[0.9] tracking-tight mt-5">
            Yash<br />
            <span className="text-accent">Rawat</span>
          </h1>
          <p className="font-mono text-[13px] text-muted mt-5 tracking-wide">
            React · Next.js · TypeScript · Performance
          </p>
        </div>
        <div className="flex gap-5 mt-10">
          {[
            { href: 'mailto:rawatyash1999@gmail.com', label: 'Email' },
            { href: 'https://linkedin.com/in/yashrawat-react', label: 'LinkedIn' },
            { href: 'tel:+919958625621', label: 'Call' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-[11px] text-ink border border-border px-5 py-2.5 tracking-widest uppercase transition-all duration-200 hover:border-accent hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-end px-[60px] py-[100px] relative">
        {/* Ghost text */}
        <div
          className="ghost-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[clamp(80px,14vw,200px)] font-extrabold leading-tight whitespace-nowrap pointer-events-none select-none"
          aria-hidden
        >
          3+<br />YRS
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 gap-[2px]">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} active={statsActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
