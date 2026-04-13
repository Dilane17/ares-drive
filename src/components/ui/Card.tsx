import { cn } from '@/lib/utils/cn';

export type CardSurface = 'low' | 'high';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    surface?: CardSurface;
    glow?: boolean;
}

const surfaceClasses: Record<CardSurface, string> = {
    low: 'bg-[#111111]',
    high: 'bg-[#2a2a2a]',
};

export function Card({ children, className, surface = 'low', glow = false }: CardProps) {
    return (
        <div
            className={cn(
                surfaceClasses[surface],
                'rounded-none p-8',
                // No-line rule — tonal carving only (no border by default)
                glow && 'border border-[#df2531] shadow-[0px_0px_12px_#df2531]',
                className,
            )}
        >
            {children}
        </div>
    );
}

export default Card;

/*
USAGE:
  <Card surface="low">
    <p>Contenu de la card</p>
  </Card>
  <Card surface="high" glow>
    <p>Card mise en avant avec Ignition Glow</p>
  </Card>
*/
