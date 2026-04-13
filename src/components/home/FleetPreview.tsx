// ============================================================
// FLEET PREVIEW
// 3-column showcase of the top featured vehicles.
// Each card: full-bleed image → dark gradient overlay → content.
// Hover: translateY(-4px) + red ambient glow shadow.
// Uses Card component as base surface with overflow-hidden.
// ============================================================

import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { featuredVehicles } from '@/lib/data/vehicles';
import { Vehicle } from '@/types/vehicle';

// ── Individual vehicle card ───────────────────────────────────

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/voitures/${vehicle.slug}`} className="block">
      {/* Wrapper handles hover transform + red glow shadow */}
      <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_24px_rgba(223,37,49,0.15)]">
        <Card
          surface="low"
          className="p-0 overflow-hidden"
        >
          {/* Image area — fixed height, full bleed */}
          <div className="relative h-[350px] w-full">
            <Image
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1616px) 33vw, 540px"
            />
            {/* Dark gradient overlay — fades image into card surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111111]" />
          </div>

          {/* Content area */}
          <div className="p-8 flex flex-col gap-3">

            {/* Category badge */}
            <Badge variant="category">{vehicle.category.toUpperCase()}</Badge>

            {/* Vehicle name — Space Grotesk Bold, 24px, uppercase */}
            <h3 className="font-[family-name:var(--font-hud)] font-bold text-white uppercase text-[24px] tracking-[0.05em] leading-tight">
              {vehicle.brand} {vehicle.name}
            </h3>

            {/* Tagline — Cardo italic, muted */}
            <p className="font-[family-name:var(--font-body)] italic text-[16px] text-white/70 leading-relaxed">
              {vehicle.tagline}
            </p>

            {/* Bottom row — price + chevron */}
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/[0.06]">
              <span className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.12em] text-white/70 group-hover:text-white transition-colors">
                À PARTIR DE €{vehicle.price.toLocaleString('fr-FR')} / JOUR
              </span>
              <span className="text-white/50 text-[18px] leading-none" aria-hidden>→</span>
            </div>

          </div>
        </Card>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────

export default function FleetPreview() {
  return (
    <Section surface="base">
      <Container>

        {/* Section header — headline left / catalogue link right */}
        <div className="flex justify-between items-end mb-12">
          <Heading variant="headline" as="h2">
            Notre Sélection
          </Heading>
          <Button variant="tertiary" href="/catalogue">
            Consulter tout le catalogue →
          </Button>
        </div>

        {/* 3-column vehicle grid */}
        <div className="grid grid-cols-3 gap-4">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

      </Container>
    </Section>
  );
}
