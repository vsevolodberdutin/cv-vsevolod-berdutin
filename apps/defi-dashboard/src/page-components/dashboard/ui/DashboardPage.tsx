'use client';

import React from 'react';
import { PriceTicker } from '@/widgets/price-ticker';
import { TradingChart, ChartData } from '@/widgets/trading-chart';
import { OrderBook } from '@/widgets/order-book';
import { useSelectPair } from '@/features/select-trading-pair';

/**
 * DeFi Dashboard Page
 * Main trading dashboard with live prices, charts, and order book
 */
export const DashboardPage: React.FC = () => {
  const { selectedPair, selectPair } = useSelectPair();

  // Generate mock chart data (will be replaced with real data)
  const chartData: ChartData[] = React.useMemo(() => {
    const data: ChartData[] = [];
    const basePrice = 45000;
    const now = new Date();

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const price = basePrice + Math.random() * 2000 - 1000;
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        price,
      });
    }

    return data;
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-chart-grid bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text-primary">
              DeFi Trading Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <select
                value={selectedPair}
                onChange={(e) => selectPair(e.target.value)}
                className="rounded-lg border border-chart-grid bg-bg-primary px-4 py-2 text-sm text-text-primary
                  transition duration-200
                  hover:border-green-positive focus:border-green-positive focus:outline-none focus:ring-2 focus:ring-green-positive/20"
              >
                <option value="BTC/USD">BTC/USD</option>
                <option value="ETH/USD">ETH/USD</option>
                <option value="SOL/USD">SOL/USD</option>
              </select>

              {/* Back to CV Portfolio Button */}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-green-positive bg-bg-primary px-4 py-2
                  text-sm font-semibold text-green-positive shadow-sm
                  transition duration-300
                  hover:bg-green-positive hover:text-bg-primary hover:shadow-md"
              >
                <span>←</span>
                <span>Back to CV</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Live Prices Section */}
        <section className="mb-8">
          <PriceTicker />
        </section>

        {/* Trading View Section */}
        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TradingChart data={chartData} symbol={selectedPair} />
          </div>

          {/* Order Book - Takes 1 column on large screens */}
          <div>
            <OrderBook symbol={selectedPair} />
          </div>
        </section>

        {/* Footer Info */}
        <footer className="mt-12 border-t border-chart-grid pt-6 text-center text-xs text-text-secondary">
          <p>
            This is a demo DeFi Dashboard built with Next.js 14, TypeScript, and
            Feature-Sliced Design
          </p>
          <p className="mt-2">
            Real-time data powered by WebSocket | Charts by Recharts
          </p>
        </footer>
      </main>
    </div>
  );
};

DashboardPage.displayName = 'DashboardPage';
