{/* ============================================================
    CONTACT HERO
    Role: Compact page header — sets tone without consuming
    vertical space. Users arrived to contact, not browse.
    Design: Two-column layout (title left, badge right),
    subtle bottom-left red glow, accounts for fixed navbar.
    ============================================================ */}

import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Container from '@/components/layout/Container';

export default function ContactHero() {
  return (
    <div className="relative bg-surface pt-[140px] pb-[80px] overflow-hidden">

      {/* ── Decorative radial glow — bottom-left atmosphere ── */}
      <div
        aria-hidden="true"
        className="absolute left-[-100px] bottom-[-100px] w-[400px] h-[400px] bg-primary blur-[120px] rounded-full opacity-[0.08] pointer-events-none"
      />

      <Container className="relative z-10">

        {/* ── Two-column layout — title left / badge right ── */}
        <div className="flex justify-between items-end gap-8 flex-wrap">

          {/* ── LEFT — Eyebrow + title + subtitle ── */}
          <div className="max-w-[570px]">

            {/* Eyebrow */}
            <Heading variant="section-label" as="h3">
              CONTACTEZ-NOUS
            </Heading>

            {/* Main display title */}
            <Heading
              variant="display"
              as="h1"
              className="mt-4 text-[80px] lg:text-[96px] leading-none"
            >
              PARLONS-EN.
            </Heading>

            {/* Subtitle — Cardo italic */}
            <Text
              italic
              muted
              size="lg"
              className="mt-6 max-w-[460px] leading-relaxed"
            >
              Une question sur un véhicule, une demande
              spéciale ou simplement envie d&apos;en savoir plus ?
              Notre équipe est disponible 7j/7.
            </Text>
          </div>

          {/* ── RIGHT — Response time badge + availability note ── */}
          <div className="text-right">

            {/* Response badge — primary red pill */}
            <div className="inline-block bg-primary px-4 py-2">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                RÉPONSE SOUS 2H
              </span>
            </div>

            {/* Availability note */}
            <p
              className="mt-3 text-[13px] uppercase tracking-[0.1em] text-white/40"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Disponible sur WhatsApp · 7j/7
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
