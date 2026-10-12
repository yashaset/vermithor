import { APP_STORE_URL } from './config'

/** "Download on the App Store" once live; a "coming soon" pill until APP_STORE_URL is set. */
export default function AppStoreButton({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const pad = size === 'lg' ? 'px-6 py-3.5' : 'px-4 py-2'
  if (!APP_STORE_URL) {
    return (
      <span className={`inline-flex items-center gap-3 border border-border bg-surface ${pad}`}>
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden />
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink">
          Coming soon to the App Store
        </span>
      </span>
    )
  }
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-accent text-[#0a0a0a] ${pad} transition-transform duration-200 hover:-translate-y-0.5`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2v13m0 0-5-5m5 5 5-5M4 20h16" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-normal">
        Download on the App Store
      </span>
    </a>
  )
}
