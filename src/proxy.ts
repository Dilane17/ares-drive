// src/proxy.ts
// ============================================================
// Next.js 16 proxy entry point (formerly middleware.ts)
// Applies session management to all /admin routes
// ============================================================

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const proxyConfig = {
  matcher: [
    '/admin/:path*',
  ],
}
