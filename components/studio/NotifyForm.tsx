'use client'

import { useState } from 'react'
import { APPS } from './apps'
import { CONTACT_EMAIL } from './config'

/**
 * Launch-list signup. Until a mailing-list service is connected, submitting opens the visitor's
 * email app with a pre-filled request, so nothing is lost and no backend is needed.
 */
export default function NotifyForm() {
  const upcoming = APPS.filter((a) => a.status !== 'live')
  const [picked, setPicked] = useState<Record<string, boolean>>(
    Object.fromEntries([...upcoming.map((a) => [a.slug, true]), ['anything', true]]),
  )
  const [email, setEmail] = useState('')

  const options = [...upcoming.map((a) => ({ id: a.slug, label: a.name, color: a.accent })), { id: 'anything', label: 'Anything new', color: '#EDEDEF' }]

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const chosen = options.filter((o) => picked[o.id]).map((o) => o.label)
    const subject = encodeURIComponent('Launch list')
    const body = encodeURIComponent(`Please email ${email || 'me'} when these launch: ${chosen.join(', ') || 'anything new'}.`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={submit} className="flex-[1_1_420px] flex flex-col gap-4">
      <fieldset className="flex flex-wrap gap-2.5">
        <legend className="text-[13px] text-muted mb-2.5">Tell me about</legend>
        {options.map((o) => (
          <label key={o.id} className="inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-xl border border-[#2A2A30] text-[14px] cursor-pointer">
            <input
              type="checkbox"
              checked={!!picked[o.id]}
              onChange={(e) => setPicked((p) => ({ ...p, [o.id]: e.target.checked }))}
              className="w-[18px] h-[18px]"
              style={{ accentColor: o.color }}
            />
            {o.label}
          </label>
        ))}
      </fieldset>
      <div className="flex flex-wrap gap-2.5">
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <input
          id="notify-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-[1_1_240px] min-h-[50px] px-[18px] rounded-xl border border-[#2A2A30] bg-bg text-ink text-[15px] placeholder:text-faint"
        />
        <button type="submit" className="min-h-[50px] px-[22px] rounded-xl bg-ink text-bg font-bold text-[15px] transition-transform hover:-translate-y-0.5">
          Join the list
        </button>
      </div>
      <p className="text-[12px] text-faint">Opens your email app with the request ready to send.</p>
    </form>
  )
}
