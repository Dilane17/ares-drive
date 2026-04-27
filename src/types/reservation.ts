// src/types/reservation.ts
// ============================================================
// Reservation types — mirrors Supabase database schema
// ============================================================

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'

export interface Reservation {
  id:           string
  vehicle_id:   string | null
  client_name:  string
  client_phone: string
  client_email: string | null
  start_date:   string
  end_date:     string
  message:      string | null
  status:       ReservationStatus
  created_at:   string
  updated_at:   string
  // Joined relation
  vehicles?: {
    name:  string
    brand: string
    slug:  string
  }
}

// Form data type for reservation creation
export interface ReservationFormData {
  vehicle_id:   string
  client_name:  string
  client_phone: string
  client_email: string
  start_date:   string
  end_date:     string
  message:      string
}
