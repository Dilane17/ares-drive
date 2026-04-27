'use client'

// ============================================================
// CAR GRID
// Role: manages category filter state, renders filtered vehicles
// Data: all vehicles received from server (catalogue page)
// Design: FilterBar on top, 3-col responsive grid below
// ============================================================

import { useState, useMemo } from 'react'
import FilterBar from './FilterBar'
import CarCard from './CarCard'
import type { VehicleCard, VehicleCategory } from '@/types/vehicle'

type CarGridProps = {
  vehicles: VehicleCard[]
}

export default function CarGrid({ vehicles }: CarGridProps) {
  const [activeFilter, setActiveFilter] = useState<VehicleCategory | 'tous'>('tous')

  /* ── Per-category counts — memoised ── */
  const counts = useMemo(() => {
    const c: Record<VehicleCategory | 'tous', number> = {
      tous:      vehicles.length,
      supercar:  0,
      suv:       0,
      cabriolet: 0,
      berline:   0,
    }
    vehicles.forEach(v => { c[v.category] = (c[v.category] ?? 0) + 1 })
    return c
  }, [vehicles])

  /* ── Filtered list ── */
  const filtered = useMemo(
    () => activeFilter === 'tous'
      ? vehicles
      : vehicles.filter(v => v.category === activeFilter),
    [vehicles, activeFilter],
  )

  return (
    <div data-testid="car-grid">
      {/* ── Category pills ── */}
      <div className="mb-10">
        <FilterBar
          onFilter={setActiveFilter}
          activeFilter={activeFilter}
          counts={counts}
        />
      </div>

      {/* ── Vehicle grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(vehicle => (
            <CarCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-8 h-[1px] bg-[#df2531] mb-6" />
          <p className="font-[family-name:var(--font-body)] italic text-white/40 text-[18px]">
            Aucun véhicule disponible dans cette catégorie.
          </p>
        </div>
      )}
    </div>
  )
}
