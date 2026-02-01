import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@payloadcms/db-postgres', 'payload'],
  experimental: {
    turbo: undefined, // Disable Turbopack
  },
}

export default withPayload(nextConfig)
