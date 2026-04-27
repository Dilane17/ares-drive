'use client'

// ============================================================
// BOOKING FORM CLIENT
// Role: controlled form that submits via WhatsApp deep-link
// Data: available vehicles passed from BookingSection server component
// Design: 2×2 grid, vehicle select, WhatsApp CTA
// ============================================================

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp'
import type { Vehicle } from '@/types/vehicle'

interface BookingFormClientProps {
  vehicles: Vehicle[]
}

export default function BookingFormClient({ vehicles }: BookingFormClientProps) {
  const [model,   setModel]   = useState('')
  const [dates,   setDates]   = useState('')
  const [name,    setName]    = useState('')
  const [contact, setContact] = useState('')

  function handleSubmit() {
    const message =
`Bonjour Ares Drive,

Je souhaite réserver le véhicule suivant :

🚗 Véhicule : ${model || 'Non précisé'}
📅 Dates : ${dates || 'Non précisées'}
👤 Nom : ${name || 'Non précisé'}
📞 Contact : ${contact || 'Non précisé'}

Merci de confirmer la disponibilité.`

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ── Responsive input grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

        {/* Model select — native select styled like Input */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="booking-model"
            className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-[family-name:var(--font-hud)]"
          >
            Modèle souhaité
          </label>
          <select
            id="booking-model"
            value={model}
            onChange={e => setModel(e.target.value)}
            className="w-full bg-[#0e0e0e] text-white border-0 border-b-2 border-white/20 rounded-none outline-none px-0 py-3 font-[family-name:var(--font-body)] italic transition-all duration-200 focus:border-b-[#df2531] focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)] appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-[#0e0e0e] not-italic">
              Sélectionner un modèle
            </option>
            {vehicles.map(v => (
              <option key={v.id} value={`${v.brand} ${v.name}`} className="bg-[#0e0e0e] not-italic">
                {v.brand} {v.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Dates de location"
          placeholder="JJ/MM/AAAA - JJ/MM/AAAA"
          value={dates}
          onChange={e => setDates(e.target.value)}
        />
        <Input
          label="Nom complet"
          placeholder="Jean Dupont"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          label="Email / Téléphone"
          placeholder="+33 6 00 00 00 00"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
      </div>

      {/* ── WhatsApp CTA ── */}
      <Button
        variant="primary"
        onClick={handleSubmit}
        className="w-full justify-center py-5 text-sm tracking-[0.2em]"
      >
        ENVOYER MA DEMANDE SUR WHATSAPP
      </Button>
    </div>
  )
}
