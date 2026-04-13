import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue — Ares Drive',
};

/* ======================================================
   PLACEHOLDER — CATALOGUE
   Temporary page to unblock the build.
   Will be replaced with full implementation.
   ====================================================== */

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-[#131313] overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-[88px]">

        {/* Red ambient glow — decorative */}
        <div
          aria-hidden="true"
          className="absolute w-[400px] h-[400px] bg-[#df2531] blur-[120px] opacity-[0.06] rounded-full pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">

          {/* Eyebrow label */}
          <p className="font-sans text-[#df2531] text-[11px] uppercase tracking-[0.25em] mb-4">
            EN COURS DE DÉVELOPPEMENT
          </p>

          {/* Page title */}
          <h1 className="font-sans text-white text-[48px] md:text-[64px] uppercase tracking-[0.06em] leading-tight">
            LA FLOTTE
          </h1>

          {/* Separator */}
          <div className="w-[1px] h-[48px] bg-[#df2531] mt-8 mb-8" />

          {/* Description */}
          <p className="font-body italic text-white/50 text-[17px] leading-relaxed max-w-[440px]">
            Cette page est en cours de développement.
            Elle sera disponible très prochainement.
          </p>

          {/* Back to home */}
          <Link
            href="/"
            className="mt-10 inline-block bg-[#df2531] text-white font-sans text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:shadow-[0px_0px_12px_#df2531] transition-shadow duration-200"
          >
            RETOUR À L&apos;ACCUEIL
          </Link>
        </div>
      </div>
    </main>
  );
}
