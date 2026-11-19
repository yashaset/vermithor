/**
 * Freelance service landing pages (/work/<slug>). Each targets what clients search for,
 * e.g. "freelance iOS developer India". Add one here and it gets a page, sitemap entry and links.
 */
export interface Service {
  slug: string
  /** Short name for links and cards. */
  name: string
  /** <title> and share title: lead with the search phrase. */
  seoTitle: string
  description: string
  keywords: string[]
  h1: string
  intro: string
  builds: { title: string; body: string }[]
  stack: string[]
  /** Proof: app slugs from apps.ts and/or extra items. */
  proofApps?: string[]
  proofExtra?: { title: string; body: string; href?: string }[]
  faq: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'ios-app-developer',
    name: 'iOS app development',
    seoTitle: 'Freelance iOS App Developer in India (Swift & SwiftUI) · Yash Rawat',
    description:
      'Hire a freelance iOS developer who has shipped his own App Store apps. Native Swift and SwiftUI apps for iPhone and Mac, from design to App Store launch. Based in Delhi, working worldwide.',
    keywords: ['freelance iOS developer', 'hire iOS developer India', 'SwiftUI developer', 'iPhone app developer Delhi', 'freelance Swift developer', 'iOS app development India'],
    h1: 'Freelance iOS app developer',
    intro:
      'I build native iPhone and Mac apps in Swift and SwiftUI, and I’ve shipped my own to the App Store: a gym log, an app blocker and a manual camera. You get someone who knows the whole road, from first screen to App Review.',
    builds: [
      { title: 'New iPhone apps', body: 'From idea or Figma file to a polished SwiftUI app on the App Store, with TestFlight builds along the way.' },
      { title: 'System features', body: 'Widgets, Live Activities and the Dynamic Island, Apple Health, Screen Time, camera and RAW capture: the things a web view can’t do.' },
      { title: 'Mac apps', body: 'Small, fast native macOS tools that feel at home on the Mac.' },
      { title: 'App Store launch', body: 'Screenshots, listing copy, privacy labels, submission and handling App Review feedback.' },
    ],
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'ActivityKit', 'HealthKit', 'AVFoundation', 'Screen Time API', 'TestFlight', 'App Store Connect'],
    proofApps: ['momentum', 'focusblock', 'darkmatter', 'marigold'],
    faq: [
      { q: 'Do you build for Android too?', a: 'I specialise in native iOS. If you need Android as well, I can build the iOS app and a shared web back end, and work alongside an Android developer.' },
      { q: 'Can you publish the app under my Apple developer account?', a: 'Yes. The app, code and App Store listing are yours. I work in your account or transfer everything at handover.' },
      { q: 'How long does an iPhone app take?', a: 'A focused first version usually takes 4–10 weeks, depending on scope. You’ll get a fixed plan and price after a short call.' },
    ],
  },
  {
    slug: 'nextjs-developer',
    name: 'Next.js development',
    seoTitle: 'Freelance Next.js Developer in India (React, TypeScript) · Yash Rawat',
    description:
      'Hire a freelance Next.js developer for fast, SEO-friendly websites and full-stack web apps. App Router, TypeScript, API routes, auth and admin dashboards. Based in Delhi, working worldwide.',
    keywords: ['freelance Next.js developer', 'hire Next.js developer', 'Next.js developer India', 'Next.js SEO', 'full-stack Next.js developer', 'Next.js developer Delhi'],
    h1: 'Freelance Next.js developer',
    intro:
      'I build Next.js sites and apps that load fast, rank well and are easy to keep changing: App Router, TypeScript and Tailwind, with the back end in the same codebase when it makes sense.',
    builds: [
      { title: 'Marketing & product sites', body: 'Fast, accessible pages with per-page metadata, generated share images, sitemaps and structured data built in, like this site.' },
      { title: 'Full-stack MVPs', body: 'Booking flows, phone OTP verification, lead capture and admin dashboards, all in one Next.js app.' },
      { title: 'Migrations & upgrades', body: 'Moving a React or older Next.js project to the App Router, or fixing slow pages and Core Web Vitals.' },
      { title: 'SEO foundations', body: 'Canonical URLs, Open Graph, robots.txt, JSON-LD and a sitemap that updates itself.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Route Handlers', 'Middleware', 'Vercel', 'SEO'],
    proofExtra: [
      { title: 'Careways — travel booking MVP', body: 'Client MVP: search, booking passes, phone OTP and a full admin for offers, content and leads.', href: '/demo/careways' },
      { title: 'yashrawat.com', body: 'This site: Next.js App Router, light and dark themes, bottom-sheet navigation and full SEO set-up.', href: '/' },
      { title: 'I did my SEO using Claude', body: 'How the SEO on this site was set up: metadata, share images, sitemap and structured data.', href: '/devlog/seo-with-claude' },
    ],
    faq: [
      { q: 'Can you work on an existing Next.js codebase?', a: 'Yes. I regularly pick up existing projects for new features, App Router migrations and performance work.' },
      { q: 'Where will it be hosted?', a: 'Usually Vercel, but anywhere that runs Node.js works. It’s deployed to your account so you own it.' },
      { q: 'Will the site be SEO-friendly?', a: 'Yes. Metadata, share images, sitemap, robots.txt and structured data are part of every build, not an extra.' },
    ],
  },
  {
    slug: 'react-developer',
    name: 'React development',
    seoTitle: 'Freelance React Developer in Delhi, India (TypeScript) · Yash Rawat',
    description:
      'Hire a freelance React developer with production experience on interfaces used by 100K+ people a month. React and TypeScript front ends, dashboards and design systems. Remote, from Delhi.',
    keywords: ['freelance React developer', 'hire React developer India', 'React developer Delhi', 'React TypeScript developer', 'remote React developer', 'frontend developer freelance'],
    h1: 'Freelance React developer',
    intro:
      'I build React interfaces for a living: at Wheelseye I work on front ends used by more than 100,000 people a month. Freelance, I bring the same care to dashboards, internal tools and customer-facing apps.',
    builds: [
      { title: 'Dashboards & admin panels', body: 'Data-heavy screens that stay fast and readable: tables, filters, editors and role-based views.' },
      { title: 'Customer-facing apps', body: 'Sign-up and booking flows, forms with proper validation, and pages that work on any phone.' },
      { title: 'Design systems', body: 'Reusable, accessible components with light and dark themes, so new screens are quick to build.' },
      { title: 'Rescue & refactor', body: 'Slow renders, tangled state or no types: I clean it up without stopping feature work.' },
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'CSS Modules', 'REST APIs', 'Accessibility'],
    proofExtra: [
      { title: 'Wheelseye', body: 'Interfaces for 100K+ monthly users in my day job as a front-end developer.' },
      { title: 'Careways admin', body: 'A full React admin for offers, pricing, site content and incoming leads, part of a client MVP.', href: '/demo/careways' },
    ],
    faq: [
      { q: 'Do you only do front end?', a: 'No. I can build the API and admin side too, usually with Next.js, so one person owns the whole feature.' },
      { q: 'Can you join our existing team?', a: 'Yes, on a monthly retainer: I work in your repo, your tickets and your review process.' },
      { q: 'What time zone do you work in?', a: 'IST, from Delhi. That overlaps with European working hours and US mornings.' },
    ],
  },
]
