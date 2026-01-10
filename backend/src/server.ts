import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

/**
 * Main server entry point
 * Express HTTP server for CV Portfolio chat API
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ HTTP server running on http://localhost:${PORT}`);
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
