// Shared by the pass form (client) and the leads API (server), so both apply the same rules.
import { AIRPORTS, BookingDetails, Offer } from './data'

export type TicketErrors = Partial<Record<keyof BookingDetails, string>>

const todayISO = () => new Date().toISOString().slice(0, 10)
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/

/** Minimum fields per offer kind. */
export function validateDetails(o: Offer, d: BookingDetails): TicketErrors {
  const e: TicketErrors = {}
  if (typeof d.name !== 'string' || d.name.trim().length < 2) e.name = 'Enter the name as on the traveller’s ID'
  if (!d.date || !ISO_DATE.test(d.date)) e.date = 'Choose a date'
  else if (d.date < todayISO()) e.date = 'Date is in the past'
  if (!Number.isInteger(d.adults) || d.adults < 1 || d.adults > 9) e.adults = 'At least one adult'
  if (!Number.isInteger(d.children) || d.children < 0 || d.children > 6) e.children = 'Up to 6 children'

  if (o.kind === 'stay') {
    if (!d.endDate || !ISO_DATE.test(d.endDate)) e.endDate = 'Choose a check-out date'
    else if (d.date && d.endDate <= d.date) e.endDate = 'Must be after check-in'
    if (!Number.isInteger(d.rooms) || d.rooms < 1 || d.rooms > 4) e.rooms = '1 to 4 rooms'
  }
  if (o.kind === 'flight') {
    if (!AIRPORTS.some((a) => a.code === d.from)) e.from = 'Choose a departure city'
    else if (d.from === o.route?.to) e.from = 'Departure and arrival are the same'
    if (d.endDate && (!ISO_DATE.test(d.endDate) || (d.date && d.endDate <= d.date))) e.endDate = 'Must be after departure'
  }
  if (o.kind === 'chauffeur') {
    if (typeof d.pickup !== 'string' || d.pickup.trim().length < 3) e.pickup = 'Where should the driver meet you?'
    if (typeof d.drop !== 'string' || d.drop.trim().length < 3) e.drop = 'Where are you going?'
    if (!d.time || !TIME.test(d.time)) e.time = 'Choose a time'
  }
  if (typeof d.requests === 'string' && d.requests.length > 240) e.requests = 'Keep it under 240 characters'
  return e
}

export const nightsBetween = (a: string, z: string) => {
  if (!a || !z) return 0
  const n = Math.round((Date.parse(z) - Date.parse(a)) / 86400000)
  return n > 0 ? n : 0
}
