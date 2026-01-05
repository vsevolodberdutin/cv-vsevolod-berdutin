'use client';

import { useState, useEffect, useMemo } from 'react';

export interface PriceData {
  [symbol: string]: number;
}

/**
 * Hook to subscribe to real-time price updates via WebSocket
 * @param symbols - Array of cryptocurrency symbols to track
 * @returns Object with prices and connection status
 */
export function useSubscribePrice(symbols: string[]) {
  const [prices, setPrices] = useState<PriceData>({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize symbols string to avoid unnecessary re-renders
  const symbolsKey = useMemo(() => symbols.join(','), [symbols.join(',')]);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/prices';
    let ws: WebSocket;

    try {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);

        // Subscribe to symbols
        ws.send(JSON.stringify({ type: 'subscribe', symbols }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setPrices(data);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      setError('Failed to connect to price feed');
      setIsConnected(false);
    }

    // Cleanup on unmount
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbolsKey]);

  return { prices, isConnected, error };
}
