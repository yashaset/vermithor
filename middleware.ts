import { NextResponse, type NextRequest } from 'next/server'

/**
 * Protects the Careways demo admin (pages + API) with HTTP Basic auth.
 * - CAREWAYS_ADMIN_PASSWORD set → browser asks for it (any username).
 * - Not set → open (demo). Set a password before sharing real data.
 * Only runs on the matched paths below; the rest of the site is untouched.
 */
export function middleware(req: NextRequest) {
  const password = process.env.CAREWAYS_ADMIN_PASSWORD
  if (!password) return NextResponse.next() // demo: admin open until a password is set
  const header = req.headers.get('authorization') ?? ''
  const [scheme, encoded] = header.split(' ')
  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded)
    const given = decoded.slice(decoded.indexOf(':') + 1)
    if (given === password) return NextResponse.next()
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="careways admin", charset="UTF-8"' },
  })
}

export const config = {
  matcher: ['/demo/careways-admin/:path*', '/api/careways/admin/:path*'],
}
