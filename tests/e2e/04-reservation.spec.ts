// tests/e2e/04-reservation.spec.ts
// ============================================================
// Reservation wizard test suite
// Tests: step indicator, vehicle selection, dates, contact,
//        WhatsApp deep-link on submit
// ============================================================

import { test, expect } from '@playwright/test'

test.describe('Reservation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reservation')
    await page.waitForLoadState('domcontentloaded')
  })

  // ── Page load ─────────────────────────────────────────────
  test('loads with main heading', async ({ page }) => {
    await expect(
      page.getByRole('heading').filter({ hasText: /RÉSERV/i }).first(),
    ).toBeVisible()
  })

  // ── Step indicator ────────────────────────────────────────
  test('3-step indicator is visible', async ({ page }) => {
    await expect(page.getByText(/VÉHICULE/i).first()).toBeVisible()
    await expect(page.getByText(/DATES/i).first()).toBeVisible()
    await expect(
      page.getByText(/COORDONNÉES/i, { exact: false }).first(),
    ).toBeVisible()
  })

  // ── Step 1 — vehicle selector ─────────────────────────────
  test('step 1 shows at least one vehicle option', async ({ page }) => {
    const selector = page.locator('[data-testid="vehicle-selector"]')
    await expect(selector).toBeVisible()
    await expect(selector.locator('[role="button"]').first()).toBeVisible({
      timeout: 15000,
    })
  })

  test('CONTINUER button is disabled until a vehicle is selected', async ({
    page,
  }) => {
    // The continue button (contains "CONTINUER") should be disabled initially
    const nextBtn = page.getByRole('button', { name: /CONTINUER/i })
    await expect(nextBtn).toBeDisabled()
  })

  // ── Full 3-step happy path ─────────────────────────────────
  test('complete reservation flow builds a deterministic WhatsApp URL', async ({
    page,
  }) => {
    // ── Step 1: select first vehicle ─────────────────────────
    const selector = page.locator('[data-testid="vehicle-selector"]')
    await expect(selector.locator('[role="button"]').first()).toBeVisible({
      timeout: 15000,
    })
    await selector.locator('[role="button"]').first().click()

    const nextBtn1 = page.getByRole('button', { name: /CONTINUER/i })
    await expect(nextBtn1).toBeEnabled()
    await nextBtn1.click()

    // ── Step 2: fill dates ────────────────────────────────────
    await page.getByLabel(/DATE DE DÉBUT/i).fill('2025-09-10')
    await page.getByLabel(/DATE DE FIN/i).fill('2025-09-12')
    await expect(page.getByText(/2 JOUR/i)).toBeVisible()

    const nextBtn2 = page.getByRole('button', { name: /CONTINUER/i })
    await expect(nextBtn2).toBeEnabled()
    await nextBtn2.click()

    // ── Step 3: fill contact ──────────────────────────────────
    await page.getByLabel(/NOM COMPLET/i).fill('Marie Dupont')
    await page.getByLabel(/TÉLÉPHONE/i).fill('+33611223344')

    await page.evaluate(() => {
      ;(window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl = ''
      window.open = (url?: string | URL) => {
        ;(window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl = String(url ?? '')
        return null
      }
    })

    await page.getByRole('button', { name: /ENVOYER MA DEMANDE/i }).click()

    const openedUrl = await page.evaluate(
      () => (window as Window & { __openedWhatsappUrl?: string }).__openedWhatsappUrl ?? '',
    )
    expect(openedUrl).toContain('whatsapp.com')
    expect(decodeURIComponent(openedUrl)).toContain('Marie Dupont')
  })

  // ── Back button ───────────────────────────────────────────
  test('back button returns to step 1', async ({ page }) => {
    const selector = page.locator('[data-testid="vehicle-selector"]')
    await expect(selector.locator('[role="button"]').first()).toBeVisible({
      timeout: 15000,
    })
    await selector.locator('[role="button"]').first().click()
    await page.getByRole('button', { name: /CONTINUER/i }).click()

    // Go back
    await page.getByRole('button', { name: /RETOUR/i }).click()
    await expect(selector).toBeVisible()
  })
})
