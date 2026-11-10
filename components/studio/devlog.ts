/** Devlog entries. Add `href` once a post is written; entries without one show as "Writing soon". */
export interface Post {
  date: string
  title: string
  app: string // an app slug, or 'studio'
  href?: string
}

export const POSTS: Post[] = [
  { date: '10 Nov 2026', title: 'Blocking apps on iOS: what Screen Time lets you do (and not)', app: 'focusblock' },
  { date: '12 Oct 2026', title: 'Why logging a set felt fiddly, and the fix', app: 'momentum' },
  { date: '12 Oct 2026', title: 'Designing a workout recap for Instagram Stories', app: 'momentum' },
]
