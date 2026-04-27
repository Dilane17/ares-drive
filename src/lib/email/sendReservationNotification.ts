// src/lib/email/sendReservationNotification.ts
// ============================================================
// Sends admin notification email via Resend
// Called server-side (Route Handler) after reservation is saved
// Email failure is logged but never throws — WhatsApp flow is unaffected
// ============================================================

import { Resend } from 'resend'
import { render } from '@react-email/render'
import ReservationNotification from '@/emails/ReservationNotification'
import type { Reservation } from '@/types/reservation'
import type { Vehicle } from '@/types/vehicle'

const resend = new Resend(process.env.RESEND_API_KEY)

type SendNotificationParams = {
  reservation: Reservation
  vehicle:     Pick<Vehicle, 'name' | 'brand' | 'price_per_day'>
}

export async function sendReservationNotification({
  reservation,
  vehicle,
}: SendNotificationParams): Promise<void> {

  // ── Render React Email component to HTML string ──────────
  const html = await render(
    ReservationNotification({
      vehicleName:   vehicle.name,
      vehicleBrand:  vehicle.brand,
      clientName:    reservation.client_name,
      clientPhone:   reservation.client_phone,
      clientEmail:   reservation.client_email ?? '',
      startDate:     reservation.start_date,
      endDate:       reservation.end_date,
      message:       reservation.message ?? '',
      pricePerDay:   vehicle.price_per_day,
      reservationId: reservation.id,
      createdAt:     reservation.created_at,
    })
  )

  // ── Send via Resend ───────────────────────────────────────
  const { error } = await resend.emails.send({
    from:    'ARES DRIVE <onboarding@resend.dev>',
    to:      [process.env.ADMIN_EMAIL!],
    subject: `🚗 Nouvelle réservation — ${vehicle.brand} ${vehicle.name}`,
    html,
  })

  if (error) {
    // Log but never throw — email is a safety net, not the main channel
    console.error('[Resend] Failed to send notification:', error)
  }
}
