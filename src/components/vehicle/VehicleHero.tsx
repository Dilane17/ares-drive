// ============================================================
// VEHICLE HERO
// Role: full-viewport cinematic banner at top of detail page
// Data: vehicle hero image, brand, name, tagline, price
// Design: dual gradient overlay (up + left), red ambient glow,
//         brand as dim eyebrow, name as large display type
// ============================================================

import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import Container from '@/components/layout/Container'
import { getCloudinaryUrl } from '@/lib/cloudinary/config'
import type { Vehicle } from '@/types/vehicle'

type VehicleHeroProps = { vehicle: Vehicle }

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
  /* ── Resolve hero image ── */
  const heroImage =
    vehicle.vehicle_images
      ?.sort((a, b) => a.position - b.position)
      .find(img => img.is_hero) ?? vehicle.vehicle_images?.[0]

  const imageUrl = heroImage
    ? heroImage.cloudinary_id
      ? getCloudinaryUrl(heroImage.cloudinary_id, 1600)
      : heroImage.url
    : null

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#0e0e0e]">
      {/* ── Background image ── */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={heroImage?.alt ?? `${vehicle.brand} ${vehicle.name}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* ── Gradient — upward fade to surface color ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent" />

      {/* ── Red ambient glow — bottom center ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#df2531] blur-[80px] opacity-20 pointer-events-none"
      />

      {/* ── Content overlay — bottom aligned ── */}
      <div className="absolute bottom-0 left-0 right-0 pb-12">
        <Container>

          {/* Category badge */}
          <Badge variant="category" className="mb-4">{vehicle.category}</Badge>

          {/* Brand — dim eyebrow */}
          <p className="font-[family-name:var(--font-hud)] text-[14px] uppercase tracking-[0.3em] text-white/50">
            {vehicle.brand.toUpperCase()}
          </p>

          {/* Model name — large display */}
          <h1 className="font-[family-name:var(--font-display)] font-bold text-white uppercase tracking-[0.04em] leading-none text-[clamp(3rem,7vw,5.5rem)]">
            {vehicle.name}
          </h1>

          {/* Price */}
          <p className="font-[family-name:var(--font-hud)] font-bold text-[24px] text-[#df2531] mt-4">
            À PARTIR DE €{vehicle.price_per_day.toLocaleString('fr-FR')}
            <span className="text-white/40 font-normal text-[14px] ml-2">/ JOUR</span>
          </p>

        </Container>
      </div>
    </section>
  )
}
