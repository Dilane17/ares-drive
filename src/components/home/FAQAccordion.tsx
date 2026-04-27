'use client'

// ============================================================
//  FAQ ACCORDION
//  Role: pre-empts the most common objections before the user
//  reaches the booking form — reduces friction and unnecessary
//  WhatsApp contact for answerable questions.
//  Design: surface-low; max-w-[800px] centered; items separated
//  by subtle ignition lines. One open item at a time.
// ============================================================

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import { cn } from '@/lib/utils/cn'

// ---- FAQ data ----

const FAQ_ITEMS = [
  {
    question: "Quel est l'âge minimum pour louer un véhicule ?",
    answer:
      "Vous devez avoir au moins 25 ans et être titulaire d'un permis de conduire valide depuis plus de 3 ans. Une pièce d'identité et un justificatif de domicile vous seront demandés.",
  },
  {
    question: 'Comment fonctionne la réservation sur WhatsApp ?',
    answer:
      "Rien de plus simple : choisissez votre véhicule dans notre catalogue, contactez-nous sur WhatsApp avec vos dates et lieu de prise en charge. Notre équipe vous répond sous 2h pour confirmer la disponibilité et finaliser votre réservation.",
  },
  {
    question: 'Quel est le montant de la caution ?',
    answer:
      "La caution varie selon le véhicule loué, entre 2 000€ et 10 000€. Elle est prélevée par empreinte bancaire à la remise des clés et restituée intégralement au retour du véhicule en bon état.",
  },
  {
    question: "L'assurance est-elle incluse dans le prix ?",
    answer:
      "Oui, tous nos véhicules sont couverts par une assurance tous risques. Le conducteur est protégé en cas d'accident, sous réserve de la franchise contractuelle définie à la réservation.",
  },
  {
    question: 'Proposez-vous la livraison à domicile ?',
    answer:
      "Absolument. Nous livrons votre supercar à l'adresse de votre choix à Paris et dans un rayon de 50 km autour de la capitale. Des frais de livraison peuvent s'appliquer selon la distance.",
  },
  {
    question: 'Puis-je conduire en dehors de France ?',
    answer:
      "Les déplacements en France métropolitaine sont inclus par défaut. Pour conduire à l'étranger, contactez-nous au préalable — une autorisation spécifique et une couverture internationale peuvent être nécessaires selon le pays de destination.",
  },
] as const

export default function FAQAccordion() {
  // Only one item open at a time; null = all closed
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setOpenIndex(prev => (prev === i ? null : i))

  return (
    <Section surface="low">
      <div data-testid="faq-accordion">
      <Container>

        {/* ---- Section header ---- */}
        <div className="text-center mb-16">
          <Heading variant="section-label" as="h3">
            FAQ
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            QUESTIONS FRÉQUENTES
          </Heading>
          <Text italic muted size="md" className="mt-4 mx-auto max-w-[480px]">
            Tout ce que vous devez savoir avant de réserver.
          </Text>
        </div>

        {/* ---- Accordion list — max-w centered for readability ---- */}
        <div className="max-w-[800px] mx-auto">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className="border-b border-[#df2531]/10"
              >

                {/* Question row — toggles item */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-6 cursor-pointer text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      'font-[family-name:var(--font-hud)] font-bold text-[16px] uppercase tracking-[0.05em] transition-colors duration-200',
                      isOpen ? 'text-[#df2531]' : 'text-white',
                    )}
                  >
                    {item.question}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className="text-[#df2531] text-2xl font-light leading-none shrink-0 ml-6 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Answer — animated with max-height transition */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-500 ease-in-out',
                    isOpen ? 'max-h-[500px]' : 'max-h-0',
                  )}
                >
                  <div className="pb-6">
                    <p className="font-[family-name:var(--font-body)] italic text-[16px] leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </Container>
      </div>
    </Section>
  )
}
