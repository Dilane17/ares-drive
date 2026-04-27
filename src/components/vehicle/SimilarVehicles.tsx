// ============================================================
// SIMILAR VEHICLES
// Role: fetches and displays same-category vehicles at page bottom
// Data: fetches all vehicles server-side, filters by category
// Design: dark surface section, reuses CarCard component
// ============================================================

import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import CarCard from '@/components/catalogue/CarCard'
import { getAllVehicles } from '@/lib/queries/vehicles'
import type { VehicleCategory } from '@/types/vehicle'

type SimilarVehiclesProps = {
  currentSlug: string
  category: VehicleCategory
}

export default async function SimilarVehicles({ currentSlug, category }: SimilarVehiclesProps) {
  /* ── Fetch all, filter by category, exclude current, limit 3 ── */
  const all = await getAllVehicles()
  const similar = all
    .filter(v => v.category === category && v.slug !== currentSlug)
    .slice(0, 3)

  /* Render nothing if no similar vehicles */
  if (similar.length === 0) return null

  return (
    <section className="bg-[#0e0e0e] py-16">
      <Container>

        {/* ── Section header ── */}
        <Heading variant="section-label" as="h2">VOUS AIMEREZ AUSSI</Heading>
        <Heading variant="headline" as="h2" className="mt-4 mb-10">
          Véhicules similaires
        </Heading>

        {/* ── Grid — reuses CarCard for visual consistency ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similar.map(vehicle => (
            <CarCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

      </Container>
    </section>
  )
}
