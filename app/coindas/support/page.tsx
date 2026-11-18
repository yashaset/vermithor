import type { Metadata } from 'next'
import CoindasDocPage from '@/components/coindas/CoindasDocPage'
import { DocSection } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/coindas/config'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Coindas: the daily number, fixed costs, categories, signing in and deleting your account.',
  ...pageMeta({ path: '/coindas/support', title: 'Support · Coindas', description: 'Get help with Coindas: the daily number, fixed costs, categories, signing in and deleting your account.' }),
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How is “safe to spend today” worked out?',
    a: 'Coindas takes your monthly budget, sets aside your fixed costs (rent, EMIs, subscriptions), subtracts what you have already spent, and divides the rest by the days left in the month. Spend less today and tomorrow’s number goes up.',
  },
  {
    q: 'I started in the middle of the month. Is my budget wrong?',
    a: 'No. For your first month Coindas only counts the days from when you started, so your everyday budget is scaled down to fit. Fixed costs are still set aside in full.',
  },
  {
    q: 'What is the difference between fixed and everyday categories?',
    a: 'Fixed costs are the same every month and are reserved up front, so they never eat into your daily number. Everyday categories, like food or travel, are what the daily number is made of. Change a category’s type in Budgets.',
  },
  {
    q: 'What does “how strict” change?',
    a: 'It decides which limit Coindas leads with and warns you about: daily, weekly or monthly. In strict mode it asks before saving an expense that takes you over.',
  },
  {
    q: 'Does Coindas connect to my bank?',
    a: 'No. You add expenses yourself, which takes a couple of taps. Your money data stays on your iPhone.',
  },
  {
    q: 'I got a new iPhone. Where is my data?',
    a: 'Your account comes with you, but your budget and expenses live on your iPhone. Restore your new iPhone from an iCloud or computer backup to bring them across. Sync between devices is planned.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Settings → Delete account. It removes your account and everything on your iPhone. If you used Sign in with Apple, Apple asks you to confirm first.',
  },
]

export default function CoindasSupportPage() {
  return (
    <CoindasDocPage kicker="Coindas · Support" title={<>How can we <span className="text-accent">help?</span></>}>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=Coindas%20support`}
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
          Your money stays on your iPhone. Read the full{' '}
          <a href="/coindas/privacy" className="text-accent underline underline-offset-4">privacy policy</a>.
        </p>
      </DocSection>
    </CoindasDocPage>
  )
}
