import type { Metadata } from 'next'
import MarigoldDocPage from '@/components/marigold/MarigoldDocPage'
import { DocSection } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/marigold/config'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Marigold: making it your default photo viewer, Open With, RAW files, folder access and keyboard shortcuts.',
  ...pageMeta({ path: '/marigold/support', title: 'Support · Marigold', description: 'Get help with Marigold: making it your default photo viewer, Open With, RAW files, folder access and keyboard shortcuts.' }),
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How do I make Marigold open my photos by default?',
    a: 'Open Marigold and click “Make Default for All Photos”, or choose Marigold → Make Marigold the Default Photo App. You can also do it in Finder: right-click a photo, choose Get Info, pick Marigold under “Open with”, then click Change All. Repeat this for each file type you use, such as .jpg, .heic and your camera’s RAW format.',
  },
  {
    q: 'Can I open a photo with Marigold without making it the default?',
    a: 'Yes. Right-click any photo in Finder and choose Open With → Marigold. If Marigold isn’t listed, open it once from Applications and try again.',
  },
  {
    q: 'Why does Marigold ask to view the folder?',
    a: 'Mac App Store apps can only open the file you double-click. To let you flip through the rest of the folder with the arrow keys, Marigold asks once for that folder and remembers your answer. Choose a parent folder, like Pictures, and Marigold won’t ask again for anything inside it.',
  },
  {
    q: 'Which formats does Marigold open?',
    a: 'JPEG, PNG, HEIC/HEIF, TIFF, GIF (animated), WebP, BMP, AVIF and camera RAW files that your Mac supports, including CR2, CR3, NEF, ARW, DNG, RAF, ORF and RW2. RAW support comes from macOS, so a brand-new camera may need a macOS update first.',
  },
  {
    q: 'What are the keyboard shortcuts?',
    a: '← and → (or Space) move between photos. + and − zoom, 0 fits the photo to the window and 1 shows it at 100%. L and R rotate, F goes full screen and Esc leaves it. T shows or hides the filmstrip. Delete moves the photo to the Trash after asking. Double-click a photo to switch between Fit and 100%.',
  },
  {
    q: 'Does rotating save the photo?',
    a: 'No. Rotating only changes how Marigold shows the photo, so your original file is never altered. Photos taken on a phone already appear the right way up.',
  },
  {
    q: 'I deleted a photo by mistake.',
    a: 'Marigold moves photos to the Trash, never deletes them for good. Open the Trash in the Dock, find the photo and choose Put Back.',
  },
]

export default function MarigoldSupportPage() {
  return (
    <MarigoldDocPage kicker="Marigold · Support" title={<>How can we <span className="text-accent">help?</span></>}>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=Marigold%20support`}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border bg-surface p-6 sm:p-8 transition-colors duration-200 hover:border-accent"
      >
        <div>
          <p className="text-[10px] text-accent tracking-[0.2em] uppercase">Email the developer</p>
          <p className="text-[13px] sm:text-[15px] text-ink mt-3 break-all">{SUPPORT_EMAIL}</p>
        </div>
        <p className="text-[11px] text-muted leading-relaxed sm:max-w-[240px]">
          Bug reports, feature requests or questions. Replies within a few days.
        </p>
      </a>

      <DocSection title="Frequently asked">
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border py-5">
              <summary className="flex justify-between items-center gap-4 list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                <span className="text-[16px] sm:text-[18px] font-bold text-ink tracking-tight">{f.q}</span>
                <span className="text-accent text-[18px] transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </DocSection>

      <DocSection title="Privacy">
        <p>
          Your photos never leave your Mac. Read the full{' '}
          <a href="/marigold/privacy" className="text-accent underline underline-offset-4">privacy policy</a>.
        </p>
      </DocSection>
    </MarigoldDocPage>
  )
}
