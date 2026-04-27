// tests/e2e/03-vehicle-detail.spec.ts
// ============================================================
// Vehicle detail page test suite
// Tests: content, specs, booking card, WhatsApp deep-link
// WhatsApp popup test uses context.waitForEvent with explicit
// allowance for popup-blocked environments (skipped in CI).
// ============================================================

import { test, expect, Browser } from '@playwright/test'
import { checkDarkBackground } from './helpers/design-checks'

async function getFirstVehicleHref(browser: Browser): Promise<string> {
  const page = await browser.newPage()
  await page.goto('/catalogue')
  await page.waitForSelector('[data-testid="car-card"]', { timeout: 15000 })
  const href =
    (await page
      .locator('[data-testid="car-card"]')
      .first()
      .getAttribute('href')) ?? '/voitures/lamborghini-aventador-svj'
  await page.close()
  return href
}

test.describe('Vehicle Detail', () => {
  let vehicleUrl: string

  test.beforeAll(async ({ browser }) => {
    vehicleUrl = await getFirstVehicleHref(browser)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto(vehicleUrl)
    await page.waitForLoadState('domcontentloaded')
  })

  // ── Page load ─────────────────────────────────────────────
  test('loads with dark background', async ({ page }) => {
    await expect(page).toHaveURL(vehicleUrl)
    await checkDarkBackground(page)
  })

  // ── Content ───────────────────────────────────────────────
  test('shows vehicle name as H1', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    const text = await h1.innerText()
    expect(text.trim().length).toBeGreaterThan(0)
  })

  test('shows price per day', async ({ page }) => {
    await expect(page.getByText(/€/).first()).toBeVisible()
    await expect(page.getByText(/jour/i).first()).toBeVisible()
  })

  test('shows technical specs (PUISSANCE, 0-100)', async ({ page }) => {
    await expect(page.getByText(/PUISSANCE/i).first()).toBeVisible()
    await expect(page.getByText(/0.?100/i).first()).toBeVisible()
  })

  // ── Booking card ──────────────────────────────────────────
  test('booking card is visible with WhatsApp button', async ({ page }) => {
    const card = page.locator('[data-testid="booking-card"]')
    await expect(card).toBeVisible()
    await expect(card.getByText(/RÉSERVER SUR WHATSAPP/i)).toBeVisible()
  })

  test('booking form fields accept input', async ({ page }) => {
    await page.getByLabel(/DATE DE DÉBUT/i).fill('2025-09-01')
    await page.getByLabel(/DATE DE FIN/i).fill('2025-09-03')
    await page.getByLabel(/VOTRE NOM/i).fill('Thomas Martin')
    await page.getByLabel(/TÉLÉPHONE/i).fill('+33612345678')

    // Verify values persisted
    await expect(page.getByLabel(/VOTRE NOM/i)).toHaveValue('Thomas Martin')
  })

  test('WhatsApp button builds a deterministic WhatsApp URL', async ({ page }) => {
    await page.getByLabel(/DATE DE DÉBUT/i).fill('2025-09-01')
    await page.getByLabel(/DATE DE FIN/i).fill('2025-09-03')
    await page.getByLabel(/VOTRE NOM/i).fill('Thomas Martin')
    await page.getByLabel(/TÉLÉPHONE/i).fill('+33612345678')

    await page.evaluate(() => {
      ;(window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl = ''
      window.open = (url?: string | URL) => {
        ;(window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl = String(url ?? '')
        return null
      }
    })

    await page
      .locator('[data-testid="booking-card"]')
      .getByText(/RÉSERVER SUR WHATSAPP/i)
      .click()

    const openedUrl = await page.evaluate(
      () => (window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl ?? '',
    )
    expect(openedUrl).toContain('whatsapp.com')
    expect(decodeURIComponent(openedUrl)).toContain('Ares Drive')
  })

  // ── Page stability ────────────────────────────────────────
  test('page body does not crash on load', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })
})
