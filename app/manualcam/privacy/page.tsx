import type { Metadata } from 'next'
import ManualCamDocPage from '@/components/manualcam/ManualCamDocPage'
import { DocSection, DocTable } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/manualcam/config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ManualCam handles your data: it collects nothing, and your photos and videos go straight to your own Photos library.',
}

export default function ManualCamPrivacyPage() {
  return (
    <ManualCamDocPage
      kicker="ManualCam · Privacy"
      title={<>Privacy <span className="text-accent">Policy</span></>}
      meta="Effective 10 November 2026 · Applies to the ManualCam iOS app"
    >
      <div className="border border-border bg-surface p-6 sm:p-8">
        <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-4">The short version</p>
        <ul className="flex flex-col gap-3 text-[12px] sm:text-[13px] leading-relaxed">
          <li>ManualCam collects nothing. There is no account, no server, no analytics and no ads.</li>
          <li>Your photos and videos are saved straight to your own Photos library. We never see them.</li>
          <li>ManualCam can only add to your library. It cannot read or browse your existing photos.</li>
          <li>We never sell, share or track anything about you.</li>
        </ul>
      </div>

      <DocSection n="1" title="Permissions ManualCam asks for">
        <p>iOS asks for your permission before ManualCam can use any of these, and you can change your answer at any time in Settings → ManualCam.</p>
        <DocTable
          head={['Permission', 'When it is asked', 'Why']}
          rows={[
            ['Camera', 'The first time you open the app', 'To show the viewfinder and take photos, light trails and videos'],
            ['Microphone', 'Only the first time you switch to Video mode', 'To record sound with your videos. Photo and Light Trails modes never use it'],
            ['Photos (add only)', 'The first time you save a photo or video', 'To save what you shoot to your Photos library'],
          ]}
        />
        <p>
          The Photos permission is add-only: ManualCam can put new photos and videos into your library, but it cannot see, read or change
          anything already there. The small thumbnail by the shutter button comes from the shot you just took, not from your library.
        </p>
      </DocSection>

      <DocSection n="2" title="Your photos and videos">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Photos (HEIF, JPEG, RAW and ProRAW), light trails and videos are processed on your iPhone and saved directly to your Photos library.</li>
          <li>A video is written to a temporary file while it records, then moved into Photos and the temporary file is deleted.</li>
          <li>Light trails are built up in your iPhone&apos;s memory while you shoot and saved as a single image when you finish.</li>
          <li>ManualCam does not add your location to photos or videos.</li>
          <li>
            If you use iCloud Photos, Apple syncs your library under{' '}
            <a href="https://www.apple.com/legal/privacy/" className="text-accent underline underline-offset-4">Apple&apos;s privacy policy</a>.
            ManualCam has no part in that.
          </li>
        </ul>
      </DocSection>

      <DocSection n="3" title="What ManualCam stores">
        <p>
          Nothing that leaves your iPhone. The camera settings you choose (ISO, shutter speed, white balance, focus, format, lens and mode)
          are kept only while the app is open. ManualCam has no servers and makes no network connections.
        </p>
      </DocSection>

      <DocSection n="4" title="What we don't do">
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>We do not collect, store or transmit any personal data, photos, videos or audio.</li>
          <li>We do not show ads or use advertising identifiers.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not include analytics, crash-reporting or any third-party SDKs.</li>
          <li>We do not sell, rent or trade any data.</li>
        </ul>
      </DocSection>

      <DocSection n="5" title="Deleting your data">
        <p>
          Everything you shoot lives in your Photos library, where you can delete it like any other photo or video. Deleting ManualCam removes
          the app and anything it kept on your iPhone, but leaves your saved photos and videos in Photos.
        </p>
      </DocSection>

      <DocSection n="6" title="Children">
        <p>ManualCam is suitable for all ages. It collects no information from anyone, including children.</p>
      </DocSection>

      <DocSection n="7" title="Changes to this policy">
        <p>If we ever change how ManualCam handles data, we will update this page and the effective date above, and note it in the app&apos;s release notes.</p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about your data? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=ManualCam%20privacy`} className="text-accent underline underline-offset-4">{SUPPORT_EMAIL}</a>
          {' '}or visit the <a href="/manualcam/support" className="text-accent underline underline-offset-4">support page</a>. ManualCam is made by an independent developer, Yash Rawat. ProRAW and iCloud are trademarks of Apple Inc.
        </p>
      </DocSection>
    </ManualCamDocPage>
  )
}
