import React from 'react';
import { formatPrice } from '../model/formatPrice';
import { cn } from '@/shared/lib/utils';

export interface PriceDisplayProps {
  price: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
};

/**
 * PriceDisplay Component
 * Displays a formatted price value
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  size = 'md',
  className,
}) => {
  return (
    <span className={cn('font-mono font-bold text-text-primary', sizeClasses[size], className)}>
      {formatPrice(price)}
    </span>
  );
};

PriceDisplay.displayName = 'PriceDisplay';
