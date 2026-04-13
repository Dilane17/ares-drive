import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 'category' | 'status' | 'overlay';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    category: 'bg-[rgba(223,37,49,0.15)] text-[#df2531]',
    status: 'bg-white/[0.08] text-white/70',
    overlay: 'bg-black/50 backdrop-blur-sm text-white',
};

export function Badge({ children, variant = 'status', className }: BadgeProps) {
    return (
        <span
            className={cn(
                // base
                'inline-block px-[10px] py-[4px]',
                'rounded-none',
                'text-[11px] uppercase tracking-[0.1em] font-bold',
                // use Space Grotesk via CSS variable
                'font-[family-name:var(--font-hud)]',
                variantClasses[variant],
                className,
            )}
        >
            {children}
        </span>
    );
}

export default Badge;

/*
USAGE:
  <Badge variant="category">Supercar</Badge>
  <Badge variant="status">Disponible</Badge>
  <Badge variant="overlay">Nouveau</Badge>
*/
