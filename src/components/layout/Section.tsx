import { cn } from '@/lib/utils/cn';

export type SectionSurface = 'base' | 'low' | 'lowest' | 'high';

export interface SectionProps {
    children: React.ReactNode;
    className?: string;
    surface?: SectionSurface;
}

const surfaceBg: Record<SectionSurface, string> = {
    base: 'bg-[#131313]',
    low: 'bg-[#111111]',
    lowest: 'bg-[#0e0e0e]',
    high: 'bg-[#2a2a2a]',
};

export function Section({ children, className, surface = 'base' }: SectionProps) {
    return (
        <section
            className={cn(
                'w-full py-[8rem]',
                surfaceBg[surface],
                className,
            )}
        >
            {children}
        </section>
    );
}

export default Section;

/*
USAGE:
  <Section>
    <Container><FleetPreview /></Container>
  </Section>
  <Section surface="lowest">
    <Container><BookingSection /></Container>
  </Section>
  <Section surface="high" className="py-[4rem]">
    <StatsBar />
  </Section>
*/
