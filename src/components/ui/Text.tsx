import { cn } from '@/lib/utils/cn';

export type TextSize = 'sm' | 'md' | 'lg';

export interface TextProps {
    children: React.ReactNode;
    italic?: boolean;
    muted?: boolean;
    dim?: boolean;
    size?: TextSize;
    className?: string;
    as?: 'p' | 'span' | 'div' | 'blockquote';
}

const sizeClasses: Record<TextSize, string> = {
    sm: 'text-sm leading-relaxed',
    md: 'text-[18px] leading-relaxed',
    lg: 'text-[20px] leading-loose',
};

export function Text({
    children,
    italic = false,
    muted = false,
    dim = false,
    size = 'md',
    className,
    as: Tag = 'p',
}: TextProps) {
    return (
        <Tag
            className={cn(
                'font-[family-name:var(--font-body)]',
                sizeClasses[size],
                italic && 'italic',
                dim
                    ? 'text-white/40'
                    : muted
                        ? 'text-white/70'
                        : 'text-white',
                className,
            )}
        >
            {children}
        </Tag>
    );
}

export default Text;

/*
USAGE:
  <Text italic muted>Une expérience de conduite incomparable.</Text>
  <Text dim size="sm">* Conditions applicables</Text>
  <Text size="lg" italic>La route appartient à ceux qui osent.</Text>
*/
