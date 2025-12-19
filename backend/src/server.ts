import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 8080;

interface PriceData {
  [symbol: string]: number;
}

// Initial cryptocurrency prices
const prices: PriceData = {
  BTC: 43250.00,
  ETH: 2280.50,
  SOL: 98.75,
  BNB: 315.20,
  ADA: 0.52,
};

/**
 * Generate mock price updates
 * Simulates realistic price movements (-0.1% to +0.1%)
 */
function generateMockPrices(): PriceData {
  const updated: PriceData = {};

  Object.keys(prices).forEach((symbol) => {
    // Simulate price movement
    const changePercent = (Math.random() - 0.5) * 0.002; // -0.1% to +0.1%
    prices[symbol] = prices[symbol] * (1 + changePercent);
    updated[symbol] = parseFloat(prices[symbol].toFixed(2));
  });

  return updated;
}

/**
 * Start WebSocket server for real-time price updates
 */
export function startWebSocketServer() {
  const wss = new WebSocketServer({ port: Number(PORT) });

  console.log(`🚀 WebSocket server started on port ${PORT}`);
  console.log(`📊 Broadcasting live cryptocurrency prices...`);

  wss.on('connection', (ws: WebSocket) => {
    console.log('✅ Client connected');

    // Send initial prices
    ws.send(JSON.stringify(prices));

    // Send price updates every second
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const updatedPrices = generateMockPrices();
        ws.send(JSON.stringify(updatedPrices));
      }
    }, 1000);

    // Handle incoming messages (e.g., subscribe/unsubscribe)
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'subscribe') {
          console.log('📡 Client subscribed to:', data.symbols);
        } else if (data.type === 'unsubscribe') {
          console.log('📴 Client unsubscribed from:', data.symbols);
        }
      } catch (error) {
        console.error('❌ Invalid message:', error);
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('⛔ Client disconnected');
      clearInterval(interval);
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
      clearInterval(interval);
    });
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 Shutting down WebSocket server...');
    wss.close(() => {
      console.log('✅ WebSocket server closed');
      process.exit(0);
    });
  });
}

// Start the server
startWebSocketServer();
