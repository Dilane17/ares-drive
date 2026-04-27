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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const pathname = usePathname()

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [mobileMenuOpen])

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-[88px] pointer-events-none">
            {/* Background layer with backdrop-blur. 
                Kept separate from the `nav` container so it doesn't force
                `nav` to become a containing block for `fixed` children. */}
            <div className={cn(
                'absolute inset-0 transition-all duration-300 pointer-events-auto',
                scrolled
                    ? 'bg-[#131313]/80 backdrop-blur-[20px] border-b border-[#df2531]/20'
                    : 'bg-transparent'
            )} />

            {/* Navbar Content */}
            <div className="relative z-10 max-w-[1616px] mx-auto px-8 h-full flex items-center justify-between pointer-events-auto">

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

                {/* CTA Button — desktop */}
                <div className="hidden md:block">
                    <Button variant="primary" href="/reservation">Réserver</Button>
                </div>

                {/* Menu burger button — mobile */}
                <button 
                    className="md:hidden relative z-[60] p-2 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? (
                        // Close Icon
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        // Hamburger Icon
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                'fixed inset-0 bg-[#0e0e0e] z-[55] flex flex-col items-center justify-center transition-all duration-300 md:hidden pointer-events-auto',
                mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            )}>
                <div className="flex flex-col items-center gap-8 w-full px-8">
                    {NAV_LINKS.map(link => {
                        const isActive = link.href === '/' 
                            ? pathname === '/' 
                            : pathname.startsWith(link.href);
                        
                        return (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className={cn(
                                    'font-[family-name:var(--font-hud)] text-[22px] font-bold uppercase tracking-[0.2em] transition-colors',
                                    isActive ? 'text-[#df2531]' : 'text-white'
                                )}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    
                    <div className="mt-8 w-full max-w-[280px]">
                        <Button variant="primary" href="/reservation" className="w-full justify-center">
                            RÉSERVER
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
