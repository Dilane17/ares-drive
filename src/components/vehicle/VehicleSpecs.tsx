// ============================================================
// VEHICLE SPECS
// Role: 4-cell technical data grid
// Data: power_hp, acceleration, top_speed, transmission
// Design: alternating tonal surfaces (no borders), Telemetry
// ============================================================

import Heading from '@/components/ui/Heading'
import Telemetry from '@/components/ui/Telemetry'
import type { Vehicle } from '@/types/vehicle'

type VehicleSpecsProps = { vehicle: Vehicle }

export default function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    { label: 'PUISSANCE',    value: `${vehicle.power_hp ?? '—'} CH` },
    { label: '0-100 KM/H',   value: vehicle.acceleration ?? '—' },
    { label: 'VITESSE MAX',  value: `${vehicle.top_speed ?? '—'} KM/H` },
    { label: 'TRANSMISSION', value: vehicle.transmission ?? '—' },
  ]

  return (
    <div className="mt-12">
      {/* ── Section label ── */}
      <Heading variant="section-label" as="h3">CARACTÉRISTIQUES</Heading>

      {/* ── Alternating tonal cells — no borders, surface shift only ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-6">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={i % 2 === 0 ? 'bg-[#111111] p-6' : 'bg-[#0e0e0e] p-6'}
          >
            <Telemetry label={spec.label} value={spec.value} />
          </div>
        ))}
      </div>
    </div>
  )
}
