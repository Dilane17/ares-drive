'use client'

// ============================================================
// VEHICLE SELECTOR
// Role: step 1 of reservation form — pick a vehicle
// Data: available vehicles array
// Design: 2-col grid, thumbnail + info layout,
//         selected = red outline + tinted bg
// ============================================================

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { getCloudinaryUrl } from '@/lib/cloudinary/config'
import type { VehicleCard } from '@/types/vehicle'

type VehicleSelectorProps = {
  vehicles: VehicleCard[]
  selected: string
  onSelect: (vehicle: VehicleCard) => void
}

export default function VehicleSelector({ vehicles, selected, onSelect }: VehicleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {vehicles.map(vehicle => {
        const sortedImages = vehicle.vehicle_images
          ? [...vehicle.vehicle_images].sort((a, b) => a.position - b.position)
          : []

        const hero = sortedImages.find(img => img.is_hero) ?? sortedImages[0]

        const src = hero
          ? hero.cloudinary_id
            ? getCloudinaryUrl(hero.cloudinary_id, 300)
            : hero.url
          : null

        const isSelected = selected === vehicle.slug

        return (
          <button
            key={vehicle.id}
            type="button"
            onClick={() => onSelect(vehicle)}
            aria-pressed={isSelected}
            className={cn(
              'w-full text-left cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#df2531] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]',
              isSelected
                ? 'border border-[#df2531] shadow-[0px_0px_16px_rgba(223,37,49,0.2)]'
                : 'hover:bg-[#1a1a1a] border border-transparent',
            )}
          >
            {/* Flex row: thumbnail + info */}
            <div className="flex gap-4 p-4 items-center">
              {/* ── Thumbnail ── */}
              <div className="relative w-[80px] h-[56px] flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                {src ? (
                  <Image
                    src={src}
                    alt={`${vehicle.brand} ${vehicle.name}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#222222]" />
                )}
              </div>

              {/* ── Info ── */}
              <div>
                <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {vehicle.brand}
                </p>
                <p className="font-[family-name:var(--font-hud)] font-bold text-[14px] uppercase text-white leading-tight">
                  {vehicle.name}
                </p>
                <p className="font-[family-name:var(--font-hud)] font-bold text-[14px] text-[#df2531] mt-0.5">
                  €{vehicle.price_per_day.toLocaleString('fr-FR')}/jr
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
