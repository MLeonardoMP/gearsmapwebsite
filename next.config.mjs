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
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      { source: "/privacidad", destination: "/es/privacidad", permanent: true },
      { source: "/terminos", destination: "/es/terminos", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems", destination: "/:locale/sistemas-climaticos", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems/mrv", destination: "/:locale/sistemas-climaticos/mrv", permanent: true },
      { source: "/:locale(es|en|fr)/climate-systems/monitoring-and-evaluation", destination: "/:locale/sistemas-climaticos/monitoreo-y-evaluacion", permanent: true },
      { source: "/:locale(es|en|fr)/systemes-climatiques", destination: "/:locale/sistemas-climaticos", permanent: true },
      { source: "/:locale(es|en|fr)/mrv", destination: "/:locale/sistemas-climaticos/mrv", permanent: true },
      { source: "/:locale(es|en|fr)/monitoreo-y-evaluacion", destination: "/:locale/sistemas-climaticos/monitoreo-y-evaluacion", permanent: true },
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
