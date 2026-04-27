// src/emails/ReservationNotification.tsx
// ============================================================
// Admin notification email — sent on every new reservation
// Uses React Email + Resend
// Design: Ares Drive brand (dark background, red accent)
// ============================================================

import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Row, Column,
} from '@react-email/components'

type ReservationNotificationProps = {
  vehicleName:   string
  vehicleBrand:  string
  clientName:    string
  clientPhone:   string
  clientEmail:   string
  startDate:     string
  endDate:       string
  message:       string
  pricePerDay:   number
  reservationId: string
  createdAt:     string
}

export default function ReservationNotification({
  vehicleName,
  vehicleBrand,
  clientName,
  clientPhone,
  clientEmail,
  startDate,
  endDate,
  message,
  pricePerDay,
  reservationId,
  createdAt,
}: ReservationNotificationProps) {

  const start = new Date(startDate)
  const end   = new Date(endDate)
  const days  = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  const total = days * pricePerDay

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ares-drive.vercel.app'

  return (
    <Html lang="fr">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* ── Header ── */}
          <Section style={styles.header}>
            <Heading style={styles.logo}>ARES DRIVE</Heading>
            <Text style={styles.logoSub}>NOUVELLE DEMANDE DE RÉSERVATION</Text>
          </Section>

          {/* ── Red accent line ── */}
          <Hr style={styles.redLine} />

          {/* ── Alert banner ── */}
          <Section style={styles.alertBanner}>
            <Text style={styles.alertText}>
              ⚡ UNE NOUVELLE DEMANDE VIENT D'ARRIVER
            </Text>
          </Section>

          {/* ── Vehicle info ── */}
          <Section style={styles.section}>
            <Heading style={styles.sectionTitle}>VÉHICULE DEMANDÉ</Heading>
            <Text style={styles.vehicleName}>
              {vehicleBrand.toUpperCase()} {vehicleName.toUpperCase()}
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* ── Reservation details ── */}
          <Section style={styles.section}>
            <Heading style={styles.sectionTitle}>DÉTAILS DE LA RÉSERVATION</Heading>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>DATE DE DÉBUT</Column>
              <Column style={styles.detailValue}>
                {start.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Column>
            </Row>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>DATE DE FIN</Column>
              <Column style={styles.detailValue}>
                {end.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Column>
            </Row>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>DURÉE</Column>
              <Column style={styles.detailValue}>
                {days} jour{days > 1 ? 's' : ''}
              </Column>
            </Row>

            <Row style={{ ...styles.detailRow, ...styles.totalRow }}>
              <Column style={styles.detailLabel}>TOTAL ESTIMÉ</Column>
              <Column style={styles.totalValue}>
                €{total.toLocaleString('fr-FR')}
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} />

          {/* ── Client info ── */}
          <Section style={styles.section}>
            <Heading style={styles.sectionTitle}>INFORMATIONS CLIENT</Heading>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>NOM</Column>
              <Column style={styles.detailValue}>{clientName}</Column>
            </Row>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>TÉLÉPHONE</Column>
              <Column style={{ ...styles.detailValue, color: '#df2531' }}>
                {clientPhone}
              </Column>
            </Row>

            {clientEmail && (
              <Row style={styles.detailRow}>
                <Column style={styles.detailLabel}>EMAIL</Column>
                <Column style={styles.detailValue}>{clientEmail}</Column>
              </Row>
            )}

            {message && (
              <Row style={styles.detailRow}>
                <Column style={styles.detailLabel}>MESSAGE</Column>
                <Column style={styles.detailValue}>{message}</Column>
              </Row>
            )}
          </Section>

          <Hr style={styles.divider} />

          {/* ── CTA ── */}
          <Section style={styles.ctaSection}>
            <Text style={styles.ctaText}>
              Connectez-vous au backoffice pour gérer cette réservation.
            </Text>
            {/* Plain anchor — React Email <Link> renders identically */}
            <a
              href={`${siteUrl}/admin/reservations`}
              style={styles.ctaButton}
            >
              VOIR DANS LE BACKOFFICE →
            </a>
          </Section>

          <Hr style={styles.redLine} />

          {/* ── Footer ── */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 ARES DRIVE — CONDUISEZ L'EXTRAORDINAIRE
            </Text>
            <Text style={styles.footerMeta}>
              Réservation #{reservationId.slice(0, 8).toUpperCase()}
              {' · '}
              Reçue le {new Date(createdAt).toLocaleString('fr-FR')}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ── Inline styles (required for broad email client support) ──
const styles = {
  body: {
    backgroundColor: '#0e0e0e',
    margin: '0',
    padding: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#131313',
  },
  header: {
    padding: '40px 40px 24px',
    textAlign: 'center' as const,
  },
  logo: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '4px',
    margin: '0',
  },
  logoSub: {
    color: '#df2531',
    fontSize: '11px',
    letterSpacing: '3px',
    margin: '8px 0 0',
  },
  redLine: {
    borderColor: '#df2531',
    borderTopWidth: '2px',
    margin: '0',
  },
  alertBanner: {
    backgroundColor: 'rgba(223,37,49,0.1)',
    padding: '16px 40px',
  },
  alertText: {
    color: '#df2531',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    margin: '0',
    textAlign: 'center' as const,
  },
  section: {
    padding: '32px 40px',
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    margin: '0 0 16px',
  },
  vehicleName: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
    margin: '0',
  },
  detailRow: {
    marginBottom: '12px',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
    letterSpacing: '2px',
    width: '40%',
    verticalAlign: 'top' as const,
    paddingTop: '2px',
  },
  detailValue: {
    color: '#ffffff',
    fontSize: '14px',
    width: '60%',
  },
  totalRow: {
    backgroundColor: 'rgba(223,37,49,0.08)',
    padding: '12px',
    marginTop: '8px',
  },
  totalValue: {
    color: '#df2531',
    fontSize: '22px',
    fontWeight: '700',
    width: '60%',
  },
  divider: {
    borderColor: 'rgba(255,255,255,0.06)',
    margin: '0 40px',
  },
  ctaSection: {
    padding: '32px 40px',
    textAlign: 'center' as const,
  },
  ctaText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
    marginBottom: '20px',
  },
  ctaButton: {
    backgroundColor: '#df2531',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    padding: '14px 32px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  footer: {
    padding: '24px 40px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '10px',
    letterSpacing: '2px',
    margin: '0 0 4px',
  },
  footerMeta: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: '10px',
    margin: '0',
  },
} as const
