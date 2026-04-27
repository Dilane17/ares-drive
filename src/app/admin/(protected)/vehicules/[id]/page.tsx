// src/app/admin/(protected)/vehicules/[id]/page.tsx
// ============================================================
// Edit vehicle page — form + image gallery
// ============================================================

import Link from 'next/link'
import { notFound } from 'next/navigation'
import VehicleForm from '@/components/admin/VehicleForm'
import ImageUploader from '@/components/admin/ImageUploader'
import { getVehicleById } from '@/lib/queries/vehicles'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditVehiculePage({ params }: Props) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) notFound()

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Page header */}
      <div>
        <Link
          href="/admin/vehicules"
          className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors mb-4 inline-block"
        >
          ← Retour aux véhicules
        </Link>
        <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-[#df2531] mb-1">
          Modifier le véhicule
        </p>
        <h1 className="font-[family-name:var(--font-hud)] text-white text-[28px] uppercase tracking-[0.06em]">
          {vehicle.brand} {vehicle.name}
        </h1>
      </div>

      {/* Vehicle form */}
      <VehicleForm vehicle={vehicle} />

      {/* Image gallery */}
      <div>
        <h2 className="font-[family-name:var(--font-hud)] text-white text-[16px] uppercase tracking-[0.1em] mb-6">
          Photos du véhicule
        </h2>
        <ImageUploader vehicleId={vehicle.id} images={vehicle.vehicle_images ?? []} />
      </div>
    </div>
  )
}
