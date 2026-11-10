import type { Metadata } from 'next'
import FocusDocPage from '@/components/focusblock/FocusDocPage'
import { DocSection, DocTable } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/focusblock/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How FocusBlock handles your data: everything stays on your iPhone, and Screen Time keeps your app choices anonymous.',
}

export default function FocusBlockPrivacyPage() {
  return (
    <FocusDocPage
      kicker="FocusBlock · Privacy"
      title={<>Privacy <span className="text-accent">Policy</span></>}
      meta="Effective 10 November 2026 · Applies to the FocusBlock iOS app and its extensions"
    >
      <div className="border border-border bg-surface p-6 sm:p-8">
        <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-4">The short version</p>
        <ul className="flex flex-col gap-3 text-[12px] sm:text-[13px] leading-relaxed">
          <li>FocusBlock collects nothing. There is no account, no server, no analytics and no ads.</li>
          <li>Everything you set up stays on your iPhone.</li>
          <li>Apple&apos;s Screen Time gives FocusBlock anonymous tokens, so it never learns which apps you picked or how you use them.</li>
          <li>We never sell, share or track anything about you.</li>
        </ul>
      </div>

      <DocSection n="1" title="What FocusBlock stores">
        <p>To work, FocusBlock saves a few things on your iPhone only:</p>
        <DocTable
          head={['Data', 'Where it lives', 'Why']}
          rows={[
            ['The apps, categories and websites you choose to block (as anonymous Screen Time tokens)', 'On your iPhone only', 'To know what to block'],
            ['Focus sessions and schedules: times, days, strict mode', 'On your iPhone only', 'To start and stop blocks on time'],
            ['Block-screen title and message, short-unlock settings and today’s unlock count', 'On your iPhone only', 'To show your block screen and limit unlocks'],
            ['Minutes focused per day', 'On your iPhone only', 'To show today’s focus time and your streak'],
          ]}
        />
        <p>
          This data is kept in a private storage area shared only between FocusBlock and its own extensions (see section 3). It is never
          uploaded, backed up to our servers or sent anywhere. We don&apos;t have servers.
        </p>
      </DocSection>

      <DocSection n="2" title="Screen Time (Family Controls)">
        <p>
          iOS only lets apps block other apps through Apple&apos;s Screen Time technology, so FocusBlock asks for Screen Time access when you
          first open it. You approve it with Face ID, Touch ID or your passcode.
        </p>
        <p>
          When you pick apps to block, Apple&apos;s own picker hands FocusBlock opaque tokens instead of app names. FocusBlock can ask iOS to
          block those tokens, but it cannot see what they are, read your usage history, or see what you do in other apps. Apple processes
          Screen Time on your device under{' '}
          <a href="https://www.apple.com/legal/privacy/" className="text-accent underline underline-offset-4">Apple&apos;s privacy policy</a>.
        </p>
        <p>You can turn off FocusBlock&apos;s Screen Time access at any time in Settings → Screen Time. Blocking then stops immediately.</p>
      </DocSection>

      <DocSection n="3" title="The app's extensions">
        <p>FocusBlock includes three small extensions that iOS runs on your iPhone, even when the app is closed:</p>
        <DocTable
          head={['Extension', 'What it does', 'Data leaves your iPhone?']}
          rows={[
            ['Activity monitor', 'Starts and ends your sessions, schedules and short unlocks on time', 'No'],
            ['Shield', 'Draws the screen you see when you open a blocked app', 'No'],
            ['Shield actions', 'Handles the Close and short-unlock buttons on that screen', 'No'],
          ]}
        />
      </DocSection>

      <DocSection n="4" title="What we don't do">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>We do not collect, store or transmit any personal data.</li>
          <li>We do not show ads or use advertising identifiers.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not include analytics, crash-reporting or any third-party SDKs.</li>
          <li>We do not sell, rent or trade any data.</li>
        </ul>
      </DocSection>

      <DocSection n="5" title="Deleting your data">
        <p>
          Delete FocusBlock from your iPhone and everything it stored is removed, and all of its blocks are lifted. You can also remove single
          schedules in the app, or change your blocked apps at any time in Settings.
        </p>
      </DocSection>

      <DocSection n="6" title="Children">
        <p>
          FocusBlock is suitable for all ages. It collects no information from anyone, including children. It is a self-control tool for the
          person using the iPhone and does not offer parental controls over other people&apos;s devices.
        </p>
      </DocSection>

      <DocSection n="7" title="Changes to this policy">
        <p>If we ever change how FocusBlock handles data, we will update this page and the effective date above, and note it in the app&apos;s release notes.</p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about your data? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=FocusBlock%20privacy`} className="text-accent underline underline-offset-4">{SUPPORT_EMAIL}</a>
          {' '}or visit the <a href="/focusblock/support" className="text-accent underline underline-offset-4">support page</a>. FocusBlock is
          made by an independent developer, Yash Rawat. Screen Time is a trademark of Apple Inc.
        </p>
      </DocSection>
    </FocusDocPage>
  )
}
