import Sheet from '@/components/Sheet'
import FocusblockPage from '@/app/focusblock/page'

// Opened from inside the site: show the page in a bottom sheet. Direct visits render app/focusblock/page.tsx.
export default function FocusblockSheet() {
  return (
    <Sheet>
      <FocusblockPage />
    </Sheet>
  )
}
