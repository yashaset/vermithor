'use client'

import { useEffect, useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

/* ─── animated counter hook ─── */
function useAnimatedValue(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * ease))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

/* ─── Lighthouse Score Ring ─── */
function LighthouseRing({ active }: { active: boolean }) {
  const before = useAnimatedValue(60, active)
  const after = useAnimatedValue(92, active)
  const r = 52
  const circ = 2 * Math.PI * r
  const beforeDash = (before / 100) * circ
  const afterDash = (after / 100) * circ

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
        <div className="flex flex-col items-center gap-2">
          <svg width="120" height="120" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r={r} fill="none" stroke="#1e1e1e" strokeWidth="10" />
            <circle cx="65" cy="65" r={r} fill="none" stroke="#6b6b6b" strokeWidth="10"
              strokeDasharray={`${beforeDash} ${circ}`} strokeLinecap="round" transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
            <text x="65" y="60" textAnchor="middle" fill="#aaa" fontSize="22" fontWeight="700" fontFamily="Syne,sans-serif">{before}</text>
            <text x="65" y="76" textAnchor="middle" fill="#6b6b6b" fontSize="9" fontFamily="DM Mono,monospace" letterSpacing="2">/100</text>
          </svg>
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Before</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <svg width="36" height="20" viewBox="0 0 36 20">
            <path d="M0 10 H28 M20 2 L34 10 L20 18" stroke="#e8f542" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[9px] text-accent tracking-widest">NEXT.JS</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg width="120" height="120" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r={r} fill="none" stroke="#1e1e1e" strokeWidth="10" />
            <circle cx="65" cy="65" r={r} fill="none" stroke="#e8f542" strokeWidth="10"
              strokeDasharray={`${afterDash} ${circ}`} strokeLinecap="round" transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
            <text x="65" y="60" textAnchor="middle" fill="#e8f542" fontSize="22" fontWeight="700" fontFamily="Syne,sans-serif">{after}</text>
            <text x="65" y="76" textAnchor="middle" fill="#6b6b6b" fontSize="9" fontFamily="DM Mono,monospace" letterSpacing="2">/100</text>
          </svg>
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">After</span>
        </div>
      </div>
      <p className="font-mono text-[11px] text-muted text-center leading-relaxed max-w-[280px]">
        Next.js migration + Nginx compression lifted Lighthouse from <span className="text-ink">60 → 92+</span>
      </p>
    </div>
  )
}

/* ─── Bundle Bar Chart ─── */
function BundleBar({ active }: { active: boolean }) {
  const afterW = useAnimatedValue(50, active)
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Before</span>
          <span className="font-mono text-[11px] text-muted">100%</span>
        </div>
        <div className="h-8 bg-[#1a1a1a] rounded-sm overflow-hidden">
          <div className="h-full w-full bg-[#3a3a3a] rounded-sm flex items-center px-3">
            <span className="font-mono text-[10px] text-muted">Original bundle</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">After</span>
          <span className="font-mono text-[11px] text-accent">{afterW}%</span>
        </div>
        <div className="h-8 bg-[#1a1a1a] rounded-sm overflow-hidden">
          <div className="h-full bg-accent rounded-sm flex items-center px-3 transition-all duration-[1200ms] ease-out"
            style={{ width: `${afterW}%` }}>
            <span className="font-mono text-[10px] text-[#0a0a0a] font-semibold whitespace-nowrap">Compressed</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
        <span className="font-mono text-[10px] text-muted">Nginx text compression · 50% smaller payload</span>
      </div>
    </div>
  )
}

/* ─── Operator Funnel ─── */
function OperatorFunnel({ active }: { active: boolean }) {
  const count = useAnimatedValue(100000, active, 1400)
  const stages = [
    { label: 'Platform visitors', pct: 100, color: '#2a2a2a' },
    { label: 'Booking initiated', pct: 72, color: '#333' },
    { label: 'Bid placed', pct: 54, color: '#3d3d3d' },
    { label: 'Payment captured', pct: 38, color: '#e8f542' },
  ]
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full flex flex-col gap-[3px]">
        {stages.map((s) => (
          <div key={s.label} className="flex items-center justify-center">
            <div className="h-9 rounded-sm flex items-center justify-center transition-all duration-[1200ms] ease-out overflow-hidden"
              style={{ width: active ? `${s.pct}%` : '8%', background: s.color, minWidth: '60px' }}>
              <span className="font-mono text-[9px] text-muted truncate px-2">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="font-mono text-[11px] text-muted text-center mt-2">
        <span className="text-accent font-semibold">{count.toLocaleString()}+</span> operators served monthly
      </p>
    </div>
  )
}

/* ─── Manual Effort Donut ─── */
function EffortDonut({ active }: { active: boolean }) {
  const saved = useAnimatedValue(80, active)
  const r = 44
  const circ = 2 * Math.PI * r
  const savedDash = (saved / 100) * circ
  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1e1e1e" strokeWidth="18" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#42f5b0" strokeWidth="18"
          strokeDasharray={`${savedDash} ${circ}`} strokeLinecap="butt" transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(0.4,0,0.2,1)' }} />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#2a2a2a" strokeWidth="18"
          strokeDasharray={`${circ - savedDash} ${circ}`} strokeDashoffset={-savedDash}
          strokeLinecap="butt" transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(0.4,0,0.2,1), stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)' }} />
        <text x="70" y="65" textAnchor="middle" fill="#42f5b0" fontSize="20" fontWeight="700" fontFamily="Syne,sans-serif">{saved}%</text>
        <text x="70" y="80" textAnchor="middle" fill="#6b6b6b" fontSize="8" fontFamily="DM Mono,monospace" letterSpacing="1.5">SAVED</text>
      </svg>
      <div className="flex gap-4 font-mono text-[10px]">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-accent2 inline-block" />Automated</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#2a2a2a] inline-block" />Manual</div>
      </div>
      <p className="font-mono text-[11px] text-muted text-center max-w-[240px] leading-relaxed">
        Vision API + ArUco markers auto-reject invalid KYC docs
      </p>
    </div>
  )
}

/* ─── TypeScript Migration ─── */
function TSMigration({ active }: { active: boolean }) {
  const lines = useAnimatedValue(150, active, 1300)
  const bars = [
    { label: 'Components', pct: 95 },
    { label: 'Hooks / Utils', pct: 100 },
    { label: 'API layer', pct: 88 },
    { label: 'State (Redux)', pct: 100 },
    { label: 'Tests', pct: 72 },
  ]
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="font-mono text-[32px] font-light text-accent leading-none">
        {lines}K<span className="text-[16px] text-muted">+ LOC</span>
      </div>
      <div className="flex flex-col gap-2.5 mt-1">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-muted w-24 shrink-0">{b.label}</span>
            <div className="flex-1 h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all duration-[1200ms] ease-out"
                style={{ width: active ? `${b.pct}%` : '0%' }} />
            </div>
            <span className="font-mono text-[10px] text-accent w-8 text-right">{b.pct}%</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-muted mt-1">Migrated to TypeScript — strict mode enabled</p>
    </div>
  )
}

/* ─── Comms Channels ─── */
function CommsChannels({ active }: { active: boolean }) {
  const s = useAnimatedValue(45, active)
  const w = useAnimatedValue(30, active)
  const iv = useAnimatedValue(15, active)
  const p = useAnimatedValue(10, active)
  const channels = [
    { label: 'SMS', icon: '💬', value: s, color: '#e8f542' },
    { label: 'WhatsApp', icon: '📱', value: w, color: '#42f5b0' },
    { label: 'IVR', icon: '📞', value: iv, color: '#4287f5' },
    { label: 'Push', icon: '🔔', value: p, color: '#f542a4' },
  ]
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-1 h-10 rounded-sm overflow-hidden">
        {channels.map((c) => (
          <div key={c.label}
            className="flex items-center justify-center transition-all duration-[1200ms] ease-out overflow-hidden"
            style={{ width: active ? `${c.value}%` : '0%', background: c.color }}>
            <span className="text-[14px]">{c.icon}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: c.color }} />
            <span>{c.icon} {c.label}</span>
            <span className="ml-auto text-ink">{c.value}%</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[11px] text-muted leading-relaxed">
        Operations + marketing dashboard managing high-volume outreach across all channels
      </p>
    </div>
  )
}

/* ─── Infographic Card ─── */
function InfographicCard({
  title, subtitle, children, delay = 0,
}: {
  title: string; subtitle: string;
  children: (active: boolean) => React.ReactNode; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setActive(true), delay); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="border border-border bg-[#0a0a0a] p-6 sm:p-8 flex flex-col gap-6">
      <div>
        <h3 className="font-syne text-[15px] font-bold tracking-tight">{title}</h3>
        <p className="font-mono text-[10px] text-muted mt-1 tracking-wide uppercase">{subtitle}</p>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        {children(active)}
      </div>
    </div>
  )
}

export default function Impact() {
  return (
    <section id="impact" className="section-divider bg-surface px-4 sm:px-8 md:px-[60px] py-16 md:py-20">
      <SectionLabel>Key Initiatives &amp; Impact</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        <InfographicCard title="Lighthouse Performance Score" subtitle="Next.js migration · SSR · Image optimisation" delay={0}>
          {(active) => <LighthouseRing active={active} />}
        </InfographicCard>
        <InfographicCard title="Bundle Size Reduction" subtitle="Nginx text compression · code splitting" delay={100}>
          {(active) => <BundleBar active={active} />}
        </InfographicCard>
        <InfographicCard title="Booking Platform Scale" subtitle="Core funnel · Razorpay · Automated bidding" delay={200}>
          {(active) => <OperatorFunnel active={active} />}
        </InfographicCard>
        <InfographicCard title="KYC Verification Automation" subtitle="Google Vision API · ArUco markers · Flask microservice" delay={300}>
          {(active) => <EffortDonut active={active} />}
        </InfographicCard>
        <InfographicCard title="TypeScript Migration" subtitle="150K+ LOC · strict mode · HOC architecture" delay={400}>
          {(active) => <TSMigration active={active} />}
        </InfographicCard>
        <InfographicCard title="Internal Comms Dashboard" subtitle="Multi-channel outreach · ops & marketing" delay={500}>
          {(active) => <CommsChannels active={active} />}
        </InfographicCard>
      </div>
    </section>
  )
}
