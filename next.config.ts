// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/flask/:path*',
        destination: 'http://localhost:5050/:path*', // 👈 Flask backend port
      },
    ]
  },
}

export default nextConfig;
