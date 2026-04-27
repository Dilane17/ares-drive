// tests/e2e/07-responsive.spec.ts
// ============================================================
// Responsive / mobile test suite
// Tests: no horizontal overflow, nav visible, forms usable
// Device: iPhone 13 viewport (390x844) — stays on Chromium
// Note: test.use({ defaultBrowserType }) cannot be used in a
// describe group (Playwright 1.59+), so we override only
// viewport + userAgent without switching browser engine.
// ============================================================

import { test, expect } from '@playwright/test'

// iPhone 13 viewport without switching to WebKit
const MOBILE_USE = {
  viewport: { width: 390, height: 844 },
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
}

test.describe('Responsive — Mobile (iPhone 13 viewport)', () => {
  test.use(MOBILE_USE)

  // ── Homepage ──────────────────────────────────────────────
  test('homepage loads with no horizontal overflow', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('body')).toBeVisible()

    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewport = page.viewportSize()?.width ?? 390
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewport + 1)
  })

  test('navbar is visible on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('hero heading is readable on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/LOCATION DE/i).first()).toBeVisible()
  })

  // ── Catalogue ─────────────────────────────────────────────
  test('catalogue page loads with no horizontal overflow', async ({ page }) => {
    await page.goto('/catalogue')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('body')).toBeVisible()

    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewport = page.viewportSize()?.width ?? 390
    expect(bodyScrollWidth).toBeLessThanOrEqual(viewport + 1)
  })

  test('filter bar is visible on mobile', async ({ page }) => {
    await page.goto('/catalogue')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('[data-testid="filter-bar"]')).toBeVisible()
  })

  // ── Vehicle detail ────────────────────────────────────────
  test('vehicle detail page loads on mobile', async ({ page }) => {
    await page.goto('/catalogue')
    await page.waitForSelector('a[href^="/voitures/"]', { timeout: 10000 })
    await page.locator('a[href^="/voitures/"]').first().click()
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('body')).toBeVisible()
  })

  // ── Admin login ───────────────────────────────────────────
  test('admin login form is usable on mobile', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })
})
