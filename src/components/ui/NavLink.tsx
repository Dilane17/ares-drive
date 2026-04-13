import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    className?: string;
    onClick?: () => void;
}

export function NavLink({ href, children, active = false, className, onClick }: NavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'font-[family-name:var(--font-hud)]',
                'text-[14px] font-bold uppercase tracking-[0.2em]',
                'transition-colors duration-200',
                active
                    ? 'text-[#df2531]'
                    : 'text-white/70 hover:text-white',
                className,
            )}
        >
            {children}
        </Link>
    );
}

export default NavLink;

/*
USAGE:
  <NavLink href="/catalogue">Catalogue</NavLink>
  <NavLink href="/reservation" active>Réservation</NavLink>
*/
