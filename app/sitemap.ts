import type { MetadataRoute } from "next"
import { publicRoutes } from "@/lib/routes"
import { absoluteUrl, contentUpdated, languageAlternates, localePath } from "@/lib/site"
import { locales } from "@/lib/translations"

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: absoluteUrl(localePath(locale, route.path)),
      lastModified: new Date(route.lastModified ?? contentUpdated),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route.path)).map(([language, path]) => [language, absoluteUrl(path)]),
        ),
      },
      ...(route.images && route.images.length > 0 ? { images: route.images } : {}),
    })),
  )
}
