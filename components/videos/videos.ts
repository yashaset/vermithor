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
  { id: 'Cp2sIlRWvjw' },
  { id: 'HVy4wCL0V7E' },
  { id: 'Mjf2Hfyal8U' },
  { id: 'aEt1fHNwIfo' },
  { id: 'Z0ccNHOmtQw' },
  { id: '36yfSiqwJUQ' },
  { id: 'WDMCUGzwKvc' },
  { id: 'gqUSpbobccs' },
  { id: 'b-i7l6TQa0M' },
  { id: 'ruhVBM2hQm8' },
  { id: '-KWb-O2djUU' },
  { id: 'nod5ccGLSnY' },
]

export const CHANNEL_URL = 'https://www.youtube.com/@yashrawatreact'
