'use client';

/* ============================================================
    CONTACT MAIN
    Role: Core of the contact page — asymmetric split layout.
    Left: contact details + decorative map placeholder.
    Right: contact form with success state.
    Design: full-bleed section (no Container), left column
    aligns to container grid via pl-container-align.
    Ref: Figma node 39:358
    ============================================================ */

import { useState } from 'react';
import Section from '@/components/layout/Section';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/constants/site';
import { buildWhatsAppUrl } from '@/lib/utils/whatsapp';

/* ── Form state type ── */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactMain() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async — replace with real handler later
    await new Promise<void>((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Section surface="low" className="py-0 overflow-hidden">

      {/* ── Two-column split — no Container for asymmetric bleed ── */}
      <div className="flex flex-col lg:flex-row min-h-[800px]">

        {/* ════════════════════════════════════════════════════════
            LEFT COLUMN — Contact info + map
            Padding aligns content to Container grid
            ════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[38%] shrink-0 pl-container-align pr-8 lg:pr-12 py-20 flex flex-col justify-between">

          {/* ── Info blocks ── */}
          <div className="flex flex-col gap-10">

            {/* Block 1 — LOCALISATION */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                LOCALISATION
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <span
                  className="text-[16px] text-white"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  24 Avenue des Champs-Élysées
                </span>
                <span
                  className="text-[16px] text-white"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  75008 Paris, France
                </span>
              </div>
            </div>

            {/* Block 2 — LIGNE DIRECTE */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                LIGNE DIRECTE
              </p>
              <div className="mt-3">
                <a
                  href={`tel:${SITE.whatsapp.replace(/\s/g, '')}`}
                  className="text-[22px] font-bold text-white hover:text-primary transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {SITE.whatsapp}
                </a>
              </div>
            </div>

            {/* Block 3 — CONCIERGERIE */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                CONCIERGERIE
              </p>
              <div className="mt-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[16px] text-white/70 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            {/* Block 4 — HORAIRES */}
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                HORAIRES
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <span
                  className="text-[14px] text-white/70"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {SITE.hours.weekdays}
                </span>
                <span
                  className="text-[14px] text-white/70"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {SITE.hours.weekends}
                </span>
                <span
                  className="text-[14px] font-bold text-primary"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {`WhatsApp : ${SITE.hours.whatsapp}`}
                </span>
              </div>
            </div>

            {/* Block 5 — WhatsApp CTA */}
            <div>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    buildWhatsAppUrl('Bonjour, je souhaite obtenir des informations sur Ares Drive.'),
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="w-full bg-primary text-white px-8 py-3 rounded-none font-bold text-xs uppercase tracking-[0.2em] transition-shadow duration-200 hover:shadow-glow-primary disabled:opacity-40"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ÉCRIRE SUR WHATSAPP
              </button>
            </div>
          </div>

          {/* ── Map placeholder — grid overlay with center pin ── */}
          <div
            className="mt-10 relative overflow-hidden h-[240px] bg-surface-container-lowest"
          >
            {/* CSS grid lines overlay — inline style exception (dynamic bg-image) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(223,37,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(223,37,49,0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden="true"
            />

            {/* Center map marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Ping ring */}
              <span
                aria-hidden="true"
                className="absolute w-8 h-8 border border-primary/40 animate-ping opacity-40"
              />
              {/* Solid dot */}
              <span className="w-3 h-3 bg-primary" />
            </div>

            {/* Bottom address label */}
            <p
              className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              PARIS 75008 — CHAMPS-ÉLYSÉES
            </p>

            {/* Top-right status badge */}
            <div className="absolute top-4 right-4 bg-primary px-2 py-1">
              <span
                className="text-[9px] font-bold uppercase tracking-widest text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ZONE ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            RIGHT COLUMN — Contact form (tonal lift bg-surface)
            ════════════════════════════════════════════════════════ */}
        <div className="flex-1 bg-surface px-8 lg:px-16 py-20 flex flex-col justify-center">

          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center text-center py-16">

              {/* Red checkmark icon */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="24" cy="24" r="22" stroke="#df2531" strokeWidth="2" />
                <path
                  d="M14 24L21 31L34 17"
                  stroke="#df2531"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Heading variant="headline" as="h2" className="mt-6">
                MESSAGE ENVOYÉ !
              </Heading>

              <Text italic muted className="mt-4 max-w-[360px]">
                Merci pour votre message. Notre équipe vous
                répondra dans les plus brefs délais.
              </Text>

              <div className="mt-8">
                <Button variant="secondary" href="/">
                  RETOUR À L&apos;ACCUEIL
                </Button>
              </div>
            </div>
          ) : (
            /* ── Contact form ── */
            <form onSubmit={handleSubmit} noValidate>

              {/* Form header */}
              <Heading variant="section-label" as="h3">
                FORMULAIRE DE CONTACT
              </Heading>
              <Heading variant="headline" as="h2" className="mt-3 text-[32px]">
                ENVOYEZ-NOUS UN MESSAGE
              </Heading>
              <Text italic muted size="sm" className="mt-3">
                Nous répondons à toutes les demandes
                dans les plus brefs délais.
              </Text>

              {/* ── Form fields ── */}
              <div className="mt-10 flex flex-col gap-6">

                <Input
                  label="NOM COMPLET"
                  placeholder="Entrez votre nom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  label="EMAIL"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <Input
                  label="OBJET DE LA DEMANDE"
                  placeholder="Réservation, Partenariat, Presse..."
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />

                {/* ── Textarea — styled like Input but taller ── */}
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-(family-name:--font-hud)"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Votre message..."
                    rows={5}
                    className="w-full h-[140px] resize-none bg-surface-container-lowest text-white italic font-body text-base px-0 py-3 border-0 border-b-2 border-white/20 rounded-none outline-none placeholder:text-white/30 placeholder:not-italic transition-all duration-200 focus:border-b-primary focus:shadow-[0_2px_8px_rgba(223,37,49,0.3)]"
                  />
                </div>
              </div>

              {/* ── Submit button ── */}
              <div className="mt-8">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE →'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
