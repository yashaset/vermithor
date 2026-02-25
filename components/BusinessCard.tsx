'use client'

import { useEffect, useRef, useState } from 'react'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

/* ── Icons ── */
function EmailIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 11 9" fill="none" className="opacity-50 shrink-0">
      <rect x="0.5" y="0.5" width="10" height="8" rx="1.5" stroke="currentColor" />
      <path d="M1 1.5L5.5 5L10 1.5" stroke="currentColor" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="8" height="10" viewBox="0 0 9 11" fill="none" className="opacity-50 shrink-0">
      <rect x="0.5" y="0.5" width="8" height="10" rx="1.5" stroke="currentColor" />
      <circle cx="4.5" cy="8.5" r="0.75" fill="currentColor" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 11 11" fill="none" className="opacity-50 shrink-0">
      <path d="M4.5 6.5L6.5 4.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M3 8L1.5 9.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M7.5 3.5L9 2M6.5 1.5H9.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Card front ── */
function CardFront({ glarePos }: { glarePos: { x: number; y: number } }) {
  return (
    <div className="card-face card-front">
      <div className="card-grid" aria-hidden />
      <div className="card-diagonal" aria-hidden />
      <div
        className="card-glare"
        style={{
          background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="card-rim" aria-hidden />

      <div className="card-content">
        {/* Top */}
        <div className="flex justify-between items-start">
          <span className="font-cormorant card-initials">Y · R</span>
          <span className="font-mono card-badge">UI Engineer</span>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <div className="font-cormorant card-name">
            <span className="font-semibold text-white">Yash</span> Rawat
          </div>
          <div className="font-mono card-role">
            React · Next.js · TypeScript
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-end gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            {[
              { icon: <EmailIcon />, text: 'rawatyash1999@gmail.com' },
              { icon: <PhoneIcon />, text: '+91 99586 25621' },
              { icon: <LinkIcon />,  text: 'yashrawat-react' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 font-mono card-contact">
                {icon}
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {['Next.js', 'TypeScript'].map((t) => (
              <span key={t} className="font-mono card-pill card-pill--lit">{t}</span>
            ))}
            <span className="font-mono card-pill">3+ Yrs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Card back ── */
function CardBack() {
  const stats = [
    { num: '100K+', label: 'Operators' },
    { num: '92+',   label: 'Lighthouse' },
    { num: '50%',   label: 'Bundle ↓' },
  ]
  const skills = ['React', 'Next.js', 'TypeScript', 'Redux', 'Node.js', 'Flask', 'Firebase', 'Tailwind']

  return (
    <div className="card-face card-back">
      <div className="card-rim" aria-hidden />
      <div
        className="absolute bottom-4 right-6 font-cormorant font-light text-white/[0.06] leading-none select-none pointer-events-none card-watermark"
        aria-hidden
      >
        YR
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full card-back-inner">
        {/* Stats row */}
        <div className="flex items-center gap-4">
          {stats.map((s, i) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-cormorant font-light text-[#d4f0e8]/70 leading-none card-stat-num">
                  {s.num}
                </span>
                <span className="font-mono text-white/25 uppercase text-center card-stat-label">
                  {s.label}
                </span>
              </div>
              {i < stats.length - 1 && <div className="w-px h-7 bg-white/10 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 justify-center px-4">
          {skills.map((s) => (
            <span
              key={s}
              className="font-mono text-white/45 uppercase border border-white/10 bg-white/[0.03] rounded-full card-skill-pill"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main ── */
export default function BusinessCard() {
  const sceneRef  = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped]   = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [tilt, setTilt]         = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch]   = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || isTouch) return

    const onMove = (e: MouseEvent) => {
      if (flipped) return
      const rect = scene.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
      setTilt({ x: -dy * 12, y: dx * 16 })
      setGlarePos({ x: 50 + dx * 40, y: 50 + dy * 40 })
    }
    const onLeave = () => {
      setTilt({ x: 0, y: 0 })
      setGlarePos({ x: 50, y: 50 })
    }

    scene.addEventListener('mousemove', onMove)
    scene.addEventListener('mouseleave', onLeave)
    return () => {
      scene.removeEventListener('mousemove', onMove)
      scene.removeEventListener('mouseleave', onLeave)
    }
  }, [flipped, isTouch])

  const handleFlip = () => {
    setFlipped((v) => !v)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section className="section-divider px-4 sm:px-8 md:px-[60px] py-16 md:py-20">
      <SectionLabel>Business Card</SectionLabel>

      <Reveal>
        <div className="flex flex-col items-center gap-6">
          {/* Scene */}
          <div
            ref={sceneRef}
            className="card-scene"
            style={{ perspective: '900px' }}
          >
            <div
              onClick={handleFlip}
              className={`card-wrapper${flipped ? ' card-wrapper--flipped' : ''}`}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 + tilt.y : tilt.y}deg)`,
                cursor: 'pointer',
              }}
            >
              <CardFront glarePos={glarePos} />
              <CardBack />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleFlip}
              className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase bg-white/[0.04] border border-white/10 px-5 py-2 rounded-full transition-all duration-200 hover:text-[#d4f0e8]/80 hover:border-[#d4f0e8]/25"
            >
              {flipped ? 'Flip Back ↺' : 'Flip Card ↺'}
            </button>
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/18 uppercase">
              {isTouch ? 'Tap to flip' : 'Hover to tilt · Click to flip'}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
