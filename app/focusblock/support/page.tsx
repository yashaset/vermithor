import type { Metadata } from 'next'
import FocusDocPage from '@/components/focusblock/FocusDocPage'
import { DocSection } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/focusblock/config'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with FocusBlock: Screen Time access, blocked apps, schedules, strict mode and short unlocks.',
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Why does FocusBlock need Screen Time access?',
    a: 'iOS only allows apps to block other apps through Apple’s Screen Time. You approve it once with Face ID, Touch ID or your passcode. FocusBlock still can’t see which apps you use: iOS gives it anonymous tokens.',
  },
  {
    q: 'Why can’t FocusBlock show the names of my blocked apps everywhere?',
    a: 'For your privacy, iOS hides app names from FocusBlock. The app can only show icons and names through Apple’s own views, such as the picker and the block screen.',
  },
  {
    q: 'I opened a blocked app and nothing happened.',
    a: 'Check that a session or schedule is running (the Focus tab shows it), that Screen Time access is on in Settings → Screen Time, and that the app is in your list (Settings → Change blocked apps). If it still opens, restart your iPhone; iOS sometimes needs a moment after the first setup.',
  },
  {
    q: 'Do blocks work when FocusBlock is closed?',
    a: 'Yes. Sessions and schedules are handed to iOS, which starts and stops them on time even if FocusBlock is closed or your phone restarts.',
  },
  {
    q: 'How do short unlocks work?',
    a: 'The block screen can offer “I need 5 minutes” a few times a day for real emergencies. After the time is up, the block comes back by itself. Change how many you get, and how long they last, in Settings. Set it to 0 to turn them off.',
  },
  {
    q: 'What is strict mode?',
    a: 'A strict session can’t be ended early, and a strict schedule can’t be edited, paused or deleted while it runs. The block screen also stops offering short unlocks. In a genuine emergency you can still turn off FocusBlock’s Screen Time access in Settings → Screen Time.',
  },
  {
    q: 'Can a schedule run overnight?',
    a: 'Yes. Set an end time earlier than the start time, for example 23:00 to 07:00, and it ends the next morning. The days you pick are the days it starts.',
  },
  {
    q: 'How do I remove everything?',
    a: 'Delete the app. That removes all of its data from your iPhone and lifts every block it set.',
  },
]

export default function FocusBlockSupportPage() {
  return (
    <FocusDocPage kicker="FocusBlock · Support" title={<>How can we <span className="text-accent">help?</span></>}>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=FocusBlock%20support`}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border bg-surface p-6 sm:p-8 transition-colors duration-200 hover:border-accent"
      >
        <div>
          <p className="text-[10px] text-accent tracking-[0.2em] uppercase">Email the developer</p>
          <p className="text-[13px] sm:text-[15px] text-ink mt-3 break-all">{SUPPORT_EMAIL}</p>
        </div>
        <p className="text-[11px] text-muted leading-relaxed sm:max-w-[240px]">
          Bug reports, feature requests or questions. Replies within a few days.
        </p>
      </a>

      <DocSection title="Frequently asked">
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border py-5">
              <summary className="flex justify-between items-center gap-4 list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                <span className="text-[16px] sm:text-[18px] font-bold text-ink tracking-tight">{f.q}</span>
                <span className="text-accent text-[18px] transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </DocSection>

      <DocSection title="Privacy">
        <p>
          FocusBlock collects no data. Read the full{' '}
          <a href="/focusblock/privacy" className="text-accent underline underline-offset-4">privacy policy</a>.
        </p>
      </DocSection>
    </FocusDocPage>
  )
}
