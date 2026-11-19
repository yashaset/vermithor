import { CONTACT_EMAIL } from './config'

/** Thin arrow mark in the card's corner. */
function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" aria-hidden>
      <path d="M8 22 L22 8 L36 22" />
      <path d="M22 8 L18 34" />
    </svg>
  )
}

// Thin stacked edges under each card, like a pile of real cards.
const lightEdge =
  '0 1px 0 #c9d0d4, 0 2px 0 #dfe4e7, 0 3px 0 #c3cace, 0 4px 0 #dde2e5, 0 5px 0 #bec5c9, 0 30px 50px -18px rgba(0,0,0,0.55)'
const darkEdge = '0 1px 0 #1f2224, 0 2px 0 #0b0c0d, 0 3px 0 #1c1f21, 0 4px 0 #0b0c0d, 0 40px 60px -20px rgba(0,0,0,0.7)'

/**
 * Contact details presented as a pair of printed business cards: the dark back underneath, the light front on top.
 * Same paper colours in both themes, like a physical object on the page. Text is real, selectable text.
 */
export default function BusinessCard() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-[1.38] [perspective:1800px]">
      {/* Back */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[86%] aspect-[1.75] rounded-[6px] overflow-hidden border border-white/[0.07] text-[#c9d0d4] [transform:rotate(-7deg)]"
        style={{ background: '#121415', boxShadow: darkEdge }}
      >
        <div className="absolute inset-0 opacity-60 mix-blend-overlay" style={{ backgroundImage: 'url(/grain-dark.png)' }} />
        <div className="absolute left-[7%] right-[7%] bottom-[10%] flex items-end justify-between gap-3">
          <span className="font-display font-black leading-[0.8] tracking-[-0.05em] text-[clamp(56px,11vw,104px)]">yash</span>
          <span className="pb-[2%] text-[clamp(10px,1.8vw,13px)] leading-tight text-right">
            Freelance
            <br />
            Development
          </span>
        </div>
      </div>

      {/* Front */}
      <div
        className="absolute left-0 top-[4%] w-[86%] aspect-[1.75] rounded-[6px] overflow-hidden text-[#121415] transition-transform duration-500 ease-out [transform:rotate(-2deg)] hover:[transform:rotate(0deg)_translateY(-6px)]"
        style={{ background: 'linear-gradient(160deg, #e9edef 0%, #d9dfe2 100%)', boxShadow: lightEdge }}
      >
        <div className="absolute inset-0 opacity-70 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url(/grain-light.png)' }} />
        <div className="relative h-full p-[7%] grid grid-cols-2 grid-rows-[auto_1fr_auto] gap-x-4">
          <span className="font-display font-black text-[clamp(20px,3.6vw,30px)] tracking-[-0.05em] leading-none">
            yash<span className="text-[#6b7378]">.apps</span>
          </span>
          <Mark className="justify-self-end w-[clamp(22px,4vw,34px)]" />

          <div className="col-span-2 self-center">
            <p className="text-[clamp(15px,2.6vw,21px)] font-semibold tracking-[-0.02em]">Yash Rawat</p>
            <p className="mt-0.5 text-[clamp(9px,1.6vw,12px)] text-[#4a5257]">Freelance Full-Stack Developer · iOS, Next.js, React</p>
          </div>

          <div className="text-[clamp(9px,1.5vw,11.5px)] leading-[1.5]">
            <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:underline underline-offset-2">{CONTACT_EMAIL}</a>
            <a href="/" className="block hover:underline underline-offset-2">yashrawat.com</a>
          </div>
          <p className="text-[clamp(9px,1.5vw,11.5px)] leading-[1.5] text-right text-[#4a5257]">
            Delhi, India
            <br />
            Remote worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
