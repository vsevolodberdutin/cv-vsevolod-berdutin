import { Badge } from '@/shared/ui';
import { CryptoIcon, CRYPTO_LIST } from '@/entities/crypto';
import { formatPrice, formatLargeNumber } from '@/entities/price';
import Link from 'next/link';

/**
 * Get market data for all cryptocurrencies
 * This function runs at build time for SSG
 */
async function getMarketData() {
  // In production, this would fetch from CoinGecko API or similar
  // For demo purposes, we use mock data with realistic values
  const data = CRYPTO_LIST.map((crypto) => ({
    id: crypto.symbol,
    name: crypto.name,
    symbol: crypto.symbol,
    price: Math.random() * 50000 + 1000,
    change24h: Math.random() * 20 - 10, // -10% to +10%
    marketCap: Math.random() * 500e9,
    volume24h: Math.random() * 50e9,
    circulatingSupply: Math.random() * 100e6,
  }));

  return data;
}

/**
 * Market Overview Page (SSG)
 * This page is generated at build time and demonstrates Static Site Generation
 */
export default async function MarketOverviewPage() {
  const data = await getMarketData();
  const generatedAt = new Date().toISOString();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-chart-grid bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Market Overview</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Complete cryptocurrency market data
              </p>
            </div>
            <Badge variant="ssg">Static Generation (SSG)</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Generation Info */}
        <div className="mb-6 rounded-lg bg-bg-secondary p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-purple-100 p-2">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-primary">Static Site Generation</h3>
              <p className="mt-1 text-xs text-text-secondary">
                This page was generated at build time: <span className="font-mono">{generatedAt}</span>
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Data is static and will only update when the site is rebuilt. Perfect for content that doesn't change frequently.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 flex gap-4">
          <Link
            href="/"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Dashboard
          </Link>
          <Link
            href="/trading"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Live Trading (SSR)
          </Link>
          <Link
            href="/analytics"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Analytics (ISR)
          </Link>
        </div>

        {/* Market Data Table */}
        <div className="overflow-hidden rounded-lg border border-chart-grid bg-bg-secondary">
          <table className="w-full">
            <thead className="border-b border-chart-grid bg-bg-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary">Asset</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary">Price</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary">24h Change</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary">Market Cap</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary">Volume (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chart-grid">
              {data.map((crypto, index) => (
                <tr key={crypto.id} className="transition duration-150 hover:bg-bg-primary">
                  <td className="px-6 py-4 text-sm text-text-secondary">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={crypto.symbol} size="sm" />
                      <div>
                        <div className="font-semibold text-text-primary">{crypto.name}</div>
                        <div className="text-xs text-text-secondary">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-text-primary">
                    {formatPrice(crypto.price)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`font-semibold ${
                        crypto.change24h >= 0 ? 'text-green-positive' : 'text-red-negative'
                      }`}
                    >
                      {crypto.change24h >= 0 ? '+' : ''}
                      {crypto.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-text-secondary">
                    ${formatLargeNumber(crypto.marketCap)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-text-secondary">
                    ${formatLargeNumber(crypto.volume24h)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-text-secondary">
          <p>Market data snapshot taken at build time</p>
          <p className="mt-1">Rebuild the site to see updated values</p>
        </div>
      </main>
    </div>
  );
}

// Force static generation at build time
export const dynamic = 'force-static';
