import type { Metadata } from 'next'
import DevlogPost from '@/components/studio/DevlogPost'
import { DocSection } from '@/components/momentum/DocPage'
import UnsplashPhoto from '@/components/studio/UnsplashPhoto'

const URL_PATH = '/devlog/why-marigold'
const TITLE = 'Double-click a photo, then just press →'
const DESCRIPTION =
  'Why I’m building Marigold, a fast photo viewer for Mac: double-click any photo and flip through the whole folder with the arrow keys. JPEG, PNG, HEIC and camera RAW, keyboard-first, and it never uploads a thing.'
const PUBLISHED = '2026-11-17'
const OG_IMAGE = 'https://images.unsplash.com/photo-1777019096423-c3a144845b3f?auto=format&fit=crop&q=70&w=1200&h=630'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} · yash.apps Devlog` },
  description: DESCRIPTION,
  keywords: [
    'Mac photo viewer',
    'image viewer for macOS',
    'fast photo viewer Mac',
    'RAW photo viewer Mac',
    'HEIC viewer Mac',
    'Preview alternative',
    'browse photos with arrow keys Mac',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Film strips, a loupe and camera lenses laid out on a light table' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
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
  mainEntityOfPage: `https://yashrawat.com${URL_PATH}`,
  image: OG_IMAGE,
  about: { '@type': 'SoftwareApplication', name: 'Marigold', operatingSystem: 'macOS', applicationCategory: 'PhotographyApplication' },
}

const link = 'text-accent underline underline-offset-4'
const kbd = 'inline-block min-w-[1.6em] px-1.5 py-[1px] rounded-md border border-line bg-surface text-[0.85em] font-semibold text-center text-ink'

export default function WhyMarigoldPost() {
  return (
    <DevlogPost
      path={URL_PATH}
      kicker="Marigold · Devlog"
      title={<>Double-click a photo, then just <span className="text-accent">press →</span></>}
      meta="17 Nov 2026 · Yash Rawat"
      jsonLd={jsonLd}
    >
      <p className="text-[14px] sm:text-[15px] text-ink2 leading-[1.8]">
        Every time I copied a card of photos onto my Mac, I&apos;d double-click the first one, look at it, and then press the right arrow
        key, and nothing would happen. I wanted to see the <em>next</em> photo, not import a library, not select all and open them as a
        batch. Marigold, the Mac app I&apos;m building now, does exactly that one thing well. It&apos;s coming to the Mac App Store soon.
        Here&apos;s how it works and why.
      </p>

      <UnsplashPhoto
        id="photo-1777019096423-c3a144845b3f"
        alt="Film strips, a loupe and camera lenses laid out on a light table"
        by="Jakub Żerdzicki"
        username="jakubzerdzicki"
        caption="Looking through a shoot should feel like sliding a loupe along a strip of film."
      />

      <DocSection n="1" title="The folder is the album">
        <p>
          Most of my photos don&apos;t live in a library. They live in folders: a trip, a client shoot, a card dump called{' '}
          <em>DCIM-copy-2</em>. When I open a photo from one of them, I almost always want to look at its neighbours too.
        </p>
        <p>
          So in Marigold, the photo you double-click is just the starting point. Press <span className={kbd}>←</span> or{' '}
          <span className={kbd}>→</span> (or <span className={kbd}>Space</span>) and you move through every photo in that folder, in the
          same order Finder shows them. A filmstrip along the bottom shows where you are, and the title bar says &ldquo;3 of 12&rdquo;
          so you always know how much is left.
        </p>
      </DocSection>

      <DocSection n="2" title="Fast enough that you stop noticing it">
        <p>
          A viewer has one job: the next photo should already be there when you ask for it. Marigold decodes the photos on either side of
          the one you&apos;re looking at before you get to them, so flipping through a folder feels instant, even with big files. Holding
          an arrow key down should feel like riffling through prints, not waiting for a spinner.
        </p>
      </DocSection>

      <DocSection n="3" title="JPEG, HEIC, and the RAW files straight off the camera">
        <p>
          Marigold opens JPEG, PNG, HEIC and HEIF, TIFF, animated GIF, WebP, BMP and AVIF, plus the camera RAW formats your Mac
          understands: CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2 and more. RAW support comes from macOS itself, which means Marigold gets
          better whenever Apple adds a new camera, and also that a brand-new camera might need a macOS update first.
        </p>
      </DocSection>

      <UnsplashPhoto
        id="photo-1705475388142-a2700c4caeb5"
        alt="Strings of bright orange and yellow marigold garlands"
        by="Yoav Farhi"
        username="yoavf"
        aspect="aspect-[21/9]"
        caption="The name, and the amber, come from here."
      />

      <DocSection n="4" title="Keyboard first">
        <p>A photo viewer you use a hundred times a day should never make you reach for the mouse. Everything has a key:</p>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>
            <span className={kbd}>+</span> and <span className={kbd}>−</span> zoom, <span className={kbd}>0</span> fits the photo to the
            window and <span className={kbd}>1</span> shows it at 100%. Double-click flips between the two.
          </li>
          <li>
            <span className={kbd}>L</span> and <span className={kbd}>R</span> rotate, <span className={kbd}>F</span> goes full screen
            and <span className={kbd}>Esc</span> comes back.
          </li>
          <li>
            <span className={kbd}>T</span> hides the filmstrip when you want nothing but the photo.
          </li>
          <li>
            <span className={kbd}>Delete</span> moves a bad shot to the Trash, after asking, so culling a shoot is just →, →, Delete, →.
          </li>
        </ul>
      </DocSection>

      <DocSection n="5" title="It never changes your originals">
        <p>
          A viewer shouldn&apos;t be an editor in disguise. Rotating a photo in Marigold only changes how it&apos;s shown; the file on
          disk stays exactly as it was. Photos from your phone already appear the right way up. And Delete never deletes for good: the
          photo goes to the Trash, where Put Back still works.
        </p>
      </DocSection>

      <DocSection n="6" title="Why it asks about the folder, once">
        <p>
          This was the most interesting problem to solve. Apps on the Mac App Store run in a sandbox, and a sandboxed app can only open the
          exact file you double-clicked. Its neighbours are off limits. That&apos;s good for your privacy, and a real puzzle for an app
          whose whole point is the arrow keys.
        </p>
        <p>
          So the first time you open a photo from a new place, Marigold asks for that folder, and remembers your answer. Pick a parent
          folder like Pictures and it won&apos;t ask again for anything inside it. One question, asked once, instead of a permission
          that quietly covers your whole disk.
        </p>
      </DocSection>

      <UnsplashPhoto
        id="photo-1608459266648-6f317872e914"
        alt="A MacBook Pro on a brown wooden table"
        by="Marc Mintel"
        username="mmintel"
        aspect="aspect-[4/3]"
      />

      <DocSection n="7" title="Your photos never leave your Mac">
        <p>
          My rule for every app is no ads, no tracking, no filler, and Marigold is the strictest version of it yet: it never connects to
          the internet at all. There&apos;s no account, no analytics and no crash reporting. It doesn&apos;t upload, copy or read the
          metadata of your photos for itself. It just shows them. The{' '}
          <a href="/marigold/privacy" className={link}>privacy policy</a> is short for a reason.
        </p>
      </DocSection>

      <DocSection n="8" title="What’s next">
        <p>
          I&apos;m using Marigold as my default viewer every day and fixing whatever slows me down. It&apos;s my first Mac app after
          building <a href="/devlog/why-ios" className={link}>iPhone first</a>, and it&apos;s taught me how different the Mac is: windows,
          menus, Finder and the keyboard all matter far more. Next up is polishing the first-launch flow, so making Marigold your default
          photo app is one click.
        </p>
      </DocSection>

      <DocSection title="The short version">
        <p>
          Marigold is a photo viewer that does the obvious thing: double-click a photo, press the arrow keys, see the rest of the folder.
          It opens almost anything, including RAW, never touches your originals and never goes online.
        </p>
        <p>
          <a href="/#app-marigold" className={link}>See Marigold in the lineup →</a>
        </p>
      </DocSection>
    </DevlogPost>
  )
}
