// src/app/admin/(protected)/layout.tsx
// ============================================================
// Protected admin layout — verifies session, renders sidebar
// Redirects to /admin/login if no authenticated session
// ============================================================

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { isAdminUser } from '@/lib/auth/is-admin-user'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!isAdminUser(user)) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
