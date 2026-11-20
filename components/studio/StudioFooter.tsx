import { APPS } from './apps'
import { CONTACT_EMAIL, LINKS } from './config'
import { SERVICES } from './services'

export default function StudioFooter() {
  return (
    <footer data-sheet-hide id="support" className="scroll-mt-6 flex flex-wrap justify-between gap-8 pt-16 pb-10 mt-16 border-t border-border text-[14px]">
      <span className="text-faint">© {new Date().getFullYear()} Yash Rawat · Delhi, India</span>
      <div className="flex flex-wrap gap-10">
        {APPS.map((app) => (
          <div key={app.slug} className="flex flex-col gap-2.5">
            <span className="font-semibold">{app.name}</span>
            {app.supportHref ? (
              <a href={app.supportHref} className="text-muted hover:text-ink">Support</a>
            ) : (
              <span className="text-faint">Support · soon</span>
            )}
            {app.privacyHref ? (
              <a href={app.privacyHref} className="text-muted hover:text-ink">Privacy</a>
            ) : (
              <span className="text-faint">Privacy · soon</span>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold">Hire me</span>
          <a href="/work" className="text-muted hover:text-ink">Freelance developer</a>
          {SERVICES.map((s) => (
            <a key={s.slug} href={`/work/${s.slug}`} className="text-muted hover:text-ink">{s.h1.replace('Freelance ', '').replace(/^./, (c) => c.toUpperCase())}</a>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold">Elsewhere</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted hover:text-ink">Email</a>
          <a href={LINKS.github} rel="me" className="text-muted hover:text-ink">GitHub</a>
          <a href={LINKS.linkedin} rel="me" className="text-muted hover:text-ink">LinkedIn</a>
          <a href="/videos" className="text-muted hover:text-ink">Tutorials</a>
          <a href={LINKS.youtube} rel="me" className="text-muted hover:text-ink">YouTube</a>
          <a href={LINKS.instagram} rel="me" className="text-muted hover:text-ink">Instagram</a>
        </div>
      </div>
    </footer>
  )
}
