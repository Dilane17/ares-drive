'use client'

// ============================================================
// RESERVATION FORM
// Role: 3-step WhatsApp reservation wizard
// Steps: 1=Vehicle, 2=Dates, 3=Contact
// Design: step indicator with connector lines, full form state,
//         WhatsApp deep-link on submit — no payment
// ============================================================

import { useState } from 'react'
import VehicleSelector from './VehicleSelector'
import SuccessState from './SuccessState'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp'
import { cn } from '@/lib/utils/cn'
import type { VehicleCard } from '@/types/vehicle'

type ReservationFormProps = {
  vehicles: VehicleCard[]
}

interface FormData {
  vehicleId:    string
  vehicleSlug:  string
  vehicleName:  string
  vehiclePrice: number
  startDate:    string
  endDate:      string
  clientName:   string
  clientPhone:  string
  clientEmail:  string
  message:      string
}

const STEPS = [
  { n: 1, label: 'VÉHICULE' },
  { n: 2, label: 'DATES' },
  { n: 3, label: 'COORDONNÉES' },
]

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0
  return Math.max(0, Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000))
}

export default function ReservationForm({ vehicles }: ReservationFormProps) {
  const [step,      setStep]      = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData,  setFormData]  = useState<FormData>({
    vehicleId:    '',
    vehicleSlug:  '',
    vehicleName:  '',
    vehiclePrice: 0,
    startDate:    '',
    endDate:      '',
    clientName:   '',
    clientPhone:  '',
    clientEmail:  '',
    message:      '',
  })

  const days  = daysBetween(formData.startDate, formData.endDate)
  const total = formData.vehiclePrice * days

  /* ── Selected VehicleCard for VehicleSelector ── */
  const selectedVehicle = vehicles.find(v => v.slug === formData.vehicleSlug)

  /* ── Step validation ── */
  function canAdvance(): boolean {
    if (step === 1) return formData.vehicleSlug !== ''
    if (step === 2) return formData.startDate !== '' && formData.endDate !== '' && days > 0
    if (step === 3) return formData.clientName.trim() !== '' && formData.clientPhone.trim() !== ''
    return false
  }

  /* ── VehicleSelector callback ── */
  function handleSelectVehicle(v: VehicleCard) {
    setFormData(prev => ({
      ...prev,
      vehicleId:    v.id,
      vehicleSlug:  v.slug,
      vehicleName:  `${v.brand} ${v.name}`,
      vehiclePrice: v.price_per_day,
    }))
  }

  /* ── WhatsApp submit ── */
  function handleSubmit() {
    const {
      vehicleId, vehicleName, startDate, endDate,
      clientName, clientPhone, clientEmail, message,
    } = formData

    const whatsappMessage =
`Bonjour Ares Drive,

Je souhaite réserver le véhicule suivant :

🚗 Véhicule : ${vehicleName}
📅 Du : ${startDate}
📅 Au : ${endDate}
👤 Nom : ${clientName}
📞 Téléphone : ${clientPhone}${clientEmail ? `\n📧 Email : ${clientEmail}` : ''}${message ? `\n\n💬 Message : ${message}` : ''}

Merci de confirmer la disponibilité.`

    // ── Save to Supabase + trigger admin email (fire and forget) ─
    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicle_id:   vehicleId,
        client_name:  clientName,
        client_phone: clientPhone,
        client_email: clientEmail,
        start_date:   startDate,
        end_date:     endDate,
        message,
      }),
    }).catch(err => console.error('[ReservationForm] API error:', err))

    // ── Open WhatsApp immediately — not gated on API response ───
    window.open(buildWhatsAppUrl(whatsappMessage), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  if (submitted) return <SuccessState />

  return (
    <div data-testid="reservation-form">
      {/* ════════════════════════════════════════════════
          STEP INDICATOR
          Active: #df2531 text + border-b. Done: dim + ✓.
          Connector: h-[1px] flex-1 bg-white/10
          ════════════════════════════════════════════════ */}
      <div className="flex items-center mb-12">
        {STEPS.map(({ n, label }, i) => {
          const isDone   = step > n
          const isActive = step === n

          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              {/* Step cell */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <span className={cn(
                  'font-[family-name:var(--font-hud)] font-bold text-[13px] uppercase tracking-[0.05em]',
                  isDone   && 'text-white/50',
                  isActive && 'text-[#df2531] border-b-2 border-[#df2531] pb-0.5',
                  !isDone && !isActive && 'text-white/20',
                )}>
                  {isDone ? '✓' : n}
                </span>
                <span className={cn(
                  'font-[family-name:var(--font-hud)] text-[9px] uppercase tracking-[0.15em]',
                  isActive ? 'text-white/70' : 'text-white/25',
                )}>
                  {label}
                </span>
              </div>

              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'h-[1px] flex-1 mx-4 mb-4',
                  step > n ? 'bg-[#df2531]' : 'bg-white/10',
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* ════════════════════════════════════════════════
          STEP CONTENT
          ════════════════════════════════════════════════ */}

      {/* Step 1 — Vehicle selection */}
      {step === 1 && (
        <div>
          <p className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[16px] tracking-[0.08em] mb-8">
            CHOISISSEZ VOTRE VÉHICULE
          </p>
          <div data-testid="vehicle-selector">
            <VehicleSelector
              vehicles={vehicles}
              selected={formData.vehicleSlug}
              onSelect={handleSelectVehicle}
            />
          </div>
        </div>
      )}

      {/* Step 2 — Dates */}
      {step === 2 && (
        <div>
          <p className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[16px] tracking-[0.08em] mb-8">
            VOS DATES
          </p>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="DATE DE DÉBUT"
              type="date"
              value={formData.startDate}
              onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            />
            <Input
              label="DATE DE FIN"
              type="date"
              value={formData.endDate}
              onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>

          {/* Duration + total — shown once both dates are selected */}
          {days > 0 && (
            <div className="bg-[#1a1a1a] p-6 mt-6 flex justify-between items-center">
              <div>
                <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
                  DURÉE
                </p>
                <p className="font-[family-name:var(--font-hud)] font-bold text-white text-[18px]">
                  {days} JOUR{days > 1 ? 'S' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
                  TOTAL ESTIMÉ
                </p>
                <p className="font-[family-name:var(--font-hud)] font-bold text-[#df2531] text-[24px]">
                  €{total.toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3 — Contact */}
      {step === 3 && (
        <div>
          <p className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[16px] tracking-[0.08em] mb-8">
            VOS COORDONNÉES
          </p>

          <div className="flex flex-col gap-6">
            <Input
              label="NOM COMPLET"
              placeholder="Prénom Nom"
              value={formData.clientName}
              onChange={e => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
            />
            <Input
              label="TÉLÉPHONE"
              type="tel"
              placeholder="+33 6 XX XX XX XX"
              value={formData.clientPhone}
              onChange={e => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
            />
            <Input
              label="EMAIL (optionnel)"
              type="email"
              placeholder="votre@email.com"
              value={formData.clientEmail}
              onChange={e => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
            />

            {/* Message textarea */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-[family-name:var(--font-hud)]">
                MESSAGE (optionnel)
              </label>
              <textarea
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Lieu de livraison, informations complémentaires..."
                rows={3}
                className="w-full bg-[#0e0e0e] text-white border-0 border-b-2 border-white/20 rounded-none outline-none px-0 py-3 italic font-[family-name:var(--font-body)] placeholder:text-white/20 transition-all duration-200 focus:border-b-[#df2531] focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)] resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!canAdvance()}
              className="w-full justify-center py-5 text-base mt-2"
            >
              ENVOYER MA DEMANDE SUR WHATSAPP →
            </Button>

            <p className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.1em] text-white/30 text-center">
              AUCUN PAIEMENT EN LIGNE — RÉPONSE SOUS 2H
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════
          NAVIGATION — previous / next buttons
          ════════════════════════════════════════════════ */}
      {step < 3 && (
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/[0.05]">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(s => s - 1)}>
              ← RETOUR
            </Button>
          ) : (
            <div />
          )}
          <Button
            variant="primary"
            onClick={() => canAdvance() && setStep(s => s + 1)}
            disabled={!canAdvance()}
          >
            CONTINUER →
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="flex justify-start mt-6 pt-6 border-t border-white/[0.05]">
          <Button variant="secondary" onClick={() => setStep(s => s - 1)}>
            ← RETOUR
          </Button>
        </div>
      )}
    </div>
  )
}
