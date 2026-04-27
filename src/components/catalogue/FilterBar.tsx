'use client'

// ============================================================
// FILTER BAR
// Role: category filter pills for catalogue grid
// Data: counts per category, active filter state
// Design: active = red bg + glow, count shown as "(N)"
// ============================================================

import { cn } from '@/lib/utils/cn'
import type { VehicleCategory } from '@/types/vehicle'

const FILTERS: { label: string; value: VehicleCategory | 'tous' }[] = [
  { label: 'TOUS',      value: 'tous' },
  { label: 'SUPERCAR',  value: 'supercar' },
  { label: 'SUV',       value: 'suv' },
  { label: 'CABRIOLET', value: 'cabriolet' },
  { label: 'BERLINE',   value: 'berline' },
]

type FilterBarProps = {
  onFilter: (category: VehicleCategory | 'tous') => void
  activeFilter: VehicleCategory | 'tous'
  counts: Record<VehicleCategory | 'tous', number>
}

export default function FilterBar({ onFilter, activeFilter, counts }: FilterBarProps) {
  return (
    <div data-testid="filter-bar" className="flex flex-wrap gap-2">
      {FILTERS.map(({ label, value }) => {
        const isActive = activeFilter === value
        const count = counts[value] ?? 0

        return (
          <button
            key={value}
            type="button"
            onClick={() => onFilter(value)}
            className={cn(
              'rounded-none px-5 py-2',
              'font-[family-name:var(--font-hud)] font-bold text-[11px] uppercase tracking-[0.15em]',
              'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#df2531] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]',
              isActive
                ? 'bg-[#df2531] text-white shadow-[0px_0px_12px_rgba(223,37,49,0.4)]'
                : 'bg-[#1a1a1a] text-white/50 hover:text-white',
            )}
          >
            {/* Label + count in format "SUPERCAR (3)" */}
            {label} <span className={cn(isActive ? 'text-white/70' : 'text-white/25')}>({count})</span>
          </button>
        )
      })}
    </div>
  )
}
