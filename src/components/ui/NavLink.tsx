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
                'relative font-[family-name:var(--font-hud)]',
                'text-[14px] font-bold uppercase tracking-[0.2em]',
                'transition-colors duration-200 py-1',
                active
                    ? 'text-white'
                    : 'text-white/70 hover:text-white',
                className,
            )}
        >
            {children}
            {active && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#df2531]" aria-hidden />
            )}
        </Link>
    );
}

export default NavLink;

/*
USAGE:
  <NavLink href="/catalogue">Catalogue</NavLink>
  <NavLink href="/reservation" active>Réservation</NavLink>
*/
