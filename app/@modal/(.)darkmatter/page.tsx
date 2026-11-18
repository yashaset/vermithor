import Sheet from '@/components/Sheet'
import DarkmatterPage from '@/app/darkmatter/page'

// Opened from inside the site: show the page in a bottom sheet. Direct visits render app/darkmatter/page.tsx.
export default function DarkmatterSheet() {
  return (
    <Sheet>
      <DarkmatterPage />
    </Sheet>
  )
}
