import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactMain from '@/components/contact/ContactMain';
import ContactBento from '@/components/contact/ContactBento';

export const metadata: Metadata = {
  title: 'Contact — Ares Drive',
  description:
    'Contactez Ares Drive pour réserver votre supercar à Paris. Réponse garantie sous 2h sur WhatsApp.',
};

export default function ContactPage() {
  return (
    <main>
      {/* Compact page header — direct and fast */}
      <ContactHero />

      {/* Core split layout — info left, form right */}
      <ContactMain />

      {/* Bento navigation shortcuts — fleet / about / booking */}
      <ContactBento />
    </main>
  );
}
