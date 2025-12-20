/**
 * Crypto Entity Types
 * Defines the data structure for cryptocurrency information
 */

export interface Crypto {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface CryptoInfo {
  symbol: string;
  name: string;
}

export const CRYPTO_LIST: CryptoInfo[] = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'ADA', name: 'Cardano' },
];
