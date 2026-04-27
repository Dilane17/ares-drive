'use client'
// ============================================================
// AdminSidebar — fixed left navigation for /admin routes
// ============================================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/lib/actions/auth'

const navLinks = [
  { href: '/admin',              label: 'Dashboard',     icon: '▦' },
  { href: '/admin/vehicules',    label: 'Véhicules',     icon: '◈' },
  { href: '/admin/reservations', label: 'Réservations',  icon: '◉' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside data-testid="admin-sidebar" className="fixed left-0 top-0 h-screen w-64 bg-[#111111] border-r border-white/[0.06] flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/[0.06]">
        <p className="font-[family-name:var(--font-hud)] text-[9px] uppercase tracking-[0.3em] text-[#df2531] mb-1">
          Admin
        </p>
        <p className="font-[family-name:var(--font-hud)] text-white text-[17px] uppercase tracking-[0.1em]">
          Ares Drive
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map(({ href, label, icon }) => {
          const isActive =
            href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-4 py-3 text-[13px] uppercase tracking-[0.1em]
                font-[family-name:var(--font-hud)] transition-colors
                ${isActive
                  ? 'bg-[#df2531]/10 text-[#df2531] border-l-2 border-[#df2531] -ml-[2px]'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              <span className="text-[16px] leading-none">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-white/[0.06]">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-[13px] uppercase tracking-[0.1em] font-[family-name:var(--font-hud)] text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-[16px] leading-none">⊗</span>
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  )
}
