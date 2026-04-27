// ============================================================
//  LOCATION SECTION
//  Role: critical trust signal — users must know where the
//  agency is and how to reach it before committing to WhatsApp.
//  Design: asymmetric full-width split layout; left side aligns
//  to the container grid while the map placeholder bleeds to
//  the right viewport edge. Grid overlay simulates a real map.
//  Note: the map background-image uses an inline style — the
//  only exception allowed for dynamic CSS gradient values.
// ============================================================

import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import { SITE } from '@/lib/constants/site'

export default function LocationSection() {
  return (
    // Section surface="base" with py overridden — vertical rhythm
    // is managed individually per column to allow the map to
    // bleed full height.
    <Section surface="base" className="py-0">
      <div className="flex flex-col lg:flex-row">

        {/* ============================================================
            LEFT COLUMN — Location info & contact details
            Aligned to the container grid via pl-container-align;
            right side bleeds freely toward the map.
            ============================================================ */}
        <div className="w-full lg:w-[45%] py-[8rem] pl-8 pl-container-align pr-8 lg:pr-16">

          {/* Section header */}
          <Heading variant="section-label" as="h3">
            LOCALISATION
          </Heading>
          <Heading variant="headline" as="h2" className="mt-4">
            OÙ NOUS TROUVER
          </Heading>
          <p className="mt-4 max-w-[400px] font-[family-name:var(--font-body)] italic text-[18px] leading-relaxed text-white/70">
            Situés au cœur de Paris, nous intervenons dans toute l&apos;Île-de-France.
            Livraison à domicile disponible 7j/7.
          </p>

          {/* ---- Info blocks ---- */}
          <div className="mt-10 flex flex-col gap-8">

            {/* Block 1 — Adresse */}
            <div>
              <p className="font-[family-name:var(--font-hud)] font-bold text-[10px] uppercase tracking-[0.2em] text-[#df2531]">
                ADRESSE
              </p>
              <p className="mt-2 font-[family-name:var(--font-hud)] text-[16px] text-white leading-snug">
                {SITE.address}
              </p>
            </div>

            {/* Block 2 — Horaires */}
            <div>
              <p className="font-[family-name:var(--font-hud)] font-bold text-[10px] uppercase tracking-[0.2em] text-[#df2531]">
                HORAIRES D&apos;OUVERTURE
              </p>
              <div className="mt-2 flex flex-col gap-1">
                <p className="font-[family-name:var(--font-hud)] text-[15px] text-white/70">
                  Lun – Ven : 9h00 – 20h00
                </p>
                <p className="font-[family-name:var(--font-hud)] text-[15px] text-white/70">
                  Sam – Dim : 10h00 – 18h00
                </p>
                <p className="font-[family-name:var(--font-hud)] font-bold text-[15px] text-[#df2531]">
                  Assistance WhatsApp : 24h/24 – 7j/7
                </p>
              </div>
            </div>

            {/* Block 3 — Contact direct */}
            <div>
              <p className="font-[family-name:var(--font-hud)] font-bold text-[10px] uppercase tracking-[0.2em] text-[#df2531]">
                CONTACT DIRECT
              </p>
              <p className="mt-2 font-[family-name:var(--font-hud)] font-bold text-[18px] text-white">
                {SITE.whatsapp}
              </p>
              <div className="mt-4">
                <a
                  href="https://wa.me/XXXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#df2531] text-white px-8 py-3 rounded-none font-[family-name:var(--font-hud)] font-bold text-xs uppercase tracking-[0.2em] transition-shadow duration-200 hover:shadow-[0px_0px_12px_#df2531]"
                >
                  NOUS REJOINDRE SUR WHATSAPP
                </a>
              </div>
            </div>

            {/* Block 4 — Zone de livraison */}
            <div>
              <p className="font-[family-name:var(--font-hud)] font-bold text-[10px] uppercase tracking-[0.2em] text-[#df2531]">
                ZONE DE LIVRAISON
              </p>
              <p className="mt-2 font-[family-name:var(--font-body)] italic text-[15px] leading-relaxed text-white/60">
                Paris intramuros · Île-de-France ·
                Aéroports CDG &amp; Orly · Hôtels &amp; résidences
              </p>
            </div>

          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN — Google Map Embed
            Real map embedded with CSS filter for dark mode.
            ============================================================ */}
        <div className="w-full lg:w-[55%] min-h-[560px] relative overflow-hidden bg-[#0e0e0e]">
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4764835626927!2d2.30489957691653!3d48.868172900015555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcc4cdfe195%3A0xe5ad980e12cc92c6!2s24%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sen!2sfr!4v1704250000000!5m2!1sen!2sfr" 
            width="100%" 
            height="100%" 
            style={{ 
              border: 0, 
              filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)',
              position: 'absolute',
              inset: 0,
            }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ares Drive Location"
          />

          {/* Bottom-left location label */}
          <div className="absolute bottom-8 left-8 bg-[#131313]/80 backdrop-blur-sm px-4 py-3 pointer-events-none">
            <p className="font-[family-name:var(--font-hud)] font-bold text-[11px] uppercase tracking-[0.15em] text-white">
              PARIS, FRANCE — 75008
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.1em] text-[#df2531]">
              CHAMPS-ÉLYSÉES
            </p>
          </div>

          {/* Top-right HUD badge */}
          <div className="absolute top-6 right-6 bg-[#df2531] px-3 py-1 pointer-events-none">
            <span className="font-[family-name:var(--font-hud)] font-bold text-[10px] uppercase tracking-[0.15em] text-white">
              ZONE ACTIVE
            </span>
          </div>

        </div>

      </div>
    </Section>
  )
}
