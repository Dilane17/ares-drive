// ============================================================
//  BRANDS MARQUEE
//  Role: instant premium impact — surfaces the fleet's depth
//  immediately after the hero without stealing vertical space.
//  Design: surface-lowest tonal break; pure CSS scroll, paused
//  on hover so users can read individual brand names.
// ============================================================

const BRANDS = [
  'FERRARI', 'LAMBORGHINI', 'PORSCHE', 'BENTLEY',
  'MCLAREN', 'ASTON MARTIN', 'MERCEDES-AMG', 'ALPINE',
  'BUGATTI', 'ROLLS-ROYCE',
] as const

export default function BrandsMarquee() {
  // Duplicate the array — the animation runs translateX(-50%), so
  // when the first copy scrolls out of view the second copy is
  // already in position for a seamless infinite loop.
  const track = [...BRANDS, ...BRANDS]

  return (
    <div className="bg-[#0e0e0e] border-y border-[#df2531]/10 h-[72px] overflow-hidden relative">

      {/* ---- Scrolling track ---- */}
      <div className="flex items-center h-full animate-marquee w-max">
        {track.map((brand, i) => (
          <span key={i} className="flex items-center shrink-0">

            {/* Brand name */}
            <span className="font-[family-name:var(--font-display)] text-[13px] uppercase tracking-[0.2em] text-white/25 hover:text-white/80 transition-colors duration-300 cursor-default whitespace-nowrap">
              {brand}
            </span>

            {/* Separator diamond */}
            <span className="text-[#df2531] opacity-60 mx-6 text-[10px] select-none" aria-hidden="true">
              ◆
            </span>

          </span>
        ))}
      </div>

    </div>
  )
}
