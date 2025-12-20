'use client';

import React, { useMemo } from 'react';
import { OrderRow } from './OrderRow';
import { Order, OrderBookData } from '../model/types';

export interface OrderBookProps {
  symbol: string;
  className?: string;
}

/**
 * OrderBook Widget
 * Displays bid/ask orders with depth visualization
 */
export const OrderBook: React.FC<OrderBookProps> = ({ symbol, className }) => {
  // Generate mock order book data (will be replaced with real WebSocket data)
  const orderBookData: OrderBookData = useMemo(() => {
    const generateOrders = (basePrice: number, isAsk: boolean): Order[] => {
      const orders: Order[] = [];
      let cumulativeTotal = 0;

      for (let i = 0; i < 10; i++) {
        const priceOffset = i * (basePrice * 0.001);
        const price = isAsk ? basePrice + priceOffset : basePrice - priceOffset;
        const amount = Math.random() * 2 + 0.1;
        cumulativeTotal += amount;

        orders.push({
          price,
          amount,
          total: cumulativeTotal,
        });
      }

      return orders;
    };

    const basePrice = 45000; // Mock BTC price
    return {
      bids: generateOrders(basePrice, false),
      asks: generateOrders(basePrice, true).reverse(),
    };
  }, []);

  const maxBidTotal = Math.max(...orderBookData.bids.map((o) => o.total));
  const maxAskTotal = Math.max(...orderBookData.asks.map((o) => o.total));

  return (
    <div className={`rounded-lg border border-chart-grid bg-bg-secondary p-4 ${className || ''}`}>
      {/* Header */}
      <h3 className="mb-4 text-lg font-bold text-text-primary">
        Order Book - {symbol}
      </h3>

      {/* Column Headers */}
      <div className="mb-2 grid grid-cols-3 gap-2 px-3 text-xs font-semibold text-text-secondary">
        <span className="text-left">Price (USD)</span>
        <span className="text-center">Amount</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sell Orders) */}
      <div className="mb-4">
        {orderBookData.asks.map((ask, index) => (
          <OrderRow
            key={`ask-${index}`}
            order={ask}
            type="ask"
            maxTotal={maxAskTotal}
          />
        ))}
      </div>

      {/* Spread Indicator */}
      <div className="my-3 border-t border-chart-grid pt-3 text-center">
        <div className="text-xs text-text-secondary">Spread</div>
        <div className="text-sm font-bold text-text-primary">
          {(orderBookData.asks[orderBookData.asks.length - 1].price -
            orderBookData.bids[0].price).toFixed(2)}{' '}
          USD
        </div>
      </div>

      {/* Bids (Buy Orders) */}
      <div className="mt-4">
        {orderBookData.bids.map((bid, index) => (
          <OrderRow
            key={`bid-${index}`}
            order={bid}
            type="bid"
            maxTotal={maxBidTotal}
          />
        ))}
      </div>
    </div>
  );
};

OrderBook.displayName = 'OrderBook';
