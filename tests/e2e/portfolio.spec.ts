import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

async function jsonLd(page: Page) {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
  return scripts.join("\n")
}

test.describe("Portfolio and case studies", () => {
  test("publishes the projects index as a collection page", async ({ page }) => {
    const response = await page.goto("/es/proyectos")

    expect(response?.status()).toBe(200)
    await expect(page.locator("h1")).toHaveText("Proyectos")
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://gearsmap.com/es/proyectos")
    expect(await jsonLd(page)).toContain('"CollectionPage"')
  })

  test("presents the ACGGP case study with its live viewer and structured data", async ({ page }) => {
    await page.goto("/en/proyectos/visor-ppr-acggp")

    await expect(page.locator("h1")).toContainText("ACGGP")
    const liveLinks = page.locator('a[href="https://acggp.gearsmap.com/"]')
    await expect(liveLinks.first()).toBeVisible()
    for (const link of await liveLinks.all()) {
      await expect(link).toHaveAttribute("target", "_blank")
      await expect(link).toHaveAttribute("rel", /noopener/)
    }

    const data = await jsonLd(page)
    expect(data).toContain('"CreativeWork"')
    expect(data).toContain('"WebApplication"')
    expect(data).not.toContain("Mapbox")

    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })

  test("redirects legacy project URLs to the climate pages", async ({ request }) => {
    const response = await request.get("/es/proyectos/mrv", { maxRedirects: 0 })

    expect(response.status()).toBe(308)
    expect(response.headers().location).toMatch(/\/es\/sistemas-climaticos\/mrv$/)
  })

  test("keeps the demo request on the featured project only", async ({ page }) => {
    await page.goto("/es")

    await expect(page.locator(".project-card").first().getByRole("link", { name: /Solicitar una demo/ })).toBeVisible()
    await expect(page.locator(".work-explore").getByRole("link", { name: /Solicitar una demo/ })).toHaveCount(0)
    await expect(page.locator(".work-explore__row").first()).toBeVisible()
  })

  test("shows the project facts next to the MRV case", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto("/es/sistemas-climaticos/mrv")

    const aside = page.locator(".climate-aside")
    await expect(aside).toBeVisible()
    await expect(aside).toContainText("Contraparte")
    await expect(page.locator(".method-diagram")).toBeVisible()
  })

  test("gives the production project more room than the climate modules", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto("/es")

    const featured = await page.locator(".work-tile--featured").boundingBox()
    const climate = await page.locator(".work-tile--climate").first().boundingBox()

    expect(featured).not.toBeNull()
    expect(climate).not.toBeNull()
    expect(featured!.width).toBeGreaterThan(climate!.width)
  })
})
