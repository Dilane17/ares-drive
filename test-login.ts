import { createServerClient } from '@supabase/ssr'

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { cookies: { getAll: () => [], setAll: () => {} } }
)

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'ahouandjinougael733@gmail.com',
    password: 'AresDrive2025!@#'
  })
  console.log('Login result:', data.user?.app_metadata, data.user?.user_metadata)
}
test()
