'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface ChartData {
  time: string;
  price: number;
}

export interface TradingChartProps {
  data: ChartData[];
  symbol: string;
  className?: string;
}

/**
 * TradingChart Widget
 * Displays price chart using Recharts
 */
export const TradingChart: React.FC<TradingChartProps> = ({
  data,
  symbol,
  className,
}) => {
  return (
    <div className={`rounded-lg border border-chart-grid bg-bg-secondary p-6 ${className || ''}`}>
      <h3 className="mb-4 text-lg font-bold text-text-primary">
        {symbol} Price Chart
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2F3336" />
          <XAxis
            dataKey="time"
            stroke="#8B98A5"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#8B98A5"
            style={{ fontSize: '12px' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1F26',
              border: '1px solid #2F3336',
              borderRadius: '8px',
              color: '#E7E9EA',
            }}
            labelStyle={{ color: '#E7E9EA' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00D46A"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-text-secondary">
        Last 24 hours price movement
      </div>
    </div>
  );
};

TradingChart.displayName = 'TradingChart';
