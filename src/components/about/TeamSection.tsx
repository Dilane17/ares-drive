{/* ============================================================
    TEAM SECTION
    Role: Humanizes the brand — founder + fleet manager profiles.
    2 placeholder cards at launch, designed to scale.
    Design: surface-lowest background, centered card row,
    photo area with gradient overlay, hover border + glow effect.
    ============================================================ */}

import Image from 'next/image';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';

/* ── Team member data ── */

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const team: TeamMember[] = [
  {
    name: 'ALEXANDRE M.',
    role: 'FONDATEUR & DIRECTEUR',
    bio: "Passionné d'automobile depuis l'enfance, fondateur d'Ares Drive en 2020.",
    photo: '/images/about/team-1.jpg',
  },
  {
    name: 'JULIEN R.',
    role: 'RESPONSABLE FLOTTE',
    bio: 'Expert en véhicules de prestige, garant de la qualité de chaque supercar.',
    photo: '/images/about/team-2.jpg',
  },
];

export default function TeamSection() {
  return (
    <Section surface="lowest">
      <Container>

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <Heading variant="section-label" as="h3">
            L&apos;ÉQUIPE
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            Les visages d&apos;Ares Drive
          </Heading>
        </div>

        {/* ── Team cards — centered row ── */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              className="w-[340px] bg-surface transition-all duration-300 hover:border hover:border-primary/20 hover:shadow-[0px_0px_30px_rgba(223,37,49,0.06)]"
            >
              {/* ── Photo area ── */}
              <div className="relative h-[280px] overflow-hidden bg-[#1a1a1a]">

                {/* Team member photo */}
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="340px"
                />

                {/* Bottom gradient — fades into card background */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-surface to-transparent pointer-events-none"
                />
              </div>

              {/* ── Card content ── */}
              <div className="p-6">

                {/* Member name — Space Grotesk bold, uppercase */}
                <p
                  className="text-[18px] font-bold uppercase tracking-[0.1em] text-white"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {member.name}
                </p>

                {/* Role — Space Grotesk small, primary red */}
                <p
                  className="mt-1 text-[12px] uppercase tracking-[0.15em] text-primary"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {member.role}
                </p>

                {/* Bio — Cardo italic, dimmed */}
                <p
                  className="mt-4 text-[14px] italic leading-relaxed text-white/50"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
