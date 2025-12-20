import { Badge } from '@/shared/ui';
import { CRYPTO_LIST } from '@/entities/crypto';
import { formatPrice, formatLargeNumber } from '@/entities/price';
import Link from 'next/link';

/**
 * Get analytics data for cryptocurrency performance
 * This function runs periodically for ISR
 */
async function getAnalyticsData() {
  // In production, this would fetch historical data from an API
  // For demo, we generate consistent mock data that updates on revalidation
  const currentTime = new Date();

  // Generate 30-day historical data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(currentTime.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
    return {
      date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: 40000 + Math.random() * 8000,
      volume: Math.random() * 50e9,
    };
  });

  // Calculate statistics
  const prices = last30Days.map((d) => d.price);
  const volumes = last30Days.map((d) => d.volume);

  const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  const totalVolume = volumes.reduce((sum, v) => sum + v, 0);
  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);
  const priceChange = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;

  // Top performers (mock data)
  const topPerformers = CRYPTO_LIST.slice(0, 3).map((crypto) => ({
    ...crypto,
    performance: Math.random() * 50 + 10, // 10% to 60% gain
    volume24h: Math.random() * 50e9,
  }));

  return {
    last30Days,
    statistics: {
      avgPrice,
      totalVolume,
      highPrice,
      lowPrice,
      priceChange,
    },
    topPerformers,
    generatedAt: currentTime.toISOString(),
  };
}

/**
 * Analytics Page (ISR)
 * This page uses Incremental Static Regeneration and revalidates every hour
 */
export default async function AnalyticsPage() {
  const { last30Days, statistics, topPerformers, generatedAt } = await getAnalyticsData();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-chart-grid bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Market Analytics</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Historical performance and market insights
              </p>
            </div>
            <Badge variant="isr">Incremental Static Regeneration (ISR)</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Revalidation Info */}
        <div className="mb-6 rounded-lg bg-bg-secondary p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-primary">Incremental Static Regeneration</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Last regenerated: <span className="font-mono">{generatedAt}</span>
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                This page revalidates every hour (3600 seconds). Static at build time, but automatically updates in the background. Best of both worlds: fast static pages with fresh data.
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
            href="/market-overview"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Market Overview (SSG)
          </Link>
          <Link
            href="/trading"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Live Trading (SSR)
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-chart-grid bg-bg-secondary p-4">
            <h3 className="text-xs font-semibold text-text-secondary">Average Price (30d)</h3>
            <p className="mt-2 text-2xl font-bold text-text-primary">
              {formatPrice(statistics.avgPrice)}
            </p>
          </div>
          <div className="rounded-lg border border-chart-grid bg-bg-secondary p-4">
            <h3 className="text-xs font-semibold text-text-secondary">30-Day Change</h3>
            <p className={`mt-2 text-2xl font-bold ${statistics.priceChange >= 0 ? 'text-green-positive' : 'text-red-negative'}`}>
              {statistics.priceChange >= 0 ? '+' : ''}
              {statistics.priceChange.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-lg border border-chart-grid bg-bg-secondary p-4">
            <h3 className="text-xs font-semibold text-text-secondary">High / Low</h3>
            <p className="mt-2 text-sm font-mono text-text-primary">
              {formatPrice(statistics.highPrice)}
            </p>
            <p className="text-sm font-mono text-text-secondary">
              {formatPrice(statistics.lowPrice)}
            </p>
          </div>
          <div className="rounded-lg border border-chart-grid bg-bg-secondary p-4">
            <h3 className="text-xs font-semibold text-text-secondary">Total Volume (30d)</h3>
            <p className="mt-2 text-2xl font-bold text-text-primary">
              ${formatLargeNumber(statistics.totalVolume)}
            </p>
          </div>
        </div>

        {/* Top Performers */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-text-primary">Top Performers (30 Days)</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {topPerformers.map((crypto, index) => (
              <div
                key={crypto.symbol}
                className="rounded-lg border border-chart-grid bg-bg-secondary p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-text-secondary">#{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-text-primary">{crypto.symbol}</h3>
                        <p className="text-xs text-text-secondary">{crypto.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-positive">
                      +{crypto.performance.toFixed(1)}%
                    </p>
                    <p className="text-xs text-text-secondary">
                      Vol: ${formatLargeNumber(crypto.volume24h)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Price History */}
        <div className="rounded-lg border border-chart-grid bg-bg-secondary p-6">
          <h2 className="mb-4 text-lg font-bold text-text-primary">30-Day Price History</h2>
          <div className="space-y-2">
            {last30Days.slice(-10).map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-chart-grid py-2 last:border-0"
              >
                <span className="text-sm text-text-secondary">{day.date}</span>
                <span className="font-mono text-sm text-text-primary">
                  {formatPrice(day.price)}
                </span>
                <span className="font-mono text-sm text-text-secondary">
                  Vol: ${formatLargeNumber(day.volume)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-text-secondary">
            Showing last 10 days of 30-day history
          </p>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-xs text-text-secondary">
          <p>This page automatically regenerates every hour</p>
          <p className="mt-1">Next update in approximately {60 - new Date().getMinutes()} minutes</p>
        </div>
      </main>
    </div>
  );
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;
