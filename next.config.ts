import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Changed: Allow Stripe webhook raw body parsing
  serverExternalPackages: ['stripe'],
}

export default nextConfig