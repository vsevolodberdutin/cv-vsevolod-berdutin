'use client';

import React from 'react';
import { CryptoIcon, Crypto } from '@/entities/crypto';
import { PriceDisplay, PriceChange, formatLargeNumber } from '@/entities/price';
import { cn } from '@/shared/lib/utils';

export interface PriceCardProps {
  crypto: Crypto;
  className?: string;
}

/**
 * PriceCard Component
 * Displays cryptocurrency price information in a card format
 */
export const PriceCard: React.FC<PriceCardProps> = ({ crypto, className }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-chart-grid bg-bg-secondary p-4',
        'transition duration-300',
        'hover:border-green-positive hover:shadow-lg',
        className
      )}
    >
      {/* Header with Icon and Symbol */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={crypto.symbol} size="md" />
          <div>
            <h3 className="font-bold text-text-primary">{crypto.symbol}</h3>
            <p className="text-xs text-text-secondary">{crypto.name}</p>
          </div>
        </div>
        <PriceChange change={crypto.change24h} />
      </div>

      {/* Price Display */}
      <div className="mb-3">
        <PriceDisplay price={crypto.price} size="lg" />
      </div>

      {/* Volume Information */}
      <div className="border-t border-chart-grid pt-3">
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Volume 24h:</span>
          <span className="font-mono font-semibold">
            {formatLargeNumber(crypto.volume24h)}
          </span>
        </div>
        <div className="mt-1 flex justify-between text-xs text-text-secondary">
          <span>Market Cap:</span>
          <span className="font-mono font-semibold">
            {formatLargeNumber(crypto.marketCap)}
          </span>
        </div>
      </div>
    </div>
  );
};

PriceCard.displayName = 'PriceCard';
