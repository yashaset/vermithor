import AppLanding, { type LandingContent } from '@/components/studio/AppLanding'
import { APPS } from '@/components/studio/apps'
import type { Metadata } from 'next'
import { APP_SEO } from '@/components/seo/appSeo'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = pageMeta({ path: '/coindas', ...APP_SEO.coindas })

const app = APPS.find((a) => a.slug === 'coindas')!

const content: LandingContent = {
  eyebrow: 'iPhone app · Finance',
  title: (
    <>
      Know what’s safe to spend <span className="app-accent">today.</span>
    </>
  ),
  lede: 'Coindas turns your monthly budget into one daily number. Fixed costs are set aside first, leftovers roll into tomorrow, and nothing needs a bank login.',
  store: 'App Store',
  stats: [
    { value: '1', label: 'Number to check before you pay' },
    { value: '0', label: 'Bank logins needed' },
    { value: '2 taps', label: 'To add an expense' },
    { value: '3', label: 'Limits: daily, weekly and monthly' },
  ],
  features: [
    {
      title: 'Safe to spend today',
      body: 'What’s left of your budget, divided by the days left in the month. One honest number, there whenever you open the app.',
    },
    {
      title: 'Leftovers roll forward',
      body: 'Spend less today and tomorrow gets a little more. Have a big night and the extra is spread across the rest of the month, not dumped on tomorrow.',
    },
    {
      title: 'Fixed costs come first',
      body: 'Rent, fees, subscriptions and EMIs are set aside up front and shown as Due or Paid, so they never wreck a single day.',
    },
    {
      title: 'Start any day of the month',
      body: 'Set it up on the 16th and your first month is scaled to the days you actually have left. Fixed costs still count in full.',
    },
    {
      title: 'A nudge before you spend',
      body: 'As you type an amount, one line tells you what it does: still safe today, or how far over a category it takes you.',
    },
    {
      title: 'Strict when you want it',
      body: 'Strict mode asks you to confirm before anything takes a budget over. It never blocks you. It just makes you decide on purpose.',
    },
  ],
  steps: [
    { title: 'Set your monthly budget', body: 'Split it into everyday categories like food and travel.' },
    { title: 'Add what you always pay', body: 'Rent, EMIs and subscriptions are reserved first, so your daily number is real.' },
    { title: 'Check one number', body: 'Glance before you pay, and add what you spend in a couple of taps.' },
  ],
  privacy: {
    title: (
      <>
        Your money.
        <br />
        <span className="app-accent">Your iPhone.</span>
      </>
    ),
    points: [
      'No bank login and no reading your messages. You add what you spend yourself.',
      'Your budgets and expenses live on your iPhone.',
      'No ads and no tracking, ever.',
      'Delete your account in Settings and everything on your iPhone goes with it.',
    ],
  },
  cta: (
    <>
      A budget you can read in <span className="app-accent">one number.</span>
    </>
  ),
  devlog: { href: '/devlog/why-coindas', title: 'A budget you can read in one number' },
}

export default function CoindasPage() {
  return <AppLanding app={app} content={content} />
}
