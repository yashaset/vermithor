import AppLanding, { type LandingContent } from '@/components/studio/AppLanding'
import { APPS } from '@/components/studio/apps'
import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = pageMeta({ path: '/focusblock', ...APP_SEO.focusblock })

const app = APPS.find((a) => a.slug === 'focusblock')!

const content: LandingContent = {
  eyebrow: 'iPhone app · Productivity',
  title: (
    <>
      Focus that runs <span className="app-accent">on its own.</span>
    </>
  ),
  lede: 'FocusBlock keeps Instagram, TikTok and YouTube out of reach during focus sessions and quiet hours that start by themselves. Built on Apple’s Screen Time, so it never sees what you use.',
  store: 'App Store',
  stats: [
    { value: '0', label: 'Data collected. No account, no server.' },
    { value: '5 min', label: 'Short unlocks for real emergencies' },
    { value: 'Strict', label: 'Sessions that can’t be skipped' },
    { value: '1×', label: 'Screen Time approval, then done' },
  ],
  features: [
    {
      title: 'Focus sessions',
      body: 'Start a session and the apps you picked stay closed until it ends. See how many minutes you focused today and keep your streak going.',
    },
    {
      title: 'Quiet hours',
      body: 'Schedules start and stop on time, on the days you choose, even overnight. iOS runs them, so they work with the app closed or after a restart.',
    },
    {
      title: 'Apps, categories, websites',
      body: 'Block single apps, whole categories like Social, or websites, all picked from Apple’s own Screen Time picker.',
    },
    {
      title: 'Short unlocks',
      body: 'The block screen can offer “I need 5 minutes” a few times a day. When the time is up, the block comes back by itself. Set it to 0 to turn them off.',
    },
    {
      title: 'Strict mode',
      body: 'A strict session can’t be ended early, and a strict schedule can’t be edited, paused or deleted while it runs. For the days you know you’ll bargain.',
    },
    {
      title: 'A calm block screen',
      body: 'Opening a blocked app shows a quiet screen with your own title and message, instead of a scolding.',
    },
  ],
  steps: [
    { title: 'Allow Screen Time once', body: 'Approve with Face ID, Touch ID or your passcode. iOS only lets apps block apps this way.' },
    { title: 'Pick what to block', body: 'Choose apps, categories and websites in Apple’s picker. FocusBlock gets anonymous tokens, not names.' },
    { title: 'Start a session or a schedule', body: 'Focus now, or set quiet hours that run every day without you thinking about it.' },
  ],
  privacy: {
    title: (
      <>
        Blocks your apps.
        <br />
        <span className="app-accent">Never sees them.</span>
      </>
    ),
    points: [
      'FocusBlock collects nothing. No account, no server, no analytics, no ads.',
      'Apple’s Screen Time hands it anonymous tokens, so it never learns which apps you picked or how you use them.',
      'Your sessions, schedules and focus minutes stay on your iPhone.',
      'Delete the app and everything it stored goes with it, and every block is lifted.',
    ],
  },
  cta: (
    <>
      Make room for <span className="app-accent">what matters.</span>
    </>
  ),
}

export default function FocusBlockPage() {
  return <AppLanding app={app} content={content} />
}
