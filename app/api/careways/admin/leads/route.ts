import { NextResponse } from 'next/server'
import { LEAD_STATUSES, LeadStatus, listLeads, setLeadStatus } from '../../_lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.ts (HTTP Basic auth when CAREWAYS_ADMIN_PASSWORD is set).

export async function GET() {
  const leads = await listLeads()
  return NextResponse.json({
    leads,
    store: process.env.LEAD_WEBHOOK_URL ? 'webhook' : 'file',
  })
}

export async function PATCH(req: Request) {
  const body = (await req.json().catch(() => null)) as { reference?: unknown; status?: unknown } | null
  const reference = typeof body?.reference === 'string' ? body.reference : ''
  const status = LEAD_STATUSES.includes(body?.status as LeadStatus) ? (body!.status as LeadStatus) : null
  if (!reference || !status) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  try {
    const lead = await setLeadStatus(reference, status)
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    return NextResponse.json({ ok: true, lead })
  } catch (e) {
    console.error('[careways] update lead failed', e)
    return NextResponse.json({ error: 'Could not update the lead (the demo store is a local file).' }, { status: 500 })
  }
}
