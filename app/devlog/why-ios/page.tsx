import type { Metadata } from 'next'
import DevlogPost from '@/components/studio/DevlogPost'
import { DocSection } from '@/components/momentum/DocPage'

const URL_PATH = '/devlog/why-ios'
const TITLE = 'Why I build for iPhone first'
const DESCRIPTION =
  'Why an independent developer builds iOS apps first: system alarms, Live Activities, Screen Time, ProRAW and privacy built into the platform, and one codebase one person can actually polish.'
const PUBLISHED = '2026-11-12'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · yash.apps Devlog` },
  description: DESCRIPTION,
  keywords: [
    'why build iOS apps',
    'iOS vs Android indie developer',
    'independent iOS developer',
    'SwiftUI indie app',
    'iPhone app development India',
    'Screen Time API',
    'Live Activities',
  ],
  authors: [{ name: 'Yash Rawat', url: 'https://yashrawat.com' }],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: 'article',
    url: URL_PATH,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'yash.apps',
    publishedTime: PUBLISHED,
    authors: ['Yash Rawat'],
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  publisher: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  mainEntityOfPage: `https://yashrawat.com${URL_PATH}`,
}

const link = 'text-accent underline underline-offset-4'

export default function WhyIosPost() {
  return (
    <DevlogPost title={<>Why I build for <span className="text-accent">iPhone</span> first</>} meta="12 Nov 2026 · Yash Rawat" jsonLd={jsonLd}>
      <p className="text-[14px] sm:text-[15px] text-ink2 leading-[1.8]">
        By day I build web interfaces. So when I started making my own apps, the obvious move would have been something cross-platform
        that ships everywhere at once. Instead, every app in the lineup so far starts on iPhone. That wasn&apos;t loyalty to a logo. It
        came down to what each app needed to do, and what one person can realistically build, test and support well.
      </p>

      <DocSection n="1" title="The best features live in the system, not the app">
        <p>
          Each of my apps leans on something only the operating system can do. The <a href="/momentum" className={link}>Momentum</a> gym
          alarm is a real system alarm, so it rings even when your iPhone is on Silent. Your running workout and rest timer sit on the Lock
          Screen and in the Dynamic Island as a Live Activity, with buttons to log a set without unlocking. Workouts save to Apple Health and
          close your Activity rings, and widgets put your streak on the Home Screen.
        </p>
        <p>
          <a href="/darkmatter" className={link}>Darkmatter</a> is built directly on Apple&apos;s camera system: manual ISO and shutter,
          RAW and Apple ProRAW. FocusBlock can block apps only because Apple&apos;s Screen Time framework lets it. None of these are
          things a wrapper or a web view can fake. They&apos;re the reason the apps are worth keeping, so I build where they&apos;re
          first-class.
        </p>
      </DocSection>

      <DocSection n="2" title="Privacy is part of the platform">
        <p>
          My rule for every app is no ads, no tracking, no filler. iOS makes that rule easier to keep, because a lot of the privacy is
          enforced by the system rather than promised by me.
        </p>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Screen Time hands FocusBlock anonymous tokens, so it never learns which apps you chose to block or how you use them.</li>
          <li>Darkmatter asks for add-only Photos access: it can save new shots, but it can&apos;t read anything already in your library.</li>
          <li>Every permission is a system prompt you can change later in Settings, not a toggle buried in my app.</li>
        </ul>
        <p>
          When the platform does the protecting, &ldquo;we collect nothing&rdquo; isn&apos;t just a line in a privacy policy. It&apos;s
          how the app is physically built.
        </p>
      </DocSection>

      <DocSection n="3" title="One person, one platform, every pixel">
        <p>
          I design, build and support everything myself, and a real person answers every support email. That only works if the surface
          area stays small. Building natively in SwiftUI for a focused set of iPhones means I can get the details right: the haptic tick on
          every stop of Darkmatter&apos;s dials, a one-tap set log in Momentum, a framing grid that matches the photo exactly. Spread
          across every platform at once, those details would be the first thing I&apos;d cut.
        </p>
      </DocSection>

      <DocSection n="4" title="Clear rules, honestly explained">
        <p>
          iOS has firm limits. Apps can&apos;t change an iPhone&apos;s fixed aperture, can only set ISO and shutter speed manually together,
          and can only block other apps through Screen Time. Sometimes that&apos;s frustrating. But the rules are documented and the same
          for everyone, so I can design around them and tell you about them up front instead of shipping something that half-works. I wrote
          more about that in the FocusBlock post on what Screen Time does and doesn&apos;t let you do.
        </p>
      </DocSection>

      <DocSection n="5" title="iPhone first, not iPhone only">
        <p>
          Choosing iOS first is about where an app works best, not about leaving anyone out. When the idea doesn&apos;t depend on iPhone-only
          features, it goes wider: Sweetheart, the German flashcards app I&apos;m building now, is coming to both iPhone and Android.
        </p>
      </DocSection>

      <DocSection title="The short version">
        <p>
          I pick the platform that lets each app do its one job best, keeps your data yours, and lets one developer polish every pixel. So
          far, for alarms, cameras and focus, that&apos;s been iPhone.
        </p>
        <p>
          <a href="/#apps" className={link}>See the full lineup →</a>
        </p>
      </DocSection>
    </DevlogPost>
  )
}
