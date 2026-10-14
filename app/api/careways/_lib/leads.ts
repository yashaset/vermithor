import crypto from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export type LeadStatus = 'new' | 'contacted' | 'confirmed' | 'lost'
export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'confirmed', 'lost']

export interface Lead {
  reference: string
  createdAt: string
  source: 'careways-demo'
  phone: string // +91XXXXXXXXXX, verified
  offer: { id: string; kind: string; title: string; dest: string; price: number; unit: string }
  details: Record<string, unknown>
  status?: LeadStatus
  updatedAt?: string
}

const LEADS_FILE = () => path.join(process.cwd(), '.data', 'careways-leads.jsonl')

/** Dev store only: reads .data/careways-leads.jsonl (newest first). In production, read from your database/CRM. */
export async function listLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE(), 'utf8')
    const all = raw.split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l) as Lead } catch { return null } })
    // Later lines for the same reference (status updates) win.
    const byRef = new Map<string, Lead>()
    for (const l of all) if (l) byRef.set(l.reference, { ...byRef.get(l.reference), ...l })
    return Array.from(byRef.values()).map((l) => ({ ...l, status: l.status ?? 'new' })).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

/** Dev store only: appends a status change; listLeads() merges it. */
export async function setLeadStatus(reference: string, status: LeadStatus) {
  const lead = (await listLeads()).find((l) => l.reference === reference)
  if (!lead) return null
  const updated = { ...lead, status, updatedAt: new Date().toISOString() }
  await fs.appendFile(LEADS_FILE(), JSON.stringify(updated) + '\n')
  return updated
}

export function newReference() {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const tail = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 4)
  return `CW-${ymd}-${tail}`
}

/**
 * Where leads go:
 * - LEAD_WEBHOOK_URL set → POSTed as JSON (Zapier / Make / Google Apps Script / Slack workflow / your CRM).
 * - Otherwise, outside production → appended to .data/careways-leads.jsonl in the project.
 * Always logged to the server console.
 */
export async function saveLead(lead: Lead) {
  console.info('[careways] new lead', JSON.stringify(lead))

  const url = process.env.LEAD_WEBHOOK_URL
  if (url) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET ? { 'X-Careways-Secret': process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(lead),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Lead webhook failed (${res.status})`)
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    const dir = path.join(process.cwd(), '.data')
    await fs.mkdir(dir, { recursive: true })
    await fs.appendFile(path.join(dir, 'careways-leads.jsonl'), JSON.stringify(lead) + '\n')
    return
  }

  throw new Error('No lead destination configured (set LEAD_WEBHOOK_URL)')
}
