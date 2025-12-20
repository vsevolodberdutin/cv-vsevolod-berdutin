import { startWebSocketServer } from './websocket/priceStream';

/**
 * Main server entry point
 * Starts the WebSocket server for real-time cryptocurrency price streaming
 */
console.log('🚀 Starting DeFi Dashboard Backend Server...\n');

startWebSocketServer();

console.log('\n✅ Server is running');
console.log('💡 Connect your frontend to ws://localhost:8080 to receive live price updates');
