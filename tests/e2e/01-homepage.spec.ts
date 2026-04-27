// tests/e2e/01-homepage.spec.ts
// ============================================================
// Homepage test suite
// Note: waitForLoadState('networkidle') is NOT used here —
// the BrandsMarquee CSS animation + Supabase connections keep
// the page from ever reaching networkidle in dev mode.
// We use 'domcontentloaded' + explicit element waits instead.
// ============================================================

import { test, expect } from '@playwright/test'
import { checkDarkBackground, checkRedAccent } from './helpers/design-checks'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  // ── Page load ─────────────────────────────────────────────
  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('/')
    await expect(page.locator('body')).toBeVisible()
  })

  // ── Design system ─────────────────────────────────────────
  test('has dark background — Kinetic Noir DS', async ({ page }) => {
    await checkDarkBackground(page, 'body')
  })

  test('has brand red #df2531 present', async ({ page }) => {
    // Wait for hero section which has the red glow
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await checkRedAccent(page)
  })

  // ── Navbar ────────────────────────────────────────────────
  test('navbar is visible with key links', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('nav').getByText('CATALOGUE')).toBeVisible()
  })

  // ── Hero section ──────────────────────────────────────────
  test('hero heading is visible', async ({ page }) => {
    await expect(
      page.locator('[data-testid="hero-section"]').getByText(/LOCATION DE/i),
    ).toBeVisible()
  })

  test('hero CTA "Explorer le catalogue" navigates to /catalogue', async ({
    page,
  }) => {
    // Target the hero section specifically to avoid the nav link
    const hero = page.locator('[data-testid="hero-section"]')
    await hero.getByRole('link', { name: /explorer le catalogue/i }).click()
    await expect(page).toHaveURL('/catalogue')
  })

  test('hero CTA "Réserver" navigates to /reservation', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-section"]')
    await hero.getByRole('link', { name: /réserver/i }).click()
    await expect(page).toHaveURL('/reservation')
  })

  // ── Brands marquee ────────────────────────────────────────
  test('brands marquee shows supercar brand names', async ({ page }) => {
    const marquee = page.locator('[data-testid="brands-marquee"]')
    await expect(marquee).toBeVisible()
    for (const brand of ['FERRARI', 'LAMBORGHINI', 'PORSCHE']) {
      await expect(marquee.getByText(brand).first()).toBeVisible()
    }
  })

  // ── Stats bar ─────────────────────────────────────────────
  test('stats bar shows key metrics', async ({ page }) => {
    const stats = page.locator('[data-testid="stats-bar"]')
    await expect(stats).toBeVisible()
    await expect(stats.getByText('15+').first()).toBeVisible()
    await expect(stats.getByText('24/7').first()).toBeVisible()
  })

  // ── Fleet preview ─────────────────────────────────────────
  test('fleet preview shows vehicle cards linking to /voitures/', async ({
    page,
  }) => {
    const section = page.locator('[data-testid="fleet-preview"]')
    await expect(section).toBeVisible()
    // Wait for Supabase data to render
    await expect(section.locator('a[href^="/voitures/"]').first()).toBeVisible({
      timeout: 15000,
    })
  })

  test('fleet preview "catalogue" link navigates to /catalogue', async ({
    page,
  }) => {
    const section = page.locator('[data-testid="fleet-preview"]')
    await section
      .getByRole('link', { name: /catalogue/i })
      .click()
    await expect(page).toHaveURL('/catalogue')
  })

  // ── FAQ accordion ─────────────────────────────────────────
  test('FAQ accordion opens and closes', async ({ page }) => {
    const faq = page.locator('[data-testid="faq-accordion"]')
    await faq.scrollIntoViewIfNeeded()
    await expect(faq).toBeVisible()

    const firstQuestion = faq
      .getByRole('button')
      .filter({ hasText: /âge minimum/i })
      .first()
    await firstQuestion.click()

    // Answer should reveal "25 ans"
    await expect(faq.getByText(/25 ans/i).first()).toBeVisible()

    // Click again to collapse and assert deterministic state
    await firstQuestion.click()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  })

  // ── Location section ──────────────────────────────────────
  test('location section shows Paris address', async ({ page }) => {
    await expect(page.getByText(/Champs-Élysées/i).first()).toBeVisible({
      timeout: 10000,
    })
  })
})
