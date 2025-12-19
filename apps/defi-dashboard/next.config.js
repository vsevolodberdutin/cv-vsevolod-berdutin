/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable standalone output for Docker
  output: 'standalone',
}

module.exports = nextConfig
