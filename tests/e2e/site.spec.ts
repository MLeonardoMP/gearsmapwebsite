import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import { instant } from "@next/playwright"

test.describe("GearsMap public site", () => {
  test("redirects the root to the default locale", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveURL(/\/es$/)
    await expect(page.locator("h1")).toContainText("GearsMap")
  })

  test("renders localized content and metadata", async ({ page }) => {
    await page.goto("/en")

    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page).toHaveTitle(/GearsMap/)
    await expect(page.locator("h1")).toContainText("From territory to data")
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
    await page.getByRole("menuitem", { name: /English/ }).click()

    await expect(page).toHaveURL(/\/en#contacto$/)
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
  })

  test("keeps institutional navigation instant with the prefetched shell", async ({ page }) => {
    await page.goto("/es")

    await instant(page, async () => {
      await page.getByRole("link", { name: "Política de Privacidad" }).click()
      await expect(page).toHaveURL(/\/es\/privacidad$/)
    })

    await expect(page.getByRole("heading", { level: 1, name: "Política de Privacidad", exact: true })).toBeVisible()
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

    await page.getByRole("button", { name: "Enviar Mensaje" }).click()

    await expect(page.locator("#name-error")).toBeVisible()
    await expect(page.locator("#contact-name")).toBeFocused()
  })

  test("honors reduced motion preferences", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/es")

    await expect(page.locator("html")).toHaveAttribute("data-scroll-behavior", "smooth")
    const animationDuration = await page.locator(".hero-section__visual-ring--outer").evaluate((element) => (
      Number.parseFloat(getComputedStyle(element).animationDuration)
    ))

    expect(animationDuration).toBeLessThanOrEqual(0.01)
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
    await expect(page.getByRole("link", { name: /Monitoreo, reporte y verificación/ })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://gearsmap.com/es/sistemas-climaticos")

    await page.goto("/en/sistemas-climaticos/mrv")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.locator("h1")).toContainText("Monitoring, reporting and verification")

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
