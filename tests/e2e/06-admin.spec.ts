// tests/e2e/06-admin.spec.ts
// ============================================================
// Admin backoffice test suite
// Tests: auth protection (redirect), login page, error handling
// ============================================================

import { test, expect } from '@playwright/test'

// ── Route protection ──────────────────────────────────────────
test.describe('Admin — Route Protection', () => {
  const protectedRoutes = [
    '/admin',
    '/admin/vehicules',
    '/admin/reservations',
    '/admin/vehicules/nouveau',
  ]

  for (const route of protectedRoutes) {
    test(`${route} redirects to /admin/login when unauthenticated`, async ({
      page,
    }) => {
      await page.goto(route)
      await page.waitForLoadState('domcontentloaded')
      await expect(page).toHaveURL('/admin/login')
    })
  }
})

// ── Login page ────────────────────────────────────────────────
test.describe('Admin — Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('domcontentloaded')
  })

  test('login form shows email, password and submit button', async ({
    page,
  }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    // Button text is "Se connecter" (see LoginForm.tsx:86)
    await expect(
      page.getByRole('button', { name: /se connecter/i }),
    ).toBeVisible()
  })

  test('login page has dark background', async ({ page }) => {
    const bg = await page.$eval('body', el =>
      window.getComputedStyle(el).backgroundColor,
    )
    expect(bg).not.toBe('rgb(255, 255, 255)')
  })

  test('shows error message on wrong credentials', async ({ page }) => {
    await page.locator('input[type="email"]').fill('wrong@test.com')
    await page.locator('input[type="password"]').fill('wrongpassword123')
    // Button text is "Se connecter" (see LoginForm.tsx:86)
    await page.getByRole('button', { name: /se connecter/i }).click()

    // loginAction returns 'Email ou mot de passe incorrect.' on failure
    await expect(
      page.getByText(/incorrect|invalide/i).first(),
    ).toBeVisible({ timeout: 10000 })
  })
})

// ── Authenticated admin tests ─────────────────────────────────
test.describe('Admin — Dashboard (authenticated)', () => {
  test.use({ storageState: 'tests/e2e/.auth/admin.json' })

  test.skip(
    !process.env.ADMIN_TEST_EMAIL,
    'Skip: set ADMIN_TEST_EMAIL and ADMIN_TEST_PASSWORD to run authenticated tests',
  )

  test('dashboard loads and shows sidebar', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL('/admin')
    await expect(page.locator('[data-testid="admin-sidebar"]')).toBeVisible()
  })

  test('vehicles management page loads', async ({ page }) => {
    await page.goto('/admin/vehicules')
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL('/admin/vehicules')
  })

  test('reservations management page loads', async ({ page }) => {
    await page.goto('/admin/reservations')
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveURL('/admin/reservations')
  })
})
