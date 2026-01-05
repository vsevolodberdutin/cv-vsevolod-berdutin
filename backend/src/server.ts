import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import chatRouter from './routes/chat';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

/**
 * Main server entry point
 * Starts both Express HTTP server and WebSocket server
 */
console.log('🚀 Starting Backend Server...\n');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(chatRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create HTTP server
const server = createServer(app);

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

// WebSocket logic (from priceStream.ts)
interface PriceData {
  [symbol: string]: number;
}

const prices: PriceData = {
  BTC: 43250.00,
  ETH: 2280.50,
  SOL: 98.75,
  BNB: 315.20,
  ADA: 0.52,
};

function generateMockPrices(): PriceData {
  const updated: PriceData = {};

  Object.keys(prices).forEach((symbol) => {
    const change = (Math.random() - 0.5) * 0.002;
    prices[symbol] = prices[symbol] * (1 + change);
    const decimals = prices[symbol] > 100 ? 2 : prices[symbol] > 1 ? 4 : 6;
    updated[symbol] = parseFloat(prices[symbol].toFixed(decimals));
  });

  return updated;
}

wss.on('connection', (ws: WebSocket) => {
  console.log('✅ WebSocket client connected');

  ws.send(JSON.stringify(prices));

  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const updatedPrices = generateMockPrices();
      ws.send(JSON.stringify(updatedPrices));
    }
  }, 1000);

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

  ws.on('close', () => {
    console.log('❌ WebSocket client disconnected');
    clearInterval(interval);
  });

  ws.on('error', (error) => {
    console.error('⚠️  WebSocket error:', error);
    clearInterval(interval);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ HTTP server running on http://localhost:${PORT}`);
  console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
  console.log(`📊 Streaming prices for: ${Object.keys(prices).join(', ')}`);
  console.log(`💬 Chat API available at http://localhost:${PORT}/api/chat`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
