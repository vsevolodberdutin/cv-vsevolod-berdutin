// Module Federation configuration is available but commented out due to Next.js 14 compatibility issues
// See docs/MODULE_FEDERATION.md for setup instructions and alternative approaches
//
// const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable standalone output for Docker
  output: 'standalone',

  // Module Federation webpack configuration (disabled - see docs/MODULE_FEDERATION.md)
  // webpack: (config, options) => {
  //   if (!options.isServer) {
  //     config.plugins.push(
  //       new NextFederationPlugin({
  //         name: 'cv_portfolio',
  //         filename: 'static/chunks/remoteEntry.js',
  //         exposes: {
  //           './Header': './src/widgets/header',
  //           './Footer': './src/widgets/footer',
  //           './ChatWidget': './src/widgets/chat-widget',
  //         },
  //         remotes: {
  //           defi_dashboard: `defi_dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
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
