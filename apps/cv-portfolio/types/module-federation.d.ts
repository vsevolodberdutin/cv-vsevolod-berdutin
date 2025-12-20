/**
 * Module Federation Type Declarations
 * Defines types for components exposed by remote micro-frontends
 */

declare module 'defi_dashboard/PriceTicker' {
  import { FC } from 'react';
  export const PriceTicker: FC;
}

declare module 'defi_dashboard/TradingChart' {
  import { FC } from 'react';

  export interface ChartData {
    time: string;
    price: number;
  }

  export interface TradingChartProps {
    data: ChartData[];
    symbol: string;
    className?: string;
  }

  export const TradingChart: FC<TradingChartProps>;
}

declare module 'defi_dashboard/OrderBook' {
  import { FC } from 'react';

  export interface OrderBookProps {
    symbol: string;
    className?: string;
  }

  export const OrderBook: FC<OrderBookProps>;
}

declare module 'defi_dashboard/Dashboard' {
  import { FC } from 'react';
  export const DashboardPage: FC;
}
