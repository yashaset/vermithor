import type { Metadata } from 'next'
import DocPage, { DocSection } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/momentum/config'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Momentum: accounts, sync, Apple Health, the gym alarm, widgets and deleting your data.',
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Do I need an account?',
    a: 'No. Tap “Continue without an account” on the first screen and everything works offline on your iPhone. Signing in with Apple or Google is optional and only adds cloud backup and sync across devices.',
  },
  {
    q: 'How do I sync between devices?',
    a: 'Sign in with the same Apple or Google account on each device (Profile → Account). Your workouts back up to your private cloud space and sync automatically.',
  },
  {
    q: 'How do I connect Apple Health?',
    a: 'Turn it on during setup, or go to Profile → Apple Health. Finished workouts are saved as Traditional Strength Training and count toward your Activity rings. You can change permissions any time in Settings → Health → Data Access & Devices → Momentum.',
  },
  {
    q: 'How does the gym alarm work?',
    a: 'Go to Profile → Gym alarm, pick a time and your gym days. It is a real system alarm, so it rings even in Silent mode. Use “Test alarm” to hear it in a few seconds.',
  },
  {
    q: 'Why does Momentum ask for “Always” location?',
    a: 'Only for the optional gym arrival reminder. Save your gym in Profile → Gym and iOS tells Momentum when you arrive, even when the app is closed. Your location never leaves your iPhone, and the app works without it.',
  },
  {
    q: 'How do I add the widgets?',
    a: 'Touch and hold your Home Screen or Lock Screen, tap Edit or Customize, then add a Momentum widget for weekly volume, streak, muscle map or your gym alarm.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'Profile → Account → Delete account removes your account and all cloud data immediately. To erase only your history, use Profile → Data → Erase all workouts.',
  },
]

export default function SupportPage() {
  return (
    <DocPage kicker="Momentum · Support" title={<>How can we <span className="text-accent">help?</span></>}>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=Momentum%20support`}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border bg-surface p-6 sm:p-8 transition-colors duration-200 hover:border-accent"
      >
        <div>
          <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">Email the developer</p>
          <p className="font-mono text-[13px] sm:text-[15px] text-ink mt-3 break-all">{SUPPORT_EMAIL}</p>
        </div>
        <p className="font-mono text-[11px] text-muted leading-relaxed sm:max-w-[240px]">
          Bug reports, feature requests or questions about your data. Replies within a few days.
        </p>
      </a>

      <DocSection title="Frequently asked">
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border py-5">
              <summary className="flex justify-between items-center gap-4 list-none cursor-none [&::-webkit-details-marker]:hidden">
                <span className="font-syne text-[16px] sm:text-[18px] font-bold text-ink tracking-tight">{f.q}</span>
                <span className="font-mono text-accent text-[18px] transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </DocSection>

      <DocSection title="Privacy">
        <p>
          Read how Momentum handles your workouts, Apple Health data and location in the{' '}
          <a href="/momentum/privacy" className="text-accent underline underline-offset-4">privacy policy</a>.
        </p>
      </DocSection>
    </DocPage>
  )
}
