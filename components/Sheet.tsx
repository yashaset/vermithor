'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { contentMounted, contentUnmounted, getSlot } from './sheet/store'

let nextId = 0

/**
 * Wraps a page rendered by an intercepting route in app/@modal: puts it into the bottom sheet shell
 * (components/sheet/SheetHost.tsx), which is usually already open with a placeholder from the click.
 */
export default function Sheet({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  const id = useRef(-1)
  const dead = useRef(false)
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (dead.current) return
    if (id.current < 0) id.current = nextId++
    if (!contentMounted(id.current)) {
      // Closed before the page arrived: step back off this URL instead of showing it.
      dead.current = true
      window.history.back()
      return
    }
    setSlot(getSlot())
    const myId = id.current
    return () => contentUnmounted(myId, el.current)
  }, [])

  if (!slot || dead.current) return null
  return createPortal(<div ref={el}>{children}</div>, slot)
}
