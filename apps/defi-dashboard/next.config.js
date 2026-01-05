// Module Federation configuration is available but commented out due to Next.js 14 compatibility issues
// See docs/MODULE_FEDERATION.md for setup instructions and alternative approaches
//
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

  // Module Federation webpack configuration (disabled - see docs/MODULE_FEDERATION.md)
  // webpack: (config, options) => {
  //   if (!options.isServer) {
  //     config.plugins.push(
  //       new NextFederationPlugin({
  //         name: 'defi_dashboard',
  //         filename: 'static/chunks/remoteEntry.js',
  //         exposes: {
  //           './Dashboard': './src/page-components/dashboard',
  //           './PriceTicker': './src/widgets/price-ticker',
  //           './TradingChart': './src/widgets/trading-chart',
  //           './OrderBook': './src/widgets/order-book',
  //         },
  //         remotes: {
  //           cv_portfolio: `cv_portfolio@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
  //         },
  //         shared: {
  //           react: { singleton: true, requiredVersion: '^18' },
  //           'react-dom': { singleton: true, requiredVersion: '^18' },
  //           next: { singleton: true },
  //         },
  //       })
  //     );
  //   }
  //   return config;
  // },
}

module.exports = nextConfig
