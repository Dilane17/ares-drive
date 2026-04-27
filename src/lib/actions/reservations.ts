// src/lib/actions/reservations.ts
// ============================================================
// Reservation server actions — status management
// Uses admin client (service role) to bypass RLS
// ============================================================

'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { ReservationStatus } from '@/types/reservation'
import { requireAdmin } from '@/lib/auth/admin'

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<{ error?: string }> {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Acces refuse.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('reservations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin')
  revalidatePath('/admin/reservations')
  return {}
}
