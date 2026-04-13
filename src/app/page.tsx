// ============================================================
// HOME PAGE
// Server Component — composes all homepage sections in order.
// Layout (layout.tsx) already wraps children in <main>, so
// we return a fragment to avoid nested <main> elements.
//
// Section order follows the conversion funnel:
//   BLOC 1 — Hook & Impact    (Hero → BrandsMarquee)
//   BLOC 2 — Credibility      (StatsBar → HowItWorks)
//   BLOC 3 — Offer            (Features → FleetPreview)
//   BLOC 4 — Trust            (Testimonials → Location)
//   BLOC 5 — Conversion       (Booking → FAQ → FinalCTA)
// ============================================================

import HeroSection         from '@/components/home/HeroSection'
import BrandsMarquee       from '@/components/home/BrandsMarquee'
import StatsBar            from '@/components/home/StatsBar'
import HowItWorksSection   from '@/components/home/HowItWorksSection'
import FeaturesSection     from '@/components/home/FeaturesSection'
import FleetPreview        from '@/components/home/FleetPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import LocationSection     from '@/components/home/LocationSection'
import BookingSection      from '@/components/home/BookingSection'
import FAQAccordion        from '@/components/home/FAQAccordion'
import FinalCTA            from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      {/* BLOC 1 — Hook & Impact */}
      <HeroSection />
      <BrandsMarquee />

      {/* BLOC 2 — Credibility */}
      <StatsBar />
      <HowItWorksSection />

      {/* BLOC 3 — Offer */}
      <FeaturesSection />
      <FleetPreview />

      {/* BLOC 4 — Trust */}
      <TestimonialsSection />
      <LocationSection />

      {/* BLOC 5 — Conversion */}
      <BookingSection />
      <FAQAccordion />
      <FinalCTA />
    </>
  )
}
