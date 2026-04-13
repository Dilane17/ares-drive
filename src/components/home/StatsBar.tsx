// ============================================================
// STATS BAR
// Tonal surface shift (#1a1a1a) just below the hero — creates
// visual separation without a border line (Kinetic Noir DS rule).
// Three key stats separated by red vertical dividers.
// ============================================================

export default function StatsBar() {
  return (
    <div className="w-full bg-[#1a1a1a] py-12">
      <div className="max-w-[1616px] mx-auto px-8">

        {/* Stats row — flex, centered, dividers between items */}
        <div className="flex items-center justify-center">

          {/* ── Stat 1 — Vehicles ───────────────────────────────── */}
          <div className="flex flex-col items-center gap-2 px-16">
            <span className="font-[family-name:var(--font-hud)] font-bold text-[40px] text-white leading-none">
              15+
            </span>
            <span className="font-[family-name:var(--font-hud)] text-[14px] text-white/50 uppercase tracking-[0.1em]">
              Véhicules disponibles
            </span>
          </div>

          {/* Vertical divider */}
          <div className="w-[2px] h-[48px] bg-[#df2531]/30" aria-hidden />

          {/* ── Stat 2 — Satisfaction ───────────────────────────── */}
          <div className="flex flex-col items-center gap-2 px-16">
            {/* Number + star icon on the same line */}
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-hud)] font-bold text-[40px] text-white leading-none">
                5
              </span>
              {/* Star icon — inline SVG, brand red */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#df2531"
                aria-label="étoile"
                className="mb-1"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-hud)] text-[14px] text-white/50 uppercase tracking-[0.1em]">
              Satisfaction client
            </span>
          </div>

          {/* Vertical divider */}
          <div className="w-[2px] h-[48px] bg-[#df2531]/30" aria-hidden />

          {/* ── Stat 3 — Assistance ─────────────────────────────── */}
          <div className="flex flex-col items-center gap-2 px-16">
            <span className="font-[family-name:var(--font-hud)] font-bold text-[40px] text-white leading-none">
              24/7
            </span>
            <span className="font-[family-name:var(--font-hud)] text-[14px] text-white/50 uppercase tracking-[0.1em]">
              Assistance WhatsApp
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
