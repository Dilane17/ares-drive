'use client'
// ============================================================
// VehicleForm — create or edit a vehicle
// Validates with Zod, submits via server actions
// ============================================================

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createVehicle, updateVehicle } from '@/lib/actions/vehicles'
import type { Vehicle } from '@/types/vehicle'

// ── Schema ───────────────────────────────────────────────────

const vehicleSchema = z.object({
  name:          z.string().min(1, 'Requis'),
  brand:         z.string().min(1, 'Requis'),
  category:      z.enum(['supercar', 'suv', 'cabriolet', 'berline']),
  tagline:       z.string().default(''),
  description:   z.string().default(''),
  price_per_day: z.coerce.number().min(1, 'Prix requis'),
  power_hp:      z.coerce.number().nullable().optional(),
  acceleration:  z.string().default(''),
  top_speed:     z.coerce.number().nullable().optional(),
  transmission:  z.string().default('Automatique'),
  seats:         z.coerce.number().min(1).max(10).default(2),
  is_available:  z.boolean().default(true),
  is_featured:   z.boolean().default(false),
})

type VehicleFormValues = z.infer<typeof vehicleSchema>

// ── Helper components ────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/50">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-[#df2531] font-[family-name:var(--font-hud)]">{error}</p>
      )}
    </div>
  )
}

const inputClass =
  'w-full bg-[#1a1a1a] border border-white/[0.08] text-white px-4 py-3 text-[13px] font-[family-name:var(--font-hud)] focus:outline-none focus:border-[#df2531]/60 transition-colors placeholder:text-white/20'

// ── Main component ───────────────────────────────────────────

interface VehicleFormProps {
  vehicle?: Vehicle
}

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const isEditing = Boolean(vehicle)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema) as Resolver<VehicleFormValues>,
    defaultValues: vehicle
      ? {
          name:          vehicle.name,
          brand:         vehicle.brand,
          category:      vehicle.category,
          tagline:       vehicle.tagline ?? '',
          description:   vehicle.description ?? '',
          price_per_day: vehicle.price_per_day,
          power_hp:      vehicle.power_hp ?? undefined,
          acceleration:  vehicle.acceleration ?? '',
          top_speed:     vehicle.top_speed ?? undefined,
          transmission:  vehicle.transmission ?? 'Automatique',
          seats:         vehicle.seats,
          is_available:  vehicle.is_available,
          is_featured:   vehicle.is_featured,
        }
      : {
          category:     'supercar',
          transmission: 'Automatique',
          seats:        2,
          is_available: true,
          is_featured:  false,
        },
  })

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null)
    setSaveSuccess(false)

    const payload = {
      ...data,
      power_hp:  data.power_hp  ?? null,
      top_speed: data.top_speed ?? null,
    }

    if (isEditing && vehicle) {
      const result = await updateVehicle(vehicle.id, payload)
      if (result?.error) {
        setServerError(result.error)
      } else {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } else {
      const result = await createVehicle(payload)
      if (result?.error) setServerError(result.error)
      // On success, createVehicle redirects to /admin/vehicules/[id]
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Identity */}
      <div className="bg-[#111111] border border-white/[0.06] p-6 space-y-4">
        <h3 className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">
          Identité
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Marque" error={errors.brand?.message}>
            <input {...register('brand')} className={inputClass} placeholder="Ferrari" />
          </Field>
          <Field label="Modèle" error={errors.name?.message}>
            <input {...register('name')} className={inputClass} placeholder="296 GTB" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie" error={errors.category?.message}>
            <select {...register('category')} className={inputClass}>
              <option value="supercar">Supercar</option>
              <option value="suv">SUV</option>
              <option value="cabriolet">Cabriolet</option>
              <option value="berline">Berline</option>
            </select>
          </Field>
          <Field label="Places" error={errors.seats?.message}>
            <input type="number" {...register('seats')} className={inputClass} min={1} max={10} />
          </Field>
        </div>
        <Field label="Accroche (tagline)" error={errors.tagline?.message}>
          <input {...register('tagline')} className={inputClass} placeholder="Le mythe italien." />
        </Field>
        <Field label="Description" error={errors.description?.message}>
          <textarea
            {...register('description')}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="Description détaillée du véhicule..."
          />
        </Field>
      </div>

      {/* Specs */}
      <div className="bg-[#111111] border border-white/[0.06] p-6 space-y-4">
        <h3 className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">
          Caractéristiques
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Puissance (ch)" error={errors.power_hp?.message}>
            <input type="number" {...register('power_hp')} className={inputClass} placeholder="830" />
          </Field>
          <Field label="0–100 km/h" error={errors.acceleration?.message}>
            <input {...register('acceleration')} className={inputClass} placeholder="2.9s 0-100" />
          </Field>
          <Field label="Vitesse max (km/h)" error={errors.top_speed?.message}>
            <input type="number" {...register('top_speed')} className={inputClass} placeholder="330" />
          </Field>
        </div>
        <Field label="Transmission" error={errors.transmission?.message}>
          <input {...register('transmission')} className={inputClass} placeholder="Automatique" />
        </Field>
      </div>

      {/* Pricing & flags */}
      <div className="bg-[#111111] border border-white/[0.06] p-6 space-y-4">
        <h3 className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">
          Tarif & visibilité
        </h3>
        <Field label="Prix par jour (€)" error={errors.price_per_day?.message}>
          <input type="number" {...register('price_per_day')} className={inputClass} placeholder="1290" />
        </Field>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('is_available')}
              className="w-4 h-4 accent-[#df2531]"
            />
            <span className="font-[family-name:var(--font-hud)] text-[12px] uppercase tracking-[0.15em] text-white/60">
              Disponible à la location
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="w-4 h-4 accent-[#df2531]"
            />
            <span className="font-[family-name:var(--font-hud)] text-[12px] uppercase tracking-[0.15em] text-white/60">
              Mis en avant (homepage)
            </span>
          </label>
        </div>
      </div>

      {/* Feedback */}
      {serverError && (
        <p className="text-[12px] text-[#df2531] font-[family-name:var(--font-hud)] bg-[#df2531]/10 border border-[#df2531]/20 px-4 py-3">
          {serverError}
        </p>
      )}
      {saveSuccess && (
        <p className="text-[12px] text-green-400 font-[family-name:var(--font-hud)] bg-green-500/10 border border-green-500/20 px-4 py-3">
          Véhicule enregistré avec succès.
        </p>
      )}

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#df2531] text-white font-[family-name:var(--font-hud)] text-[12px] uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#c41e28] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Créer le véhicule'}
        </button>
      </div>
    </form>
  )
}
