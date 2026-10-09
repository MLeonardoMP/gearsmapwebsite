/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Link", value: '</llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain"' },
]

const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 31 days: local images only change with a deploy.
    minimumCacheTTL: 2678400,
  },
  experimental: {
    globalNotFound: true,
    // Lets @next/playwright's instant() run against `next start` in e2e (see playwright.config.ts).
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      { source: "/privacidad", destination: "/es/privacidad", permanent: true },
      { source: "/terminos", destination: "/es/terminos", permanent: true },
      { source: "/sistemas-climaticos", destination: "/es/sistemas-climaticos", permanent: true },
      { source: "/sistemas-climaticos/:path*", destination: "/es/sistemas-climaticos/:path*", permanent: true },
      { source: "/proyectos", destination: "/es/proyectos", permanent: true },
      { source: "/proyectos/:path*", destination: "/es/proyectos/:path*", permanent: true },
      { source: "/:locale(es|en|fr)/:a(projects|projets|portafolio|portfolio)", destination: "/:locale/proyectos", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems", destination: "/:locale/sistemas-climaticos", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems/mrv", destination: "/:locale/sistemas-climaticos/mrv", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems/monitoring-and-evaluation", destination: "/:locale/sistemas-climaticos/monitoreo-y-evaluacion", permanent: true },
      { source: "/:locale(es|en|fr)/systemes-climatiques", destination: "/:locale/sistemas-climaticos", permanent: true },
      { source: "/:locale(es|en|fr)/mrv", destination: "/:locale/sistemas-climaticos/mrv", permanent: true },
      { source: "/:locale(es|en|fr)/monitoreo-y-evaluacion", destination: "/:locale/sistemas-climaticos/monitoreo-y-evaluacion", permanent: true },
      { source: "/:locale(es|en|fr)/proyectos/mrv", destination: "/:locale/sistemas-climaticos/mrv", permanent: true },
      { source: "/:locale(es|en|fr)/proyectos/:a(me|monitoreo-y-evaluacion)", destination: "/:locale/sistemas-climaticos/monitoreo-y-evaluacion", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path((?!contact).*)",
        destination: "https://gearsmap-api.vercel.app/api/:path*",
      },
    ]
  },
}

export default nextConfig
