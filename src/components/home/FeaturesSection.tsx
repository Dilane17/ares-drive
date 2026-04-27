// ============================================================
// FEATURES SECTION
// Three-column grid showcasing brand differentiators.
// Columns separated by tonal spacing only — no borders.
// Each feature has: SVG icon (red), title, Cardo italic body,
// and a numbered footer with red underline accent.
// ============================================================

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';

// ── Inline SVG icons (stroke #df2531) ────────────────────────

function IconCar() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M7 22h26v5H7zM10 22l3.5-8h13l3.5 8"
        stroke="#df2531"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.5" cy="26" r="2" stroke="#df2531" strokeWidth="1.8" />
      <circle cx="27.5" cy="26" r="2" stroke="#df2531" strokeWidth="1.8" />
      <path d="M7 22v3M33 22v3" stroke="#df2531" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect
        x="13" y="7" width="14" height="26" rx="0"
        stroke="#df2531"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 11h6" stroke="#df2531" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="28" r="1" fill="#df2531" />
    </svg>
  );
}

function IconDelivery() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 9c-4.418 0-8 3.582-8 8 0 6 8 15 8 15s8-9 8-15c0-4.418-3.582-8-8-8z"
        stroke="#df2531"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="17" r="3" stroke="#df2531" strokeWidth="1.8" />
    </svg>
  );
}

// ── Feature column data ───────────────────────────────────────

const features = [
  {
    icon: <IconCar />,
    number: '01',
    title: 'FLOTTE PREMIUM',
    body: "Des véhicules sélectionnés pour leur puissance, leur design et leur exclusivité. L'élite de l'ingénierie mondiale à votre disposition.",
  },
  {
    icon: <IconPhone />,
    number: '02',
    title: 'RÉSERVATION SIMPLE',
    body: 'Choisissez votre voiture, vos dates et contactez-nous directement sur WhatsApp. Une expérience fluide et personnalisée sans friction.',
  },
  {
    icon: <IconDelivery />,
    number: '03',
    title: 'LIVRAISON DISPONIBLE',
    body: "Votre supercar livrée à l'adresse de votre choix, à Paris et ses alentours. Votre temps est précieux, nous l'optimisons pour votre plaisir.",
  },
] as const;

// ─────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  return (
    <Section surface="base">
      <Container>

        {/* Section heading — centered eyebrow + headline */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <Heading variant="section-label" as="h3">
            NOS POINTS FORTS
          </Heading>
          <Heading variant="headline" as="h2" className="text-center">
            Nos points forts
          </Heading>
        </div>

        {/* 3-column grid (responsive) — tonal spacing as separator, no border lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <div key={feature.number} className="flex flex-col gap-6">

              {/* Icon — brand red SVG */}
              <div>{feature.icon}</div>

              {/* Title — Space Grotesk Bold, uppercase, generous tracking */}
              <h3 className="font-[family-name:var(--font-hud)] font-bold text-white uppercase tracking-[0.1em] text-[18px]">
                {feature.title}
              </h3>

              {/* Body — Cardo italic, muted (Kinetic Noir DS: Cardo always italic) */}
              <p className="font-[family-name:var(--font-body)] italic text-[17px] leading-relaxed text-white/70">
                {feature.body}
              </p>

              {/* Footer — dim number + red horizontal accent + dim CTA text */}
              <div className="mt-auto pt-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="font-[family-name:var(--font-hud)] text-[13px] text-white/30 tracking-[0.15em]">
                    {feature.number}
                  </span>
                  <div className="flex-1 h-[2px] bg-[#df2531]/40" />
                </div>
                <span className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/30">
                  EN SAVOIR PLUS
                </span>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
