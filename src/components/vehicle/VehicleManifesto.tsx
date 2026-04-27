// ============================================================
// VEHICLE MANIFESTO — long-form description, Cardo italic
// ============================================================

import type { Vehicle } from '@/types/vehicle'

export default function VehicleManifesto({ vehicle }: { vehicle: Vehicle }) {
  if (!vehicle.description) return null

  return (
    <div>
      <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-[#df2531] mb-8">
        L'Expérience
      </p>
      <p className="font-[family-name:var(--font-body)] italic text-white/65 text-[20px] leading-[1.85]">
        {vehicle.description}
      </p>
    </div>
  )
}
