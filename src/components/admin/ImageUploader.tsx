'use client'
// ============================================================
// ImageUploader — Cloudinary upload widget + image gallery
// Uses unsigned upload preset "ares-drive-vehicles"
// ============================================================

import { useState, useTransition } from 'react'
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { addVehicleImage, deleteVehicleImage } from '@/lib/actions/vehicles'
import type { VehicleImage } from '@/types/vehicle'

interface UploadInfo {
  public_id:  string
  secure_url: string
}

interface ImageUploaderProps {
  vehicleId: string
  images:    VehicleImage[]
}

export default function ImageUploader({ vehicleId, images }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
    setError(null)
    setIsUploading(true)

    const info = result.info as unknown as UploadInfo
    const res = await addVehicleImage(vehicleId, {
      cloudinaryId: info.public_id,
      url:          info.secure_url,
      position:     images.length, // append at end
    })

    if (res?.error) setError(res.error)
    setIsUploading(false)
  }

  const handleDelete = (imageId: string) => {
    if (!window.confirm('Supprimer cette photo ?')) return
    startTransition(async () => {
      const res = await deleteVehicleImage(imageId, vehicleId)
      if (res?.error) setError(res.error)
    })
  }

  return (
    <div className="space-y-6">
      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images
            .sort((a, b) => a.position - b.position)
            .map((img) => (
              <div key={img.id} className="relative group aspect-video bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt ?? ''}
                  className="w-full h-full object-cover"
                />

                {img.is_hero && (
                  <span className="absolute top-2 left-2 bg-[#df2531] text-white font-[family-name:var(--font-hud)] text-[9px] uppercase tracking-[0.2em] px-2 py-1">
                    Hero
                  </span>
                )}

                {/* Delete overlay */}
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={isPending}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.15em] text-white/80 hover:text-[#df2531] transition-colors"
                >
                  Supprimer
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Upload button */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple:   true,
          maxFiles:   10,
          sources:    ['local', 'url'],
          folder:     'ares-drive/vehicles',
        }}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={isUploading || isPending}
            className="flex items-center gap-3 bg-[#1a1a1a] border border-dashed border-white/[0.15] text-white/50 font-[family-name:var(--font-hud)] text-[12px] uppercase tracking-[0.2em] px-6 py-4 hover:border-[#df2531]/40 hover:text-white/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full justify-center"
          >
            <span className="text-[18px] leading-none">+</span>
            {isUploading ? 'Enregistrement...' : 'Ajouter des photos'}
          </button>
        )}
      </CldUploadWidget>

      {error && (
        <p className="text-[11px] text-[#df2531] font-[family-name:var(--font-hud)] bg-[#df2531]/10 border border-[#df2531]/20 px-4 py-3">
          {error}
        </p>
      )}

      <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.15em] text-white/20">
        Formats acceptés : JPG, PNG, WEBP — Max 10 Mo — La première photo devient l&apos;image principale
      </p>
    </div>
  )
}
