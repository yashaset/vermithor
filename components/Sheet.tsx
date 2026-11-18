'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/*
 * Dribbble-style bottom sheet for product pages and devlog posts opened from inside the site.
 * Rendered by the intercepting routes in app/@modal; opening the same URL directly shows the full page.
 *
 * Moving between pages inside the sheet (e.g. product → its devlog post) swaps the content without
 * replaying the slide-up, and "close" walks back past every sheet page in one go, like Dribbble.
 */

let depth = 0 // how many history entries the open sheet has pushed
let lastUnmount = 0
let lastPop = 0
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastPop = Date.now()
  })
}

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'
const DURATION = 420

export default function Sheet({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const counted = useRef(false)
  // Swapping from one sheet page to another: no slide-up, the sheet is already open.
  const [swapping] = useState(() => typeof window !== 'undefined' && Date.now() - lastUnmount < 400)
  const [shown, setShown] = useState(swapping)
  const [closing, setClosing] = useState(false)
  const drag = useRef<{ startY: number; dy: number } | null>(null)

  useEffect(() => {
    if (!counted.current) {
      counted.current = true
      if (!swapping) depth = 1
      else depth = Math.max(1, depth + (Date.now() - lastPop < 1000 ? -1 : 1))
    }
    return () => {
      lastUnmount = Date.now()
    }
  }, [swapping])

  // Slide up on open.
  useEffect(() => {
    if (shown) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [shown])

  // Lock the page behind the sheet, without the layout jumping when the scrollbar disappears.
  useEffect(() => {
    const root = document.documentElement
    const gap = window.innerWidth - root.clientWidth
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight }
    root.style.overflow = 'hidden'
    if (gap > 0) root.style.paddingRight = `${gap}px`
    panelRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = prev.overflow
      root.style.paddingRight = prev.paddingRight
    }
  }, [])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)
    window.setTimeout(() => {
      const steps = depth
      depth = 0
      if (steps > 1) window.history.go(-steps)
      else router.back()
    }, DURATION - 120)
  }, [closing, router])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Swipe down from the top of the sheet to dismiss (touch).
  const onTouchStart = (e: React.TouchEvent) => {
    if ((panelRef.current?.scrollTop ?? 0) > 0) return
    drag.current = { startY: e.touches[0].clientY, dy: 0 }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const d = drag.current
    const el = panelRef.current
    if (!d || !el) return
    d.dy = Math.max(0, e.touches[0].clientY - d.startY)
    if (el.scrollTop > 0) d.dy = 0
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
    if (d.dy > 120) close()
  }

  const open = shown && !closing
  const transition = swapping && !closing ? 'none' : `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className="absolute inset-0 bg-black/70"
        style={{ opacity: open ? 1 : 0, transition: swapping && !closing ? 'none' : `opacity ${DURATION}ms ease` }}
      />

      {/* Top-right controls, sitting in the gap above the sheet on larger screens. */}
      <div
        className="absolute z-10 right-3 top-3 sm:right-5 sm:top-[10px] flex items-center gap-2"
        style={{ opacity: open ? 1 : 0, transition: `opacity ${DURATION}ms ease` }}
      >
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
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-black/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none text-white/90 hover:text-white hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      {/* The sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="sheet absolute inset-x-0 bottom-0 top-3 sm:top-14 rounded-t-[24px] sm:rounded-t-[32px] bg-bg overflow-y-auto overscroll-contain outline-none shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]"
        style={{ transform: open ? 'translateY(0)' : 'translateY(100%)', transition }}
      >
        <div aria-hidden className="sm:hidden sticky top-0 z-10 h-0 flex justify-center">
          <span className="mt-2 w-10 h-[5px] rounded-full bg-line" />
        </div>
        {children}
      </div>
    </div>
  )
}
