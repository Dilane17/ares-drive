// ============================================================
// HERO SECTION
// Full-viewport opener with split layout: text left / car right.
// Fixed Navbar is 88px tall and overlays, so we apply pt-[88px]
// to ensure content starts below it.
// Red radial blurs provide cinematic depth — Kinetic Noir DS.
// ============================================================

import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section data-testid="hero-section" className="relative min-h-screen bg-[#131313] flex items-center overflow-hidden">

      {/* Background — centered red radial blur (atmospheric depth) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[700px] h-[700px] bg-[#df2531] blur-[75px] opacity-20 rounded-full" />
      </div>

      {/* Inner layout — two equal columns */}
      <div className="max-w-[1616px] mx-auto px-8 w-full flex flex-col lg:flex-row items-center min-h-screen pt-[88px]">

        {/* ── Left column — text content ─────────────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:pr-16 relative z-10">

          {/* Display heading — Space Grotesk Bold 85px (scaled down on mobile) */}
          <h1
            className="font-[family-name:var(--font-hud)] text-[56px] md:text-[85px] leading-[1.0] uppercase tracking-[0.025em] font-bold text-white"
          >
            LOCATION DE<br />SUPERCARS
          </h1>

          {/* Red accent border + subtitle paragraph */}
          <div className="border-l-4 border-[#df2531] pl-6">
            <p className="font-[family-name:var(--font-hud)] text-[20px] leading-[36px] text-[#e6bdba] not-italic">
              Accédez à une flotte de supercars d&apos;exception.{' '}
              Ferrari, Lamborghini, Porsche — chaque trajet devient une
              expérience inoubliable.
            </p>
          </div>

          {/* CTA buttons row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Button variant="primary" href="/catalogue" className="w-full sm:w-auto justify-center">
              EXPLORER LE CATALOGUE
            </Button>
            <Button variant="secondary" href="/reservation" className="w-full sm:w-auto justify-center">
              RÉSERVER
            </Button>
          </div>
        </div>

        {/* ── Right column — car visual with ambient effects ───────── */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center z-10">

          {/* Red ambient glow behind image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: '0px 0px 50px 0px rgba(223,37,49,0.3)' }}
            aria-hidden
          />

          {/* Red blur circle overlay behind the car */}
          <div
            className="absolute inset-[61px] bg-[rgba(223,37,49,0.2)] blur-[32px] rounded-full z-0"
            aria-hidden
          />

          {/* Car image */}
          <div className="relative w-full aspect-[598/584] z-10">
            <Image
              src="/images/hero/hero-bg.png"
              alt="Lamborghini Aventador SVJ — Ares Drive"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1616px) 50vw, 808px"
            />
          </div>

          {/* HUD label — bottom-right telemetry readout */}
          <div className="absolute bottom-8 right-0 flex flex-col items-end gap-2 z-20" aria-hidden>
            <span className="font-[family-name:var(--font-hud)] text-[13px] font-medium text-[#df2531] tracking-[0.37em] uppercase">
              TELEMETRY SYSTEM V2.4
            </span>
            <div className="h-[2px] w-[192px] bg-[#df2531]" />
          </div>
        </div>

      </div>
    </section>
  );
}
