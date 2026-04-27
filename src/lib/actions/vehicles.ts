// src/lib/actions/vehicles.ts
// ============================================================
// Vehicle CRUD server actions
// Uses admin client (service role) to bypass RLS
// ============================================================

'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { VehicleCategory } from '@/types/vehicle'
import { requireAdmin } from '@/lib/auth/admin'

export interface VehicleInput {
  name:          string
  brand:         string
  category:      VehicleCategory
  tagline:       string
  description:   string
  price_per_day: number
  power_hp:      number | null
  acceleration:  string
  top_speed:     number | null
  transmission:  string
  seats:         number
  is_available:  boolean
  is_featured:   boolean
}

function generateSlug(brand: string, name: string): string {
  return `${brand}-${name}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createVehicle(data: VehicleInput): Promise<{ error?: string }> {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Acces refuse.' }
  }

  const supabase = createAdminClient()
  const slug = generateSlug(data.brand, data.name)

  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .insert({ ...data, slug })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/vehicules')
  redirect(`/admin/vehicules/${vehicle.id}`)
}

export async function updateVehicle(
  id: string,
  data: VehicleInput
): Promise<{ error?: string }> {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Acces refuse.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('vehicles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/vehicules')
  revalidatePath(`/admin/vehicules/${id}`)
  return {}
}

export async function deleteVehicle(id: string): Promise<void> {
  try {
    await requireAdmin()
  } catch {
    redirect('/admin/login')
  }

  const supabase = createAdminClient()

  // Delete images first (foreign key constraint)
  await supabase.from('vehicle_images').delete().eq('vehicle_id', id)
  await supabase.from('vehicles').delete().eq('id', id)

  revalidatePath('/admin/vehicules')
  redirect('/admin/vehicules')
}

export async function addVehicleImage(
  vehicleId: string,
  data: { cloudinaryId: string; url: string; alt?: string; position: number }
): Promise<{ error?: string }> {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Acces refuse.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase.from('vehicle_images').insert({
    vehicle_id:    vehicleId,
    cloudinary_id: data.cloudinaryId,
    url:           data.url,
    alt:           data.alt ?? null,
    position:      data.position,
    is_hero:       data.position === 0,
  })

  if (error) return { error: error.message }

  revalidatePath(`/admin/vehicules/${vehicleId}`)
  return {}
}

export async function deleteVehicleImage(
  imageId: string,
  vehicleId: string
): Promise<{ error?: string }> {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Acces refuse.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('vehicle_images')
    .delete()
    .eq('id', imageId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/vehicules/${vehicleId}`)
  return {}
}
