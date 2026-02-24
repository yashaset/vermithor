import SectionLabel from './SectionLabel'
import Reveal from './Reveal'

interface Job {
  company: string
  role: string
  date: string
  items: string[]
}

const jobs: Job[] = [
  {
    company: 'Wheelseye',
    role: 'Software Engineer (UI)',
    date: 'Dec 2021 – Present · Gurgaon, India',
    items: [
      'Owned & scaled the core booking platform (React + Next.js) used by 100K+ monthly operators, including automated bidding and Razorpay payment capture.',
      'Migrated platform to Next.js, improving Lighthouse score 60 → 90. Nginx text compression cut bundle size by 50%.',
      'Built trip management module with real-time updates — milestones, expenses, issues, and payments for fleet owners.',
      'Developed Help Center chatbot supporting FAQs, ticket creation, automated resolution flows, and agent escalation.',
      'Created KYC + Onboarding platform capturing complex documents and verification data.',
      'Built Python Flask microservice using Google Vision API + ArUco markers to auto-reject invalid KYC images, saving ~80% manual effort.',
      'Led TypeScript migration across 150K+ LOC codebase; architected reusable HOC-based modal system with internal store.',
      'Integrated Sentry + New Relic for observability; Firebase + internal event services for user behaviour analytics.',
      'Delivered internal multi-channel comms dashboard (SMS, WhatsApp, IVR, notifications) in Next.js + Tailwind.',
    ],
  },
  {
    company: 'Gazelle Information Technologies',
    role: 'Software Developer Trainee',
    date: 'Jun 2021 – Dec 2021 · Gurgaon, India',
    items: [
      'Built multiple client-facing web applications using ReactJS.',
      'Integrated Firebase Cloud Firestore for real-time data synchronisation.',
      'Deployed applications on Google Cloud Platform (GCP).',
    ],
  },
]

function JobCard({ job, delay }: { job: Job; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative bg-surface border border-border p-10 overflow-hidden transition-colors duration-300 hover:border-[#333] hover:bg-[#141414]">
        {/* accent left bar */}
        <span className="absolute top-0 left-0 w-[3px] h-0 bg-accent transition-all duration-500 group-hover:h-full" />

        <h3 className="text-[22px] font-bold tracking-tight">{job.company}</h3>
        <p className="font-mono text-[11px] text-accent2 mt-1 tracking-wide">{job.role}</p>
        <p className="font-mono text-[10px] text-muted mt-0.5 tracking-wide">{job.date}</p>

        <ul className="mt-6 flex flex-col gap-2.5">
          {job.items.map((item, i) => (
            <li key={i} className="relative font-mono text-[12px] text-[#aaa] leading-relaxed pl-4">
              <span className="absolute left-0 top-[3px] text-accent text-[9px]">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-divider px-[60px] py-20">
      <SectionLabel>Experience</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {jobs.map((job, i) => (
          <JobCard key={job.company} job={job} delay={i * 120} />
        ))}
      </div>
    </section>
  )
}
