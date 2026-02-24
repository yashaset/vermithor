import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

interface SkillGroup {
  title: string
  pills: string[]
  highlight?: boolean
}

const groups: SkillGroup[] = [
  {
    title: 'Frontend',
    pills: ['React', 'Next.js', 'TypeScript', 'Redux', 'Zustand', 'JavaScript', 'HTML5', 'CSS', 'Tailwind'],
    highlight: true,
  },
  {
    title: 'Backend & Tools',
    pills: ['Node.js', 'Python (Flask)', 'Webpack', 'Firebase', 'Nginx', 'Sentry', 'New Relic', 'GCP', 'Google Vision API'],
  },
  {
    title: 'Concepts',
    pills: ['UI Architecture', 'SSR', 'Performance Opt.', 'State Management', 'Jest', 'RTL', 'Observability', 'Agile'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-divider px-[60px] py-20">
      <SectionLabel>Technical Skills</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 100}>
            <div className="bg-surface border border-border p-9 h-full">
              <p className="font-mono text-[10px] text-accent2 tracking-[0.15em] uppercase mb-6">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.pills.map((pill) => (
                  <span
                    key={pill}
                    className={`font-mono text-[11px] px-3.5 py-1.5 border tracking-wide cursor-default transition-all duration-200 hover:border-accent hover:text-accent ${
                      group.highlight ? 'border-[#333] text-ink' : 'border-border text-ink'
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
