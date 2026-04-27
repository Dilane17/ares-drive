// ============================================================
// CATALOGUE PAGE
// Role: full fleet listing with category filter
// Data: all vehicles fetched server-side, passed to client grid
// Design: display header with stats row, then CarGrid
// ============================================================

import type { Metadata } from 'next'
import { getAllVehicles } from '@/lib/queries/vehicles'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Telemetry from '@/components/ui/Telemetry'
import CarGrid from '@/components/catalogue/CarGrid'

export const metadata: Metadata = {
  title: 'Catalogue — Ares Drive',
  description: 'Découvrez notre flotte exclusive de supercars, berlines de luxe et SUV premium disponibles à la location à Paris.',
}

export default async function CataloguePage() {
  const vehicles = await getAllVehicles()

  /* ── Per-category counts for stats row ── */
  const count = (cat: string) => vehicles.filter(v => v.category === cat).length

  return (
    <div className="min-h-screen bg-[#131313]">

      {/* ── Page header — pt-[140px] accounts for fixed navbar ── */}
      <section className="bg-[#0e0e0e] pt-[140px] pb-12">
        <Container>
          {/* Eyebrow */}
          <Heading variant="section-label" as="h2">NOS VÉHICULES</Heading>

          {/* Title */}
          <Heading variant="display" as="h1" className="mt-4">
            LA FLOTTE ARES DRIVE
          </Heading>

          {/* Subtitle */}
          <Text italic muted size="md" className="mt-6 max-w-[560px]">
            Une sélection exclusive de supercars, berlines de luxe
            et SUV premium disponibles à la location à Paris.
          </Text>

          {/* ── Stats row ── */}
          <div className="flex flex-wrap gap-8 mt-8">
            <Telemetry label="TOTAL"      value={String(vehicles.length)} />
            <Telemetry label="SUPERCARS"  value={String(count('supercar'))} />
            <Telemetry label="SUV"        value={String(count('suv'))} />
            <Telemetry label="CABRIOLETS" value={String(count('cabriolet'))} />
            <Telemetry label="BERLINES"   value={String(count('berline'))} />
          </div>
        </Container>
      </section>

      {/* ── Vehicle grid ── */}
      <section className="bg-[#131313] py-16">
        <Container>
          <CarGrid vehicles={vehicles} />
        </Container>
      </section>

    </div>
  )
}
