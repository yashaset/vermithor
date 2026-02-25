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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-10 md:px-[60px] py-4 sm:py-5 transition-all duration-300 ${
        scrolled || open ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}>
        <div className="text-base font-black tracking-tight font-syne">
          YR<span className="text-accent">.</span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-[11px] text-muted tracking-[0.1em] uppercase transition-colors duration-200 hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      <div className={`fixed top-[57px] left-0 right-0 z-40 bg-[rgba(10,10,10,0.98)] border-b border-border transition-all duration-300 md:hidden ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <ul className="flex flex-col list-none px-6 py-4 gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-[12px] text-muted tracking-[0.1em] uppercase py-3 border-b border-border transition-colors duration-200 hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
