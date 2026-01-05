// Module Federation temporarily disabled due to Next.js 14 webpack compatibility issues
// Using ui-kit as local workspace package instead
// const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Required for monorepo standalone builds
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },

  // Webpack config to handle ui-kit imports via alias
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'ui_kit': path.resolve(__dirname, '../../apps/ui-kit/src'),
    };
    return config;
  },
}

module.exports = nextConfig
