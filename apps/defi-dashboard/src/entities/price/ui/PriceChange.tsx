import React from 'react';
import { formatChange } from '../model/formatPrice';
import { cn } from '@/shared/lib/utils';

export interface PriceChangeProps {
  change: number;
  className?: string;
}

/**
 * PriceChange Component
 * Displays price change with color coding (green for positive, red for negative)
 */
export const PriceChange: React.FC<PriceChangeProps> = ({ change, className }) => {
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-green-positive' : 'text-red-negative';

  return (
    <span className={cn('font-mono text-sm font-semibold', colorClass, className)}>
      {formatChange(change)}
    </span>
  );
};

PriceChange.displayName = 'PriceChange';
