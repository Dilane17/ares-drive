{/* ============================================================
    HISTORY SECTION
    Role: Origin story with asymmetric editorial split layout.
    Photo bleeds to left edge for full-bleed effect.
    Design: No Container wrapper, two columns 45/55 split,
    red corner accent, telemetry stats row, fleet CTA.
    Ref: Figma node 84:584
    ============================================================ */}

import Image from 'next/image';
import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Telemetry from '@/components/ui/Telemetry';
import Button from '@/components/ui/Button';

export default function HistorySection() {
  return (
    <Section surface="low" className="py-0 overflow-hidden">

      {/* ── Two-column split — photo bleeds to left edge ── */}
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* ── LEFT COLUMN — Photo (45%, full-bleed left) ── */}
        <div className="relative w-full lg:w-[45%] min-h-[400px] lg:min-h-[600px] overflow-hidden flex-shrink-0">

          {/* Founder image — object-cover fill */}
          <Image
            src="/images/about/founder.jpg"
            alt="Fondateur Ares Drive"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />

          {/* Red corner accent — Kinetic Noir DS detail */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[80px] h-[80px] border-t-2 border-l-2 border-primary z-10 pointer-events-none"
          />

          {/* Bottom caption — gradient overlay from surface-low */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] to-transparent pt-16 pb-6 px-8 z-10">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ARES DRIVE — PARIS
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Text + stats + CTA ── */}
        <div className="flex-1 py-20 px-8 lg:px-16 flex flex-col justify-center">

          {/* Section eyebrow label */}
          <Heading variant="section-label" as="h3">
            NOTRE HISTOIRE
          </Heading>

          {/* Section headline */}
          <Heading variant="headline" as="h2" className="mt-4 text-[48px]">
            Une passion, une agence.
          </Heading>

          {/* Body paragraphs — Cardo italic */}
          <div className="mt-8 flex flex-col gap-6">
            <Text italic muted className="text-[17px] leading-[1.8]">
              Fondée par des passionnés d&apos;automobile, Ares Drive est
              née d&apos;un constat simple : la location de supercars doit
              être aussi exceptionnelle que les voitures elles-mêmes.
            </Text>
            <Text italic muted className="text-[17px] leading-[1.8]">
              Depuis notre création, nous accompagnons particuliers et
              professionnels qui souhaitent vivre une expérience de
              conduite hors du commun, sans compromis sur la qualité
              ni le service.
            </Text>
          </div>

          {/* ── Telemetry stats — inline row ── */}
          <div className="mt-12 flex gap-12 flex-wrap">
            <Telemetry label="FONDÉE EN" value="2020" />
            <Telemetry label="VÉHICULES" value="15+" />
            <Telemetry label="VILLES" value="01" unit="PARIS" />
          </div>

          {/* Fleet CTA */}
          <div className="mt-10">
            <Button variant="secondary" href="/catalogue">
              DÉCOUVRIR LA FLOTTE
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
