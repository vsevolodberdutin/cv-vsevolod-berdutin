'use client';

import React from 'react';
import { Order, OrderType } from '../model/types';
import { formatPrice } from '@/entities/price';
import { cn } from '@/shared/lib/utils';

export interface OrderRowProps {
  order: Order;
  type: OrderType;
  maxTotal: number;
}

/**
 * OrderRow Component
 * Displays a single order (bid or ask) with depth visualization
 */
export const OrderRow: React.FC<OrderRowProps> = ({ order, type, maxTotal }) => {
  const depthPercentage = (order.total / maxTotal) * 100;

  return (
    <div className="relative overflow-hidden">
      {/* Depth Bar Background */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full transition-all duration-300',
          type === 'bid' ? 'bg-green-positive/10' : 'bg-red-negative/10'
        )}
        style={{ width: `${depthPercentage}%` }}
      />

      {/* Order Data */}
      <div className="relative grid grid-cols-3 gap-2 px-3 py-1 text-xs font-mono">
        <span
          className={cn(
            'text-left font-semibold',
            type === 'bid' ? 'text-green-positive' : 'text-red-negative'
          )}
        >
          {formatPrice(order.price)}
        </span>
        <span className="text-center text-text-secondary">
          {order.amount.toFixed(4)}
        </span>
        <span className="text-right text-text-secondary">
          {order.total.toFixed(4)}
        </span>
      </div>
    </div>
  );
};

OrderRow.displayName = 'OrderRow';
