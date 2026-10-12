import { APPS } from './apps'
import { CONTACT_EMAIL, LINKS } from './config'

export default function StudioFooter() {
  return (
    <footer id="support" className="scroll-mt-6 flex flex-wrap justify-between gap-8 pt-16 pb-10 mt-16 border-t border-border text-[14px]">
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
          <span className="font-semibold">Elsewhere</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted hover:text-ink">Email</a>
          <a href={LINKS.github} className="text-muted hover:text-ink">GitHub</a>
          <a href={LINKS.linkedin} className="text-muted hover:text-ink">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
