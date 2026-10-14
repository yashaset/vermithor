import type { Metadata } from 'next'
import DocPage, { DocSection, DocTable } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/momentum/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Momentum handles your workouts, Apple Health data, location and account.',
}

export default function PrivacyPage() {
  return (
    <DocPage kicker="Momentum · Privacy" title={<>Privacy <span className="text-accent">Policy</span></>} meta="Effective 14 October 2026 · Applies to the Momentum iOS app and its widgets">
      <div className="border border-border bg-surface p-6 sm:p-8">
        <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-4">The short version</p>
        <ul className="flex flex-col gap-3 text-[12px] sm:text-[13px] leading-relaxed">
          <li>You can use Momentum without an account. Then your workouts never leave your iPhone.</li>
          <li>If you sign in, your workouts are backed up to your private cloud space so they sync across devices.</li>
          <li>Apple Health data and your gym location stay on your iPhone. They are never uploaded.</li>
          <li>No ads, no tracking, no analytics, and we never sell your data.</li>
        </ul>
      </div>

      <DocSection n="1" title="What Momentum stores">
        <DocTable
          head={['Data', 'Where it lives', 'Why']}
          rows={[
            ['Workouts: exercises, sets, reps, weights, dates, custom exercises', 'On your iPhone. Also in our cloud database if you sign in.', 'To log training, show trends and PRs, and sync your history'],
            ['Name, email address and account ID', 'Our sign-in provider, only if you sign in with Apple or Google', 'To identify your account and keep your data private to you'],
            ['Body weight and height you enter during setup or in Profile', 'On your iPhone only', 'To estimate calories and count your body weight on exercises like pull-ups and dips'],
            ['Body weight and heart rate from Apple Health', 'On your iPhone only', 'To count body-weight exercises correctly and estimate effort'],
            ['Strength workouts and estimated calories written to Apple Health', 'Apple Health on your iPhone', 'So your training counts toward Activity rings, if you turn this on'],
            ["Your gym's location", 'On your iPhone only', 'To remind you to start a workout when you arrive, if you turn this on'],
            ['Settings: plan, units, alarm time, rest days', 'On your iPhone only', 'To run the app the way you set it up'],
          ]}
        />
      </DocSection>

      <DocSection n="2" title="Accounts and cloud sync">
        <p>
          Signing in is optional. When you sign in with Apple or Google, we use Google Firebase Authentication to create your account and
          Google Cloud Firestore to store your workouts. Your records sit under your own account ID, and our security rules let only your
          signed-in account read or write them. Google processes this data on our behalf under its own terms and does not use it for
          advertising. If you use &ldquo;Hide My Email&rdquo; with Sign in with Apple, we only ever see the relay address.
        </p>
      </DocSection>

      <DocSection n="3" title="Apple Health (HealthKit)">
        <p>Apple Health access is optional and only requested when you choose to connect it. Momentum asks for exactly these data types:</p>
        <DocTable
          head={['Access', 'Health data type', 'How Momentum uses it']}
          rows={[
            ['Read', 'Body Mass (weight)', 'Adds your body weight to the load of body-weight exercises such as pull-ups and dips, so volume and strength trends are accurate'],
            ['Read', 'Heart Rate', 'Shows your average and peak heart rate during a finished workout, when a watch recorded it'],
            ['Write', 'Workouts', 'Saves each finished session as a Traditional Strength Training workout with its start and end time'],
            ['Write', 'Active Energy', 'Saves an estimate of calories burned for that workout'],
          ]}
        />
        <p>
          Data read from Apple Health is used only inside the app on your iPhone. It is never uploaded to our cloud database, never shared
          with third parties, never used for advertising or marketing, and never sold. You can turn off any of these permissions at any time
          in Settings → Health → Data Access &amp; Devices → Momentum, and the app keeps working without them.
        </p>
      </DocSection>

      <DocSection n="4" title="Permissions Momentum asks for">
        <p>Each permission is optional. Momentum asks only when you turn on the feature that needs it, and works without it.</p>
        <DocTable
          head={['Permission', 'Used for', 'Data leaves your iPhone?']}
          rows={[
            ['Apple Health', 'Body weight, heart rate, saving workouts (see above)', 'No'],
            ['Location: While Using', 'Saving where your gym is, when you tap “Use current location”', 'No'],
            ['Location: Always', 'Noticing when you arrive at or leave that one gym, so the app can remind you to start or finish a workout', 'No'],
            ['Alarms', 'The morning gym alarm that rings even in Silent mode', 'No'],
            ['Notifications', 'Rest-timer alerts, gym arrival reminders, and a “Still working out?” check if nothing is logged for a while', 'No'],
            ['Live Activities', 'Shows your running workout, current set and rest timer on the Lock Screen and Dynamic Island, with buttons to log a set without unlocking. Anyone who can see your Lock Screen can see it; turn it off in Settings → Momentum → Live Activities.', 'No'],
            ['Sign in with Apple or Google', 'Optional account for cloud backup and sync', 'Yes: name, email, account ID and workouts (section 2)'],
          ]}
        />
        <p>
          For gym reminders, iOS watches a small area of about 150 metres around your saved gym and tells the app only when you enter or
          leave it. Momentum does not record your route or any other place you visit. The gym&apos;s coordinates are stored only on your
          iPhone. Alarms and notifications are scheduled locally; we do not send push notifications from a server.
        </p>
      </DocSection>

      <DocSection n="5" title="Data on the device">
        <p>
          Your workouts, settings, plan and rest days are stored in the app&apos;s private storage on your iPhone. The Home and Lock Screen
          widgets read a small summary (weekly volume, streak, sets per muscle) from storage shared only between Momentum and its widgets.
        </p>
      </DocSection>

      <DocSection n="6" title="What we don't do">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>We do not show ads or use advertising identifiers.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not include analytics or crash-reporting SDKs.</li>
          <li>We do not sell, rent or trade your personal data.</li>
        </ul>
      </DocSection>

      <DocSection n="7" title="Deleting your data">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li><strong className="text-ink">Delete your account:</strong> Profile → Account → Delete Account. This removes your sign-in account and every workout stored in the cloud, immediately.</li>
          <li><strong className="text-ink">Erase workouts:</strong> Profile → Your Data → Erase All Workouts removes your history from the device and, if you are signed in, from the cloud.</li>
          <li><strong className="text-ink">Remove everything on the device:</strong> delete the app. Workouts already saved to Apple Health stay there until you delete them in the Health app.</li>
        </ul>
      </DocSection>

      <DocSection n="8" title="Children">
        <p>Momentum is not directed at children under 13, and we do not knowingly collect their personal information.</p>
      </DocSection>

      <DocSection n="9" title="Changes to this policy">
        <p>If we change how Momentum handles data, we will update this page and the effective date above. Significant changes will also be noted in the app&apos;s release notes.</p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about your data? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent underline underline-offset-4">{SUPPORT_EMAIL}</a>
          {' '}or visit the <a href="/momentum/support" className="text-accent underline underline-offset-4">support page</a>.
          Momentum is made by an independent developer, Yash Rawat. Apple Health is a trademark of Apple Inc.
        </p>
      </DocSection>
    </DocPage>
  )
}
