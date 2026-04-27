// ============================================================
// BOOKING SECTION
// Role: homepage quick-booking form with real vehicle options
// Data: available vehicles fetched server-side from Supabase
// Design: left 1/3 descriptive copy, right 2/3 form (client)
// ============================================================

import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import BookingFormClient from './BookingFormClient'
import { getAllVehicles } from '@/lib/queries/vehicles'

export default async function BookingSection() {
  /* ── Fetch and filter to available vehicles only ── */
  const all = await getAllVehicles()
  const available = all.filter(v => v.is_available)

  return (
    <Section surface="lowest">
      <Container>

        {/* ── Inner card — elevated from section bg ── */}
        <div className="bg-[#131313] p-16">
          <div className="flex gap-16">

            {/* ── Left column — copy (1/3) ── */}
            <div className="w-1/3 flex flex-col gap-6 justify-center">
              <Heading variant="headline" as="h2">
                VOTRE PROCHAINE EXPÉRIENCE
              </Heading>
              <Text italic muted size="md">
                Prenez le contrôle. Remplissez les détails et laissez notre
                conciergerie s&apos;occuper du reste.
              </Text>
            </div>

            {/* ── Right column — client form (2/3) ── */}
            <div className="w-2/3">
              <BookingFormClient vehicles={available} />
            </div>

          </div>
        </div>

      </Container>
    </Section>
  )
}
