# CV Portfolio Dockerfile
# Multi-stage build for optimized production image

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root package files for monorepo
COPY package.json yarn.lock ./
COPY apps/cv-portfolio/package.json ./apps/cv-portfolio/
RUN yarn install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY apps/cv-portfolio ./apps/cv-portfolio

# Environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
# Note: OPENAI_API_KEY should be provided at runtime

WORKDIR /app/apps/cv-portfolio
RUN yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output (includes monorepo structure with node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/apps/cv-portfolio/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/apps/cv-portfolio/.next/static ./apps/cv-portfolio/.next/static

# Copy public folder
COPY --from=builder /app/apps/cv-portfolio/public ./apps/cv-portfolio/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run server from the app directory
CMD ["node", "apps/cv-portfolio/server.js"]
