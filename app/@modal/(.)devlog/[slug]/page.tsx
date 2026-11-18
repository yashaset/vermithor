import { notFound } from 'next/navigation'
import Sheet from '@/components/Sheet'
import { POSTS } from '@/components/studio/devlog'

// Build every post's sheet ahead of time so <Link> can prefetch it fully, like the product pages.
export function generateStaticParams() {
  return POSTS.flatMap((p) => (p.href?.startsWith('/devlog/') ? [{ slug: p.href.slice('/devlog/'.length) }] : []))
}

// Any devlog post opened from inside the site shows in a bottom sheet; new posts are picked up automatically.
export default async function DevlogSheet({ params }: { params: { slug: string } }) {
  if (!/^[a-z0-9-]+$/.test(params.slug)) notFound()
  const Post = await import(`../../../devlog/${params.slug}/page`).then((m) => m.default as React.ComponentType).catch(() => null)
  if (!Post) notFound()
  return (
    <Sheet>
      <Post />
    </Sheet>
  )
}
