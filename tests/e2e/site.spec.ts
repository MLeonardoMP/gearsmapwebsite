import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { instant } from "@next/playwright"

test.describe("GearsMap public site", () => {
  test("redirects the root to the default locale", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveURL(/\/es$/)
    await expect(page.locator("h1")).toContainText("Software de alta calidad")
  })

  test("renders localized content and metadata", async ({ page }) => {
    await page.goto("/en")

    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page).toHaveTitle(/GearsMap/)
    await expect(page.locator("h1")).toContainText("High-quality software")
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://gearsmap.com/en")
  })

  test("keeps the core project narrative translated in every locale", async ({ page }) => {
    const localeExpectations = {
      es: "MRV · Monitoreo, Reporte y Verificación",
      en: "MRV · Monitoring, Reporting and Verification",
      fr: "MRV · Suivi, notification et vérification",
    }

    for (const [locale, projectTitle] of Object.entries(localeExpectations)) {
      await page.goto(`/${locale}`)
      await expect(page.locator("html")).toHaveAttribute("lang", locale)
      await expect(page.getByRole("heading", { level: 3, name: projectTitle, exact: true })).toBeVisible()
      await expect(page.getByText(/MinMinas/).first()).toBeVisible()
    }
  })

  test("routes both commercial intents to the contact form", async ({ page }) => {
    await page.goto("/es")

    await expect(page.locator(".project-card").first().getByRole("link", { name: /Solicitar una demo/ })).toBeVisible()
    await page.locator(".hero-section").getByRole("link", { name: /Solicitar una demo/ }).click()
    await expect(page).toHaveURL(/\/es#contacto$/)
    await expect(page.locator("#contact-intent-demo")).toBeChecked()

    await page.getByRole("radio", { name: /Conversemos sobre un proyecto/ }).check()
    await expect(page.locator("#contact-intent-project")).toBeChecked()
  })

  test("preserves the anchor while switching locale", async ({ page }) => {
    await page.goto("/es#contacto")

    await page.getByRole("button", { name: "Idioma" }).click()
    await page.getByRole("link", { name: /English/ }).click()

    await expect(page).toHaveURL(/\/en#contacto$/)
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
  })

  test("keeps institutional navigation instant with the prefetched shell", async ({ page }) => {
    await page.goto("/es")

    await instant(page, async () => {
      await page.getByRole("link", { name: "Política de Privacidad" }).click()
      await expect(page).toHaveURL(/\/es\/privacidad$/)
      await expect(page.getByRole("heading", { level: 1, name: "Política de Privacidad", exact: true })).toBeVisible()
    })
  })

  test("opens the climate hub instantly from the header", async ({ page }) => {
    await page.goto("/es")

    await instant(page, async () => {
      await page.locator("header").getByRole("link", { name: "MRV / M&E", exact: true }).click()
      await expect(page).toHaveURL(/\/es\/sistemas-climaticos$/)
      await expect(page.getByRole("heading", { level: 1, name: /información climática/ })).toBeVisible()
    })
  })

  test("collapses the header below the desktop breakpoint", async ({ page }) => {
    const desktopNav = page.locator('[data-nav="desktop"]')
    const menuButton = page.locator('button[aria-controls="mobile-navigation"]')

    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/es")
    await expect(desktopNav).toBeHidden()
    await expect(menuButton).toBeVisible()
    await expect(page.locator("header").getByRole("link", { name: "GearsMap" })).toBeVisible()

    await page.setViewportSize({ width: 1024, height: 768 })
    await expect(desktopNav).toBeVisible()
    await expect(menuButton).toBeHidden()

    const links = desktopNav.locator(":scope > a")
    await expect(links).toHaveCount(5)
    for (const link of await links.all()) {
      const box = await link.boundingBox()
      expect(box?.height ?? Infinity).toBeLessThanOrEqual(28)
    }
    await expect(desktopNav.getByRole("link", { name: "Conversemos", exact: true })).toBeVisible()
  })

  test("supports the mobile navigation contract", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/es")

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]')
    await menuButton.click()

    await expect(menuButton).toHaveAttribute("aria-expanded", "true")
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByRole("dialog").getByRole("link", { name: "Contacto" })).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(menuButton).toHaveAttribute("aria-expanded", "false")
  })

  test("focuses the first invalid contact field", async ({ page }) => {
    await page.goto("/es#contacto")

    await page.getByRole("button", { name: "Enviar mensaje" }).click()

    await expect(page.locator("#name-error")).toBeVisible()
    await expect(page.locator("#contact-name")).toBeFocused()
  })

  test("honors reduced motion preferences", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/es")

    await expect(page.locator("html")).toHaveAttribute("data-scroll-behavior", "smooth")
    const runningAnimationsAreInstant = await page.evaluate(() => (
      document.getAnimations()
        .filter((animation) => animation.playState === "running")
        .every((animation) => (animation.effect?.getComputedTiming().duration as number) <= 10)
    ))

    expect(runningAnimationsAreInstant).toBe(true)
  })

  test("exposes generated SEO files and validates the API boundary", async ({ request }) => {
    const robots = await request.get("/robots.txt")
    const sitemap = await request.get("/sitemap.xml")
    const invalidContact = await request.post("/api/contact", { data: {} })

    expect(robots.ok()).toBeTruthy()
    expect(await robots.text()).toContain("/sitemap.xml")
    expect(sitemap.ok()).toBeTruthy()
    expect(await sitemap.text()).toContain("/en")
    expect(invalidContact.status()).toBe(400)
  })

  test("does not introduce automated accessibility violations", async ({ page }) => {
    await page.goto("/es")

    const homeResults = await new AxeBuilder({ page }).analyze()
    expect(homeResults.violations).toEqual([])

    await page.goto("/es/sistemas-climaticos")
    const climateResults = await new AxeBuilder({ page }).analyze()
    expect(climateResults.violations).toEqual([])
  })

  test("publishes the climate work in a form agents can read", async ({ page, request }) => {
    await page.goto("/es/sistemas-climaticos")

    await expect(page.locator("html")).toHaveAttribute("lang", "es")
    await expect(page.locator("h1")).toContainText("información climática")
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached()
    await expect(page.getByRole("link", { name: /monitoreo, reporte y verificación/i }).first()).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://gearsmap.com/es/sistemas-climaticos")

    await page.goto("/en/sistemas-climaticos/mrv")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.locator("h1")).toContainText(/monitoring, reporting and verification/i)

    const llms = await request.get("/llms.txt")
    const full = await request.get("/llms-full.txt")
    const sitemap = await request.get("/sitemap.xml")

    expect(llms.ok()).toBeTruthy()
    expect(llms.headers()["content-type"]).toContain("text/plain")
    const llmsText = await llms.text()
    expect(llmsText).toContain("# GearsMap")
    expect(llmsText).toContain("https://gearsmap.com/es/sistemas-climaticos/mrv")
    expect(llmsText).not.toContain("172.17.")
    expect(full.ok()).toBeTruthy()
    expect(await sitemap.text()).toContain("/es/sistemas-climaticos/monitoreo-y-evaluacion")
  })
})
