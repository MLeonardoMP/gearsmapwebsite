import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

const allowAgents = [
  "*",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/api/"],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
