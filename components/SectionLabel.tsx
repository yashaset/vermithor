export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] text-accent tracking-[0.2em] uppercase mb-12">
      {children}
      <span className="flex-1 h-px bg-border" />
    </div>
  )
}
