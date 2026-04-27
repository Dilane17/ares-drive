// src/lib/actions/auth.ts
// ============================================================
// Authentication server actions — login and logout
// Uses the SSR client to properly manage session cookies
// ============================================================

'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { isAdminUser } from '@/lib/auth/is-admin-user'

export async function loginAction(
  email: string,
  password: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) return { error: 'Email ou mot de passe incorrect.' }

  if (!isAdminUser(data.user)) {
    // Si l'utilisateur n'est pas un administrateur, on le déconnecte tout de suite
    await supabase.auth.signOut()
    return { error: "Accès refusé : vous n'avez pas les droits d'administration." }
  }

  // Ne PAS appeler redirect() ici.
  // Quand loginAction est invoqué via handleSubmit (client-side), les cookies
  // de session doivent d'abord être enregistrés par le navigateur avant toute
  // navigation. Si on appelle redirect() côté serveur, le middleware reçoit le
  // GET /admin avant que le browser ait stocké les cookies → redirige vers login.
  // La redirection est donc déléguée au client via router.push().
  return { success: true }
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
