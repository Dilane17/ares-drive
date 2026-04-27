// src/app/admin/(protected)/reservations/page.tsx
// ============================================================
// Reservations management page — full list with status control
// ============================================================

import ReservationTable from '@/components/admin/ReservationTable'
import { getAllReservations } from '@/lib/queries/reservations'

export default async function ReservationsPage() {
  const reservations = await getAllReservations()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-[#df2531] mb-1">
            Gestion
          </p>
          <h1 className="font-[family-name:var(--font-hud)] text-white text-[28px] uppercase tracking-[0.06em]">
            Réservations
          </h1>
        </div>
        <span className="font-[family-name:var(--font-hud)] text-[13px] text-white/40 uppercase tracking-[0.1em]">
          {reservations.length} au total
        </span>
      </div>

      <ReservationTable reservations={reservations} />
    </div>
  )
}
