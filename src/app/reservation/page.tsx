// ============================================================
// RESERVATION PAGE
// Role: server fetches available vehicles, client handles form
// Data: all available vehicles passed to ReservationForm
// Design: narrow max-w-[800px] container, centered header
// ============================================================

import type { Metadata } from 'next'
import { getAllVehicles } from '@/lib/queries/vehicles'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import ReservationForm from '@/components/reservation/ReservationForm'

export const metadata: Metadata = {
  title: 'Réservation — Ares Drive',
  description: 'Réservez votre supercar sur WhatsApp. Réponse garantie sous 2h.',
}

export default async function ReservationPage() {
  const all = await getAllVehicles()
  /* Only available vehicles can be reserved */
  const availableVehicles = all.filter(v => v.is_available)

  return (
    <div className="min-h-screen bg-[#131313] pt-[140px]">

      {/* ── Narrow centered container ── */}
      <div className="max-w-[800px] mx-auto px-8">

        {/* ── Header — centered ── */}
        <div className="text-center pb-16">
          <Heading variant="section-label" as="h2">RÉSERVATION</Heading>
          <Heading variant="display" as="h1" className="mt-4">
            RÉSERVEZ VOTRE SUPERCAR
          </Heading>
          <Text italic muted className="mt-6 max-w-[500px] mx-auto">
            Sélectionnez votre véhicule, choisissez vos dates
            et envoyez votre demande directement sur WhatsApp.
            Réponse garantie sous 2 heures.
          </Text>
        </div>

        {/* ── Multi-step form ── */}
        <ReservationForm vehicles={availableVehicles} />

      </div>
    </div>
  )
}
