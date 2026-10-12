'use client'

import { useEffect, useState } from 'react'
import AppStoreButton from './AppStoreButton'

const links = [
  { href: '/momentum#features', label: 'Features' },
  { href: '/momentum/privacy', label: 'Privacy' },
  { href: '/momentum/support', label: 'Support' },
]

export default function MomentumNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-4 px-4 sm:px-10 md:px-[60px] py-4 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <a href="/" className="text-base font-black tracking-tight shrink-0" aria-label="Yash Rawat — home">
          YR<span className="text-accent">.</span>
        </a>
        <span className="text-border">/</span>
        <a href="/momentum" className="flex items-center gap-2 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/momentum/icon.png" alt="" width={24} height={24} className="w-6 h-6 rounded-[6px]" />
          <span className="font-bold tracking-tight truncate">Momentum</span>
        </a>
      </div>
      <div className="flex items-center gap-5 sm:gap-8">
        <ul className="flex gap-4 sm:gap-8 list-none">
          {links.map((l) => (
            <li key={l.href} className={l.label === 'Features' ? 'hidden sm:block' : undefined}>
              <a
                href={l.href}
                className="font-mono text-[10px] sm:text-[11px] text-muted tracking-[0.1em] uppercase transition-colors duration-200 hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <AppStoreButton size="sm" />
        </div>
      </div>
    </nav>
  )
}
