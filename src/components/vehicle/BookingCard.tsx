'use client'

// ============================================================
// BOOKING CARD
// Role: sticky sidebar reservation form on vehicle detail page
// Data: vehicle (name, price, is_available)
// Design: red top accent line, full form fields,
//         WhatsApp deep-link on submit — no payment
// ============================================================

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp'
import type { Vehicle } from '@/types/vehicle'

// Fires the reservation API call — fire and forget, never blocks WhatsApp
function persistReservation(vehicle: Vehicle, f: FormData) {
  fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vehicle_id:   vehicle.id,
      client_name:  f.clientName,
      client_phone: f.clientPhone,
      client_email: f.clientEmail,
      start_date:   f.startDate,
      end_date:     f.endDate,
      message:      f.message,
    }),
  }).catch(err => console.error('[BookingCard] API error:', err))
}

type BookingCardProps = { vehicle: Vehicle }

interface FormData {
  startDate:   string
  endDate:     string
  clientName:  string
  clientPhone: string
  clientEmail: string
  message:     string
}

export default function BookingCard({ vehicle }: BookingCardProps) {
  const [formData, setFormData] = useState<FormData>({
    startDate:   '',
    endDate:     '',
    clientName:  '',
    clientPhone: '',
    clientEmail: '',
    message:     '',
  })

  function set(key: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [key]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const whatsappMessage =
`Bonjour Ares Drive,

Je souhaite réserver le véhicule suivant :

🚗 Véhicule : ${vehicle.brand} ${vehicle.name}
📅 Du : ${formData.startDate}
📅 Au : ${formData.endDate}
👤 Nom : ${formData.clientName}
📞 Téléphone : ${formData.clientPhone}${formData.clientEmail ? `\n📧 Email : ${formData.clientEmail}` : ''}${formData.message ? `\n\n💬 Message : ${formData.message}` : ''}

Merci de confirmer la disponibilité.`

    // ── Save to Supabase + trigger admin email (fire and forget) ─
    persistReservation(vehicle, formData)

    // ── Open WhatsApp immediately — not gated on API response ───
    window.open(buildWhatsAppUrl(whatsappMessage), '_blank', 'noopener,noreferrer')
  }

  return (
    <div data-testid="booking-card" className="bg-[#0e0e0e] p-8">
      {/* ── Red accent line (Ignition Glow) ── */}
      <div className="h-[2px] w-full bg-[#df2531] mb-6 shadow-[0px_0px_12px_#df2531]" />

      {/* ── Vehicle + price ── */}
      <p className="font-[family-name:var(--font-hud)] font-bold text-[16px] uppercase tracking-[0.08em] text-white">
        {vehicle.name}
      </p>
      <div className="mt-2">
        <span className="font-[family-name:var(--font-hud)] font-bold text-[36px] text-[#df2531] leading-none">
          €{vehicle.price_per_day.toLocaleString('fr-FR')}
        </span>
        <span className="font-[family-name:var(--font-hud)] text-[13px] text-white/40 ml-2">/ JOUR</span>
      </div>

      {/* ── Tonal separator ── */}
      <div className="h-[1px] w-full bg-white/[0.06] mt-6 mb-6" />

      {/* ── Unavailable notice ── */}
      {!vehicle.is_available && (
        <div className="bg-white/[0.03] px-4 py-3 mb-6">
          <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.15em] text-white/40">
            Ce véhicule n'est pas disponible actuellement.
          </p>
        </div>
      )}

      {/* ── Form ── */}
      <form data-testid="booking-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Dates */}
        <Input
          label="DATE DE DÉBUT"
          type="date"
          value={formData.startDate}
          onChange={set('startDate') as React.ChangeEventHandler<HTMLInputElement>}
        />
        <Input
          label="DATE DE FIN"
          type="date"
          value={formData.endDate}
          onChange={set('endDate') as React.ChangeEventHandler<HTMLInputElement>}
        />

        {/* Personal info */}
        <Input
          label="VOTRE NOM"
          placeholder="Nom complet"
          value={formData.clientName}
          onChange={set('clientName') as React.ChangeEventHandler<HTMLInputElement>}
        />
        <Input
          label="TÉLÉPHONE"
          type="tel"
          placeholder="+33 6..."
          value={formData.clientPhone}
          onChange={set('clientPhone') as React.ChangeEventHandler<HTMLInputElement>}
        />
        <Input
          label="EMAIL (optionnel)"
          type="email"
          placeholder="votre@email.com"
          value={formData.clientEmail}
          onChange={set('clientEmail') as React.ChangeEventHandler<HTMLInputElement>}
        />

        {/* Message textarea — styled like Input */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-[family-name:var(--font-hud)]">
            MESSAGE
          </label>
          <textarea
            value={formData.message}
            onChange={set('message')}
            placeholder="Informations complémentaires..."
            rows={3}
            className="w-full bg-[#0e0e0e] text-white border-0 border-b-2 border-white/20 rounded-none outline-none px-0 py-3 italic font-[family-name:var(--font-body)] placeholder:text-white/20 transition-all duration-200 focus:border-b-[#df2531] focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)] resize-none h-[80px]"
          />
        </div>

        {/* ── Submit ── */}
        <Button
          variant="primary"
          type="submit"
          disabled={!vehicle.is_available}
          className="w-full justify-center py-4 mt-2"
        >
          RÉSERVER SUR WHATSAPP
        </Button>
      </form>

      {/* ── Reassurance note ── */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          {/* WhatsApp icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#df2531" opacity="0.5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <span className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.1em] text-white/40">
            AUCUN PAIEMENT EN LIGNE
          </span>
        </div>
        <p className="font-[family-name:var(--font-body)] italic text-[13px] text-white/30">
          Réponse garantie sous 2h
        </p>
      </div>
    </div>
  )
}
