import { Badge } from '@/shared/ui';
import { TradingChart, ChartData } from '@/widgets/trading-chart';
import { OrderBook } from '@/widgets/order-book';
import { PriceCard } from '@/widgets/price-ticker';
import { CRYPTO_LIST } from '@/entities/crypto';
import Link from 'next/link';
import { RefreshButton } from './RefreshButton';

/**
 * Get real-time trading data
 * This function runs on every request for SSR
 */
async function getTradingData() {
  // In production, this would fetch from a real-time API
  // For demo, we generate fresh data on each request
  const currentTime = new Date();

  // Generate chart data for last 24 hours
  const chartData: ChartData[] = Array.from({ length: 24 }, (_, i) => {
    const time = new Date(currentTime.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: 43000 + Math.random() * 2000 - 1000,
    };
  });

  // Generate live crypto prices
  const cryptoPrices = CRYPTO_LIST.slice(0, 3).map((crypto) => ({
    ...crypto,
    price: Math.random() * 50000 + 1000,
    change24h: Math.random() * 20 - 10,
    volume24h: Math.random() * 50e9,
    marketCap: Math.random() * 500e9,
  }));

  return {
    chartData,
    cryptoPrices,
    fetchedAt: currentTime.toISOString(),
  };
}

/**
 * Live Trading Page (SSR)
 * This page is rendered on every request and demonstrates Server-Side Rendering
 */
export default async function TradingPage() {
  const { chartData, cryptoPrices, fetchedAt } = await getTradingData();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-chart-grid bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Live Trading</h1>
              <p className="mt-1 text-sm text-text-secondary">
                Real-time market data updated on every page load
              </p>
            </div>
            <Badge variant="ssr">Server-Side Rendering (SSR)</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Rendering Info */}
        <div className="mb-6 rounded-lg bg-bg-secondary p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text-primary">Server-Side Rendering</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Server rendered at: <span className="font-mono">{fetchedAt}</span>
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                This page is rendered on the server for every request, ensuring fresh data on each page load. Perfect for dynamic, frequently changing content.
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
            href="/analytics"
            className="rounded-lg bg-bg-secondary px-4 py-2 text-sm text-text-primary transition duration-200 hover:bg-chart-grid"
          >
            Analytics (ISR)
          </Link>
        </div>

        {/* Live Prices */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-bold text-text-primary">Live Prices</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cryptoPrices.map((crypto) => (
              <PriceCard key={crypto.symbol} crypto={crypto} />
            ))}
          </div>
        </div>

        {/* Trading View */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TradingChart data={chartData} symbol="BTC/USD" />
          </div>

          {/* Order Book - Takes 1 column on large screens */}
          <div>
            <OrderBook symbol="BTC/USD" />
          </div>
        </div>

        {/* Refresh Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-text-secondary">
            Refresh the page to see updated data from the server
          </p>
          <RefreshButton />
        </div>
      </main>
    </div>
  );
}

// Force server-side rendering on every request
export const dynamic = 'force-dynamic';
