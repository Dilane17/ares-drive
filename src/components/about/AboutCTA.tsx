{/* ============================================================
    ABOUT CTA
    Role: Final conversion — drives users from about page to
    fleet or direct WhatsApp booking. Strongest editorial
    moment on the page.
    Design: Full-width, surface-lowest, centered radial red
    glow, two-line display headline, dual action buttons.
    Ref: Figma node 84:623 + 38:254
    ============================================================ */}

import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function AboutCTA() {
  return (
    <Section surface="lowest" className="py-[8rem] overflow-hidden">

      {/* ── Radial glow — decorative cinematic atmosphere ── */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary blur-[150px] opacity-[0.07] rounded-full pointer-events-none"
      />

      {/* ── Content — centered, above glow layer ── */}
      <div className="relative z-10 text-center flex flex-col items-center">

        {/* Eyebrow label */}
        <Heading variant="section-label" as="h3">
          PRÊT ?
        </Heading>

        {/* Display headline — two lines, line 2 in primary red */}
        <Heading
          variant="display"
          as="h2"
          className="mt-4 text-[56px] lg:text-[64px] tracking-[0.04em]"
        >
          <span className="block text-white">PRÊT À PRENDRE</span>
          <span className="block text-primary">LE VOLANT ?</span>
        </Heading>

        {/* Supporting body copy — Cardo italic */}
        <Text
          italic
          muted
          className="text-[18px] max-w-[500px] mx-auto mt-6 leading-relaxed"
        >
          Votre supercar vous attend.
          Réponse garantie sous 2 heures sur WhatsApp.
        </Text>

        {/* ── Dual CTA buttons ── */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" href="/reservation" className="px-12 py-4">
            RÉSERVER MAINTENANT
          </Button>
          <Button variant="secondary" href="/catalogue">
            VOIR LA FLOTTE
          </Button>
        </div>
      </div>
    </Section>
  );
}
