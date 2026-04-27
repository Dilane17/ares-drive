// src/lib/supabase/middleware.ts
// ============================================================
// Supabase middleware — session management
// Protects all /admin/* routes
// Redirects unauthenticated users to /admin/login
// ============================================================

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isAdminUser } from '@/lib/auth/is-admin-user'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — do not remove this line
  const { data: { user } } = await supabase.auth.getUser()

  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdmin = isAdminUser(user)

  // Redirect to login if accessing protected admin routes without admin role
  if (
    isAdminPath &&
    !isLoginPath &&
    !isAdmin
  ) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if already logged in and visiting /admin/login
  if (
    isAdmin &&
    request.nextUrl.pathname === '/admin/login'
  ) {
    const dashboardUrl = new URL('/admin', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}
