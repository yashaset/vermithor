import type { Metadata } from 'next'
import MarigoldDocPage from '@/components/marigold/MarigoldDocPage'
import { DocSection, DocTable } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/marigold/config'
import { pageMeta } from '@/components/seo/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Marigold handles your data: your photos never leave your Mac, and the app collects nothing at all.',
  ...pageMeta({ path: '/marigold/privacy', title: 'Privacy Policy · Marigold', description: 'How Marigold handles your data: your photos never leave your Mac, and the app collects nothing at all.' }),
}

export default function MarigoldPrivacyPage() {
  return (
    <MarigoldDocPage
      kicker="Marigold · Privacy"
      title={<>Privacy <span className="text-accent">Policy</span></>}
      meta="Effective 17 November 2026 · Applies to the Marigold Mac app"
    >
      <div className="border border-border bg-surface p-6 sm:p-8">
        <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-4">The short version</p>
        <ul className="flex flex-col gap-3 text-[12px] sm:text-[13px] leading-relaxed">
          <li>Marigold only shows photos that are already on your Mac. It never uploads, copies or shares them.</li>
          <li>Marigold never connects to the internet. There are no accounts and nothing to sign in to.</li>
          <li>No ads, no analytics, no crash reporting, no tracking. We collect nothing, so there is nothing to sell or share.</li>
          <li>Rotating a photo in Marigold only changes how it is shown. Your original files are never edited.</li>
        </ul>
      </div>

      <DocSection n="1" title="What Marigold stores">
        <p>Marigold keeps a few small settings so it works the way you left it. They stay on your Mac.</p>
        <DocTable
          head={['Data', 'Where it lives', 'Why']}
          rows={[
            ['Window size and position, and whether the filmstrip is shown', 'On your Mac only', 'To reopen the way you left it'],
            ['Folders you have let Marigold view', 'On your Mac only', 'So it can show the other photos in a folder without asking every time'],
            ['Recently opened photos', 'On your Mac only (the File menu and Dock)', 'So you can reopen them quickly'],
            ['Small previews of the photos in the open folder', 'In memory while the app is open', 'To show the filmstrip. They are discarded when you quit'],
          ]}
        />
        <p>
          We never receive any of this. It is kept in Marigold&apos;s private storage on your Mac, which macOS keeps separate from other
          apps.
        </p>
      </DocSection>

      <DocSection n="2" title="Access to your photos">
        <p>
          Marigold runs in Apple&apos;s App Sandbox, so it can only open what you give it. When you open a photo, macOS lets Marigold read
          that one file. To flip through the rest of the folder, Marigold asks once for permission to view the folder. You can choose a
          different folder or say no; Marigold then shows just the photo you opened.
        </p>
        <p>
          Marigold reads photos to display them and nothing else. The only change it ever makes to your files is moving a photo to the
          Trash, and only after you confirm. You can restore it from the Trash.
        </p>
      </DocSection>

      <DocSection n="3" title="What we don't do">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>We do not upload, copy or look at your photos.</li>
          <li>We do not read photo locations, camera details or other metadata for ourselves.</li>
          <li>We do not show ads or use advertising identifiers.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not include analytics or crash-reporting tools.</li>
          <li>We do not sell, rent or trade any data.</li>
        </ul>
        <p>
          If you share crash reports with app developers in System Settings, Apple may pass anonymous crash reports to us under{' '}
          <a href="https://www.apple.com/legal/privacy/" className="text-accent underline underline-offset-4">Apple&apos;s privacy policy</a>.
        </p>
      </DocSection>

      <DocSection n="4" title="Deleting your data">
        <p>
          Drag Marigold from Applications to the Trash. That removes the app and its settings. Your photos are not touched.
        </p>
      </DocSection>

      <DocSection n="5" title="Children">
        <p>Marigold collects no personal information from anyone, including children.</p>
      </DocSection>

      <DocSection n="6" title="Changes to this policy">
        <p>
          If Marigold ever needs to handle data differently, we will update this page and the effective date above before the change
          ships, and mention it in the app&apos;s release notes.
        </p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about privacy? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Marigold%20privacy`} className="text-accent underline underline-offset-4">{SUPPORT_EMAIL}</a>
          {' '}or visit the <a href="/marigold/support" className="text-accent underline underline-offset-4">support page</a>. Marigold is made by
          an independent developer, Yash Rawat.
        </p>
      </DocSection>
    </MarigoldDocPage>
  )
}
