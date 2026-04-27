// src/app/admin/(protected)/vehicules/nouveau/page.tsx
// ============================================================
// Create new vehicle page
// ============================================================

import Link from 'next/link'
import VehicleForm from '@/components/admin/VehicleForm'

export default function NouveauVehiculePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <Link
          href="/admin/vehicules"
          className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors mb-4 inline-block"
        >
          ← Retour aux véhicules
        </Link>
        <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-[#df2531] mb-1">
          Nouveau véhicule
        </p>
        <h1 className="font-[family-name:var(--font-hud)] text-white text-[28px] uppercase tracking-[0.06em]">
          Créer un véhicule
        </h1>
      </div>

      <VehicleForm />
    </div>
  )
}
