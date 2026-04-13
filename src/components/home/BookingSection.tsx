// ============================================================
// BOOKING SECTION
// Contact/booking form with WhatsApp deep-link submission.
// Client component — needs useState for controlled form fields.
// Layout: left 1/3 descriptive copy / right 2/3 form grid.
// bg-[#0e0e0e] (surface-lowest) = maximum visual depth.
// ============================================================

'use client';

import { useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Heading from '@/components/ui/Heading';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { buildWhatsAppUrl, buildBookingMessage } from '@/lib/utils/whatsapp';
import { vehicles } from '@/lib/data/vehicles';

export default function BookingSection() {
  // ── Form state ──────────────────────────────────────────────
  const [model, setModel] = useState('');
  const [dates, setDates] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  // ── WhatsApp submission ──────────────────────────────────────
  function handleSubmit() {
    const message = buildBookingMessage({ model, dates, name, contact });
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <Section surface="lowest">
      <Container>

        {/* Inner card — elevated slightly from section bg */}
        <div className="bg-[#131313] p-16">

          <div className="flex gap-16">

            {/* ── Left column — copy (1/3) ──────────────────── */}
            <div className="w-1/3 flex flex-col gap-6 justify-center">

              <Heading variant="headline" as="h2">
                VOTRE PROCHAINE EXPÉRIENCE
              </Heading>

              <p className="font-[family-name:var(--font-body)] italic text-[18px] leading-relaxed text-white/70">
                Prenez le contrôle. Remplissez les détails et laissez notre
                conciergerie s&apos;occuper du reste.
              </p>

            </div>

            {/* ── Right column — form (2/3) ─────────────────── */}
            <div className="w-2/3 flex flex-col gap-8">

              {/* 2×2 input grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-8">

                {/* Model select — native select styled as Input */}
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="booking-model"
                    className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-[family-name:var(--font-hud)]"
                  >
                    Modèle souhaité
                  </label>
                  <select
                    id="booking-model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-[#0e0e0e] text-white border-0 border-b-2 border-white/20 rounded-none outline-none px-0 py-3 font-[family-name:var(--font-body)] italic transition-all duration-200 focus:border-b-[#df2531] focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)] appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0e0e0e] not-italic">
                      Sélectionner un modèle
                    </option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={`${v.brand} ${v.name}`} className="bg-[#0e0e0e] not-italic">
                        {v.brand} {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <Input
                  label="Dates de location"
                  placeholder="JJ/MM/AAAA - JJ/MM/AAAA"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />

                {/* Full name */}
                <Input
                  label="Nom complet"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Contact */}
                <Input
                  label="Email / Téléphone"
                  placeholder="+33 6 00 00 00 00"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />

              </div>

              {/* Full-width WhatsApp submit button */}
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="w-full justify-center py-5 text-sm tracking-[0.2em]"
              >
                ENVOYER MA DEMANDE SUR WHATSAPP
              </Button>

            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
}
