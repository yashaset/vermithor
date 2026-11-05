export type LeadStatus = 'new' | 'contacted' | 'confirmed' | 'lost'
export const LEAD_STATUSES: { id: LeadStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'lost', label: 'Lost' },
]

/** A lead as returned by /api/careways/admin/leads */
export interface AdminLead {
  reference: string
  createdAt: string
  phone: string
  status: LeadStatus
  updatedAt?: string
  offer: { id: string; kind: 'stay' | 'flight' | 'chauffeur'; title: string; dest: string; price: number; unit: string }
  details: {
    name?: string
    date?: string
    endDate?: string
    adults?: number
    children?: number
    rooms?: number
    from?: string
    pickup?: string
    drop?: string
    time?: string
    requests?: string
  }
}

export type View = 'overview' | 'offers' | 'content' | 'envelope' | 'leads'
