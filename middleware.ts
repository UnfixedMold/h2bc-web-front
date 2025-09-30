import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REGION_COOKIE_OPTIONS } from './lib/constants'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const regionCookie = request.cookies.get('region_id')?.value

  if (!regionCookie) {
    const defaultRegionId = process.env.NEXT_PUBLIC_DEFAULT_REGION_ID!
    response.cookies.set('region_id', defaultRegionId, REGION_COOKIE_OPTIONS)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}