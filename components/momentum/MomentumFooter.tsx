import { SUPPORT_EMAIL } from './config'

export default function MomentumFooter() {
  return (
    <footer className="border-t border-border px-4 sm:px-8 md:px-[60px] py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
      <span className="text-[10px] text-muted tracking-widest uppercase">
        © {new Date().getFullYear()} Yash Rawat · Momentum
      </span>
      <div className="flex flex-wrap justify-center gap-5">
        {[
          { href: '/momentum/privacy', label: 'Privacy' },
          { href: '/momentum/support', label: 'Support' },
          { href: `mailto:${SUPPORT_EMAIL}`, label: 'Email' },
          { href: '/', label: 'All apps' },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[10px] text-muted tracking-widest uppercase transition-colors hover:text-accent"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
