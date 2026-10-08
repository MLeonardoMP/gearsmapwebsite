import type { MetadataRoute } from "next"
import { publicRoutes } from "@/lib/climate"
import { absoluteUrl, contentUpdated, languageAlternates, localePath } from "@/lib/site"
import { locales } from "@/lib/translations"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(contentUpdated)

  return locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: absoluteUrl(localePath(locale, route.path)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route.path)).map(([language, path]) => [language, absoluteUrl(path)]),
        ),
      },
    })),
  )
}
