// ============================================================
// CAR CARD
// Role: catalogue grid item linking to vehicle detail page
// Data: VehicleCard (slug, brand, name, images, specs, price)
// Design: dark card, full-bleed image, upward gradient,
//         red price, "DÉCOUVRIR →" hover CTA
// ============================================================

import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Telemetry from '@/components/ui/Telemetry'
import { getCloudinaryUrl } from '@/lib/cloudinary/config'
import type { VehicleCard } from '@/types/vehicle'

type CarCardProps = { vehicle: VehicleCard }

export default function CarCard({ vehicle }: CarCardProps) {
  /* ── Hero image resolution ── */
  const heroImage =
    vehicle.vehicle_images
      ?.sort((a, b) => a.position - b.position)
      .find(img => img.is_hero) ?? vehicle.vehicle_images?.[0]

  const imageUrl = heroImage
    ? heroImage.cloudinary_id
      ? getCloudinaryUrl(heroImage.cloudinary_id, 800)
      : heroImage.url
    : null

  return (
    <Link href={`/voitures/${vehicle.slug}`} data-testid="car-card" className="block group">
      {/* ── Wrapper — hover: lift + diffuse red glow ── */}
      <div className="bg-[#111111] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0px_8px_32px_rgba(223,37,49,0.12)]">

        {/* ── Image area ── */}
        <div className="relative h-[260px] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={heroImage?.alt ?? `${vehicle.brand} ${vehicle.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
              <span className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/15">
                Photo à venir
              </span>
            </div>
          )}

          {/* Upward gradient — fades image into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

          {/* Category badge — top left */}
          <div className="absolute top-4 left-4">
            <Badge variant="category">{vehicle.category.toUpperCase()}</Badge>
          </div>

          {/* Unavailable badge — top right */}
          {!vehicle.is_available && (
            <div className="absolute top-4 right-4">
              <Badge variant="status">INDISPONIBLE</Badge>
            </div>
          )}
        </div>

        {/* ── Content area ── */}
        <div className="p-6">

          {/* Brand — dim label */}
          <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/40">
            {vehicle.brand.toUpperCase()}
          </p>

          {/* Vehicle name */}
          <h3 className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[22px] tracking-[0.04em] leading-tight mt-1">
            {vehicle.name}
          </h3>

          {/* Tagline */}
          {vehicle.tagline && (
            <p className="font-[family-name:var(--font-body)] italic text-[14px] text-white/50 mt-2 leading-relaxed">
              {vehicle.tagline}
            </p>
          )}

          {/* Specs row */}
          <div className="flex gap-4 mt-4">
            {vehicle.power_hp && (
              <Telemetry label="PUISSANCE" value={String(vehicle.power_hp)} unit="CH" />
            )}
            {vehicle.acceleration && (
              <Telemetry label="0–100" value={vehicle.acceleration ?? '—'} />
            )}
          </div>

          {/* Tonal separator — no border, surface shift only */}
          <div className="h-[1px] w-full bg-white/5 my-4" />

          {/* Price + CTA row */}
          <div className="flex justify-between items-center">
            {/* Price */}
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.1em] text-white/40">
                À partir de
              </span>
              <span className="font-[family-name:var(--font-hud)] font-bold text-[24px] text-[#df2531] leading-none">
                €{vehicle.price_per_day.toLocaleString('fr-FR')}
              </span>
              <span className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.1em] text-white/40">
                / jour
              </span>
            </div>

            {/* Arrow CTA */}
            <span className="font-[family-name:var(--font-hud)] font-bold text-[12px] uppercase tracking-[0.15em] text-white group-hover:text-[#df2531] transition-colors duration-200">
              DÉCOUVRIR →
            </span>
          </div>

        </div>
      </div>
    </Link>
  )
}
