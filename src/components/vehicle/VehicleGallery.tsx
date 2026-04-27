'use client'

// ============================================================
// VEHICLE GALLERY
// Role: interactive photo viewer — main image + thumbnail row
// Data: vehicle_images array, sorted by position
// Design: tall main frame, thumbnail row with active indicator,
//         dark placeholder when no images available
// ============================================================

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { getCloudinaryUrl } from '@/lib/cloudinary/config'
import type { VehicleImage } from '@/types/vehicle'

type VehicleGalleryProps = {
  images: VehicleImage[]
}

function resolveUrl(img: VehicleImage, width: number): string {
  return img.cloudinary_id
    ? getCloudinaryUrl(img.cloudinary_id, width)
    : img.url
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
  const sorted = [...images].sort((a, b) => a.position - b.position)
  const [selected, setSelected] = useState<VehicleImage | null>(sorted[0] ?? null)

  /* ── No images — dark placeholder ── */
  if (sorted.length === 0) {
    return (
      <div className="h-[400px] bg-[#111111] flex flex-col items-center justify-center gap-4">
        {/* Car icon */}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="opacity-15">
          <path d="M5 17H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="7.5" cy="17.5" r="2.5" stroke="white" strokeWidth="1.5"/>
          <circle cx="16.5" cy="17.5" r="2.5" stroke="white" strokeWidth="1.5"/>
        </svg>
        <span className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/20">
          Photos à venir
        </span>
      </div>
    )
  }

  return (
    <div>
      {/* ── Main image ── */}
      <div className="relative h-[400px] overflow-hidden bg-[#111111]">
        {selected && (
          <Image
            src={resolveUrl(selected, 1200)}
            alt={selected.alt ?? 'Photo du véhicule'}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1280px) 100vw, 800px"
          />
        )}
      </div>

      {/* ── Thumbnails row — only when multiple images ── */}
      {sorted.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {sorted.map(img => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelected(img)}
              className={cn(
                'relative h-[80px] w-[120px] shrink-0 overflow-hidden',
                'transition-opacity duration-200 outline-none cursor-pointer',
                selected?.id === img.id
                  ? 'border-b-2 border-[#df2531] opacity-100'
                  : 'opacity-50 hover:opacity-80 border-b-2 border-transparent',
              )}
            >
              <Image
                src={resolveUrl(img, 300)}
                alt={img.alt ?? 'Vignette'}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
