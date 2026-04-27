import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants/navigation'
import { SITE } from '@/lib/constants/site'
import Container from '@/components/layout/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

// ============================================================
//  FOOTER
//  Background: surface-lowest (#0e0e0e) — maximum tonal depth
//  Top border: subtle Ignition Glow line (red/20 opacity)
//  3-column layout: Brand / Navigation / Informations
//  Bottom bar: copyright + design system signature
// ============================================================

const LEGAL_LINKS = [
  { label: 'Mentions légales',             href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
  { label: 'Fleet Telemetry',              href: '/catalogue' },
  { label: 'Contact',                      href: '/contact' },
] as const

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] w-full">

      {/* Top border — Ignition Glow subtle separator */}
      <div className="border-t border-[#df2531]/20">
        <Container className="py-16">

          {/* Main content — 3 columns grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">

            {/* Column 1 — Brand identity + WhatsApp CTA */}
            <div>
              <span className="font-[family-name:var(--font-hud)] font-bold text-[24px] uppercase tracking-[0.1em] text-white">
                {SITE.name}
              </span>

              <p className="mt-2 font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.2em] text-white/40">
                {SITE.tagline}
              </p>

              <div className="mt-6">
                <Text italic size="sm" className="!text-[14px] !text-white/50">
                  Location de supercars d&apos;exception à Paris et ses alentours.
                  Disponible 7j/7 sur WhatsApp.
                </Text>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 flex justify-center md:justify-start">
                <a
                  href="https://wa.me/XXXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-center bg-[#df2531] text-white px-8 py-3 rounded-none font-[family-name:var(--font-hud)] font-bold text-xs uppercase tracking-[0.2em] transition-shadow duration-200 hover:shadow-[0px_0px_12px_#df2531]"
                >
                  NOUS CONTACTER
                </a>
              </div>
            </div>

            {/* Column 2 — Navigation links */}
            <div>
              <Heading variant="section-label" as="h3">
                NAVIGATION
              </Heading>

              <ul className="mt-6 flex flex-col items-center md:items-start gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-[#df2531] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/reservation"
                    className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-[#df2531] transition-colors duration-200"
                  >
                    Réservation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Legal & informational links */}
            <div>
              <Heading variant="section-label" as="h3">
                INFORMATIONS
              </Heading>

              <ul className="mt-6 flex flex-col items-center md:items-start gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-hud)] text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-[#df2531] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom bar separator */}
          <div className="mt-16 h-[1px] bg-[#df2531]/10" />

          {/* Bottom bar — copyright + DS signature */}
          <div className="pt-8 pb-4 flex flex-col lg:flex-row justify-between items-center gap-6 text-center">
            <span className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.15em] text-white/30">
              {SITE.copyright}
            </span>
            <span className="font-[family-name:var(--font-hud)] text-[12px] uppercase tracking-[0.2em] text-[#df2531] font-bold">
              MADE BY INNOVTECH
            </span>
            <span className="font-[family-name:var(--font-hud)] text-[11px] uppercase tracking-[0.15em] text-white/15">
              THE KINETIC NOIR.
            </span>
          </div>

        </Container>
      </div>

    </footer>
  )
}
