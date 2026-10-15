# Careways demo (`/demo/careways`)

Client pitch / MVP for Careways: exclusive members' rates on **stays, flights and chauffeurs**, each booked on its own.

## Routes

| Route | What it is |
| --- | --- |
| `/demo/careways` | Home: hero search → mixed results (stays, flights, chauffeurs) → Royal Envelope reveal → collections → trust → Royal Circle |
| `/demo/careways/book/[id]` | Offer page → pass form shaped like a **stay voucher / boarding pass / chauffeur ticket** → phone OTP → lead created, pass stamped "Requested" |
| `POST /api/careways/otp/send` | `{ phone }` → sends a 6-digit code |
| `POST /api/careways/otp/verify` | `{ phone, code }` → `{ token }` (valid 15 min) |
| `POST /api/careways/leads` | `{ token, phone, offerId, details }` → `{ reference }` (or `{ offerId, details }` with a remembered number) |
| `GET / DELETE /api/careways/session` | Is a verified number remembered on this browser? / "Not you?" |

**No accounts.** After a phone is verified once, an httpOnly signed cookie (`cw_session`, 30 days) remembers it.
The next booking skips the code and shows "Send request" with the masked number and a "Not you?" link.
It is only set if the visitor allows it in the cookie card (bottom-right, `cw_consent=all`); with "Essential only"
the code is asked every time and any remembered number is cleared. "Cookie settings" in the footer reopens the card.
No tracking cookies are set.

## Admin (`/demo/careways-admin`)

Controls everything the site shows:

- **Offers & pricing**: add, edit, duplicate, delete stays, flights and chauffeurs. Members' and public price,
  "What's included" tags, image (illustration or upload), destination, cabin/route for flights, live/draft.
- **Site content**: hero headline and image, the four collection tiles, the trust section, footer contact details.
- **Royal Envelope**: tonight's sealed offer, its price, closing time and image, with a live preview.
- **Requests**: every verified lead from the booking flow. Status (new / contacted / confirmed / lost), call or
  WhatsApp, copy details, CSV export.

Demo storage: offers, content and the envelope are saved in the browser (localStorage) and the public site reads
them, so edits show on `/demo/careways` straight away in the same browser. Requests come from the server
(`.data/careways-leads.jsonl` in development). For production, replace `components/careways/store.ts` with API
calls to a database and image uploads with object storage; the shapes stay the same.

Protection: `middleware.ts` asks for `CAREWAYS_ADMIN_PASSWORD` (HTTP Basic, any username) on the admin page and
`/api/careways/admin/*`. **For the demo it is open while that variable is unset**, including on Vercel. Set a password
before real leads are stored, since the Requests page shows guests' names and phone numbers.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000/demo/careways
```

With no environment variables set, the OTP is **not** sent by SMS: it is printed in the terminal and shown on the page
(development only), and leads are appended to `.data/careways-leads.jsonl`.

## Environment variables

```bash
# Real SMS via Twilio Verify (recommended for anything public)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_VERIFY_SERVICE_SID=

# Where leads go (Zapier / Make / Google Apps Script / Slack workflow / CRM). Receives the lead JSON.
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=          # optional, sent as X-Careways-Secret

# Signs the short-lived "phone verified" token. Set a long random value in production.
CAREWAYS_SECRET=

# Password for /demo/careways-admin (unset = open, for the demo)
CAREWAYS_ADMIN_PASSWORD=

# Only to try the dev OTP on a production build (code appears in server logs only)
# CAREWAYS_ALLOW_DEV_OTP=1
```

In production, OTP sending is refused unless Twilio is configured (or `CAREWAYS_ALLOW_DEV_OTP=1`), and lead saving
needs `LEAD_WEBHOOK_URL`. The dev OTP store is in memory, so on serverless hosts use Twilio.

## Lead shape

```json
{
  "reference": "CW-261014-4F2A",
  "createdAt": "2026-10-14T15:40:00.000Z",
  "source": "careways-demo",
  "phone": "+919876543210",
  "offer": { "id": "udr-s1", "kind": "stay", "title": "[Partner island palace]", "dest": "Udaipur", "price": 58000, "unit": "per night" },
  "details": { "name": "Aarav Sharma", "date": "2026-10-28", "endDate": "2026-10-31", "adults": 2, "children": 0, "rooms": 1, "requests": "" }
}
```

`details` holds only what that kind needs:
- **stay**: name, check-in, check-out, adults, children, rooms
- **flight**: passenger name, from, depart, optional return, adults, children
- **chauffeur**: name, pickup, drop-off, date, time, passengers

All of them can also carry optional special requests.

## Content

Sample offers, prices and partner names live in `components/careways/data.ts` (bracketed names are placeholders).
Illustrations are in `public/careways/` and can be swapped for photos with the same file names.
