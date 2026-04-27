// src/lib/queries/vehicles.ts
// ============================================================
// Vehicle read queries — used in Server Components
// Uses admin client to bypass RLS
// ============================================================

import { createAdminClient } from '@/lib/supabase/admin'
import type { Vehicle } from '@/types/vehicle'

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Vehicle[]
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Vehicle
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Vehicle
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('vehicles')
    .select('*, vehicle_images(*)')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) return []
  return (data ?? []) as Vehicle[]
}
