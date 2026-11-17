import type { Metadata } from 'next'
import DevlogPost from '@/components/studio/DevlogPost'
import { DocSection } from '@/components/momentum/DocPage'
import UnsplashPhoto from '@/components/studio/UnsplashPhoto'

const URL_PATH = '/devlog/why-coindas'
const TITLE = 'A budget you can read in one number'
const DESCRIPTION =
  'Why Coindas, an upcoming iPhone budgeting app, turns your monthly budget into a single daily safe-to-spend number: money you don’t spend rolls forward, fixed costs are set aside first, and nothing needs a bank login.'
const PUBLISHED = '2026-11-16'
const OG_IMAGE = 'https://images.unsplash.com/photo-1743385779331-15e7e53c2253?auto=format&fit=crop&q=70&w=1200&h=630'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · yash.apps Devlog` },
  description: DESCRIPTION,
  keywords: [
    'daily budget app',
    'safe to spend',
    'budgeting app India',
    'iPhone budget app',
    'personal finance app rupees',
    'zero-based budgeting alternative',
    'SwiftUI budgeting app',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'An open notebook with pens and a cup of coffee on a wooden table' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
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
  image: OG_IMAGE,
  about: { '@type': 'SoftwareApplication', name: 'Coindas', operatingSystem: 'iOS', applicationCategory: 'FinanceApplication' },
}

const link = 'text-accent underline underline-offset-4'

export default function WhyCoindasPost() {
  return (
    <DevlogPost
      path={URL_PATH}
      kicker="Coindas · Devlog"
      title={<>A budget you can read in <span className="text-accent">one number</span></>}
      meta="16 Nov 2026 · Yash Rawat"
      jsonLd={jsonLd}
    >
      <p className="text-[14px] sm:text-[15px] text-ink2 leading-[1.8]">
        I&apos;ve tried a lot of budgeting apps. They all showed me beautiful charts of where my money went, and I&apos;d still be standing
        outside a restaurant on a Thursday with no idea whether I could afford dinner. Coindas, the app I&apos;m building now, is my answer
        to that one question: <em>how much can I spend today?</em> It&apos;s coming to iPhone soon. Here&apos;s why it works the way it
        does.
      </p>

      <UnsplashPhoto
        id="photo-1743385779331-15e7e53c2253"
        alt="An open notebook with pens and a cup of coffee on a wooden table"
        by="Kelly Sikkema"
        username="kellysikkema"
        caption="Coindas is meant to feel more like a notebook than a spreadsheet."
      />

      <DocSection n="1" title="Most budgets look backwards">
        <p>
          Category totals and pie charts are good at telling you what already happened. By the time Food is in the red, the money is gone.
          What I wanted was something that looks forward: a number I can check in two seconds before I tap Pay, that already accounts for
          everything I&apos;ve spent and everything I still have to pay this month.
        </p>
      </DocSection>

      <DocSection n="2" title="One number, recalculated every morning">
        <p>
          Coindas takes your monthly budget and turns it into a daily <strong>safe to spend</strong> amount. The rule is simple: what&apos;s
          left of the budget, divided by the days left in the month, counting today.
        </p>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Say you set aside ₹36,000 for everyday spending in a 30-day month. Day one, you can spend ₹1,200.</li>
          <li>Spend only ₹800 and the leftover rolls forward: tomorrow&apos;s number nudges up to about ₹1,214.</li>
          <li>Have a big night and spend ₹3,000, and the extra is spread across the rest of the month: tomorrow is about ₹1,138, not zero.</li>
        </ul>
        <p>
          There&apos;s no streak to protect and no &ldquo;you failed today&rdquo;. Underspending is rewarded quietly, and overspending is
          absorbed instead of punished. If you&apos;d rather think in bigger chunks, the same number is there for the week and the month.
        </p>
      </DocSection>

      <UnsplashPhoto
        id="photo-1582181774491-11853e42c076"
        alt="Two ₹20 notes and a ₹50 note laid on a table"
        by="Avinash Kumar"
        username="ashishjha"
        aspect="aspect-[21/9]"
        caption="Small amounts, every day. That’s where a budget is actually won or lost."
      />

      <DocSection n="3" title="Rent shouldn’t ruin a Tuesday">
        <p>
          The first version had a funny bug in its thinking: paying rent made that day look catastrophically over budget, and before rent
          was paid, the daily number looked far too generous. Fixed costs aren&apos;t spending decisions. They&apos;re commitments.
        </p>
        <p>
          So now, when you set up Coindas, it asks what you pay every month no matter what: rent, tuition fees, subscriptions, EMIs. That
          money is set aside first. Your daily number only covers everyday spending, and the fixed costs show up separately as{' '}
          <em>Due</em> or <em>Paid</em>, no progress bars.
        </p>
      </DocSection>

      <DocSection n="4" title="Starting halfway through the month">
        <p>
          I found this one by using the app myself. I set it up on the 16th, entered my monthly budget, and it cheerfully told me I could
          spend twice my usual amount every day, because it was squeezing a whole month&apos;s money into fifteen days. Now Coindas
          remembers when you started and scales your first month&apos;s everyday budget to the days you actually have left. Rent still
          counts in full, because rent doesn&apos;t care when you installed an app.
        </p>
      </DocSection>

      <DocSection n="5" title="A nudge before you spend, not a lecture after">
        <p>
          Adding an expense is a keypad and a grid of categories, each showing what&apos;s left in it. As you type, one line underneath
          tells you what the expense will do: &ldquo;₹380 still safe to spend today&rdquo;, or &ldquo;This puts Shopping ₹600 over
          budget&rdquo;, with a firm haptic warning the moment you cross the line. If you want a harder stop, Strict mode asks you to
          confirm before anything takes a budget over. It never blocks you. It just makes you decide on purpose.
        </p>
      </DocSection>

      <DocSection n="6" title="Calm on purpose">
        <p>
          Money apps tend to look like trading terminals. I wanted Coindas to feel more like a notebook: warm paper, big serif numbers, a
          bit of film grain, one green for &ldquo;fine&rdquo; and one terracotta for &ldquo;over&rdquo;. Red is never used just for
          decoration, so when you see it, it means something. Dark mode keeps the same paper feel, just at night.
        </p>
      </DocSection>

      <UnsplashPhoto
        id="photo-1643148636637-58b3eb95cdad"
        alt="A cup of coffee beside an open notebook on a table"
        by="Priscilla Du Preez"
        username="priscilladupreez"
        aspect="aspect-[4/3]"
      />

      <DocSection n="7" title="Your money stays yours">
        <p>
          My rule for every app is no ads, no tracking, no filler, and Coindas follows it. There&apos;s no bank login and no reading your
          messages. Your budgets and transactions live on your iPhone. You type in what you spend, which, as it turns out, is also the part
          that makes you notice it.
        </p>
      </DocSection>

      <DocSection n="8" title="What’s next">
        <p>
          I&apos;m using Coindas every day right now and fixing whatever annoys me. After that, the plan is a weekly and monthly email
          report that tells you how you actually did, and a mode for couples, so two people can share one budget and see who paid what.
          Like <a href="/devlog/why-ios" className={link}>everything else I build</a>, it&apos;s iPhone first.
        </p>
      </DocSection>

      <DocSection title="The short version">
        <p>
          Coindas turns a monthly budget into one honest number for today. Spend less and tomorrow gets a little more; spend more and the
          rest of the month quietly adjusts. Fixed costs are handled before you ever see the number.
        </p>
        <p>
          <a href="/#app-coindas" className={link}>See Coindas in the lineup →</a>
        </p>
      </DocSection>
    </DevlogPost>
  )
}
