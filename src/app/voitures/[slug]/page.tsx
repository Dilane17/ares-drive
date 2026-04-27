// ============================================================
// VEHICLE DETAIL PAGE
// Role: full vehicle showcase — hero, gallery, specs, booking
// Data: vehicle fetched by slug, all vehicles for similar section
// Design: cinematic hero → 2-col (content | sticky booking card)
//         → similar vehicles strip
// ============================================================

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllVehicles, getVehicleBySlug } from '@/lib/queries/vehicles'
import Container from '@/components/layout/Container'
import VehicleHero from '@/components/vehicle/VehicleHero'
import VehicleGallery from '@/components/vehicle/VehicleGallery'
import VehicleSpecs from '@/components/vehicle/VehicleSpecs'
import VehicleDescription from '@/components/vehicle/VehicleDescription'
import BookingCard from '@/components/vehicle/BookingCard'
import SimilarVehicles from '@/components/vehicle/SimilarVehicles'

interface Props {
  params: Promise<{ slug: string }>
}

/* ── Pre-generate routes for all vehicles at build time ── */
export async function generateStaticParams() {
  const vehicles = await getAllVehicles()
  return vehicles.map(v => ({ slug: v.slug }))
}

/* ── Dynamic metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)
  return {
    title: vehicle
      ? `${vehicle.name} — Ares Drive`
      : 'Véhicule — Ares Drive',
    description: vehicle?.description ?? vehicle?.tagline ?? undefined,
  }
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params
  const vehicle = await getVehicleBySlug(slug)

  /* 404 if slug doesn't exist */
  if (!vehicle) notFound()

  return (
    <div className="min-h-screen bg-[#131313]">

      {/* ── Cinematic hero — extends under transparent navbar ── */}
      <VehicleHero vehicle={vehicle} />

      {/* ── Two-column content layout ── */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 py-16">

          {/* Left column — gallery → specs → description */}
          <div>
            <VehicleGallery images={vehicle.vehicle_images ?? []} />
            <VehicleSpecs vehicle={vehicle} />
            <VehicleDescription vehicle={vehicle} />
          </div>

          {/* Right column — sticky booking card */}
          <div className="relative">
            <div className="lg:sticky lg:top-[108px]">
              <BookingCard vehicle={vehicle} />
            </div>
          </div>

        </div>
      </Container>

      {/* ── Similar vehicles strip ── */}
      <SimilarVehicles currentSlug={vehicle.slug} category={vehicle.category} />

    </div>
  )
}
