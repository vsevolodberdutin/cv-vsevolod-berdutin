'use client';

import { useState, useCallback } from 'react';

/**
 * Hook to manage selected trading pair
 * @param defaultPair - Initial trading pair (default: 'BTC/USD')
 * @returns Object with selected pair and setter function
 */
export function useSelectPair(defaultPair: string = 'BTC/USD') {
  const [selectedPair, setSelectedPair] = useState(defaultPair);

  const selectPair = useCallback((pair: string) => {
    setSelectedPair(pair);
  }, []);

  return { selectedPair, selectPair };
}
