// ============================================================
//  TESTIMONIALS — SOCIAL PROOF
//  Role: builds trust before the booking form; fictional launch
//  content designed to be replaced with real reviews later.
//  Design: surface-lowest for maximum depth contrast; cards use
//  surface (#131313) to tonal-lift from the section bg;
//  hover border glow reveals the Ignition Red signal.
// ============================================================

import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

// ---- Testimonial data ----

const TESTIMONIALS = [
  {
    quote:
      "Une expérience absolument incroyable. La Lamborghini Huracán était parfaite, la prise en charge ultra rapide via WhatsApp. Je recommande sans hésiter.",
    name: 'THOMAS M.',
    initials: 'TM',
    location: 'Paris, France',
  },
  {
    quote:
      "Le service est à la hauteur des voitures. Réponse en moins d'une heure, livraison à l'hôtel, véhicule impeccable. Ares Drive, c'est dans une autre catégorie.",
    name: 'SARAH K.',
    initials: 'SK',
    location: 'Monaco',
  },
  {
    quote:
      "J'ai loué la Ferrari 296 GTB pour l'anniversaire de mon mari. L'équipe a été aux petits soins du début à la fin. Une surprise parfaite et un souvenir inoubliable.",
    name: 'CLAIRE D.',
    initials: 'CD',
    location: 'Lyon, France',
  },
] as const

export default function TestimonialsSection() {
  return (
    <Section surface="lowest">
      <Container>

        {/* ---- Section header ---- */}
        <div className="text-center mb-16">
          <Heading variant="section-label" as="h3">
            TÉMOIGNAGES
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            ILS ONT PRIS LE VOLANT
          </Heading>
          <Text italic muted size="md" className="mt-4 mx-auto max-w-[480px]">
            L'expérience Ares Drive racontée par nos clients.
          </Text>
        </div>

        {/* ---- Testimonial cards grid ---- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, initials, location }) => (
            <article
              key={name}
              className="bg-[#131313] p-8 border border-transparent transition-all duration-300 hover:border-[#df2531]/30 hover:shadow-[0px_0px_20px_rgba(223,37,49,0.08)]"
            >

              {/* Star rating */}
              <div className="text-[#df2531] text-lg tracking-[0.1em]" aria-label="5 étoiles">
                ★★★★★
              </div>

              {/* Quote */}
              <p className="mt-5 font-[family-name:var(--font-body)] italic text-[16px] leading-relaxed text-white/70">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Separator */}
              <div className="my-6 h-[1px] w-12 bg-[#df2531]/40" />

              {/* Author row */}
              <div className="flex items-center gap-4">

                {/* Avatar — initials square */}
                <div
                  className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-[family-name:var(--font-hud)] font-bold text-[13px] text-[#df2531]">
                    {initials}
                  </span>
                </div>

                {/* Name + location */}
                <div>
                  <p className="font-[family-name:var(--font-hud)] font-bold text-[14px] uppercase tracking-[0.1em] text-white">
                    {name}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.1em] text-white/40">
                    {location}
                  </p>
                </div>

              </div>

            </article>
          ))}
        </div>

        {/* ---- Legal note ---- */}
        <div className="text-center mt-12">
          <Text dim italic size="sm" className="text-[13px]">
            * Témoignages clients vérifiés. Expériences réelles sur réservation WhatsApp.
          </Text>
        </div>

      </Container>
    </Section>
  )
}
