// ============================================================
// VEHICLE DESCRIPTION
// Role: editorial copy + manifesto stats block
// Data: vehicle.description + brand/category/seats
// Design: Cardo italic body, red separator, Telemetry grid
// ============================================================

import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Telemetry from '@/components/ui/Telemetry'
import type { Vehicle } from '@/types/vehicle'

type VehicleDescriptionProps = { vehicle: Vehicle }

export default function VehicleDescription({ vehicle }: VehicleDescriptionProps) {
  if (!vehicle.description) return null

  return (
    <div className="mt-12">
      {/* ── Section label ── */}
      <Heading variant="section-label" as="h3">À PROPOS</Heading>

      {/* ── Manifesto headline ── */}
      <Heading variant="headline" as="h2" className="mt-4">
        Le Manifeste de la Précision
      </Heading>

      {/* ── Description — Cardo italic ── */}
      <Text italic muted size="md" className="mt-6 leading-[1.9]">
        {vehicle.description}
      </Text>

      {/* ── Red separator ── */}
      <div className="h-[1px] w-16 bg-[#df2531]/40 my-8" />

      {/* ── Inline stats ── */}
      <div className="flex gap-12">
        <Telemetry label="MARQUE"    value={vehicle.brand.toUpperCase()} />
        <Telemetry label="CATÉGORIE" value={vehicle.category.toUpperCase()} />
        <Telemetry label="PLACES"    value={String(vehicle.seats)} />
      </div>
    </div>
  )
}
