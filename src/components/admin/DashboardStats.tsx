// ============================================================
// DashboardStats — stat cards for the admin dashboard
// ============================================================

import type { ReservationStats } from '@/lib/queries/reservations'

interface Props {
  reservationStats: ReservationStats
  vehicleStats: { total: number; available: number }
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: number | string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="bg-[#1a1a1a] border border-white/[0.06] p-6">
      <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
        {label}
      </p>
      <p
        className={`font-[family-name:var(--font-hud)] text-[36px] font-bold leading-none ${
          accent ? 'text-[#df2531]' : 'text-white'
        }`}
      >
        {value}
      </p>
      {sub && (
        <p className="font-[family-name:var(--font-hud)] text-[11px] text-white/30 mt-2 uppercase tracking-[0.1em]">
          {sub}
        </p>
      )}
    </div>
  )
}

export default function DashboardStats({ reservationStats, vehicleStats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Réservations"
        value={reservationStats.total}
        sub="au total"
      />
      <StatCard
        label="En attente"
        value={reservationStats.pending}
        sub="à traiter"
        accent={reservationStats.pending > 0}
      />
      <StatCard
        label="Confirmées"
        value={reservationStats.confirmed}
        sub="ce mois"
      />
      <StatCard
        label="Véhicules"
        value={vehicleStats.total}
        sub={`${vehicleStats.available} disponibles`}
      />
    </div>
  )
}
