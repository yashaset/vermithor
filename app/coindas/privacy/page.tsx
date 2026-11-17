import type { Metadata } from 'next'
import CoindasDocPage from '@/components/coindas/CoindasDocPage'
import { DocSection, DocTable } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/coindas/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Coindas handles your data: your money stays on your iPhone, and your account holds only your name and email.',
}

export default function CoindasPrivacyPage() {
  return (
    <CoindasDocPage
      kicker="Coindas · Privacy"
      title={<>Privacy <span className="text-accent">Policy</span></>}
      meta="Effective 17 November 2026 · Applies to the Coindas iOS app"
    >
      <div className="border border-border bg-surface p-6 sm:p-8">
        <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-4">The short version</p>
        <ul className="flex flex-col gap-3 text-[12px] sm:text-[13px] leading-relaxed">
          <li>Your budget, income, categories and expenses stay on your iPhone. They are never uploaded to us.</li>
          <li>Your account holds only your name, email address and an account ID, so you can sign in.</li>
          <li>Coindas never connects to your bank and never asks for bank or card details.</li>
          <li>No ads, no analytics, no tracking. We never sell or share anything about you.</li>
          <li>Delete your account in the app at any time: Settings → Delete account.</li>
        </ul>
      </div>

      <DocSection n="1" title="What Coindas stores">
        <DocTable
          head={['Data', 'Where it lives', 'Why']}
          rows={[
            ['Monthly income, budget, fixed costs and how strict you want to be', 'On your iPhone only', 'To work out what’s safe to spend'],
            ['Categories, expenses, income and transfers you add', 'On your iPhone only', 'To show your budgets and activity'],
            ['Appearance and other settings', 'On your iPhone only', 'To remember your choices'],
            ['Your name, email address and an account ID', 'Firebase Authentication (Google)', 'To create your account and sign you in'],
          ]}
        />
        <p>
          Money data is kept in the app&apos;s private storage on your iPhone. Like other app data, it is included in your iPhone backups if
          you use iCloud Backup or back up to a computer; Apple handles those backups under{' '}
          <a href="https://www.apple.com/legal/privacy/" className="text-accent underline underline-offset-4">Apple&apos;s privacy policy</a>.
        </p>
      </DocSection>

      <DocSection n="2" title="Signing in">
        <p>You can create an account with your email and a password, with Sign in with Apple, or with Google.</p>
        <DocTable
          head={['Method', 'What Coindas receives']}
          rows={[
            ['Email and password', 'The name and email you type. Your password goes to Firebase and is never visible to us.'],
            ['Sign in with Apple', 'Your name and email, or a private relay address if you choose Hide My Email'],
            ['Google', 'Your name and email address'],
          ]}
        />
        <p>
          Accounts are run by Firebase Authentication, a service from Google, which processes this information under the{' '}
          <a href="https://firebase.google.com/support/privacy" className="text-accent underline underline-offset-4">Firebase privacy terms</a>.
          Firebase may also log technical details such as your IP address when you sign in, to keep accounts secure.
        </p>
        <p>You can also tap &quot;Explore with sample data&quot; to try Coindas without an account. Nothing leaves your iPhone then.</p>
      </DocSection>

      <DocSection n="3" title="What we don't do">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>We do not upload your income, budgets or expenses.</li>
          <li>We do not connect to banks or read SMS messages.</li>
          <li>We do not show ads or use advertising identifiers.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not include analytics or crash-reporting tools.</li>
          <li>We do not sell, rent or trade any data.</li>
        </ul>
      </DocSection>

      <DocSection n="4" title="Deleting your data">
        <p>
          In the app, go to Settings → Delete account. This deletes your account from Firebase and erases everything Coindas stored on your
          iPhone. If you signed in with Apple, Apple asks you to confirm and Coindas revokes its access to your Apple ID.
        </p>
        <p>
          Deleting the app also removes everything on your iPhone, but keeps your account until you delete it. You can also email us and we
          will delete your account for you.
        </p>
      </DocSection>

      <DocSection n="5" title="Your rights">
        <p>
          You can ask what we hold about you, ask us to correct it or delete it, at any time, by emailing the address below. We reply within
          30 days.
        </p>
      </DocSection>

      <DocSection n="6" title="Children">
        <p>Coindas is not made for children under 13 and we do not knowingly create accounts for them.</p>
      </DocSection>

      <DocSection n="7" title="Changes to this policy">
        <p>
          If we change how Coindas handles data, for example when shared budgets or email reports arrive, we will update this page and the
          effective date above before the change ships, and mention it in the app&apos;s release notes.
        </p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about your data? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Coindas%20privacy`} className="text-accent underline underline-offset-4">{SUPPORT_EMAIL}</a>
          {' '}or visit the <a href="/coindas/support" className="text-accent underline underline-offset-4">support page</a>. Coindas is made by
          an independent developer, Yash Rawat.
        </p>
      </DocSection>
    </CoindasDocPage>
  )
}
