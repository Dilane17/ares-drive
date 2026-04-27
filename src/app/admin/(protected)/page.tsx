// src/app/admin/(protected)/page.tsx
// ============================================================
// Admin dashboard — stats overview + recent reservations
// ============================================================

import DashboardStats from '@/components/admin/DashboardStats'
import ReservationTable from '@/components/admin/ReservationTable'
import { getAllReservations, getReservationStats, getVehicleStats } from '@/lib/queries/reservations'

export default async function DashboardPage() {
  const [reservations, reservationStats, vehicleStats] = await Promise.all([
    getAllReservations(),
    getReservationStats(),
    getVehicleStats(),
  ])

  const recentReservations = reservations.slice(0, 10)

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-[#df2531] mb-1">
          Vue d&apos;ensemble
        </p>
        <h1 className="font-[family-name:var(--font-hud)] text-white text-[28px] uppercase tracking-[0.06em]">
          Dashboard
        </h1>
      </div>

      <DashboardStats
        reservationStats={reservationStats}
        vehicleStats={vehicleStats}
      />

      {/* Recent reservations */}
      <div>
        <h2 className="font-[family-name:var(--font-hud)] text-white text-[16px] uppercase tracking-[0.1em] mb-4">
          Réservations récentes
        </h2>
        <ReservationTable reservations={recentReservations} />
      </div>
    </div>
  )
}
