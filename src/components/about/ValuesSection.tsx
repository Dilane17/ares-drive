{/* ============================================================
    VALUES SECTION
    Role: 3-column brand values — no card borders, tonal shift
    carving only. Communicates Exclusivité / Confiance / Service.
    Design: grid 3 cols, decorative large numbers, SVG icons,
    hover bg lift. Second and third columns have a subtle
    left border in primary/10.
    Ref: Figma node 84:598
    ============================================================ */}

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

/* ── Inline SVG icons — 32px, stroke-based, primary color ── */

function StarIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 3L19.6 11.8L29 12.7L22.5 18.6L24.6 28L16 23L7.4 28L9.5 18.6L3 12.7L12.4 11.8L16 3Z"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 3L28 7V16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16V7L16 3Z"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11 16L14.5 19.5L21 13"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 18V16C6 10.477 10.477 6 16 6C21.523 6 26 10.477 26 16V18"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="4" y="18" width="4" height="7" rx="0" stroke="#df2531" strokeWidth="1.5" />
      <rect x="24" y="18" width="4" height="7" rx="0" stroke="#df2531" strokeWidth="1.5" />
      <path
        d="M28 25V27C28 27.552 27.552 28 27 28H22"
        stroke="#df2531"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Value column data ── */

interface ValueItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    number: '01',
    icon: <StarIcon />,
    title: 'EXCLUSIVITÉ',
    description:
      "Une flotte rigoureusement sélectionnée pour garantir le meilleur de l'automobile de prestige. Chaque véhicule est choisi pour son excellence.",
  },
  {
    number: '02',
    icon: <ShieldIcon />,
    title: 'CONFIANCE',
    description:
      'Un service transparent, sans mauvaise surprise. Vous savez exactement ce que vous louez et à quel prix, dès le premier contact.',
  },
  {
    number: '03',
    icon: <HeadsetIcon />,
    title: 'SERVICE',
    description:
      'Disponibles 7j/7 sur WhatsApp, nous répondons à chaque demande avec réactivité et professionnalisme, de la réservation au retour des clés.',
  },
];

export default function ValuesSection() {
  return (
    <Section surface="base">
      <Container>

        {/* ── Section header ── */}
        <div className="text-center mb-20">
          <Heading variant="section-label" as="h3">
            NOS VALEURS
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            Ce qui nous définit
          </Heading>
          <Text italic muted className="text-[18px] max-w-[500px] mx-auto mt-4">
            Trois piliers fondamentaux qui guident chacune
            de nos actions au quotidien.
          </Text>
        </div>

        {/* ── 3-column values grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((item, index) => (
            <div
              key={item.number}
              className={cn(
                'p-10 transition-colors duration-300 hover:bg-[#1a1a1a]',
                // 2nd and 3rd columns get a subtle left border
                index > 0 && 'border-l border-primary/10',
              )}
            >
              {/* Decorative large number — ghost opacity */}
              <p
                className="text-[80px] font-bold leading-none mb-4 text-primary opacity-10 select-none"
                aria-hidden="true"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.number}
              </p>

              {/* Icon — 32px, primary color */}
              <div className="mb-6">{item.icon}</div>

              {/* Column title */}
              <Heading variant="headline" as="h3" className="text-[22px]">
                {item.title}
              </Heading>

              {/* Column description — Cardo italic */}
              <Text italic muted className="text-[16px] mt-4 leading-relaxed">
                {item.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
