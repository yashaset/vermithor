import Sheet from '@/components/Sheet'
import MomentumPage from '@/app/momentum/page'

// Opened from inside the site: show the page in a bottom sheet. Direct visits render app/momentum/page.tsx.
export default function MomentumSheet() {
  return (
    <Sheet>
      <MomentumPage />
    </Sheet>
  )
}
