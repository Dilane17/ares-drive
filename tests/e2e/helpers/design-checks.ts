// tests/e2e/helpers/design-checks.ts
// ============================================================
// Reusable design system validation helpers
// Checks that Kinetic Noir DS rules are respected:
//   - Dark backgrounds only (#131313 or darker)
//   - Brand red #df2531 present on CTAs / accents
//   - Page titles match expected pattern
// ============================================================

import { Page, expect } from '@playwright/test'

// ── Body must not be white or near-white ────────────────────
export async function checkDarkBackground(
  page: Page,
  selector: string = 'body',
) {
  const bg = await page.$eval(selector, el =>
    window.getComputedStyle(el).backgroundColor,
  )
  expect(bg, `Background of "${selector}" should not be white`).not.toBe(
    'rgb(255, 255, 255)',
  )
  expect(bg).not.toBe('rgb(248, 248, 248)')
  expect(bg).not.toBe('rgb(250, 250, 250)')
}

// ── Brand red rgb(223,37,49) must appear somewhere ──────────
export async function checkRedAccent(page: Page) {
  const hasRed = await page.evaluate(() => {
    for (const el of document.querySelectorAll('*')) {
      const s = window.getComputedStyle(el)
      if (
        s.color.includes('223, 37, 49') ||
        s.backgroundColor.includes('223, 37, 49')
      )
        return true
    }
    return false
  })
  expect(hasRed, 'Brand red #df2531 should be present on the page').toBe(true)
}

// ── Title must match a pattern ───────────────────────────────
export async function checkPageTitle(page: Page, pattern: string) {
  await expect(page).toHaveTitle(new RegExp(pattern, 'i'))
}
