// src/lib/supabase/admin.ts
// ============================================================
// Supabase admin client — service role key
// Bypasses RLS entirely — NEVER expose to the browser
// Use only in server actions and server-side admin queries
// ============================================================

import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
