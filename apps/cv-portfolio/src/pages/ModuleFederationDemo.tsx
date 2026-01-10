import { Link } from 'react-router-dom';

/**
 * Module Federation Demo Page
 * Demonstrates the architecture and configuration for cross-app component sharing
 */
export default function ModuleFederationDemo() {

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-accent bg-white px-4 py-2
              text-sm font-semibold text-accent shadow-sm
              transition duration-300
              hover:bg-accent hover:text-white hover:shadow-md"
          >
            <span>←</span>
            <span>Back to CV</span>
          </Link>
          <h1 className="mb-3 mt-6 text-4xl font-bold text-gray-900">
            Module Federation Demo
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating cross-app component sharing between CV Portfolio and DeFi
            Dashboard
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-blue-900">
            What is Module Federation?
          </h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              Module Federation is a webpack feature that allows JavaScript
              applications to dynamically load code from other applications at
              runtime.
            </p>
            <p>
              This enables true micro-frontend architecture where each app is:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Independently developed and deployed</li>
              <li>Can share components with other apps</li>
              <li>Loaded on-demand at runtime (not build time)</li>
              <li>Version independent with shared dependencies</li>
            </ul>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-gray-900">CV Portfolio (Host)</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-mono text-xs">Port: 3000</p>
              <p className="font-semibold">Exposes:</p>
              <ul className="ml-4 list-disc text-xs">
                <li>./Header</li>
                <li>./Footer</li>
                <li>./ChatWidget</li>
              </ul>
              <p className="mt-2 font-semibold">Consumes:</p>
              <ul className="ml-4 list-disc text-xs">
                <li>defi_dashboard/PriceTicker</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              DeFi Dashboard (Remote)
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-mono text-xs">Port: 3001</p>
              <p className="font-semibold">Exposes:</p>
              <ul className="ml-4 list-disc text-xs">
                <li>./Dashboard</li>
                <li>./PriceTicker</li>
                <li>./TradingChart</li>
                <li>./OrderBook</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Status */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Implementation Status
          </h2>

          <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-orange-200 p-2">
                <svg className="h-5 w-5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900">Vite & Module Federation</h3>
                <p className="mt-1 text-sm text-orange-700">
                  Module Federation is currently disabled as cv-portfolio has been migrated to Vite. Module Federation with Vite requires additional configuration using @originjs/vite-plugin-federation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Shared UI-Kit library between applications</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>TypeScript declarations for shared modules</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Demo page and documentation completed</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500">⊘</span>
              <span>Runtime module loading (requires Vite plugin configuration)</span>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Usage Example (When Enabled)
          </h2>

          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
            <code>{`import { lazy } from 'react';

// Load PriceTicker from DeFi Dashboard
const RemotePriceTicker = lazy(
  () => import('defi_dashboard/PriceTicker')
);

export default function Page() {
  return (
    <div>
      <h1>Live Crypto Prices</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemotePriceTicker />
      </Suspense>
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-3 font-semibold text-yellow-900">
            Setup Instructions
          </h3>
          <div className="space-y-2 text-sm text-yellow-800">
            <p>To enable Module Federation with Vite:</p>
            <ol className="ml-6 list-decimal space-y-1">
              <li>Install <code className="rounded bg-yellow-100 px-1">@originjs/vite-plugin-federation</code></li>
              <li>Configure plugin in vite.config.ts for both apps</li>
              <li>Start both applications and test remote loading</li>
            </ol>
            <p className="mt-3 text-xs">
              Note: Both apps must be running simultaneously for Module Federation
              to work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
