# DeFi Dashboard Backend

WebSocket server for streaming real-time cryptocurrency prices to the DeFi Dashboard frontend.

## Features

- Real-time price streaming via WebSocket
- Mock price generation with realistic volatility
- Support for multiple cryptocurrencies (BTC, ETH, SOL, BNB, ADA)
- Automatic client subscription management
- Graceful shutdown handling

## Getting Started

### Install Dependencies

```bash
yarn install
```

### Run Development Server

```bash
yarn dev
```

The WebSocket server will start on `ws://localhost:8080`

### Run Production Server

```bash
yarn build
yarn start
```

## WebSocket API

### Connection

Connect to `ws://localhost:8080`

### Subscribe to Price Updates

Send a subscription message:

```json
{
  "type": "subscribe",
  "symbols": ["BTC", "ETH", "SOL"]
}
```

### Receive Price Updates

The server will send price updates every second:

```json
{
  "BTC": 43250.00,
  "ETH": 2280.50,
  "SOL": 98.75,
  "BNB": 315.20,
  "ADA": 0.52
}
```

## Environment Variables

- `WS_PORT` - WebSocket server port (default: 8080)

## Architecture

- `src/websocket/priceStream.ts` - WebSocket server and price streaming logic
- `src/server.ts` - Main entry point

## Development

The server uses `tsx` for TypeScript execution and watch mode during development.
