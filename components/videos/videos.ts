/**
 * Videos from youtube.com/@yashrawatreact shown on the site (/videos). Add a video by adding its ID here;
 * its title, description, date and length are read from YouTube when the site builds (see ./youtube.ts).
 *
 * Optional overrides per video, if YouTube's own text isn't what you want on the site:
 *   slug  — the URL (/videos/<slug>). Pin it once a page is indexed so the URL never changes.
 *   title — a clearer, search-friendly title than the YouTube one.
 *   notes — a short written summary shown above the YouTube description (good for Google).
 */
export interface VideoEntry {
  id: string
  slug?: string
  title?: string
  notes?: string
}

export const VIDEOS: VideoEntry[] = [
  {
    id: 'Cp2sIlRWvjw',
    slug: 'react-infinite-scroll-custom-hook',
    title: 'Infinite scrolling in React with a custom hook',
    notes:
      'Load more items as the user scrolls, without a library: a reusable React custom hook that watches the end of the list and fetches the next page, explained step by step.',
  },
  {
    id: 'aEt1fHNwIfo',
    slug: 'react-todo-app-localstorage',
    title: 'Build a todo app with React and localStorage',
    notes:
      'A beginner React project from scratch: add, complete and delete tasks with hooks, and save them to localStorage so they are still there after a refresh.',
  },
]

export const CHANNEL_URL = 'https://www.youtube.com/@yashrawatreact'
