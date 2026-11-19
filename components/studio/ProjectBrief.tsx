'use client'

import { useState } from 'react'
import { CONTACT_EMAIL } from './config'

const TYPES = ['iOS app', 'Web app (Next.js / React)', 'iOS app + web', 'Something else']
const TIMELINES = ['As soon as possible', 'In 1–2 months', 'Later this year', 'Ongoing / retainer']

const field =
  'w-full bg-transparent border-0 border-b border-line px-0 py-3 text-[16px] placeholder:text-faint focus:outline-none focus:ring-0 focus:border-ink transition-colors'
const label = 'block text-[12px] font-semibold tracking-[0.08em] uppercase text-faint'

/** Project enquiry: no backend, it opens the visitor's mail app with the details filled in. */
export default function ProjectBrief() {
  const [name, setName] = useState('')
  const [type, setType] = useState(TYPES[0])
  const [timeline, setTimeline] = useState(TIMELINES[0])
  const [about, setAbout] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const subject = `Project enquiry: ${type}${name ? ` (${name})` : ''}`
    const body = ['Hi Yash,', '', about.trim(), '', `Project: ${type}`, `Timeline: ${timeline}`, '', name ? `${name}` : ''].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={submit} className="grid gap-8 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className={label}>Name / company</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Priya Sharma, Acme" autoComplete="organization" />
      </label>
      <label className="block">
        <span className={label}>Project</span>
        <select value={type} onChange={(e) => setType(e.target.value)} className={`${field} cursor-pointer`}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block">
        <span className={label}>Timeline</span>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={`${field} cursor-pointer`}>
          {TIMELINES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>About the project</span>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          rows={3}
          className={`${field} resize-none`}
          placeholder="What you’re building, who it’s for, and what exists today."
        />
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="px-6 py-3 rounded-full bg-ink text-bg font-semibold text-[15px] hover:opacity-90 transition-opacity">
          Send enquiry
        </button>
        <span className="text-[13px] text-faint">Opens your email app</span>
      </div>
    </form>
  )
}
