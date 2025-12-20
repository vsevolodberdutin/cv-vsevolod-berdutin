import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;

interface PriceData {
  [symbol: string]: number;
}

// Initial realistic prices for cryptocurrencies
const prices: PriceData = {
  BTC: 43250.00,
  ETH: 2280.50,
  SOL: 98.75,
  BNB: 315.20,
  ADA: 0.52,
};

/**
 * Generate mock price updates with realistic volatility
 * Simulates market price movements (-0.1% to +0.1%)
 */
function generateMockPrices(): PriceData {
  const updated: PriceData = {};

  Object.keys(prices).forEach((symbol) => {
    // Simulate realistic price movement (-0.1% to +0.1%)
    const change = (Math.random() - 0.5) * 0.002;
    prices[symbol] = prices[symbol] * (1 + change);

    // Round to appropriate decimal places
    const decimals = prices[symbol] > 100 ? 2 : prices[symbol] > 1 ? 4 : 6;
    updated[symbol] = parseFloat(prices[symbol].toFixed(decimals));
  });

  return updated;
}

/**
 * Start WebSocket server for streaming cryptocurrency prices
 * Broadcasts price updates to all connected clients every second
 */
export function startWebSocketServer() {
  const wss = new WebSocketServer({ port: PORT });

  console.log(`🚀 WebSocket server started on port ${PORT}`);
  console.log(`📊 Streaming prices for: ${Object.keys(prices).join(', ')}`);

  wss.on('connection', (ws: WebSocket) => {
    console.log('✅ Client connected');

    // Send initial prices immediately upon connection
    ws.send(JSON.stringify(prices));

    // Send price updates every second
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const updatedPrices = generateMockPrices();
        ws.send(JSON.stringify(updatedPrices));
      }
    }, 1000);

    // Handle incoming messages from client
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'subscribe') {
          console.log('📡 Client subscribed to symbols:', data.symbols);
        } else if (data.type === 'unsubscribe') {
          console.log('📴 Client unsubscribed from symbols:', data.symbols);
        }
      } catch (error) {
        console.error('❌ Invalid message format:', error);
      }
    });

    // Handle client disconnection
    ws.on('close', () => {
      console.log('❌ Client disconnected');
      clearInterval(interval);
    });

    // Handle WebSocket errors
    ws.on('error', (error) => {
      console.error('⚠️  WebSocket error:', error);
      clearInterval(interval);
    });
  });

  // Handle server errors
  wss.on('error', (error) => {
    console.error('🔥 WebSocket server error:', error);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down WebSocket server...');
    wss.close(() => {
      console.log('✅ WebSocket server closed');
      process.exit(0);
    });
  });
}
