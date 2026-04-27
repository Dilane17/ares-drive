// src/lib/queries/reservations.ts
// ============================================================
// Reservation read queries — used in Server Components
// Uses admin client to bypass RLS
// ============================================================

import { createAdminClient } from '@/lib/supabase/admin'
import type { Reservation } from '@/types/reservation'

export interface ReservationStats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
}

export async function getAllReservations(): Promise<Reservation[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('*, vehicles(name, brand, slug)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Reservation[]
}

export async function getReservationStats(): Promise<ReservationStats> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('status')

  if (error) throw new Error(error.message)

  const rows = data ?? []
  return {
    total:     rows.length,
    pending:   rows.filter(r => r.status === 'pending').length,
    confirmed: rows.filter(r => r.status === 'confirmed').length,
    cancelled: rows.filter(r => r.status === 'cancelled').length,
  }
}

export async function getVehicleStats(): Promise<{ total: number; available: number }> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('is_available')

  if (error) throw new Error(error.message)

  const rows = data ?? []
  return {
    total:     rows.length,
    available: rows.filter(v => v.is_available).length,
  }
}
