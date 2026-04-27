'use client'
// ============================================================
// VehicleTable — vehicle list with edit/delete actions
// ============================================================

import Link from 'next/link'
import { useTransition } from 'react'
import { deleteVehicle } from '@/lib/actions/vehicles'
import type { Vehicle } from '@/types/vehicle'

const CATEGORY_LABELS: Record<string, string> = {
  supercar:  'Supercar',
  suv:       'SUV',
  cabriolet: 'Cabriolet',
  berline:   'Berline',
}

function VehicleRow({ vehicle }: { vehicle: Vehicle }) {
  const [isPending, startTransition] = useTransition()
  const heroImage = vehicle.vehicle_images?.[0]

  const handleDelete = () => {
    if (!window.confirm(`Supprimer "${vehicle.brand} ${vehicle.name}" ? Cette action est irréversible.`)) return
    startTransition(() => deleteVehicle(vehicle.id))
  }

  return (
    <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
      {/* Image */}
      <td className="px-4 py-3">
        <div className="w-16 h-12 bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage.url}
              alt={heroImage.alt ?? vehicle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10 text-[18px]">◈</div>
          )}
        </div>
      </td>

      {/* Name */}
      <td className="px-4 py-3">
        <p className="font-[family-name:var(--font-hud)] text-[13px] text-white">
          {vehicle.brand} {vehicle.name}
        </p>
        <p className="font-[family-name:var(--font-hud)] text-[11px] text-white/40 mt-0.5">
          {CATEGORY_LABELS[vehicle.category] ?? vehicle.category}
        </p>
      </td>

      {/* Price */}
      <td className="px-4 py-3 font-[family-name:var(--font-hud)] text-[13px] text-white/70">
        €{vehicle.price_per_day.toLocaleString('fr-FR')} / j
      </td>

      {/* Availability */}
      <td className="px-4 py-3">
        <span
          className={`inline-block px-3 py-1 border text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-hud)] ${
            vehicle.is_available
              ? 'bg-green-500/10 text-green-400 border-green-500/20'
              : 'bg-white/5 text-white/30 border-white/10'
          }`}
        >
          {vehicle.is_available ? 'Disponible' : 'Indisponible'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/vehicules/${vehicle.id}`}
            className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors"
          >
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.15em] text-[#df2531]/50 hover:text-[#df2531] disabled:opacity-30 transition-colors"
          >
            {isPending ? '...' : 'Supprimer'}
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-white/[0.06] p-12 text-center">
        <p className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.1em] text-white/30">
          Aucun véhicule — ajoutez votre première voiture
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#111111] border border-white/[0.06] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.06] bg-[#0d0d0d]">
            {['', 'Véhicule', 'Prix / jour', 'Statut', 'Actions'].map(col => (
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
          {vehicles.map(v => (
            <VehicleRow key={v.id} vehicle={v} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
