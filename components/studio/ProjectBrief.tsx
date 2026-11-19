'use client'

import { useState } from 'react'
import { CONTACT_EMAIL } from './config'

const TYPES = ['iOS app', 'Web app', 'iOS + web', 'Website', 'Not sure yet']
const BUDGETS = ['Under ₹1L / $1.5k', '₹1–3L / $1.5–4k', '₹3–8L / $4–10k', '₹8L+ / $10k+', 'Let’s discuss']
const TIMELINES = ['ASAP', '1–2 months', '3+ months', 'Ongoing / retainer']

const field = 'w-full rounded-xl bg-bg border border-line px-4 py-3 text-[15px] placeholder:text-faint focus:outline-none focus:border-accent'

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold text-ink2 mb-2.5">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(value === o ? '' : o)}
            className={`px-3.5 py-2 rounded-full border text-[14px] transition-colors ${
              value === o ? 'bg-lime text-onlime border-lime font-semibold' : 'border-line text-muted hover:text-ink'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** Project brief: no backend, it opens the visitor's mail app with the brief filled in. */
export default function ProjectBrief() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [about, setAbout] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const subject = `Project enquiry${type ? `: ${type}` : ''}${name ? ` from ${name}` : ''}`
    const body = [
      `Hi Yash,`,
      ``,
      about.trim() || '(Tell me about the project)',
      ``,
      `Type: ${type || '—'}`,
      `Budget: ${budget || '—'}`,
      `Timeline: ${timeline || '—'}`,
      ``,
      name ? `— ${name}` : '',
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={submit} className="flex-[1_1_480px] min-w-0 flex flex-col gap-6">
      <label className="block">
        <span className="block text-[13px] font-semibold text-ink2 mb-2.5">Your name / company</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Priya, Acme Labs" autoComplete="name" />
      </label>
      <Chips label="What are you building?" options={TYPES} value={type} onChange={setType} />
      <label className="block">
        <span className="block text-[13px] font-semibold text-ink2 mb-2.5">Tell me about it</span>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="What it does, who it's for, and what exists today (designs, a codebase, just an idea)."
        />
      </label>
      <Chips label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
      <Chips label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="px-6 py-3.5 rounded-full bg-lime text-onlime font-bold text-[15px] hover:brightness-95">
          Send brief →
        </button>
        <span className="text-[13px] text-faint">Opens your email app. I reply within 1–2 working days.</span>
      </div>
    </form>
  )
}
