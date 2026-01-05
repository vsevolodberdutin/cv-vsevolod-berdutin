# Backend WebSocket Server Dockerfile
# Lightweight Node.js image for WebSocket price streaming

FROM node:18-alpine

WORKDIR /app

# Copy root package files for monorepo
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy backend source code
COPY backend ./backend

# Build TypeScript to JavaScript
WORKDIR /app/backend
RUN yarn build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 wsuser && \
    chown -R wsuser:nodejs /app

USER wsuser

# Expose WebSocket port
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV WS_PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Start the WebSocket server
CMD ["node", "dist/server.js"]
