import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Force webpack instead of Turbopack
  experimental: {
    webpackBuildWorker: true,
  },
}

export default nextConfig
