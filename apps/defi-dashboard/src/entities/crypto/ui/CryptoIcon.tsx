import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CryptoIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-base',
};

/**
 * CryptoIcon Component
 * Displays a circular icon with cryptocurrency symbol
 */
export const CryptoIcon: React.FC<CryptoIconProps> = ({
  symbol,
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-chart-grid',
        sizeClasses[size],
        className
      )}
    >
      <span className="font-bold text-text-primary">{symbol}</span>
    </div>
  );
};

CryptoIcon.displayName = 'CryptoIcon';
