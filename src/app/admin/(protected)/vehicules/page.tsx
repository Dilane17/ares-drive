// src/app/admin/(protected)/vehicules/page.tsx
// ============================================================
// Admin vehicles list page
// ============================================================

import Link from 'next/link'
import VehicleTable from '@/components/admin/VehicleTable'
import { getAllVehicles } from '@/lib/queries/vehicles'

export default async function VehiculesPage() {
  const vehicles = await getAllVehicles()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-[#df2531] mb-1">
            Catalogue
          </p>
          <h1 className="font-[family-name:var(--font-hud)] text-white text-[28px] uppercase tracking-[0.06em]">
            Véhicules
          </h1>
        </div>
        <Link
          href="/admin/vehicules/nouveau"
          className="inline-flex items-center gap-2 bg-[#df2531] text-white font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#c41e28] transition-colors"
        >
          + Ajouter un véhicule
        </Link>
      </div>

      <VehicleTable vehicles={vehicles} />
    </div>
  )
}
