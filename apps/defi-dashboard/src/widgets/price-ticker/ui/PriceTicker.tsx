'use client';

import React from 'react';
import { useSubscribePrice } from '@/features/subscribe-price';
import { CRYPTO_LIST, Crypto } from '@/entities/crypto';
import { PriceCard } from './PriceCard';
import { Spinner } from '@/shared/ui';

/**
 * PriceTicker Widget
 * Displays live cryptocurrency prices with WebSocket updates
 */
export const PriceTicker: React.FC = () => {
  const symbols = CRYPTO_LIST.map((c) => c.symbol);
  const { prices, isConnected, error } = useSubscribePrice(symbols);

  // Generate mock data for demonstration (will be replaced with real WebSocket data)
  const cryptoData: Crypto[] = CRYPTO_LIST.map((crypto) => ({
    ...crypto,
    price: prices[crypto.symbol] || Math.random() * 50000 + 1000,
    change24h: Math.random() * 20 - 10, // Random -10% to +10%
    volume24h: Math.random() * 50e9,
    marketCap: Math.random() * 500e9,
  }));

  return (
    <div>
      {/* Header with Connection Status */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Live Prices</h2>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? 'bg-green-positive' : 'bg-red-negative'
            }`}
          />
          <span className="text-xs text-text-secondary">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-negative/10 p-3 text-sm text-red-negative">
          {error}
        </div>
      )}

      {/* Loading State */}
      {!isConnected && !error && (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Price Cards Grid */}
      {(isConnected || Object.keys(prices).length > 0) && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cryptoData.map((crypto) => (
            <PriceCard key={crypto.symbol} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
};

PriceTicker.displayName = 'PriceTicker';
