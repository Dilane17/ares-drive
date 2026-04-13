// ============================================================
//  HOW IT WORKS — 3-STEP PROCESS
//  Role: critical conversion section — the WhatsApp-only model
//  needs an explicit explanation so users don't bounce.
//  Design: surface-low; large ghost step numbers as decoration;
//  connector lines reinforce the sequential flow.
// ============================================================

import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

// ---- Inline SVG icon components ----

function CarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M4 22H28M4 22V26M28 22V26M8 22L10.5 14H21.5L24 22M10.5 14L12 8H20L21.5 14"
        stroke="#df2531" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="10" cy="24" r="1.5" fill="#df2531" />
      <circle cx="22" cy="24" r="1.5" fill="#df2531" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 6H26V22H18L12 28V22H6V6Z"
        stroke="#df2531" strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M11 13H21M11 17H17"
        stroke="#df2531" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="12" cy="16" r="7" stroke="#df2531" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="2.5" fill="#df2531" />
      <path
        d="M19 16H28M24 12.5V16M26 12.5V16"
        stroke="#df2531" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  )
}

// ---- Step data ----

const STEPS = [
  {
    number: '01',
    label: 'ÉTAPE 01',
    title: 'CHOISISSEZ VOTRE SUPERCAR',
    description:
      "Parcourez notre catalogue exclusif et sélectionnez le véhicule qui correspond à vos envies et à votre budget.",
    Icon: CarIcon,
  },
  {
    number: '02',
    label: 'ÉTAPE 02',
    title: 'ENVOYEZ VOTRE DEMANDE',
    description:
      "Contactez-nous directement sur WhatsApp avec vos dates et vos préférences. Aucun formulaire complexe, aucune attente.",
    Icon: MessageIcon,
  },
  {
    number: '03',
    label: 'ÉTAPE 03',
    title: 'PRENEZ LE VOLANT',
    description:
      "Nous confirmons votre réservation sous 2h et organisons la livraison à l'adresse de votre choix à Paris et ses alentours.",
    Icon: KeyIcon,
  },
] as const

export default function HowItWorksSection() {
  return (
    <Section surface="low">
      <Container>

        {/* ---- Section header ---- */}
        <div className="text-center mb-16">
          <Heading variant="section-label" as="h3">
            PROCESSUS
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            RÉSERVER EN 3 ÉTAPES
          </Heading>
          <p className="mt-4 mx-auto max-w-[480px] font-[family-name:var(--font-body)] italic text-[18px] leading-relaxed text-white/70">
            Simple, rapide et sans friction.
            Notre conciergerie s'occupe de tout.
          </p>
        </div>

        {/* ---- Steps grid ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {STEPS.map(({ number, label, title, description, Icon }, index) => {
            const isLast = index === STEPS.length - 1

            return (
              <div key={label} className="relative overflow-hidden px-8 pt-14 pb-12 lg:px-10">

                {/* Large decorative step number — sits behind all content */}
                <span
                  className="absolute -top-2 left-4 font-[family-name:var(--font-display)] text-[80px] leading-none font-bold text-[#df2531] opacity-20 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {number}
                </span>

                {/* Step content — z-10 so it renders above the ghost number */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="mb-5">
                    <Icon />
                  </div>

                  {/* Step label */}
                  <p className="font-[family-name:var(--font-hud)] font-bold text-[11px] tracking-[0.2em] uppercase text-[#df2531]">
                    {label}
                  </p>

                  {/* Step title */}
                  <h3 className="mt-3 font-[family-name:var(--font-hud)] font-bold text-[20px] uppercase tracking-[0.08em] text-white">
                    {title}
                  </h3>

                  {/* Step description */}
                  <p className="mt-4 font-[family-name:var(--font-body)] italic text-[16px] leading-relaxed text-white/60">
                    {description}
                  </p>

                </div>

                {/* Step connector — flow indicator; hidden on last step */}
                {!isLast && (
                  <div className="mt-8 relative h-[1px] hidden lg:block">
                    {/* Full-width line */}
                    <div className="w-full h-full bg-[#df2531]/20" />
                    {/* Arrow breaking the line at center */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111111] px-2 text-[#df2531]/50 text-sm leading-none"
                      aria-hidden="true"
                    >
                      →
                    </div>
                  </div>
                )}

              </div>
            )
          })}
        </div>

        {/* ---- Bottom CTA ---- */}
        <div className="text-center mt-16">
          <Button variant="primary" href="/catalogue">
            VOIR LE CATALOGUE
          </Button>
        </div>

      </Container>
    </Section>
  )
}
