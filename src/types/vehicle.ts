// src/types/vehicle.ts
// ============================================================
// Vehicle types — mirrors Supabase database schema
// ============================================================

export type VehicleCategory =
  | 'supercar'
  | 'suv'
  | 'cabriolet'
  | 'berline'

export interface VehicleImage {
  id:            string
  vehicle_id:    string
  cloudinary_id: string
  url:           string
  alt:           string | null
  position:      number
  is_hero:       boolean
  created_at:    string
}

export interface Vehicle {
  id:            string
  slug:          string
  name:          string
  brand:         string
  category:      VehicleCategory
  tagline:       string | null
  description:   string | null
  price_per_day: number
  power_hp:      number | null
  acceleration:  string | null
  top_speed:     number | null
  transmission:  string | null
  seats:         number
  is_available:  boolean
  is_featured:   boolean
  created_at:    string
  updated_at:    string
  // Joined relation — present when queried with vehicle_images
  vehicle_images?: VehicleImage[]
}

// Subset used in cards and lists
export type VehicleCard = Pick<
  Vehicle,
  | 'id'
  | 'slug'
  | 'name'
  | 'brand'
  | 'category'
  | 'tagline'
  | 'price_per_day'
  | 'power_hp'
  | 'acceleration'
  | 'is_available'
  | 'is_featured'
  | 'vehicle_images'
>
