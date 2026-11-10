import StudioNav from '@/components/studio/StudioNav'
import StudioFooter from '@/components/studio/StudioFooter'
import { APPS } from '@/components/studio/apps'
import { appVars } from '@/components/studio/appStyle'
import Phone from '@/components/momentum/Phone'
import SectionLabel from '@/components/SectionLabel'
import Reveal from '@/components/Reveal'
import StoreButton from '@/components/darkmatter/StoreButton'

const app = APPS.find((a) => a.slug === 'darkmatter')!

const stats = [
  { value: 'RAW', label: 'RAW · RAW+HEIF · ProRAW' },
  { value: '30s', label: 'Light trails exposures' },
  { value: '4K', label: 'Video at up to 60 fps' },
  { value: '0', label: 'Data collected' },
]

const spotlights = [
  {
    kicker: '01 · Manual control',
    title: 'Every setting, on a dial.',
    body: 'Scroll ISO and shutter speed on dials that tick at every stop, set white balance by Kelvin and tint, and watch a live histogram and light meter so you know the exposure before you press the shutter.',
    points: ['ISO and shutter in 1/3 stops', 'White balance by Kelvin and tint', 'Live histogram and light meter'],
    shot: { src: '/apps/darkmatter/manual.webp', alt: 'Darkmatter with the ISO dial open over a dusk landscape' },
  },
  {
    kicker: '02 · Light trails',
    title: 'Paint with light.',
    body: 'Light Trails combines frames for 5 to 30 seconds, so passing cars become ribbons of light while the street stays sharp. Watch the image build on screen and stop it whenever it looks right.',
    points: ['5, 10, 15 or 30 second exposures', 'Watch the trails build live', 'Exposure, focus and colour locked while it captures'],
    shot: { src: '/apps/darkmatter/trails.webp', alt: 'Darkmatter capturing red and white car light trails at night' },
  },
  {
    kicker: '03 · Shoot RAW',
    title: 'Keep every detail.',
    body: 'Capture RAW straight from the sensor, RAW with a HEIF alongside, or Apple ProRAW on supported iPhones. Every file lands in your Photos library, ready for Lightroom or your editor of choice.',
    points: ['RAW (DNG) and RAW+HEIF', 'Apple ProRAW on Pro iPhones', 'HEIF and JPEG at full resolution'],
    shot: { src: '/apps/darkmatter/raw.webp', alt: 'Darkmatter format menu with RAW selected' },
  },
  {
    kicker: '04 · Manual focus',
    title: 'Focus exactly where you want.',
    body: 'Slide from macro to infinity and focus stays put, or tap the viewfinder to focus and meter on a spot. Pinch to zoom, with a tick at every tenth, and switch lenses in a tap.',
    points: ['Macro to infinity slider', 'Tap to focus and meter', 'Pinch to zoom across your lenses'],
    shot: { src: '/apps/darkmatter/focus.webp', alt: 'Darkmatter manual focus slider on a close-up flower' },
  },
]

const extras = [
  { title: 'Cinema-grade video', body: '4K or 1080p at 24, 25, 30 or 60 fps, with the 180° shutter rule shown as you set speed.' },
  { title: 'Feels like a camera', body: 'A haptic tick and click on every stop, zoom step and lens change.' },
  { title: 'Self-timer', body: '3 or 10 seconds, for sharp slow-shutter shots on a tripod.' },
  { title: 'Rule-of-thirds grid', body: 'A framing grid that matches the photo or video frame exactly.' },
  { title: 'One-tap Auto', body: 'Hand everything back to the camera with a single button.' },
  { title: 'Native and fast', body: 'Built in SwiftUI on Apple’s camera system, with no account or setup.' },
]

export default function DarkmatterPage() {
  return (
    <div className="overflow-hidden" style={appVars(app)}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        <StudioNav />
        <main>
          {/* Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-16 sm:pt-24 pb-16">
            <div>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/apps/darkmatter/icon.png"
                  alt="Darkmatter app icon"
                  width={72}
                  height={72}
                  className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-[16px] shadow-[0_0_0_1px_var(--border),0_12px_28px_-14px_rgba(0,0,0,0.45)]"
                />
                <p className="text-[10px] sm:text-[11px] app-accent tracking-[0.2em] uppercase">iPhone app · Photo &amp; Video</p>
              </div>
              <h1 className="text-[clamp(44px,6.4vw,88px)] font-extrabold leading-[0.92] tracking-tight mt-8">
                Every setting.
                <br />
                <span className="app-accent">In your hands.</span>
              </h1>
              <p className="text-[12px] sm:text-[13px] text-muted mt-6 max-w-[460px] leading-relaxed">
                Darkmatter is a manual camera for iPhone. Dial in ISO, shutter speed, white balance and focus, shoot RAW or
                ProRAW, and paint light trails with long exposures.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <StoreButton />
                <span className="text-[10px] text-muted tracking-widest uppercase">No ads · No account · No tracking</span>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[min(520px,100%)] h-[clamp(380px,100vw,620px)] lg:h-[620px]">
                <Phone src="/apps/darkmatter/trails.webp" alt="Darkmatter Light Trails mode" className="absolute right-[3%] top-[9%] w-[44%] rotate-[7deg] opacity-70" />
                <Phone src="/apps/darkmatter/manual.webp" alt="Darkmatter manual controls" className="absolute left-[10%] top-0 w-[48%] -rotate-[4deg] z-10" />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="section-divider grid grid-cols-2 md:grid-cols-4 gap-[2px] py-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface border border-border p-5 sm:p-7">
                <div className="font-display text-[32px] sm:text-[44px] font-black app-accent leading-none tabular-nums">{s.value}</div>
                <div className="text-[9px] sm:text-[10px] text-muted mt-2 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Spotlights */}
          <section id="features" className="section-divider py-16 md:py-24 scroll-mt-16">
            <SectionLabel>Features</SectionLabel>
            <div className="flex flex-col gap-24 md:gap-32">
              {spotlights.map((f, i) => (
                <div key={f.kicker} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <Reveal className={i % 2 ? 'md:order-2' : ''}>
                    <div className="flex justify-center">
                      <Phone src={f.shot.src} alt={f.shot.alt} className="w-[min(300px,72vw)]" />
                    </div>
                  </Reveal>
                  <Reveal delay={100}>
                    <p className="text-[11px] app-accent tracking-[0.2em] uppercase">{f.kicker}</p>
                    <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.95] tracking-tight mt-4">{f.title}</h2>
                    <p className="text-[12px] sm:text-[13px] text-muted mt-6 leading-relaxed max-w-[480px]">{f.body}</p>
                    <ul className="mt-8 flex flex-col gap-3">
                      {f.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-[11px] sm:text-[12px] tracking-wide">
                          <span className="w-1.5 h-1.5 shrink-0 bg-current app-accent" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              ))}
            </div>
          </section>

          {/* Video + extras */}
          <section className="section-divider py-16 md:py-20">
            <SectionLabel>And also</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-center">
              <Reveal>
                <div className="flex justify-center">
                  <Phone src="/apps/darkmatter/video.webp" alt="Darkmatter recording 4K video at 24 fps" className="w-[min(300px,72vw)]" />
                </div>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
                {extras.map((e) => (
                  <Reveal key={e.title}>
                    <div className="h-full bg-surface border border-border p-6 sm:p-8">
                      <h3 className="text-[20px] font-bold tracking-tight">{e.title}</h3>
                      <p className="text-[11px] sm:text-[12px] text-muted mt-3 leading-relaxed">{e.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="section-divider py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <SectionLabel>Privacy</SectionLabel>
              <Reveal>
                <h2 className="text-[clamp(36px,7vw,72px)] font-extrabold leading-[0.95] tracking-tight">
                  Your photos.
                  <br />
                  <span className="app-accent">Only yours.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <ul className="flex flex-col gap-3">
                {[
                  'Darkmatter collects nothing. No account, no server, no analytics.',
                  'Photos and videos go straight to your own Photos library.',
                  'Add-only Photos access: it can save, but never read your library.',
                  'The microphone is used only in Video mode.',
                ].map((t) => (
                  <li key={t} className="px-5 py-4 border border-border bg-surface text-[11px] sm:text-[12px] tracking-wide leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
              <a href="/darkmatter/privacy" className="inline-block mt-6 text-[11px] app-accent tracking-widest uppercase hover:underline underline-offset-4">
                Read the privacy policy →
              </a>
            </Reveal>
          </section>

          {/* CTA */}
          <section className="section-divider py-16 md:py-24 text-center flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/apps/darkmatter/icon.png" alt="" width={88} height={88} className="w-[88px] h-[88px] rounded-[20px]" />
            <h2 className="text-[clamp(36px,7vw,80px)] font-extrabold leading-[0.95] tracking-tight mt-8">
              Shoot in the <span className="app-accent">dark.</span>
            </h2>
            <div className="mt-10">
              <StoreButton />
            </div>
            <p className="text-[11px] text-muted mt-10 max-w-[440px] leading-relaxed">
              Designed, built and shipped by{' '}
              <a href="/" className="text-ink underline underline-offset-4 decoration-border">
                Yash Rawat
              </a>
              , an independent developer. Questions or ideas?{' '}
              <a href="/darkmatter/support" className="text-ink underline underline-offset-4 decoration-border">
                Get in touch
              </a>
              .
            </p>
          </section>
        </main>
        <StudioFooter />
      </div>
    </div>
  )
}
