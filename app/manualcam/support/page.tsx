import type { Metadata } from 'next'
import ManualCamDocPage from '@/components/manualcam/ManualCamDocPage'
import { DocSection } from '@/components/momentum/DocPage'
import { SUPPORT_EMAIL } from '@/components/manualcam/config'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with ManualCam: manual exposure, RAW and ProRAW, light trails, focus and permissions.',
}

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How do I take manual control?',
    a: 'Tap ISO, SHUTTER, WB or FOCUS above the mode switcher to open its control, then scroll the dial or drag the slider. Manual values turn yellow. Tap AUTO in the panel to hand one back to the camera, or the round AUTO button by the shutter to reset everything.',
  },
  {
    q: 'Why can’t I set ISO and shutter speed separately on Auto?',
    a: 'iOS only lets apps set ISO and shutter speed manually together. Choosing either one switches exposure to manual. Use the light meter, which shows how far you are from a normal exposure, to balance the two.',
  },
  {
    q: 'Why do RAW photos come out at 12MP?',
    a: 'Standard RAW is the sensor’s raw data, and iOS provides it at 12MP even on 48MP iPhones. For 48MP RAW on a Pro iPhone, choose ProRAW. HEIF and JPEG use the largest size your camera offers.',
  },
  {
    q: 'Why doesn’t the shutter go slower than about 1 second?',
    a: 'That is the longest single exposure iOS allows, and it varies by iPhone and lens. For longer exposures, use Light Trails: it combines frames for 5 to 30 seconds.',
  },
  {
    q: 'How do I get smooth light trails?',
    a: 'Put your iPhone on a tripod or something steady, set the self-timer, and use a shutter of 1/30 or slower so there are no gaps in the trails. A low ISO keeps the sky dark. Tap the shutter again to finish early.',
  },
  {
    q: 'Can I change the aperture?',
    a: 'No. iPhone lenses have a fixed aperture, so no app can change it. Control brightness with shutter speed and ISO, and depth of field by moving closer or switching lenses.',
  },
  {
    q: 'How does manual focus work?',
    a: 'Open FOCUS and slide towards the flower to focus close, or towards the mountain to focus far away. Pinch to zoom in while you fine-tune. On Auto, tap the viewfinder to choose where to focus.',
  },
  {
    q: 'Why does ManualCam ask for the microphone?',
    a: 'Only to record sound in Video mode, and only the first time you switch to it. Photo and Light Trails never use the microphone.',
  },
  {
    q: 'Where are my photos and videos?',
    a: 'In the Photos app. RAW+HEIF shots appear as one photo with the RAW file attached. Tap the thumbnail next to the shutter to open Photos.',
  },
  {
    q: 'I hear no tick when I scroll the dials.',
    a: 'The click follows your silent switch, so it is quiet when your iPhone is on silent. You will still feel the haptic tick.',
  },
]

export default function ManualCamSupportPage() {
  return (
    <ManualCamDocPage kicker="ManualCam · Support" title={<>How can we <span className="text-accent">help?</span></>}>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=ManualCam%20support`}
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
          ManualCam collects no data. Read the full{' '}
          <a href="/manualcam/privacy" className="text-accent underline underline-offset-4">privacy policy</a>.
        </p>
      </DocSection>
    </ManualCamDocPage>
  )
}
