'use client'
// ============================================================
// ReservationTable — list with inline status management
// ============================================================

import { useState, useTransition } from 'react'
import StatusBadge from './StatusBadge'
import { updateReservationStatus } from '@/lib/actions/reservations'
import type { Reservation, ReservationStatus } from '@/types/reservation'

const STATUS_OPTIONS: { value: ReservationStatus; label: string }[] = [
  { value: 'pending',   label: 'En attente' },
  { value: 'confirmed', label: 'Confirmer'  },
  { value: 'cancelled', label: 'Annuler'    },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
  })
}

interface RowProps {
  reservation: Reservation
}

function ReservationRow({ reservation: r }: RowProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleStatusChange = (status: ReservationStatus) => {
    setError(null)
    startTransition(async () => {
      const result = await updateReservationStatus(r.id, status)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
      {/* Client */}
      <td className="px-4 py-4">
        <p className="font-[family-name:var(--font-hud)] text-[13px] text-white">
          {r.client_name}
        </p>
        <p className="font-[family-name:var(--font-hud)] text-[11px] text-white/40 mt-0.5">
          {r.client_phone}
        </p>
      </td>

      {/* Vehicle */}
      <td className="px-4 py-4">
        <p className="font-[family-name:var(--font-hud)] text-[13px] text-white">
          {r.vehicles ? `${r.vehicles.brand} ${r.vehicles.name}` : '—'}
        </p>
      </td>

      {/* Dates */}
      <td className="px-4 py-4 font-[family-name:var(--font-hud)] text-[12px] text-white/60">
        {formatDate(r.start_date)} → {formatDate(r.end_date)}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <StatusBadge status={r.status} />
        {error && (
          <p className="text-[10px] text-[#df2531] mt-1">{error}</p>
        )}
      </td>

      {/* Action */}
      <td className="px-4 py-4">
        <select
          defaultValue={r.status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value as ReservationStatus)}
          className="bg-[#1a1a1a] border border-white/[0.08] text-white/70 text-[11px] font-[family-name:var(--font-hud)] uppercase tracking-[0.1em] px-3 py-2 focus:outline-none focus:border-[#df2531] disabled:opacity-50 transition-colors cursor-pointer"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </td>
    </tr>
  )
}

export default function ReservationTable({ reservations }: { reservations: Reservation[] }) {
  if (reservations.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-white/[0.06] p-12 text-center">
        <p className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.1em] text-white/30">
          Aucune réservation
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#111111] border border-white/[0.06] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.06] bg-[#0d0d0d]">
            {['Client', 'Véhicule', 'Dates', 'Statut', 'Action'].map(col => (
              <th
                key={col}
                className="text-left px-4 py-3 font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/30"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <ReservationRow key={r.id} reservation={r} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
