{/* ============================================================
    ABOUT HERO
    Role: Full-viewport cinematic opener — establishes editorial
    tone for the about page. More personal than homepage hero.
    Design: Centered layout, radial red glow, scroll indicator,
    decorative vertical accent line below subtitle.
    ============================================================ */}

import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

export default function AboutHero() {
  return (
    <div className="relative min-h-screen bg-surface flex flex-col items-center justify-center text-center px-8 overflow-hidden">

      {/* ── Radial glow — decorative cinematic bleed ── */}
      <div
        aria-hidden="true"
        className="absolute w-[600px] h-[600px] bg-primary blur-[120px] rounded-full opacity-10 pointer-events-none"
      />

      {/* ── Main content — vertically + horizontally centered ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Eyebrow label */}
        <Heading variant="section-label" as="h3" className="mb-6">
          NOTRE HISTOIRE
        </Heading>

        {/* Display title — two-line treatment, line 2 in primary red */}
        <Heading
          variant="display"
          as="h1"
          className="text-[80px] lg:text-[96px] tracking-[0.04em] leading-none"
        >
          <span className="block text-white">L&apos;HISTOIRE</span>
          <span className="block text-primary">ARES DRIVE</span>
        </Heading>

        {/* Subtitle — Cardo italic body copy */}
        <Text
          italic
          muted
          size="lg"
          className="max-w-[600px] mt-8 leading-relaxed"
        >
          Née de la passion pour l&apos;automobile d&apos;exception,
          Ares Drive met à votre disposition une flotte exclusive
          de supercars et véhicules de prestige.
        </Text>

        {/* ── Decorative bottom element — vertical accent + location tag ── */}
        <div className="mt-12 flex flex-col items-center">
          <div className="w-px h-[60px] bg-primary" />
          <p
            className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/20"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            PARIS · FRANCE · EST. 2020
          </p>
        </div>
      </div>

      {/* ── Scroll indicator — anchored to bottom ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-[48px] bg-primary/40" />
        <p
          className="text-[10px] uppercase tracking-[0.2em] text-white/30"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          DÉFILER
        </p>
      </div>
    </div>
  );
}
