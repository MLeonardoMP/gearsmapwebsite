import { test, expect, type Page } from "@playwright/test"

const founderNames = ["Leonardo Mosquera", "Juan Esteban Mosquera", "Juan Manuel Jimenez", "Mateo Granados"]
const locales = ["es", "en", "fr"] as const

type JsonLdNode = { "@type"?: string | string[]; jobTitle?: string; image?: { url?: string } }

// The home page streams its content, so wait until the founders section has
// settled into a single copy before measuring it.
async function gotoHome(page: Page, path: string) {
  await page.goto(path)
  await expect(page.locator("#equipo")).toHaveCount(1)
  await expect(page.locator("#equipo")).toBeVisible()
}

async function personNodes(page: Page) {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()

  return blocks
    .flatMap((text) => {
      const data = JSON.parse(text) as { "@graph"?: JsonLdNode[] } | JsonLdNode
      return "@graph" in data && Array.isArray(data["@graph"]) ? data["@graph"] : [data as JsonLdNode]
    })
    .filter((node) => node["@type"] === "Person")
}

test.describe("Founders section", () => {
  for (const locale of locales) {
    test(`renders the four founders with roles and Person JSON-LD (${locale})`, async ({ page }) => {
      await gotoHome(page, `/${locale}`)

      const cards = page.locator("#equipo .founder-card")
      await expect(cards).toHaveCount(4)
      await expect(cards.locator(".founder-card__name")).toHaveText(founderNames)

      for (const badge of await cards.locator(".founder-card__badge").allTextContents()) {
        expect(badge.trim()).toMatch(/^(CEO|CPO|CDO|CCO)/)
      }

      // Profile links render only when the owner has supplied real URLs.
      await expect(page.locator(".founder-card__links")).toHaveCount(0)

      const people = await personNodes(page)
      expect(people).toHaveLength(4)
      for (const person of people) {
        expect(person.jobTitle).toBeTruthy()
        expect(person.jobTitle).not.toContain(" - ")
        expect(person.image?.url).toMatch(/^https:\/\//)
      }
    })
  }

  for (const deviceScaleFactor of [1, 2]) {
    test.describe(`at device pixel ratio ${deviceScaleFactor}`, () => {
      test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor })

      test("serves portraits sharp enough for their rendered size at 1440px", async ({ page }) => {
        await gotoHome(page, "/es")

        const images = page.locator("#equipo .founder-card__image")
        await expect(images).toHaveCount(4)

        for (const image of await images.all()) {
          await image.scrollIntoViewIfNeeded()
          await expect
            .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0 && img.currentSrc !== ""))
            .toBe(true)

          // naturalWidth of a srcset image is density-corrected, so read the
          // served pixel width from the optimizer URL instead.
          const { servedWidth, renderedHeight, dpr } = await image.evaluate((img: HTMLImageElement) => ({
            servedWidth: Number(new URL(img.currentSrc).searchParams.get("w") ?? img.naturalWidth),
            renderedHeight: img.getBoundingClientRect().height,
            dpr: window.devicePixelRatio,
          }))

          expect(renderedHeight).toBeGreaterThan(0)
          expect(servedWidth).toBeGreaterThanOrEqual(renderedHeight * dpr * 0.9)
          if (dpr >= 2) expect(servedWidth).toBeGreaterThanOrEqual(640)
        }
      })
    })
  }

  test("keeps founder anchors clear of the fixed header", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page, "/es#mateo-granados")

    const card = page.locator("#mateo-granados")
    const headerBottom = await page.locator("header.site-header").evaluate((header) => header.getBoundingClientRect().bottom)
    const cardTop = () => card.evaluate((element) => element.getBoundingClientRect().top)
    const viewportHeight = page.viewportSize()?.height ?? 900

    // While the home content still streams in, the browser's initial fragment
    // scroll can run before the card exists. Repeat the fragment navigation
    // once the section has settled so the check does not depend on timing.
    if ((await cardTop()) >= viewportHeight) {
      await page.evaluate(() => {
        window.location.hash = ""
        window.location.hash = "mateo-granados"
      })
    }

    // The fragment navigation lands on the card...
    await expect.poll(cardTop).toBeLessThan(viewportHeight)
    // ...and its scroll margin keeps it below the fixed header.
    expect(await cardTop()).toBeGreaterThanOrEqual(headerBottom)
  })
})
