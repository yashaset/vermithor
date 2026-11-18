'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { DURATION, openPending, registerShell, requestClose, sheetStore, type Preview } from './store'

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * The Dribbble-style bottom sheet. Always mounted (root layout), so it can open on the click itself;
 * the page content is portalled in by <Sheet> when it arrives. See ./store.ts for the flow.
 */
export default function SheetHost() {
  const s = useSyncExternalStore(sheetStore.subscribe, sheetStore.get, sheetStore.getServer)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [up, setUp] = useState(false)
  const drag = useRef<{ startY: number; dy: number } | null>(null)

  useEffect(() => {
    registerShell({ slot: slotRef.current, ghost: ghostRef.current, panel: panelRef.current })
    return () => registerShell({ slot: null, ghost: null, panel: null })
  }, [])

  // Open on the click itself, before Next has fetched anything.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[data-sheet]') as HTMLAnchorElement | null
      if (!a || (a.target && a.target !== '_self')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || url.pathname === location.pathname) return
      const d = a.dataset
      openPending({ kind: d.sheet === 'post' ? 'post' : 'app', title: d.sheetTitle, sub: d.sheetSub, icon: d.sheetIcon, accent: d.sheetAccent })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Slide up after the first frame at the bottom; slide down when closing.
  useEffect(() => {
    if (!s.open || s.closing) {
      setUp(false)
      return
    }
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setUp(true))
    })
    return () => cancelAnimationFrame(id)
  }, [s.open, s.closing])

  // Lock the page behind, without a layout jump when the scrollbar goes; Esc closes.
  useEffect(() => {
    if (!s.open) return
    const root = document.documentElement
    const gap = window.innerWidth - root.clientWidth
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight }
    root.style.overflow = 'hidden'
    if (gap > 0) root.style.paddingRight = `${gap}px`
    panelRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev.overflow
      root.style.paddingRight = prev.paddingRight
      window.removeEventListener('keydown', onKey)
    }
  }, [s.open])

  // Swipe down from the top of the sheet to dismiss (touch).
  const onTouchStart = (e: React.TouchEvent) => {
    if ((panelRef.current?.scrollTop ?? 0) > 0) return
    drag.current = { startY: e.touches[0].clientY, dy: 0 }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const d = drag.current
    const el = panelRef.current
    if (!d || !el) return
    d.dy = el.scrollTop > 0 ? 0 : Math.max(0, e.touches[0].clientY - d.startY)
    el.style.transition = 'none'
    el.style.transform = d.dy ? `translateY(${d.dy}px)` : ''
  }
  const onTouchEnd = () => {
    const d = drag.current
    const el = panelRef.current
    drag.current = null
    if (!d || !el) return
    el.style.transition = ''
    el.style.transform = ''
    if (d.dy > 120) requestClose()
  }

  const fade = `opacity ${DURATION}ms ease`
  return (
    <div className={`fixed inset-0 z-[100] ${s.open ? '' : 'invisible pointer-events-none'}`} aria-hidden={!s.open}>
      <div aria-hidden onClick={requestClose} className="absolute inset-0 bg-black/70" style={{ opacity: up ? 1 : 0, transition: fade }} />

      {/* Controls, in the gap above the sheet on larger screens. */}
      <div className="absolute z-10 right-3 top-3 sm:right-5 sm:top-[10px] flex items-center gap-2" style={{ opacity: up ? 1 : 0, transition: fade }}>
        {s.hasContent && (
          <a
            href={pathname}
            aria-label="Open as full page"
            title="Open as full page"
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </a>
        )}
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none text-white/90 hover:text-white hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-busy={!s.hasContent}
        tabIndex={-1}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="sheet absolute inset-x-0 bottom-0 top-3 sm:top-14 rounded-t-[24px] sm:rounded-t-[32px] bg-bg overflow-y-auto overscroll-contain outline-none shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]"
        style={{
          transform: up ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform ${DURATION}ms ${EASE}`,
          backgroundImage: 'var(--grain)',
          backgroundSize: '256px 256px',
        }}
      >
        <div aria-hidden className="sticky top-0 z-10 h-0">
          <span className="sm:hidden absolute left-1/2 -translate-x-1/2 mt-2 w-10 h-[5px] rounded-full bg-line" />
          {s.loading && <span className="absolute inset-x-0 top-0 h-[3px] overflow-hidden"><span className="block h-full w-1/3 bg-accent animate-[sheet-load_1s_ease-in-out_infinite]" /></span>}
        </div>
        {s.pending && !s.hasContent && <Placeholder p={s.pending} />}
        <div ref={ghostRef} aria-hidden className={s.hasContent || s.pending ? 'hidden' : ''} />
        <div ref={slotRef} />
      </div>
    </div>
  )
}

/** What the sheet shows between the click and the page arriving: the real name/title, with the rest sketched in. */
function Placeholder({ p }: { p: Preview }) {
  const bar = 'rounded-full bg-border motion-safe:animate-pulse'
  if (p.kind === 'post') {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10 pt-16 sm:pt-24">
        <div className="max-w-[720px] mx-auto">
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: p.accent ?? 'var(--accent)' }}>
            {p.sub}
          </span>
          <h1 className="text-[clamp(40px,8vw,72px)] font-extrabold leading-[0.95] tracking-tight mt-6">{p.title}</h1>
          <div className="mt-14 flex flex-col gap-4">
            {[100, 96, 88, 100, 72].map((w, i) => (
              <span key={i} className={`h-4 ${bar}`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-14 pt-14 sm:pt-20">
      <div>
        <div className="flex items-center gap-4">
          {p.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.icon} alt="" width={64} height={64} className="w-16 h-16 rounded-[15px] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]" />
          )}
          <div>
            <p className="text-[18px] font-extrabold tracking-tight">{p.title}</p>
            <p className="text-[13px] text-faint">{p.sub}</p>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-4">
          <span className={`h-12 sm:h-16 w-[85%] ${bar}`} />
          <span className={`h-12 sm:h-16 w-[60%] ${bar}`} />
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <span className={`h-4 w-[90%] ${bar}`} />
          <span className={`h-4 w-[70%] ${bar}`} />
        </div>
        <span className="mt-9 block h-[52px] w-[220px] rounded-2xl motion-safe:animate-pulse" style={{ background: p.accent ?? 'var(--border)', opacity: 0.6 }} />
      </div>
      <div className="h-[300px] sm:h-[420px] rounded-[32px] border border-border" style={{ background: p.accent ? `${p.accent}1f` : 'var(--surface)' }} />
    </div>
  )
}
