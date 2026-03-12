import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Authentication is handled by the backend on a different origin.
  // Frontend middleware cannot reliably read that cookie in production,
  // so route protection must happen after API verification instead.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

