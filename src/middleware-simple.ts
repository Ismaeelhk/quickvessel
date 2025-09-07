import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Simple middleware that just logs the request
  console.log('Middleware running for:', request.nextUrl.pathname)
  
  // For now, just pass through all requests
  // We'll add authentication back once the basic app is working
  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*', '/admin/:path*', '/auth']
}
