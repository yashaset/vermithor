import { APPS } from '@/components/studio/apps'
import { POSTS } from '@/components/studio/devlog'

/**
 * Spread onto a <Link> to a product page or devlog post: the sheet opens on click with a placeholder
 * built from these attributes, before the page has loaded. Returns nothing for other URLs.
 */
export function sheetFor(href: string | undefined): Record<string, string> {
  if (!href) return {}
  const app = APPS.find((a) => a.href === href)
  if (app) {
    return {
      'data-sheet': 'app',
      'data-sheet-title': app.name,
      'data-sheet-sub': `${app.platforms} · ${app.category}`,
      'data-sheet-icon': app.icon,
      'data-sheet-accent': app.accent,
    }
  }
  const post = POSTS.find((p) => p.href === href)
  if (post) {
    const postApp = APPS.find((a) => a.slug === post.app)
    return {
      'data-sheet': 'post',
      'data-sheet-title': post.title,
      'data-sheet-sub': `${postApp?.name ?? 'Studio'} · ${post.date}`,
      ...(postApp ? { 'data-sheet-accent': postApp.accent } : {}),
    }
  }
  return {}
}
