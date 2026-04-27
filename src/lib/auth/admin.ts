import { createClient } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/auth/is-admin-user'

export async function requireAdmin(): Promise<void> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !isAdminUser(data.user)) {
    throw new Error('FORBIDDEN')
  }
}
