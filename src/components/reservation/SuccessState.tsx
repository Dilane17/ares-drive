// ============================================================
// SUCCESS STATE
// Role: inline confirmation shown after WhatsApp redirect
// Design: red checkmark box, headline, reassurance copy, CTA
// ============================================================

import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

export default function SuccessState() {
  return (
    <div className="text-center py-12">
      {/* ── Red checkmark box ── */}
      <div className="w-16 h-16 bg-[#df2531] flex items-center justify-center mx-auto mb-6 shadow-[0px_0px_24px_rgba(223,37,49,0.4)]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Headline ── */}
      <Heading variant="headline" as="h2">DEMANDE ENVOYÉE !</Heading>

      {/* ── Reassurance copy ── */}
      <Text italic muted className="mt-4 max-w-[400px] mx-auto">
        Votre demande a été transmise sur WhatsApp.
        Notre équipe vous contacte sous 2h pour confirmer.
      </Text>

      {/* ── CTA ── */}
      <div className="mt-8">
        <Button variant="secondary" href="/">
          RETOUR À L'ACCUEIL
        </Button>
      </div>
    </div>
  )
}
