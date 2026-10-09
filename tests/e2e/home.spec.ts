import { test, expect, type Page } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const themes = ["dark", "light"] as const
const viewports = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]
const axePaths = ["/es", "/es/sistemas-climaticos"]

async function useTheme(page: Page, theme: string) {
  await page.addInitScript((value) => window.localStorage.setItem("theme", value), theme)
}

type ColorWindow = Window & { __rgba: (color: string) => number[] }

/** Installs window.__rgba: resolves any CSS color (oklch, lab, color-mix…) to sRGB [r, g, b, a] through a canvas. */
async function installColorHelper(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as ColorWindow).__rgba = (color: string) => {
      const canvas = document.createElement("canvas")
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext("2d")!
      context.fillStyle = color
      context.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
      return [r, g, b, a / 255]
    }
  })
}

test.describe("home design system", () => {
  for (const theme of themes) {
    for (const viewport of viewports) {
      for (const path of axePaths) {
        test(`has no axe violations: ${path} ${theme} ${viewport.width}`, async ({ page }) => {
          await useTheme(page, theme)
          await page.setViewportSize(viewport)
          await page.goto(path)
          // The theme script only toggles `dark`; light is the absence of that class.
          const html = page.locator("html")
          if (theme === "dark") await expect(html).toHaveClass(/\bdark\b/)
          else await expect(html).not.toHaveClass(/\bdark\b/)

          const results = await new AxeBuilder({ page }).analyze()
          expect(results.violations).toEqual([])
        })
      }
    }
  }

  test("shows a visible focus outline on the hero CTA and the submit button", async ({ page }) => {
    await page.goto("/es")

    // Start keyboard navigation from the h1 so the next Tab lands on the primary CTA.
    await page.locator("#hero-title").evaluate((element: HTMLElement) => {
      element.setAttribute("tabindex", "-1")
      element.focus()
    })
    await page.keyboard.press("Tab")
    const cta = page.locator(".hero-section a").first()
    await expect(cta).toBeFocused()
    expect(await cta.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none")

    await page.locator("#contact-message").click()
    await page.keyboard.press("Tab")
    const submit = page.getByRole("button", { name: "Enviar Mensaje" })
    await expect(submit).toBeFocused()
    expect(await submit.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none")
  })

  test("renders no visible text under 12px in main at 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/es")

    const tooSmall = await page.evaluate(() => {
      const hits: string[] = []
      const walker = document.createTreeWalker(document.querySelector("main")!, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode
        const parent = node.parentElement
        if (!parent || !node.textContent?.trim()) continue
        if (parent.closest(".sr-only, [aria-hidden='true'], script, style, noscript")) continue
        const style = getComputedStyle(parent)
        if (style.display === "none" || style.visibility === "hidden") continue
        const size = Number.parseFloat(style.fontSize)
        if (size < 12) hits.push(`${size}px: ${node.textContent.trim().slice(0, 40)}`)
      }
      return hits
    })

    expect(tooSmall).toEqual([])
  })

  test("keeps form fields free of the light-theme pink cast", async ({ page }) => {
    await useTheme(page, "light")
    await installColorHelper(page)
    await page.goto("/es")

    const [r, g] = await page.locator("#contact-name").evaluate((element) => {
      const resolve = (window as unknown as ColorWindow).__rgba
      return resolve(getComputedStyle(element).backgroundColor)
    })

    expect(r).toBeLessThanOrEqual(g + 3)
  })

  test("keeps on-media status text readable in light theme", async ({ page }) => {
    await useTheme(page, "light")
    await installColorHelper(page)
    await page.goto("/es")

    const ratio = await page.locator(".status-chip--on-media").first().evaluate((element) => {
      const resolve = (window as unknown as ColorWindow).__rgba
      const luminance = ([r, g, b]: number[]) => {
        const channel = (value: number) => {
          const c = value / 255
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
        }
        return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
      }
      const over = (top: number[], bottom: number[]) => top.slice(0, 3).map((value, index) => value * top[3] + bottom[index] * (1 - top[3]))
      const text = resolve(getComputedStyle(element).color)
      const chip = resolve(getComputedStyle(element).backgroundColor)
      const caption = resolve(getComputedStyle(element.parentElement!).backgroundColor)
      // Worst case: both scrims composited over a pure white screenshot.
      const background = over(chip, over(caption, [255, 255, 255]))
      const [light, dark] = [luminance(text), luminance(background)].sort((a, b) => b - a)
      return (light + 0.05) / (dark + 0.05)
    })

    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  test("paints the Vercel and Next.js marks in light theme", async ({ page }) => {
    await useTheme(page, "light")
    await installColorHelper(page)
    await page.goto("/es")

    for (const name of ["Vercel", "Next.js"]) {
      const item = page.locator(".tech-stack li", { hasText: name }).first()
      const [mark, body] = await item.evaluate((element) => {
        const resolve = (window as unknown as ColorWindow).__rgba
        const markStyle = getComputedStyle(element.querySelector(".tech-mark")!)
        return [resolve(markStyle.backgroundColor), resolve(getComputedStyle(document.body).backgroundColor)]
      })
      const difference = Math.abs(mark[0] - body[0]) + Math.abs(mark[1] - body[1]) + Math.abs(mark[2] - body[2])
      expect(difference).toBeGreaterThan(200)
    }
  })

  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    test(`keeps the primary CTA above the fold at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto("/es")

      const bottom = await page.locator(".hero-section a").first().evaluate((element) => element.getBoundingClientRect().bottom)
      expect(bottom).toBeLessThan(viewport.height)
    })
  }

  test("puts proof before claims", async ({ page }) => {
    await page.goto("/es")

    const order = await page.evaluate(() => {
      const work = document.querySelector("#portafolio")
      const services = document.querySelector("#servicios")
      if (!work || !services) return 0
      return work.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING
    })
    expect(order).toBeTruthy()
  })
})
