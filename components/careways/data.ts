// Sample content for the Careways demo. In production this comes from the admin panel / API.
// Careways sells three kinds of exclusive offer, each booked on its own: stays, flights and chauffeurs.

export type Destination = 'Udaipur' | 'Jaipur' | 'Coorg' | 'Goa'
export type Kind = 'stay' | 'flight' | 'chauffeur'

export const KIND_LABEL: Record<Kind, string> = { stay: 'Stay', flight: 'Flight', chauffeur: 'Chauffeur' }

export interface Offer {
  id: string
  kind: Kind
  dest: Destination
  title: string
  /** Area for stays, airline + timing for flights, vehicle class for chauffeurs */
  subtitle: string
  perks: string[]
  /** Members' price in INR */
  price: number
  /** Public price, struck through */
  was: number
  unit: string
  image: string
  /** Flights only */
  route?: { from: string; to: string; cabin: Cabin }
}

export type Cabin = 'Economy' | 'Business' | 'First' | 'Private jet'

export const DESTINATIONS: { id: Destination; label: string; region: string; airport: string }[] = [
  { id: 'Udaipur', label: 'Udaipur', region: 'Rajasthan', airport: 'UDR' },
  { id: 'Jaipur', label: 'Jaipur', region: 'Rajasthan', airport: 'JAI' },
  { id: 'Coorg', label: 'Coorg', region: 'Karnataka', airport: 'IXE' },
  { id: 'Goa', label: 'Goa', region: 'Goa', airport: 'GOX' },
]

export const ART = {
  hero: '/careways/hero.svg',
  lake: '/careways/lakepalace.svg',
  suite: '/careways/suite.svg',
  pool: '/careways/poolvilla.svg',
  haveli: '/careways/haveli.svg',
  fort: '/careways/fort.svg',
  coast: '/careways/coast.svg',
  hills: '/careways/hills.svg',
  pink: '/careways/pinkpalace.svg',
  jet: '/careways/jet.svg',
  car: '/careways/car.svg',
} as const

const stay = (id: string, dest: Destination, title: string, subtitle: string, perks: string[], price: number, was: number, image: string): Offer =>
  ({ id, kind: 'stay', dest, title, subtitle, perks, price, was, unit: 'per night', image })
const flight = (id: string, dest: Destination, to: string, cabin: Cabin, subtitle: string, perks: string[], price: number, was: number): Offer =>
  ({ id, kind: 'flight', dest, title: `New Delhi → ${dest}`, subtitle, perks, price, was, unit: cabin === 'Private jet' ? 'whole aircraft' : 'per traveller', image: ART.jet, route: { from: 'DEL', to, cabin } })
const car = (id: string, dest: Destination, title: string, subtitle: string, perks: string[], price: number, was: number, unit: string): Offer =>
  ({ id, kind: 'chauffeur', dest, title, subtitle, perks, price, was, unit, image: ART.car })

export const OFFERS: Offer[] = [
  // Udaipur
  stay('udr-s1', 'Udaipur', '[Partner island palace]', 'Lake Pichola · Royal suite', ['Breakfast', 'Butler', 'Boat transfer'], 58000, 95000, ART.lake),
  flight('udr-f1', 'Udaipur', 'UDR', 'First', '[Airline] · 09:30 → 10:55 · non-stop', ['Lounge', 'Priority boarding', '2 bags'], 24500, 38000),
  stay('udr-s2', 'Udaipur', '[Partner palace hotel]', 'Lake Pichola · Lake-view suite', ['Breakfast', 'Late check-out'], 42000, 61000, ART.suite),
  car('udr-c1', 'Udaipur', 'Vintage tourer, full day', 'Chauffeur-guide · 8 hours · city & lakes', ['English-speaking', 'Water & Wi-Fi'], 12500, 18000, 'per day'),
  stay('udr-s3', 'Udaipur', '[Partner wellness retreat]', 'Kodiyat · Spa suite', ['Daily treatment', 'All meals'], 36000, 52000, ART.pool),
  flight('udr-f2', 'Udaipur', 'UDR', 'Private jet', 'Light jet · up to 7 seats · your departure time', ['Private terminal', 'Catering'], 480000, 620000),
  stay('udr-s4', 'Udaipur', '[Partner boutique palace]', 'Gangaur Ghat · Heritage room', ['Rooftop dinner', 'Breakfast'], 21000, 29000, ART.pink),
  car('udr-c2', 'Udaipur', 'Airport transfer, luxury SUV', 'UDR airport ↔ any hotel · up to 4 guests', ['Meet & greet', '4 bags'], 4200, 6000, 'one way'),
  stay('udr-s5', 'Udaipur', '[Partner haveli]', 'Old City · Courtyard room', ['Breakfast', 'Walking tour'], 14500, 19500, ART.haveli),
  flight('udr-f3', 'Udaipur', 'UDR', 'Business', '[Airline] · 14:10 → 15:40 · non-stop', ['Lounge', '2 bags'], 16800, 23000),
  // Jaipur
  stay('jai-s1', 'Jaipur', '[Partner royal palace]', 'Rambagh · Palace suite', ['Breakfast', 'Polo-ground view'], 46000, 72000, ART.pink),
  flight('jai-f1', 'Jaipur', 'JAI', 'Business', '[Airline] · 07:15 → 08:20 · non-stop', ['Lounge', '2 bags'], 14200, 21000),
  stay('jai-s2', 'Jaipur', '[Partner fort hotel]', 'Amer · Fort suite', ['Sunset dinner', 'Breakfast'], 38000, 54000, ART.fort),
  car('jai-c1', 'Jaipur', 'Golden Triangle, 5 days', 'Luxury SUV · Delhi · Agra · Jaipur', ['Driver stays', 'Tolls included'], 62000, 85000, 'per trip'),
  stay('jai-s3', 'Jaipur', '[Partner heritage haveli]', 'Old City · Courtyard suite', ['Breakfast', 'Rooftop'], 18500, 26000, ART.haveli),
  // Coorg
  stay('cog-s1', 'Coorg', '[Partner plantation resort]', 'Madikeri · Pool villa', ['Coffee trail', 'Breakfast'], 34000, 48000, ART.hills),
  flight('cog-f1', 'Coorg', 'IXE', 'Business', '[Airline] · Delhi → Mangaluru · 1 stop', ['Lounge', '2 bags'], 19800, 27500),
  car('cog-c1', 'Coorg', 'Mangaluru airport → Coorg', 'Luxury SUV · 3.5 hours · scenic route', ['Meet & greet', 'Rest stop'], 9800, 13500, 'one way'),
  stay('cog-s2', 'Coorg', '[Partner rainforest lodge]', 'Virajpet · Tree villa', ['All meals', 'Guided walk'], 27000, 36000, ART.pool),
  // Goa
  stay('goa-s1', 'Goa', '[Partner beach resort]', 'South Goa · Sea-view villa', ['Breakfast', 'Private beach'], 32000, 45000, ART.coast),
  flight('goa-f1', 'Goa', 'GOX', 'First', '[Airline] · 10:05 → 12:35 · non-stop', ['Lounge', 'Priority boarding'], 21500, 31000),
  stay('goa-s2', 'Goa', '[Partner Portuguese villa]', 'Assagao · Courtyard suite', ['Pool', 'Breakfast'], 24000, 33000, ART.haveli),
  car('goa-c1', 'Goa', 'North & South Goa, full day', 'Vintage tourer · 10 hours', ['Chauffeur-guide', 'Water'], 11000, 15500, 'per day'),
]

/** The Royal Envelope: a members-only stay, not shown in search results. */
export const ENVELOPE_OFFER: Offer = stay(
  'royal-envelope',
  'Udaipur',
  '[Partner island palace], Udaipur',
  'Lake Pichola · Royal suite',
  ['Breakfast & dinner', 'Butler', 'Boat transfer', 'Spa credit'],
  39000,
  95000,
  ART.suite,
)
export const ENVELOPE = {
  offer: ENVELOPE_OFFER,
  /** Seconds until the offer closes (demo value) */
  closesIn: 5 * 3600 + 59 * 60 + 12,
}

export const COLLECTIONS: { title: string; sub: string; dest: Destination; image: string }[] = [
  { title: 'Palaces of Rajasthan', sub: 'Udaipur · Jaipur', dest: 'Udaipur', image: ART.pink },
  { title: 'Coastal hideaways', sub: 'Goa', dest: 'Goa', image: ART.coast },
  { title: 'Hill retreats', sub: 'Coorg', dest: 'Coorg', image: ART.hills },
  { title: 'Heritage havelis', sub: 'Jaipur', dest: 'Jaipur', image: ART.haveli },
]

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
export const savePct = (o: Offer) => Math.round((1 - o.price / o.was) * 100)

export function findOffer(id: string): Offer | null {
  if (id === ENVELOPE_OFFER.id) return ENVELOPE_OFFER
  return OFFERS.find((o) => o.id === id) ?? null
}
export const ALL_OFFER_IDS = [...OFFERS.map((o) => o.id), ENVELOPE_OFFER.id]
export const destInfo = (d: Destination) => DESTINATIONS.find((x) => x.id === d)!

/** Departure cities offered on the boarding pass. */
export const AIRPORTS: { code: string; city: string }[] = [
  { code: 'DEL', city: 'New Delhi' },
  { code: 'BOM', city: 'Mumbai' },
  { code: 'BLR', city: 'Bengaluru' },
  { code: 'HYD', city: 'Hyderabad' },
  { code: 'MAA', city: 'Chennai' },
  { code: 'CCU', city: 'Kolkata' },
  { code: 'AMD', city: 'Ahmedabad' },
  { code: 'PNQ', city: 'Pune' },
]

/**
 * The minimum a concierge needs to call back with a confirmed booking.
 * One flat shape; which fields are used depends on the offer kind.
 */
export interface BookingDetails {
  name: string
  /** stay: check-in · flight: departure · chauffeur: pickup date */
  date: string
  /** stay: check-out · flight: optional return */
  endDate: string
  adults: number
  children: number
  /** stay */
  rooms: number
  /** flight: departure airport code */
  from: string
  /** chauffeur */
  pickup: string
  drop: string
  time: string
  requests: string
}

export const emptyDetails = (): BookingDetails => ({
  name: '', date: '', endDate: '', adults: 2, children: 0, rooms: 1, from: 'DEL', pickup: '', drop: '', time: '10:00', requests: '',
})

export const INDIAN_MOBILE = /^[6-9]\d{9}$/
