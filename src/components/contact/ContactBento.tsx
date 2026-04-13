{/* ============================================================
    CONTACT BENTO
    Role: 3-card navigation shortcuts — adds visual richness
    and guides users toward fleet, about, or direct booking.
    Design: 3-column grid, photo cards with gradient overlay
    + dark surface card for the 24/7 availability block.
    Ref: Figma node 39:420
    ============================================================ */}

import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

/* ── WhatsApp SVG icon — 40px, inline, primary color ── */
function WhatsAppIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 3.333C10.795 3.333 3.333 10.795 3.333 20c0 2.94.768 5.7 2.117 8.1L3.333 36.667l8.82-2.316A16.528 16.528 0 0020 36.667c9.205 0 16.667-7.462 16.667-16.667S29.205 3.333 20 3.333Z"
        stroke="#df2531"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 13.5c.333 0 .667.167.833.5l1.5 3c.167.333.083.75-.167 1l-1 1c.833 1.667 2.167 3 3.833 3.833l1-1c.25-.25.667-.333 1-.167l3 1.5c.333.167.5.5.5.833 0 1.5-1.5 3.5-3 3.5-3.833 0-9.5-5.667-9.5-9.5 0-1.5 2-3 3-3Z"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactBento() {
  return (
    <Section surface="lowest">
      <Container>

        {/* ── Section header ── */}
        <div className="mb-12">
          <Heading variant="section-label" as="h3">
            EXPLORER
          </Heading>
          <Heading variant="headline" as="h2" className="mt-3">
            CONTINUEZ VOTRE VISITE
          </Heading>
        </div>

        {/* ── 3-column bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Card 1 — Fleet ── */}
          <Link
            href="/catalogue"
            className="group relative h-[256px] overflow-hidden bg-surface cursor-pointer block transition-transform duration-500 hover:scale-[1.02]"
          >
            {/* Background photo — lamborghini hero */}
            <Image
              src="/images/cars/lamborghini-aventador-svj/hero.jpg"
              alt="Voir le catalogue Ares Drive"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Dark gradient overlay — bottom fade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"
            />

            {/* Card content */}
            <div className="absolute bottom-6 left-6 z-10">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                FLEET
              </p>
              <p
                className="mt-2 text-[22px] font-bold uppercase tracking-[0.08em] text-white leading-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                VOIR LE CATALOGUE
              </p>
              <p className="mt-1 text-xl text-primary" aria-hidden="true">→</p>
            </div>
          </Link>

          {/* ── Card 2 — Lifestyle ── */}
          <Link
            href="/a-propos"
            className="group relative h-[256px] overflow-hidden bg-surface cursor-pointer block transition-transform duration-500 hover:scale-[1.02]"
          >
            {/* Background photo — ferrari */}
            <Image
              src="/images/cars/ferrari-296-gtb.jpg"
              alt="Découvrir les expériences Ares Drive"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Dark gradient overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"
            />

            {/* Card content */}
            <div className="absolute bottom-6 left-6 z-10">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                LIFESTYLE
              </p>
              <p
                className="mt-2 text-[22px] font-bold uppercase tracking-[0.08em] text-white leading-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                EXPÉRIENCES ÉLITE
              </p>
              <p className="mt-1 text-xl text-primary" aria-hidden="true">→</p>
            </div>
          </Link>

          {/* ── Card 3 — 24/7 Network (dark surface, no image) ── */}
          <Link
            href="/reservation"
            className="group relative h-[256px] overflow-hidden bg-[#1a1a1a] cursor-pointer block transition-shadow duration-300 hover:shadow-[0px_0px_40px_rgba(223,37,49,0.15)]"
          >
            {/* Top-right availability label */}
            <p
              className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.1em] text-white/30 z-10"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              24/7
            </p>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8 z-10">
              <WhatsAppIcon />

              <p
                className="mt-4 text-[20px] font-bold uppercase tracking-[0.08em] text-white leading-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                DISPONIBILITÉ 24/7
              </p>

              {/* Cardo italic body — dimmed */}
              <Text
                italic
                dim
                size="sm"
                className="mt-2"
                as="span"
              >
                Réponse garantie sous 2h
              </Text>
            </div>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
