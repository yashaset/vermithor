/*
 * State shared by the sheet shell (SheetHost, always mounted in the root layout) and the pages that
 * fill it (Sheet, rendered by the intercepting routes in app/@modal).
 *
 * Flow: a click on a link marked with sheetFor() opens the shell at once with a placeholder (openPending).
 * When the server's page arrives, Sheet portals it into the shell (contentMounted). Closing walks back
 * through every history entry the sheet pushed, like Dribbble.
 */

export type Preview = {
  kind: 'app' | 'post'
  title?: string
  sub?: string
  icon?: string
  accent?: string
}

export type SheetState = {
  open: boolean // shell visible (or animating out while closing)
  closing: boolean
  pending: Preview | null // placeholder shown until the page arrives
  hasContent: boolean
  loading: boolean // a sheet link was clicked while the sheet was already open
}

const CLOSED: SheetState = { open: false, closing: false, pending: null, hasContent: false, loading: false }
let state = CLOSED
const subs = new Set<() => void>()
function set(patch: Partial<SheetState>) {
  state = { ...state, ...patch }
  subs.forEach((f) => f())
}

export const sheetStore = {
  subscribe(f: () => void) {
    subs.add(f)
    return () => {
      subs.delete(f)
    }
  },
  get: () => state,
  getServer: () => CLOSED,
}

export const DURATION = 420

// DOM nodes owned by the shell.
let slot: HTMLElement | null = null // where page content is portalled
let ghost: HTMLElement | null = null // snapshot of the last page, shown while sliding out
let panel: HTMLElement | null = null
export function registerShell(nodes: { slot: HTMLElement | null; ghost: HTMLElement | null; panel: HTMLElement | null }) {
  slot = nodes.slot
  ghost = nodes.ghost
  panel = nodes.panel
}
export const getSlot = () => slot

let depth = 0 // history entries pushed since the sheet opened; 0 = closed
let lastPop = 0
let cancelled = false
let lastUnmountedId = -1
let unmountTimer: ReturnType<typeof setTimeout> | undefined
let closeTimer: ReturnType<typeof setTimeout> | undefined
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastPop = Date.now()
  })
}

function clearGhost() {
  ghost?.replaceChildren()
}

/** A sheet link was clicked: open the shell now with a placeholder. */
export function openPending(preview: Preview) {
  cancelled = false
  if (state.open && !state.closing) {
    set({ loading: true })
    return
  }
  clearTimeout(closeTimer)
  clearGhost()
  depth = 0
  set({ open: true, closing: false, pending: preview, hasContent: false, loading: false })
}

/** A page arrived in the @modal slot. Returns false if the user already closed the placeholder. */
export function contentMounted(id: number): boolean {
  clearTimeout(unmountTimer)
  if (id === lastUnmountedId) {
    // React StrictMode re-running effects on the same instance: not a navigation.
    set({ hasContent: true })
    return true
  }
  if (cancelled) {
    cancelled = false
    return false
  }
  clearTimeout(closeTimer)
  if (depth === 0) depth = 1
  else depth = Math.max(1, depth + (Date.now() - lastPop < 1000 ? -1 : 1))
  clearGhost()
  if (panel) panel.scrollTop = 0
  set({ open: true, closing: false, pending: null, hasContent: true, loading: false })
  return true
}

/** The page left the slot (navigation). Close unless another sheet page replaces it straight away. */
export function contentUnmounted(id: number, el: HTMLElement | null) {
  lastUnmountedId = id
  // Keep a copy to show while the sheet slides down (only if it's still on screen).
  if (el && ghost && state.open) ghost.replaceChildren(el.cloneNode(true))
  set({ hasContent: false })
  clearTimeout(unmountTimer)
  unmountTimer = setTimeout(() => {
    if (!state.hasContent && !state.pending) animateClosed()
  }, 80)
}

function animateClosed() {
  if (!state.open || state.closing) return
  set({ closing: true, loading: false })
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    depth = 0
    clearGhost()
    set(CLOSED)
  }, DURATION)
}

/** Close button, backdrop, Esc or swipe. */
export function requestClose() {
  if (!state.open || state.closing) return
  if (!state.hasContent) {
    // Still showing the placeholder: drop the page when it lands.
    if (state.pending) cancelled = true
    animateClosed()
    return
  }
  const steps = depth
  animateClosed()
  setTimeout(() => window.history.go(-Math.max(1, steps)), DURATION - 120)
}
