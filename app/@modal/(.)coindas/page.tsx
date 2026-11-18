import Sheet from '@/components/Sheet'
import CoindasPage from '@/app/coindas/page'

// Opened from inside the site: show the page in a bottom sheet. Direct visits render app/coindas/page.tsx.
export default function CoindasSheet() {
  return (
    <Sheet>
      <CoindasPage />
    </Sheet>
  )
}
