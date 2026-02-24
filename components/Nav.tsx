'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#experience', label: 'Work' },
  { href: '#impact', label: 'Impact' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[60px] py-5 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="text-base font-black tracking-tight font-syne">
        YR<span className="text-accent">.</span>
      </div>
      <ul className="flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-[11px] text-muted tracking-[0.1em] uppercase transition-colors duration-200 hover:text-accent"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
