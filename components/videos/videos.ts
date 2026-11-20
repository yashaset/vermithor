/**
 * Videos from youtube.com/@yashrawatreact shown on the site (/videos). Add a video by adding its ID here;
 * its title, description, date and length are read from YouTube when the site builds (see ./youtube.ts).
 *
 * Optional overrides per video, if YouTube's own text isn't what you want on the site:
 *   slug  — the URL (/videos/<slug>). Pin it once a page is indexed so the URL never changes.
 *   title — a clearer, search-friendly title than the YouTube one.
 *   notes — a short written summary shown above the YouTube description (good for Google).
 *
 * YouTube often blocks the build server, so fill these in too; they win over whatever YouTube returns:
 *   uploadDate  — 'YYYY-MM-DD' (YouTube Studio → Content → Date). Google needs it for video results.
 *   length      — 'mm:ss' or 'h:mm:ss'
 *   description — the video's description, if you want it on the page
 */
export interface VideoEntry {
  id: string
  slug?: string
  title?: string
  notes?: string
  uploadDate?: string
  length?: string
  description?: string
}

export const VIDEOS: VideoEntry[] = [
  {
    id: 'Cp2sIlRWvjw',
    slug: 'react-infinite-scroll-custom-hook',
    title: 'Infinite scrolling in React with a custom hook',
    length: '23:52',
    uploadDate: '2025-01-04',
    notes:
      'Load more items as the user scrolls, without a library: a reusable React custom hook that watches the end of the list and fetches the next page, explained step by step.',
  },
  {
    id: 'aEt1fHNwIfo',
    slug: 'react-todo-app-localstorage',
    title: 'Build a todo app with React and localStorage',
    length: '43:29',
    uploadDate: '2022-08-21',
    notes:
      'A beginner React project from scratch: add, complete and delete tasks with hooks, and save them to localStorage so they are still there after a refresh.',
  },
]

export const CHANNEL_URL = 'https://www.youtube.com/@yashrawatreact'
