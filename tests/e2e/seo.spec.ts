import { test, expect, type APIRequestContext } from "@playwright/test"

// Runs against the production build (`next start`): the dev server streams differently.

function decodeEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname)
}

function jsonLdNodes(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const data = JSON.parse(match[1]) as { "@graph"?: Array<Record<string, unknown>> }
    return data["@graph"] ?? [data as Record<string, unknown>]
  })
}

function hasType(node: Record<string, unknown>, type: string) {
  const value = node["@type"]
  return Array.isArray(value) ? value.includes(type) : value === type
}

test.describe("initial HTML without JavaScript", () => {
  test.use({ javaScriptEnabled: false })

  for (const path of ["/es", "/en/sistemas-climaticos/mrv", "/fr/privacidad", "/es/servicios/geovisores"]) {
    test(`shows the h1 on ${path}`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    })
  }
})

test.describe("SEO contract", () => {
  test("every sitemap URL streams its content in the shell and fits the title/description budget", async ({ request }) => {
    const paths = await sitemapPaths(request)
    expect(paths.length).toBeGreaterThan(20)
    const failures: string[] = []

    for (const path of paths) {
      const response = await request.get(path)
      if (!response.ok()) {
        failures.push(`${path}: HTTP ${response.status()}`)
        continue
      }
      const html = await response.text()
      const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
      const description = decodeEntities(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")
      const h1 = html.indexOf("<h1")
      const footer = html.indexOf("<footer")

      if (html.includes('<div hidden id="S:')) failures.push(`${path}: hidden streamed segment`)
      if (h1 < 0 || footer < 0 || h1 > footer) failures.push(`${path}: <h1 at ${h1}, <footer at ${footer}`)
      if (!title || title.length > 60) failures.push(`${path}: title ${title.length} "${title}"`)
      if (!description || description.length > 160) failures.push(`${path}: description ${description.length}`)
    }

    expect(failures).toEqual([])
  })

  test("publishes a consistent JSON-LD graph on the home page", async ({ request }) => {
    const html = await (await request.get("/es")).text()
    expect(html).not.toContain("ProfessionalService")

    const nodes = jsonLdNodes(html)
    const catalog = nodes.find((node) => hasType(node, "OfferCatalog"))
    expect(catalog).toBeTruthy()
    const offers = (catalog?.itemListElement ?? []) as Array<{ itemOffered: { "@id": string } }>
    const ids = offers.map((offer) => offer.itemOffered["@id"])
    expect(ids).toHaveLength(6)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toContain("https://gearsmap.com/es/servicios/geovisores#service")

    expect(nodes.filter((node) => hasType(node, "Person"))).toHaveLength(4)
  })

  test("exposes the whole company to agents", async ({ request }) => {
    const llms = await (await request.get("/llms.txt")).text()
    expect(llms).toContain("visor-ppr-acggp")
    expect(llms).toContain("Leonardo Mosquera")
    expect(llms).toContain("## Company facts")

    const full = await (await request.get("/llms-full.txt")).text()
    expect(full).toContain("Visor PPR ACGGP")
  })

  test("lists the new routes and images in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text()
    expect(sitemap).toContain("https://gearsmap.com/fr/servicios/geovisores")
    expect(sitemap).toContain("https://gearsmap.com/es/proyectos<")
    expect(sitemap).toMatch(/<image:loc>[^<]*acggp_visor[^<]*<\/image:loc>/)
  })

  test("localizes the Open Graph image alt text", async ({ page }) => {
    await page.goto("/en/sistemas-climaticos/mrv")
    const alt = await page.locator('meta[property="og:image:alt"]').getAttribute("content")
    expect(alt).toBeTruthy()
    expect(alt).not.toContain("del sector")
  })

  test("serves the manifest and icons", async ({ page, request }) => {
    for (const path of ["/manifest.webmanifest", "/icon.png", "/favicon.ico"]) {
      expect((await request.get(path)).status(), path).toBe(200)
    }
    await page.goto("/es")
    expect(await page.locator('link[rel="icon"]').count()).toBeGreaterThan(0)
  })

  test("returns a noindex 404 for an unknown locale", async ({ request }) => {
    const response = await request.get("/de")
    expect(response.status()).toBe(404)
    const html = await response.text()
    expect(html).toMatch(/<meta name="robots" content="noindex/)
    expect(html).not.toContain('content="index, follow"')
  })
})
