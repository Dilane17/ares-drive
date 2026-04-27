// tests/e2e/02-catalogue.spec.ts
// ============================================================
// Catalogue page test suite
// Tests: page load, vehicle cards, category filters, navigation
// ============================================================

import { test, expect } from '@playwright/test'
import { checkDarkBackground } from './helpers/design-checks'

test.describe('Catalogue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalogue')
    await page.waitForLoadState('domcontentloaded')
  })

  // ── Page load ─────────────────────────────────────────────
  test('loads with dark background', async ({ page }) => {
    await checkDarkBackground(page)
  })

  test('displays main heading', async ({ page }) => {
    await expect(page.getByText(/FLOTTE/i).first()).toBeVisible()
  })

  // ── Filter bar ────────────────────────────────────────────
  test('filter bar shows all category pills', async ({ page }) => {
    const bar = page.locator('[data-testid="filter-bar"]')
    await expect(bar).toBeVisible()
    for (const label of ['TOUS', 'SUPERCAR', 'SUV', 'CABRIOLET', 'BERLINE']) {
      await expect(bar.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  // ── Vehicle cards ─────────────────────────────────────────
  test('grid renders vehicle cards with price and specs', async ({ page }) => {
    await page.waitForSelector('[data-testid="car-card"]', { timeout: 15000 })
    const firstCard = page.locator('[data-testid="car-card"]').first()
    await expect(firstCard).toBeVisible()
    await expect(firstCard.getByText(/€/).first()).toBeVisible()
    await expect(firstCard.getByText(/CH/i).first()).toBeVisible()
  })

  // ── Category filters ──────────────────────────────────────
  test('filtering by SUPERCAR shows supercar category badges', async ({
    page,
  }) => {
    await page.waitForSelector('[data-testid="car-card"]', { timeout: 15000 })

    await page
      .locator('[data-testid="filter-bar"]')
      .getByRole('button', { name: /SUPERCAR/i })
      .click()

    await expect(
      page.locator('[data-testid="car-grid"]').getByText('SUPERCAR').first(),
    ).toBeVisible()
  })

  test('clicking TOUS resets the filter', async ({ page }) => {
    await page.waitForSelector('[data-testid="car-card"]', { timeout: 15000 })
    const totalBefore = await page.locator('[data-testid="car-card"]').count()

    await page
      .locator('[data-testid="filter-bar"]')
      .getByRole('button', { name: /SUV/i })
      .click()

    await expect(page.locator('[data-testid="car-grid"]').getByText('SUV').first()).toBeVisible()

    await page
      .locator('[data-testid="filter-bar"]')
      .getByRole('button', { name: /TOUS/i })
      .click()

    await expect(page.locator('[data-testid="car-card"]').first()).toBeVisible()

    const totalAfter = await page.locator('[data-testid="car-card"]').count()
    expect(totalAfter).toBe(totalBefore)
  })

  // ── Navigation from card ───────────────────────────────────
  test('clicking a car card navigates to the vehicle detail page', async ({
    page,
  }) => {
    await page.waitForSelector('[data-testid="car-card"]', { timeout: 15000 })
    const firstCard = page.locator('[data-testid="car-card"]').first()
    const href = await firstCard.getAttribute('href')
    expect(href).toMatch(/^\/voitures\//)
    await firstCard.click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL(href!)
  })
})
