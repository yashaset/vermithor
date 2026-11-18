/**
 * Search titles and descriptions for each app page: used by the app's layout (browser tab, Google)
 * and its page (canonical + sharing tags). Lead with what the app does, in the words people search for.
 */
export const APP_SEO: Record<string, { title: string; description: string }> = {
  momentum: {
    title: 'Momentum — Gym Workout Log for iPhone',
    description:
      'Momentum is a fast strength-training log for iPhone: log sets in seconds, track PRs and estimated 1RM, see every muscle you trained, and wake up to a real gym alarm. No ads, no tracking.',
  },
  focusblock: {
    title: 'FocusBlock — A calm app blocker for iPhone',
    description:
      'FocusBlock keeps distracting apps out of reach during focus sessions and quiet hours. Built on Apple Screen Time. No account, no ads, no tracking.',
  },
  darkmatter: {
    title: 'Darkmatter — A manual camera for iPhone',
    description:
      'Darkmatter gives you full control over ISO, shutter speed, white balance and focus, shoots RAW and ProRAW, and paints light trails. No account, no ads, no tracking.',
  },
  coindas: {
    title: 'Coindas — Know what’s safe to spend today',
    description:
      'Coindas turns one monthly budget into a single daily number. Fixed costs are set aside first, leftovers roll into tomorrow, and no bank login is needed.',
  },
  marigold: {
    title: 'Marigold — A fast photo viewer for Mac',
    description:
      'Marigold opens any photo instantly and lets you flip through the whole folder with the arrow keys. JPEG, PNG, HEIC and camera RAW, with nothing uploaded anywhere.',
  },
}
