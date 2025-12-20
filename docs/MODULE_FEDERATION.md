# Module Federation Setup Guide

## Overview

Module Federation is a webpack 5 feature that enables JavaScript applications to dynamically load code from other applications at runtime. This allows for true micro-frontend architecture where each application can:

- Be independently developed and deployed
- Share components with other applications
- Load components on-demand at runtime (not at build time)
- Share dependencies to avoid duplication

## Architecture

### CV Portfolio (Host - Port 3000)

**Exposes:**
- `./Header` - Main header component
- `./Footer` - Footer with contact information
- `./ChatWidget` - AI-powered chat widget

**Consumes:**
- `defi_dashboard/PriceTicker` - Live cryptocurrency prices
- `defi_dashboard/TradingChart` - Trading charts
- `defi_dashboard/OrderBook` - Order book display

### DeFi Dashboard (Remote - Port 3001)

**Exposes:**
- `./Dashboard` - Complete dashboard page
- `./PriceTicker` - Live price ticker widget
- `./TradingChart` - Trading chart component
- `./OrderBook` - Order book component

**Consumes:**
- `cv_portfolio/Header` - Shared header
- `cv_portfolio/Footer` - Shared footer

## Configuration

### CV Portfolio (`apps/cv-portfolio/next.config.js`)

```javascript
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'cv_portfolio',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Header': './src/widgets/header',
            './Footer': './src/widgets/footer',
            './ChatWidget': './src/widgets/chat-widget',
          },
          remotes: {
            defi_dashboard: `defi_dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          },
          shared: {
            react: { singleton: true, requiredVersion: '^18' },
            'react-dom': { singleton: true, requiredVersion: '^18' },
            next: { singleton: true },
          },
        })
      );
    }
    return config;
  },
};
```

### DeFi Dashboard (`apps/defi-dashboard/next.config.js`)

```javascript
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'defi_dashboard',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Dashboard': './src/page-components/dashboard',
            './PriceTicker': './src/widgets/price-ticker',
            './TradingChart': './src/widgets/trading-chart',
            './OrderBook': './src/widgets/order-book',
          },
          remotes: {
            cv_portfolio: `cv_portfolio@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
          },
          shared: {
            react: { singleton: true, requiredVersion: '^18' },
            'react-dom': { singleton: true, requiredVersion: '^18' },
            next: { singleton: true },
          },
        })
      );
    }
    return config;
  },
};
```

## Usage Example

### Loading Remote Components

```tsx
import dynamic from 'next/dynamic';

// Dynamically import component from DeFi Dashboard
const RemotePriceTicker = dynamic(
  () => import('defi_dashboard/PriceTicker').catch(() => {
    // Fallback if remote fails to load
    return {
      default: () => <div>Price ticker unavailable</div>
    };
  }),
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

// Use in component
export default function Page() {
  return (
    <div>
      <h1>Live Crypto Prices</h1>
      <RemotePriceTicker />
    </div>
  );
}
```

## TypeScript Support

Type declarations are provided in `types/module-federation.d.ts`:

```typescript
declare module 'defi_dashboard/PriceTicker' {
  import { FC } from 'react';
  export const PriceTicker: FC;
}
```

## Known Issues & Compatibility

### Next.js 14 Compatibility

Module Federation with Next.js 14 can have compatibility challenges due to:

1. **Webpack Dependency Issues**: The `@module-federation/nextjs-mf` package may require specific webpack versions
2. **App Router Limitations**: Next.js App Router has different bundling behavior than Pages Router
3. **Server Components**: Module Federation primarily works with client components

### Recommended Approach

For production use, consider:

1. **Use Next.js 13 with Pages Router** for better Module Federation support
2. **Alternative: Separate Deployment** - Deploy micro-frontends separately and use iframes or window messaging
3. **Alternative: Monorepo Packages** - Use workspace packages for code sharing instead of runtime federation

## Demo Page

A demo page is available at `/module-federation-demo` showing:
- Configuration details for both apps
- Live demonstration of loading remote components
- Setup instructions
- Fallback handling

## Running the Demo

1. Start CV Portfolio:
   ```bash
   cd apps/cv-portfolio
   yarn dev
   ```

2. Start DeFi Dashboard (on different port):
   ```bash
   cd apps/defi-dashboard
   yarn dev -p 3001
   ```

3. Visit: http://localhost:3000/module-federation-demo

## Benefits

- **Independent Deployment**: Each app can be deployed separately
- **Code Sharing**: Share components without code duplication
- **Version Control**: Each app manages its own dependencies
- **Runtime Loading**: Components load only when needed
- **Technology Agnostic**: Different apps can use different frameworks (with proper configuration)

## Limitations

- **Network Dependency**: Requires remote apps to be available
- **Bundle Size**: Initial bundle includes Module Federation runtime
- **Complexity**: Adds complexity to build and deployment process
- **TypeScript**: Type safety across remotes requires manual type declarations
- **SSR Challenges**: Works best with client-side rendered components

## Resources

- [Module Federation Documentation](https://module-federation.github.io/)
- [Next.js Module Federation Guide](https://github.com/module-federation/nextjs-mf)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

## Future Improvements

1. Add E2E tests for federated components
2. Implement versioning strategy for shared components
3. Add monitoring for remote component load failures
4. Create shared component library for common UI elements
5. Implement proper error boundaries for remote failures
