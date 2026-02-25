import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

const contactItems = [
  { label: 'Email', value: 'rawatyash1999@gmail.com', href: 'mailto:rawatyash1999@gmail.com' },
  { label: 'Mobile', value: '+91 99586 25621', href: 'tel:+919958625621' },
  { label: 'LinkedIn', value: 'linkedin.com/in/yashrawat-react', href: 'https://linkedin.com/in/yashrawat-react' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-divider px-4 sm:px-8 md:px-[60px] py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div>
        <SectionLabel>Contact</SectionLabel>
        <Reveal>
          <h2 className="text-[clamp(36px,8vw,72px)] font-extrabold leading-[0.95] tracking-tight">
            Let&apos;s<br />build<br />
            <em className="text-accent not-italic">together.</em>
          </h2>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div className="flex flex-col gap-3 sm:gap-4">
          {contactItems.map((item) => (
            <a key={item.label} href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 border border-border bg-surface text-ink no-underline transition-colors duration-200 hover:border-accent"
            >
              <span className="font-mono text-[9px] sm:text-[10px] text-muted tracking-widest uppercase min-w-[60px] sm:min-w-[72px]">{item.label}</span>
              <span className="font-mono text-[11px] sm:text-[12px] tracking-wide truncate">{item.value}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
