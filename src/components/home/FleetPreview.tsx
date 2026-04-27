// ============================================================
// FLEET PREVIEW
// Role: homepage showcase of up to 3 featured vehicles
// Data: getFeaturedVehicles() — fallback to getAllVehicles()[0:3]
//       if fewer than 3 featured exist
// Design: 3-col card grid, hover lift + red glow
// ============================================================

import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { getFeaturedVehicles, getAllVehicles } from '@/lib/queries/vehicles'
import { getCloudinaryUrl } from '@/lib/cloudinary/config'
import type { Vehicle } from '@/types/vehicle'

// ── Individual vehicle card ───────────────────────────────────

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
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
    <Link href={`/voitures/${vehicle.slug}`} className="block group">
      <div className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0px_4px_24px_rgba(223,37,49,0.15)]">
        <Card surface="low" className="p-0 overflow-hidden">

          {/* ── Image — fixed height, full bleed ── */}
          <div className="relative h-[350px] w-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={heroImage?.alt ?? `${vehicle.brand} ${vehicle.name}`}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1616px) 33vw, 540px"
              />
            ) : (
              <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                <span className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.2em] text-white/15">
                  Photo à venir
                </span>
              </div>
            )}
            {/* Gradient fades image into card body */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111]" />
          </div>

          {/* ── Content ── */}
          <div className="p-8 flex flex-col gap-3">
            <Badge variant="category">{vehicle.category.toUpperCase()}</Badge>

            <h3 className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[24px] tracking-[0.05em] leading-tight">
              {vehicle.brand} {vehicle.name}
            </h3>

            {vehicle.tagline && (
              <p className="font-[family-name:var(--font-body)] italic text-[16px] text-white/65 leading-relaxed">
                {vehicle.tagline}
              </p>
            )}

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/[0.06]">
              <span className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.1em] text-white/60">
                À partir de{' '}
                <span className="text-[#df2531] font-bold">
                  €{vehicle.price_per_day.toLocaleString('fr-FR')}
                </span>
                {' '}/jour
              </span>
              <span
                aria-hidden
                className="text-white/40 text-[18px] leading-none group-hover:text-[#df2531] transition-colors duration-200"
              >
                →
              </span>
            </div>
          </div>

        </Card>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────

export default async function FleetPreview() {
  /* ── Prefer featured vehicles; fallback to first 3 if < 3 featured ── */
  let vehicles = await getFeaturedVehicles()
  if (vehicles.length < 3) {
    const all = await getAllVehicles()
    vehicles = all.slice(0, 3)
  }

  if (vehicles.length === 0) return null

  return (
    <div data-testid="fleet-preview">
      <Section surface="base">
        <Container>

          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <Heading variant="headline" as="h2">Notre Sélection</Heading>
            <Button variant="tertiary" href="/catalogue">
              Consulter tout le catalogue →
            </Button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </Container>
      </Section>
    </div>
  )
}
