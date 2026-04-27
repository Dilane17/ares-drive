// tests/e2e/05-static-pages.spec.ts
// ============================================================
// Static pages test suite
// Tests: About, Contact form submit, legal pages load
// ============================================================

import { test, expect } from '@playwright/test'
import { checkDarkBackground } from './helpers/design-checks'

// ── About page ────────────────────────────────────────────────
test.describe('About Page (/a-propos)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/a-propos')
    await page.waitForLoadState('domcontentloaded')
  })

  test('loads with dark background', async ({ page }) => {
    await checkDarkBackground(page)
  })

  test('page body is visible', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })

  test('mentions Ares Drive', async ({ page }) => {
    await expect(page.getByText(/Ares Drive/i).first()).toBeVisible()
  })

  test('displays brand values — EXCLUSIVITÉ, CONFIANCE, SERVICE', async ({
    page,
  }) => {
    for (const value of ['EXCLUSIVITÉ', 'CONFIANCE', 'SERVICE']) {
      await expect(
        page.getByText(value, { exact: false }).first(),
      ).toBeVisible({ timeout: 10000 })
    }
  })
})

// ── Contact page ──────────────────────────────────────────────
test.describe('Contact Page (/contact)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('domcontentloaded')
  })

  test('loads with dark background', async ({ page }) => {
    await checkDarkBackground(page)
  })

  test('shows Paris address', async ({ page }) => {
    await expect(page.getByText(/Champs-Élysées/i).first()).toBeVisible()
  })

  test('contact form has all required fields', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]')
    await expect(form).toBeVisible()
    await expect(form.getByLabel(/NOM/i).first()).toBeVisible()
    await expect(form.getByLabel(/EMAIL/i).first()).toBeVisible()
    await expect(form.getByLabel(/OBJET/i).first()).toBeVisible()
    await expect(form.locator('textarea').first()).toBeVisible()
  })

  test('submitting form shows success state', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]')

    await form.getByLabel(/NOM/i).first().fill('Jean Dupont')
    await form.getByLabel(/EMAIL/i).first().fill('jean@example.com')
    await form.getByLabel(/OBJET/i).first().fill('Question location')
    await form.locator('textarea').first().fill("Bonjour, j'aimerais en savoir plus.")

    await form.getByRole('button', { name: /ENVOYER/i }).click()

    // ContactMain simulates 1s async then sets submitted=true
    await expect(page.getByText(/MESSAGE ENVOYÉ/i).first()).toBeVisible({
      timeout: 5000,
    })
  })

  test('WhatsApp button is visible', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /WHATSAPP/i }).first(),
    ).toBeVisible()
  })
})

// ── Legal pages ───────────────────────────────────────────────
test.describe('Legal Pages', () => {
  for (const path of ['/mentions-legales', '/confidentialite']) {
    test(`${path} loads without error`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('domcontentloaded')
      await expect(page.locator('body')).toBeVisible()
      await checkDarkBackground(page)
    })
  }
})
