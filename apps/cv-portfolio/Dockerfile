# CV Portfolio Dockerfile
# Multi-stage build with Vite + Nginx for production

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package.json yarn.lock ./
COPY apps/cv-portfolio/package.json ./apps/cv-portfolio/
COPY apps/ui-kit/package.json ./apps/ui-kit/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY apps/cv-portfolio ./apps/cv-portfolio
COPY apps/ui-kit ./apps/ui-kit

# Build ui-kit first
WORKDIR /app/apps/ui-kit
RUN yarn build

# Build cv-portfolio
WORKDIR /app/apps/cv-portfolio
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/apps/cv-portfolio/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/cv-portfolio/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
