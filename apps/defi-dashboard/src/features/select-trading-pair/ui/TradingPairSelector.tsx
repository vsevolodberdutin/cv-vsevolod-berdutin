'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface TradingPairSelectorProps {
  pairs: string[];
  selectedPair: string;
  onSelectPair: (pair: string) => void;
  className?: string;
}

/**
 * TradingPairSelector Component
 * Dropdown to select a trading pair
 */
export const TradingPairSelector: React.FC<TradingPairSelectorProps> = ({
  pairs,
  selectedPair,
  onSelectPair,
  className,
}) => {
  return (
    <select
      value={selectedPair}
      onChange={(e) => onSelectPair(e.target.value)}
      className={cn(
        'rounded-lg border border-chart-grid bg-bg-secondary px-4 py-2 text-text-primary',
        'transition duration-200',
        'focus:border-green-positive focus:outline-none focus:ring-2 focus:ring-green-positive',
        className
      )}
    >
      {pairs.map((pair) => (
        <option key={pair} value={pair}>
          {pair}
        </option>
      ))}
    </select>
  );
};

TradingPairSelector.displayName = 'TradingPairSelector';
