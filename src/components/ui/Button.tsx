import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
    variant?: ButtonVariant;
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: [
        'bg-[#df2531] text-white',
        'px-8 py-3',
        'rounded-none',
        'font-bold text-xs uppercase tracking-[0.2em]',
        'border-none outline-none',
        'transition-shadow duration-200',
        'hover:shadow-[0px_0px_12px_#df2531]',
        'inline-flex items-center justify-center text-center',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none',
    ].join(' '),

    secondary: [
        'bg-transparent text-white',
        'px-8 py-3',
        'rounded-none',
        'border border-white/30',
        'font-bold text-xs uppercase tracking-[0.2em]',
        'transition-all duration-200',
        'hover:border-[#df2531] hover:shadow-[0px_0px_8px_rgba(223,37,49,0.3)]',
        'inline-flex items-center justify-center text-center',
        'disabled:opacity-40 disabled:cursor-not-allowed',
    ].join(' '),

    tertiary: [
        'bg-transparent text-white',
        'px-0 py-1',
        'rounded-none border-none',
        'uppercase tracking-[0.15em] text-xs',
        'btn-tertiary', // CSS animation class in globals.css
        'inline-flex items-center justify-center text-center',
        'disabled:opacity-40 disabled:cursor-not-allowed',
    ].join(' '),
};

export function Button({
    variant = 'primary',
    children,
    className,
    href,
    onClick,
    disabled = false,
    type = 'button',
}: ButtonProps) {
    const classes = cn(variantClasses[variant], className);

    if (href) {
        return (
            <Link href={href} className={cn(classes, disabled && 'pointer-events-none opacity-40')}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}

export default Button;

/*
USAGE:
  <Button variant="primary" href="/reservation">Réserver</Button>
  <Button variant="secondary" onClick={() => {}}>En savoir plus</Button>
  <Button variant="tertiary">Voir la flotte</Button>
*/
