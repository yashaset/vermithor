/** Every app in the lineup. Add a new app here and it appears in the dock, lineup, signup and footer. */
export type AppStatus = 'live' | 'soon' | 'building'

export interface StudioApp {
  slug: string
  name: string
  icon: string
  platforms: string
  category: string
  description: string
  status: AppStatus
  /** App page on this site, if it has one. */
  href?: string
  /** App Store / Play links once live. */
  storeUrl?: string
  supportHref?: string
  privacyHref?: string
  /** Brand colours. accent = button fill (with accentInk text) and accent text on dark; accentLight = accent text on light.
   *  tint / tintLight = the art panel behind screenshots in each theme. */
  tint: string
  tintLight: string
  accent: string
  accentLight: string
  accentInk: string
  screenshots?: { src: string; alt: string }[]
}

export const APPS: StudioApp[] = [
  {
    slug: 'momentum',
    name: 'Momentum',
    icon: '/momentum/icon.png',
    platforms: 'iPhone',
    category: 'Health & Fitness',
    description:
      'The gym log for people who actually lift. One-tap sets, automatic PRs, a muscle map and an alarm that rings even in Silent mode.',
    status: 'soon',
    href: '/momentum',
    supportHref: '/momentum/support',
    privacyHref: '/momentum/privacy',
    tint: '#12200E',
    tintLight: '#E4EDD3',
    accent: '#C9F43B',
    accentLight: '#458005',
    accentInk: '#0A0A0B',
    screenshots: [
      { src: '/momentum/workout.webp', alt: 'Momentum workout screen' },
      { src: '/momentum/home.webp', alt: 'Momentum home screen' },
    ],
  },
  {
    slug: 'sweetheart',
    name: 'Sweetheart',
    icon: '/apps/sweetheart/icon.png',
    platforms: 'iPhone · Android',
    category: 'Education',
    description:
      'Flashcards for memorising German words and phrases, with meanings, examples and spaced repetition. der, die and das are colour-coded, so the articles finally stick.',
    status: 'building',
    tint: '#1A1416',
    tintLight: '#F8E9E7',
    accent: '#FF6B6B',
    accentLight: '#B3261E',
    accentInk: '#1A0606',
  },
]

export const STATUS_LABEL: Record<AppStatus, string> = {
  live: 'On the App Store',
  soon: 'Coming soon',
  building: 'In development',
}
