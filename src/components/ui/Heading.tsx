import { cn } from '@/lib/utils/cn';

export type HeadingVariant = 'display' | 'headline' | 'section-label';
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps {
    as?: HeadingTag;
    variant?: HeadingVariant;
    children: React.ReactNode;
    className?: string;
}

const variantClasses: Record<HeadingVariant, string> = {
    'display': [
        'font-[family-name:var(--font-display)]',
        'text-[64px] leading-[1.0]',
        'uppercase tracking-[0.1em]',
        'font-bold text-white',
    ].join(' '),

    'headline': [
        'font-[family-name:var(--font-display)]',
        'text-[40px] leading-[1.15]',
        'uppercase tracking-[0.08em]',
        'font-bold text-white',
    ].join(' '),

    'section-label': [
        'font-[family-name:var(--font-hud)]',
        'text-[11px] leading-none',
        'uppercase tracking-[0.2em]',
        'font-bold text-[#df2531]',
    ].join(' '),
};

const defaultTag: Record<HeadingVariant, HeadingTag> = {
    'display': 'h1',
    'headline': 'h2',
    'section-label': 'h3',
};

export function Heading({ as, variant = 'display', children, className }: HeadingProps) {
    const Tag = as ?? defaultTag[variant];

    return (
        <Tag className={cn(variantClasses[variant], className)}>
            {children}
        </Tag>
    );
}

export default Heading;

/*
USAGE:
  <Heading variant="display">Conduire l'extraordinaire</Heading>
  <Heading variant="headline" as="h2">Notre flotte</Heading>
  <Heading variant="section-label" as="h3">La Collection</Heading>
*/
