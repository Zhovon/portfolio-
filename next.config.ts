import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Force webpack instead of Turbopack
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
  },
}

export default nextConfig
