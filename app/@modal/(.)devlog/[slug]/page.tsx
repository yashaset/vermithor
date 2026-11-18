import { notFound } from 'next/navigation'
import Sheet from '@/components/Sheet'

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
