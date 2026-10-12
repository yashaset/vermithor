import MomentumNav from '@/components/momentum/MomentumNav'
import MomentumFooter from '@/components/momentum/MomentumFooter'
import AppStoreButton from '@/components/momentum/AppStoreButton'
import Phone from '@/components/momentum/Phone'
import SectionLabel from '@/components/SectionLabel'
import Reveal from '@/components/Reveal'

const stats = [
  { value: '149', label: 'Exercises' },
  { value: '585', label: 'Variations' },
  { value: '0', label: 'Ads or trackers' },
  { value: '100%', label: 'Works offline' },
]

const spotlights = [
  {
    kicker: '01 · Log fast',
    title: 'Every set in a tap.',
    body: "Today's workout fills itself in. On a Monday you get last Monday's plan, with the weights you lifted last time. Tick off sets, and the rest timer starts on its own, with a haptic when it's time to go again.",
    points: ['Sets prefill from last time', 'Rest timer with haptics', 'Your PR shown on every exercise'],
    shot: { src: '/momentum/workout.webp', alt: 'Momentum workout screen with Push, Leg and Pull Day to repeat' },
  },
  {
    kicker: '02 · See progress',
    title: 'Watch yourself get stronger.',
    body: 'Weekly lifting volume, estimated 1RM and top-set trends for every lift. PRs are detected automatically, and every session ends with a progress report showing exactly what improved.',
    points: ['Estimated 1RM per lift', 'Automatic PR detection', 'Post-workout progress report'],
    shot: { src: '/momentum/trends.webp', alt: 'Momentum Trends screen with weekly volume chart and bench press progress' },
  },
  {
    kicker: '03 · Stay consistent',
    title: 'Show up, week after week.',
    body: 'Weekly streaks and a weekly goal keep you honest, and planned rest days never break your streak. A real morning alarm rings even in Silent mode, so the gym gets the first hour of your day.',
    points: ['Weekly streaks and goals', 'Gym alarm that beats Silent mode', 'Rest days that keep your streak'],
    shot: { src: '/momentum/home.webp', alt: 'Momentum home screen with weekly volume, sessions, sets and streak' },
  },
  {
    kicker: '04 · Every movement',
    title: '585 ways to train.',
    body: 'Barbell, dumbbell, cable, machine, Smith machine and bodyweight: 149 movements with 585 variations, searchable and grouped by muscle. Add your own in seconds if something is missing.',
    points: ['Grouped by muscle', 'Search everything', 'Custom exercises'],
    shot: { src: '/momentum/library.webp', alt: 'Momentum exercise library grouped by muscle' },
  },
]

const extras = [
  { title: 'Muscle map', body: 'Sets per muscle this week, on an anatomical front-and-back body map.' },
  { title: 'Gym arrival reminder', body: 'Optional nudge to start your workout the moment you walk into your gym.' },
  { title: 'Widgets', body: 'Weekly volume, streak and muscle map on your Home and Lock Screen.' },
  { title: 'Apple Health', body: 'Workouts save to Health and count toward your Activity rings.' },
  { title: 'Share to Stories', body: 'A story-ready recap of every session, PRs front and centre.' },
  { title: 'Sync, optional', body: 'Sign in with Apple or Google to back up and sync across devices.' },
]

export default function MomentumPage() {
  return (
    <>
      <MomentumNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-4 sm:px-10 md:px-[60px] pt-28 pb-16 lg:py-0">
          <div
            className="pointer-events-none absolute -top-40 right-[-10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,244,59,0.14),transparent_65%)]"
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/momentum/icon.png" alt="Momentum app icon" width={72} height={72} className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-[16px] shadow-[0_10px_40px_-10px_rgba(201,244,59,0.35)]" />
              <p className="text-[10px] sm:text-[11px] text-accent tracking-[0.2em] uppercase">
                iPhone app · Strength training
              </p>
            </div>
            <h1 className="text-[clamp(44px,6.4vw,88px)] font-extrabold leading-[0.92] tracking-tight mt-8">
              The gym log
              <br />
              for people
              <br />
              who&nbsp;<span className="text-accent">actually</span>
              <br />
              <span className="text-accent">lift.</span>
            </h1>
            <p className="text-[12px] sm:text-[13px] text-muted mt-6 max-w-[460px] leading-relaxed">
              Log every set in seconds, watch your lifts climb and never miss a gym day. Momentum is built for
              lifting, nothing else.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <AppStoreButton />
              <span className="text-[10px] text-muted tracking-widest uppercase">Free · No ads · No account needed</span>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[min(520px,100%)] h-[clamp(380px,100vw,620px)] lg:h-[620px]">
              <Phone
                src="/momentum/trends.webp"
                alt="Momentum Trends screen"
                className="absolute right-[3%] top-[9%] w-[44%] rotate-[7deg] opacity-70"
              />
              <Phone
                src="/momentum/home.webp"
                alt="Momentum home screen"
                className="absolute left-[10%] top-0 w-[48%] -rotate-[4deg] z-10"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-divider grid grid-cols-2 md:grid-cols-4 gap-[2px] px-4 sm:px-10 md:px-[60px] py-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface border border-border p-5 sm:p-7">
              <div className="font-display text-[32px] sm:text-[44px] font-black text-accent leading-none tabular-nums">{s.value}</div>
              <div className="text-[9px] sm:text-[10px] text-muted mt-2 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Spotlights */}
        <section id="features" className="section-divider px-4 sm:px-10 md:px-[60px] py-16 md:py-24 scroll-mt-16">
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
                  <p className="text-[11px] text-accent tracking-[0.2em] uppercase">{f.kicker}</p>
                  <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.95] tracking-tight mt-4">{f.title}</h2>
                  <p className="text-[12px] sm:text-[13px] text-muted mt-6 leading-relaxed max-w-[480px]">{f.body}</p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[11px] sm:text-[12px] tracking-wide">
                        <span className="w-1.5 h-1.5 bg-accent shrink-0" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* Extras */}
        <section className="section-divider px-4 sm:px-10 md:px-[60px] py-16 md:py-20">
          <SectionLabel>And also</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {extras.map((e) => (
              <Reveal key={e.title}>
                <div className="h-full bg-surface border border-border p-6 sm:p-8 transition-colors duration-200 hover:border-accent">
                  <h3 className="text-[20px] font-bold tracking-tight">{e.title}</h3>
                  <p className="text-[11px] sm:text-[12px] text-muted mt-3 leading-relaxed">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="section-divider px-4 sm:px-10 md:px-[60px] py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <SectionLabel>Privacy</SectionLabel>
            <Reveal>
              <h2 className="text-[clamp(36px,7vw,72px)] font-extrabold leading-[0.95] tracking-tight">
                Your lifts.
                <br />
                <span className="text-accent">Your data.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <ul className="flex flex-col gap-3">
              {[
                'Works fully offline. No account required.',
                'Apple Health data and your gym location never leave your iPhone.',
                'No ads, no analytics, no tracking. Your data is never sold.',
                'Delete your account and cloud data from inside the app, any time.',
              ].map((t) => (
                <li key={t} className="px-5 py-4 border border-border bg-surface text-[11px] sm:text-[12px] tracking-wide leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
            <a href="/momentum/privacy" className="inline-block mt-6 text-[11px] text-accent tracking-widest uppercase hover:underline underline-offset-4">
              Read the privacy policy →
            </a>
          </Reveal>
        </section>

        {/* Maker + CTA */}
        <section className="section-divider px-4 sm:px-10 md:px-[60px] py-16 md:py-24 text-center flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/momentum/icon.png" alt="" width={88} height={88} className="w-[88px] h-[88px] rounded-[20px]" />
          <h2 className="text-[clamp(36px,7vw,80px)] font-extrabold leading-[0.95] tracking-tight mt-8">
            Start your <span className="text-accent">momentum.</span>
          </h2>
          <div className="mt-10">
            <AppStoreButton />
          </div>
          <p className="text-[11px] text-muted mt-10 max-w-[440px] leading-relaxed">
            Designed, built and shipped by{' '}
            <a href="/" className="text-ink underline underline-offset-4 decoration-border hover:decoration-accent">
              Yash Rawat
            </a>
            , an independent developer. Questions or ideas?{' '}
            <a href="/momentum/support" className="text-ink underline underline-offset-4 decoration-border hover:decoration-accent">
              Get in touch
            </a>
            .
          </p>
        </section>
      </main>
      <MomentumFooter />
    </>
  )
}
