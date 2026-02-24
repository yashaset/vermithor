import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

interface ImpactItem {
  icon: string
  title: string
  desc: string
  metric: string
}

const items: ImpactItem[] = [
  {
    icon: '⚡',
    title: 'Performance Optimization at Scale',
    desc: 'Reduced bundle size, improved load times, and increased Lighthouse score via Next.js migration and Nginx compression.',
    metric: '60 → 90+',
  },
  {
    icon: '🔷',
    title: 'TypeScript Migration Lead',
    desc: 'Led migration of a large, production codebase to TypeScript, improving maintainability and developer velocity.',
    metric: '150K+ LOC',
  },
  {
    icon: '🏗',
    title: 'Scalable UI Architecture',
    desc: 'Designed reusable HOC-based modal system with internal store, reducing duplicated logic across the platform.',
    metric: 'DX ↑↑',
  },
  {
    icon: '🤖',
    title: 'Automated Document Verification',
    desc: 'ML-powered Flask microservice using Google Vision API + ArUco markers to auto-reject invalid KYC images.',
    metric: '~80% effort saved',
  },
  {
    icon: '📡',
    title: 'Internal Comms Dashboard',
    desc: 'Built cross-team operations dashboard for high-volume user outreach across SMS, WhatsApp, IVR, and push notifications.',
    metric: 'Multi-channel',
  },
  {
    icon: '🛒',
    title: 'Booking Platform Ownership',
    desc: 'Full ownership of core booking flow — bidding, payment, load creation — serving 100K+ operators monthly.',
    metric: '100K+ users',
  },
]

export default function Impact() {
  return (
    <section id="impact" className="section-divider bg-surface px-[60px] py-20">
      <SectionLabel>Key Initiatives &amp; Impact</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="group border border-border p-9 bg-[#0a0a0a] transition-colors duration-300 hover:bg-[#0f0f0f] h-full flex flex-col">
              <div className="text-[28px] mb-4">{item.icon}</div>
              <h3 className="text-[15px] font-bold tracking-tight mb-2.5">{item.title}</h3>
              <p className="font-mono text-[11px] text-muted leading-relaxed flex-1">{item.desc}</p>
              <span className="font-mono text-[28px] text-accent mt-5 block">{item.metric}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
