// components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import NavLink from '@/components/ui/NavLink'
import { NAV_LINKS } from '@/lib/constants/navigation'
import Button from '@/components/ui/Button'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const pathname = usePathname()

    return (
        <nav className={cn(
            'fixed top-0 left-0 w-full z-50 h-[88px] transition-all duration-300',
            scrolled
                ? 'bg-[#131313]/80 backdrop-blur-[20px] border-b border-[#df2531]/20'
                : 'bg-transparent'
        )}>
            <div className="max-w-[1616px] mx-auto px-8 h-full flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    {/* ARES DRIVE — Space Grotesk Bold, #e6bdba */}
                    <span className="font-[Space_Grotesk] font-bold text-[32px] text-[#e6bdba] tracking-[0.04em] uppercase">
                        ARES DRIVE
                    </span>
                </Link>

                {/* Liens — desktop */}
                <div className="hidden md:flex gap-[48px]">
                    {NAV_LINKS.map(link => {
                        const isActive = link.href === '/' 
                            ? pathname === '/' 
                            : pathname.startsWith(link.href);
                        
                        return (
                            <NavLink key={link.href} href={link.href} active={isActive}>
                                {link.label}
                            </NavLink>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <Button variant="primary" href="/reservation">Réserver</Button>

                {/* Menu burger — mobile */}
                <button className="md:hidden">
                    {/* icône burger ici */}
                </button>

            </div>
        </nav>
    )
}
