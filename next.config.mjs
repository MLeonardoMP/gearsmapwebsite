/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // Proxy all API requests to GearsmapAPI (except /api/contact)
        source: '/api/:path((?!contact).*)',
        destination: 'https://gearsmap-api.vercel.app/api/:path*',
      },
    ]
  },
}

export default nextConfig
