import Sheet from '@/components/Sheet'
import MarigoldPage from '@/app/marigold/page'

// Opened from inside the site: show the page in a bottom sheet. Direct visits render app/marigold/page.tsx.
export default function MarigoldSheet() {
  return (
    <Sheet>
      <MarigoldPage />
    </Sheet>
  )
}
