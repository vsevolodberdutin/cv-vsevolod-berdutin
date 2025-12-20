/**
 * Order Book Types
 */

export interface Order {
  price: number;
  amount: number;
  total: number;
}

export type OrderType = 'bid' | 'ask';

export interface OrderBookData {
  bids: Order[];
  asks: Order[];
}
