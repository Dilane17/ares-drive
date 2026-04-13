import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import HistorySection from '@/components/about/HistorySection';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'À propos — Ares Drive',
  description:
    "Découvrez l'histoire et les valeurs d'Ares Drive, votre agence de location de supercars à Paris.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Full-viewport cinematic opener */}
      <AboutHero />

      {/* Asymmetric editorial split — origin story */}
      <HistorySection />

      {/* 3-column brand values */}
      <ValuesSection />

      {/* Founder + team profiles */}
      <TeamSection />

      {/* Final conversion — fleet or booking */}
      <AboutCTA />
    </main>
  );
}
