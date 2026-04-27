// ============================================================
// TELEMETRY BANNER — fleet stats strip under catalogue header
// ============================================================

import Container from '@/components/layout/Container'

interface TelemetryBannerProps {
  total: number
  available: number
}

export default function TelemetryBanner({ total, available }: TelemetryBannerProps) {
  const stats = [
    { label: 'Véhicules',   value: String(total) },
    { label: 'Disponibles', value: String(available) },
    { label: 'Livraison',   value: 'Paris' },
    { label: 'Réservation', value: '24h/24' },
  ]

  return (
    <div className="bg-[#0e0e0e] border-y border-white/[0.04]">
      <Container>
        <div className="flex items-center gap-10 md:gap-16 py-4 overflow-x-auto scrollbar-none">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-2.5 shrink-0">
              <span className="font-[family-name:var(--font-hud)] text-white font-bold text-[22px] leading-none">
                {stat.value}
              </span>
              <span className="font-[family-name:var(--font-hud)] text-[9px] uppercase tracking-[0.18em] text-white/25">
                {stat.label}
              </span>
            </div>
          ))}

          {/* Decorative separator line */}
          <div className="ml-auto shrink-0 w-[1px] h-4 bg-white/[0.08] hidden md:block" />
          <span className="shrink-0 font-[family-name:var(--font-hud)] text-[9px] uppercase tracking-[0.2em] text-[#df2531] hidden md:block">
            Ares Drive — La Collection
          </span>
        </div>
      </Container>
    </div>
  )
}
