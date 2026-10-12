import { STUDIO_NAME } from './config'
import ThemeToggle from '@/components/ThemeToggle'

const links = [
  { href: '/#apps', label: 'Apps' },
  { href: '/#devlog', label: 'Devlog' },
  { href: '/#about', label: 'About' },
  { href: '/#support', label: 'Support' },
]

export default function StudioNav() {
  const [name, tld] = STUDIO_NAME.split('.')
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 py-[22px] border-b border-border">
      <a href="/" className="font-display font-extrabold text-[18px] tracking-tight">
        {name}
        {tld && (
          <>
            <span className="text-accent">.</span>
            {tld}
          </>
        )}
      </a>
      <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-5">
        <ul className="flex flex-wrap gap-5 sm:gap-7 list-none text-[14px]">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
