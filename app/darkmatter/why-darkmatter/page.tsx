import type { Metadata } from 'next'
import DarkmatterDocPage from '@/components/darkmatter/DarkmatterDocPage'
import { DocSection } from '@/components/momentum/DocPage'
import MoreFromDevlog from '@/components/studio/MoreFromDevlog'
import Figure from '@/components/blog/Figure'
import CodeBlock from '@/components/blog/CodeBlock'

const EXPOSURE_CODE = `
// iOS sets ISO and shutter speed together: there's no call for just one.
try device.lockForConfiguration()
device.setExposureModeCustom(
    duration: CMTime(value: 1, timescale: 30),  // 1/30 s
    iso: 200
) { _ in }
device.unlockForConfiguration()
`

const PRORAW_CODE = `
// ProRAW is a separate RAW format, offered only on Pro iPhones.
photoOutput.isAppleProRAWEnabled = photoOutput.isAppleProRAWSupported

let proRAW = photoOutput.availableRawPhotoPixelFormatTypes
    .first(where: AVCapturePhotoOutput.isAppleProRAWPixelFormat)
`

const URL_PATH = '/darkmatter/why-darkmatter'
const TITLE = 'Why build a manual camera when the iPhone camera is this good?'
const DESCRIPTION =
  'The iPhone camera makes great photos by deciding everything for you. Here is why manual ISO, shutter speed, white balance, focus, RAW and long-exposure light trails still matter, and what Darkmatter does with them.'
const PUBLISHED = '2026-11-12'
const IMAGE = { url: '/apps/darkmatter/trails.webp', alt: 'Car light trails at night captured with Darkmatter' }

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · Darkmatter Devlog` },
  description: DESCRIPTION,
  keywords: [
    'manual camera app iPhone',
    'iPhone RAW camera',
    'ProRAW',
    'long exposure iPhone',
    'light trails iPhone',
    'manual ISO shutter speed iPhone',
    'Darkmatter camera',
  ],
  authors: [{ name: 'Yash Rawat', url: 'https://yashrawat.com' }],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: 'article',
    url: URL_PATH,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'yash.apps',
    publishedTime: PUBLISHED,
    authors: ['Yash Rawat'],
    images: [IMAGE],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  publisher: { '@type': 'Person', name: 'Yash Rawat', url: 'https://yashrawat.com' },
  image: `https://yashrawat.com${IMAGE.url}`,
  mainEntityOfPage: `https://yashrawat.com${URL_PATH}`,
  about: { '@type': 'SoftwareApplication', name: 'Darkmatter', operatingSystem: 'iOS', applicationCategory: 'PhotographyApplication' },
}

export default function WhyDarkmatterPost() {
  return (
    <DarkmatterDocPage
      blog
      kicker="Darkmatter · Devlog"
      title={<>Why build a manual camera when the iPhone camera is <span className="text-accent">this good?</span></>}
      meta="12 Nov 2026 · Yash Rawat"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-[17px] sm:text-[18px] text-ink2 leading-[1.8]">
        It&apos;s a fair question, and the first one I get asked. The iPhone&apos;s own Camera app is one of the best cameras most people
        will ever own. Point it at almost anything and you get a bright, sharp, well-balanced photo. So why would anyone want an app that
        hands all those decisions back to you?
      </p>

      <Figure
        wide
        priority
        src="https://images.unsplash.com/photo-1759588071838-d560be56b2a2"
        alt="Close-up of the three-lens camera array on the back of an iPhone"
        caption="Three lenses, and by default the iPhone decides how every shot through them should look."
        credit={{ name: 'ubeyonroad', username: 'ubeyonroad', photo: 'https://unsplash.com/photos/close-up-of-a-smartphone-camera-lens-array-nAXaHK_b_IM' }}
      />

      <DocSection n="1" title="The Camera app decides for you">
        <p>
          Every time you press the shutter in the Camera app, the iPhone makes dozens of choices: how bright the scene should be, what
          colour the light is, where to focus, how many frames to merge and how hard to sharpen them. Most of the time those choices are
          good. That&apos;s exactly why it&apos;s so popular.
        </p>
        <p>
          But it&apos;s always aiming for the same thing: an evenly lit, &ldquo;correct&rdquo; picture. A street at night gets brightened
          until it looks like dusk. Warm tungsten light gets corrected towards neutral. A moody, dark scene gets lifted out of its mood.
          When the photo you have in mind isn&apos;t the average one, there&apos;s no way to tell the camera so.
        </p>
        <Figure
          src="https://images.unsplash.com/photo-1743369673059-cae28a9a8c9c"
          alt="A single streetlight on a dark, empty street at night"
          aspect="3 / 2"
          caption="A scene like this is meant to be dark. Auto exposure will try to brighten it anyway."
          credit={{ name: 'BehindTheTmuna', username: 'behindthetmuna', photo: 'https://unsplash.com/photos/a-streetlight-illuminates-a-dark-empty-street-at-night-2sXSOLRDPLQ' }}
        />
      </DocSection>

      <DocSection n="2" title="Darkmatter lets you decide">
        <p>
          That&apos;s the whole idea behind Darkmatter. ISO, shutter speed, white balance and focus each get their own control, and the
          camera does exactly what you set. Want the night to stay dark? Drop the ISO. Want the warm light to stay warm? Set the Kelvin
          yourself. Want the foreground sharp and the background soft? Slide focus to where you want it and it stays put.
        </p>
        <Figure
          src="https://images.unsplash.com/photo-1728473577296-309fa0ac619b"
          alt="A bedside lamp glowing warm amber in a dark room"
          aspect="3 / 2"
          caption="Warm lamplight is exactly what auto white balance tries to correct. Set the Kelvin yourself and it stays warm."
          credit={{ name: 'Alexander Voronov', username: 'radiomouse', photo: 'https://unsplash.com/photos/a-lamp-that-is-on-in-a-dark-room-iI4NxWQNWzo' }}
        />
        <p>
          You don&apos;t have to guess, either. A live histogram and light meter show the exposure before you press the shutter, and the
          dials tick at every third of a stop so it feels like turning the rings on a real camera. And if you just want a quick snap, one
          tap on AUTO hands everything back.
        </p>
      </DocSection>

      <DocSection n="3" title="RAW: keep the decisions for later">
        <p>
          A HEIF or JPEG is a finished photo: the colour and contrast are baked in. RAW is the data straight off the sensor, before any of
          that happens, so you can change white balance, recover shadows and pull back highlights in Lightroom or any editor without the
          image falling apart.
        </p>
        <p>
          Darkmatter shoots RAW (DNG), RAW with a HEIF alongside for quick sharing, and Apple ProRAW on Pro iPhones. One honest note:
          iOS gives apps standard RAW at 12MP even on 48MP iPhones, so for full-resolution RAW you&apos;ll want ProRAW.
        </p>
        <CodeBlock code={PRORAW_CODE} />
      </DocSection>

      <DocSection n="4" title="Light trails: the shot the iPhone can't take">
        <p>
          Long exposures are where manual control stops being a nice-to-have. iOS caps a single exposure at around one second, which
          isn&apos;t nearly long enough to turn a road at night into ribbons of light.
        </p>
        <Figure
          wide
          src="https://images.unsplash.com/photo-1647962924881-88c4029bbb9d"
          alt="Long-exposure photo of a motorway at night, with car headlights and tail lights drawn into streaks"
          caption="Trails like these need seconds of exposure, far past what iOS allows in one frame."
          credit={{ name: 'Richard Horne', username: 'richardhorne', photo: 'https://unsplash.com/photos/a-long-exposure-photo-of-a-city-at-night-Lr201W3WbTE' }}
        />
        <p>
          So Light Trails works around it: it combines frames for 5, 10, 15 or 30 seconds, building the image up on screen as you shoot.
          Exposure, focus and colour lock while it captures, so the street stays sharp and only the moving lights streak. Put your iPhone
          on something steady, set the self-timer, and stop whenever it looks right.
        </p>
      </DocSection>

      <DocSection n="5" title="Honest about the limits">
        <p>
          An iPhone isn&apos;t a mirrorless camera, and Darkmatter doesn&apos;t pretend otherwise. The lenses have a fixed aperture, so no
          app can change it. iOS also only lets apps set ISO and shutter speed manually together, so touching one switches both to manual.
          I&apos;d rather tell you that up front than hide it behind a fake aperture dial.
        </p>
        <CodeBlock code={EXPOSURE_CODE} />
      </DocSection>

      <DocSection n="6" title="And it stays out of your way">
        <p>
          A camera sees a lot of your life, so Darkmatter is built to see as little as possible. There&apos;s no account, no server, no
          analytics and no ads. Photos go straight into your Photos library, and the app only has add-only access, so it can save new shots
          but can&apos;t read anything already there. The microphone is used only in Video mode.
        </p>
      </DocSection>

      <DocSection title="So, is it for you?">
        <p>
          If the Camera app already gives you the photos you want, keep using it. It&apos;s brilliant. Darkmatter is for the other shots:
          the dark street you want to stay dark, the warm room you want to stay warm, the traffic you want to turn into light, the photo you
          plan to edit properly later. For those, the camera shouldn&apos;t be making the call. You should.
        </p>
        <p>
          <a href="/darkmatter" className="text-accent underline underline-offset-4">See what Darkmatter can do →</a>
        </p>
      </DocSection>
      <MoreFromDevlog current={URL_PATH} />
    </DarkmatterDocPage>
  )
}
