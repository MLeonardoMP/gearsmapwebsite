import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { chromium } from "@playwright/test"

const baseUrl = process.env.GEARSMAP_BASE_URL || "http://localhost:3000"
const outputDirectory = process.env.GEARSMAP_REVIEW_DIR || "/tmp/gearsmap-visual-review"
const scenarios = [
  { name: "es-dark-390", width: 390, height: 844, theme: "dark" },
  { name: "es-light-390", width: 390, height: 844, theme: "light" },
  { name: "es-dark-768", width: 768, height: 900, theme: "dark" },
  { name: "es-light-768", width: 768, height: 900, theme: "light" },
  { name: "es-dark-1440", width: 1440, height: 900, theme: "dark" },
  { name: "es-light-1440", width: 1440, height: 900, theme: "light" },
]

await mkdir(outputDirectory, { recursive: true })

const browser = await chromium.launch({
  executablePath: existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined,
  headless: true,
})
const results = []

for (const scenario of scenarios) {
  const context = await browser.newContext({
    viewport: { width: scenario.width, height: scenario.height },
    colorScheme: scenario.theme,
    reducedMotion: "no-preference",
  })
  const page = await context.newPage()
  const pageErrors = []

  page.on("pageerror", (error) => pageErrors.push(error.message))
  await page.addInitScript((theme) => {
    window.localStorage.setItem("theme", theme)
    window.__gearsmapMetrics = { lcp: 0, cls: 0 }

    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries.at(-1)
          if (lastEntry) window.__gearsmapMetrics.lcp = lastEntry.startTime
        })
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
      } catch {}

      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__gearsmapMetrics.cls += entry.value
          }
        })
        clsObserver.observe({ type: "layout-shift", buffered: true })
      } catch {}
    }
  }, scenario.theme)

  await page.goto(`${baseUrl}/es`, { waitUntil: "load", timeout: 60_000 })
  await page.locator("#hero-title").waitFor({ state: "visible", timeout: 30_000 })
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(800)
  await page.screenshot({
    path: `${outputDirectory}/${scenario.name}.png`,
    fullPage: false,
  })

  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource")
    const scripts = resources.filter((entry) => entry.initiatorType === "script")
    return {
      lcp: Math.round(window.__gearsmapMetrics?.lcp || 0),
      cls: Number((window.__gearsmapMetrics?.cls || 0).toFixed(3)),
      javascriptTransferBytes: scripts.reduce((total, entry) => total + (entry.transferSize || entry.encodedBodySize || 0), 0),
      scriptCount: scripts.length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      bodyHeight: document.body.scrollHeight,
    }
  })

  results.push({ ...scenario, ...metrics, pageErrors })
  await context.close()
}

await browser.close()
const report = { baseUrl, outputDirectory, results }
await writeFile(`${outputDirectory}/metrics.json`, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
