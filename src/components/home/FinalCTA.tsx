// ============================================================
// FINAL CTA
// Closing section with large display headline and single action.
// Centered radial ghost gradient creates cinematic warmth.
// No Section wrapper — custom bg to allow precise gradient control.
// ============================================================

import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section
      className="w-full py-[8rem] bg-[#131313] relative overflow-hidden"
    >
      {/* Centered radial ghost gradient — red warmth at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(223,37,49,0.15) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-[900px] mx-auto px-8">

        {/* Display headline */}
        <Heading
          variant="display"
          as="h2"
          className="text-[clamp(42px,5vw,64px)]"
        >
          PRÊT À PRENDRE<br />LE VOLANT ?
        </Heading>

        {/* Subtext — Cardo italic, muted */}
        <Text italic muted size="lg">
          Votre supercar vous attend. Réservation rapide, réponse sous 2h.
        </Text>

        {/* Primary CTA button — large */}
        <Button
          variant="primary"
          href="/reservation"
          className="px-12 py-5 text-base tracking-[0.2em] mt-4"
        >
          RÉSERVER MA SUPERCAR
        </Button>

      </div>
    </section>
  );
}
