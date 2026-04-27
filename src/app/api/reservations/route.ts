// src/app/api/reservations/route.ts
// ============================================================
// POST /api/reservations
// Called from BookingCard and ReservationForm after WhatsApp opens
// 1. Validates required fields
// 2. Inserts reservation in Supabase
// 3. Sends admin email notification via Resend (non-blocking on error)
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendReservationNotification } from '@/lib/email/sendReservationNotification'
import { z } from 'zod'

const reservationSchema = z.object({
  vehicle_id: z.string().uuid(),
  client_name: z.string().trim().min(2).max(120),
  client_phone: z.string().trim().min(6).max(30),
  client_email: z.email().optional().or(z.literal('')),
  start_date: z.iso.datetime(),
  end_date: z.iso.datetime(),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
})

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10
const requestBuckets = new Map<string, number[]>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const history = requestBuckets.get(ip) ?? []
  const inWindow = history.filter((ts) => ts >= windowStart)

  if (inWindow.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestBuckets.set(ip, inWindow)
    return true
  }

  inWindow.push(now)
  requestBuckets.set(ip, inWindow)
  return false
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Trop de requetes. Reessayez plus tard.' },
        { status: 429 }
      )
    }

    const payload = await request.json()
    const parsed = reservationSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Donnees invalides.',
          details: parsed.error.issues.map((issue) => issue.message),
        },
        { status: 422 }
      )
    }

    const body = parsed.data
    const startDate = new Date(body.start_date)
    const endDate = new Date(body.end_date)

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || startDate >= endDate) {
      return NextResponse.json(
        { error: 'La periode de reservation est invalide.' },
        { status: 422 }
      )
    }

    const supabase = await createClient()

    const { data: vehicleForBooking, error: vehicleError } = await supabase
      .from('vehicles')
      .select('id, name, brand, price_per_day, is_available')
      .eq('id', body.vehicle_id)
      .single()

    if (vehicleError || !vehicleForBooking) {
      return NextResponse.json(
        { error: 'Vehicule introuvable.' },
        { status: 422 }
      )
    }

    if (!vehicleForBooking.is_available) {
      return NextResponse.json(
        { error: 'Ce vehicule n est pas disponible pour reservation.' },
        { status: 422 }
      )
    }

    // ── Insert reservation in Supabase ────────────────────
    const { data: reservation, error: dbError } = await supabase
      .from('reservations')
      .insert({
        vehicle_id:   body.vehicle_id,
        client_name:  body.client_name,
        client_phone: body.client_phone,
        client_email: body.client_email || null,
        start_date:   body.start_date,
        end_date:     body.end_date,
        message:      body.message || null,
        status:       'pending',
      })
      .select()
      .single()

    if (dbError || !reservation) {
      console.error('[Supabase] Insert error:', dbError)
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde.' },
        { status: 500 }
      )
    }

    // ── Fetch vehicle details for email subject + body ────
    // ── Send admin email after response — never blocks the client ─
    if (vehicleForBooking) {
      after(async () => {
        await sendReservationNotification({ reservation, vehicle: vehicleForBooking })
      })
    }

    return NextResponse.json(
      { success: true, id: reservation.id },
      { status: 201 }
    )

  } catch (err) {
    console.error('[API] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Erreur inattendue.' },
      { status: 500 }
    )
  }
}
