# Deployment Guide

Complete guide for deploying the CV Portfolio and DeFi Dashboard applications using Docker and Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Node.js** (version 18+) - for local development
- **Yarn** (version 1.22+) - package manager

### System Requirements

- **CPU**: 2+ cores recommended
- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 10GB free space for images and containers
- **Network**: Open ports 80, 3000, 3001, 8080

## Architecture

### Services Overview

```
┌─────────────────────────────────────────────────┐
│                    Nginx (Port 80)               │
│              Reverse Proxy & Load Balancer       │
└─────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌──────────┐
│ CV Portfolio  │ │ DeFi Dashboard│ │ Backend  │
│  (Port 3000)  │ │  (Port 3001)  │ │(Port 8080│
└───────────────┘ └───────────────┘ └──────────┘
```

### Service Details

1. **CV Portfolio**
   - Interactive resume with AI chat
   - Port: 3000 (internal), 80 (external via nginx)
   - Requires: OPENAI_API_KEY

2. **DeFi Dashboard**
   - Real-time cryptocurrency trading dashboard
   - Port: 3001 (internal), 80/defi (external via nginx)
   - Demonstrates SSG, SSR, ISR rendering strategies

3. **Backend WebSocket Server**
   - Real-time price streaming
   - Port: 8080 (internal), 80/ws (external via nginx)
   - Streams BTC, ETH, SOL, BNB, ADA prices

4. **Nginx**
   - Reverse proxy and load balancer
   - Port: 80 (HTTP)
   - Routes traffic to appropriate services

## Environment Setup

### 1. Create Environment File

Create `.env` file in the project root:

```bash
# OpenAI API Key for CV Portfolio chat feature
OPENAI_API_KEY=your_openai_api_key_here

# WebSocket URL (internal Docker network)
NEXT_PUBLIC_WS_URL=ws://backend:8080

# Node Environment
NODE_ENV=production
```

### 2. Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for chat | CV Portfolio | - |
| `NEXT_PUBLIC_WS_URL` | WebSocket server URL | DeFi Dashboard | ws://backend:8080 |
| `NODE_ENV` | Node environment | All | production |
| `WS_PORT` | WebSocket server port | Backend | 8080 |

## Docker Deployment

### Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up -d --build
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

### Step-by-Step Deployment

#### 1. Build Docker Images

Build all images:
```bash
docker-compose build
```

Build specific service:
```bash
docker-compose build cv-portfolio
docker-compose build defi-dashboard
docker-compose build backend
```

#### 2. Start Services

Start all services in detached mode:
```bash
docker-compose up -d
```

Start specific service:
```bash
docker-compose up -d cv-portfolio
```

#### 3. Verify Deployment

Check service status:
```bash
docker-compose ps
```

Check service health:
```bash
docker-compose ps
docker inspect --format='{{json .State.Health}}' cv-portfolio
```

#### 4. Access Applications

- **CV Portfolio**: http://localhost
- **DeFi Dashboard**: http://localhost/defi
- **WebSocket**: ws://localhost/ws
- **Nginx Health**: http://localhost/health

### Docker Commands Reference

```bash
# View logs
docker-compose logs -f [service-name]

# Restart service
docker-compose restart [service-name]

# Stop services
docker-compose stop

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Scale service (if needed)
docker-compose up -d --scale backend=2

# Execute command in container
docker-compose exec cv-portfolio sh

# View resource usage
docker stats
```

## Production Deployment

### 1. Optimization Steps

#### Enable Production Mode
Ensure `NODE_ENV=production` is set in `.env`

#### Build Optimization
```bash
# Build with no cache for clean build
docker-compose build --no-cache

# Use specific platform
docker-compose build --platform linux/amd64
```

### 2. Security Hardening

#### Update nginx.conf for HTTPS

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Your existing location blocks
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

#### Use Docker Secrets

```yaml
services:
  cv-portfolio:
    secrets:
      - openai_key
    environment:
      - OPENAI_API_KEY_FILE=/run/secrets/openai_key

secrets:
  openai_key:
    file: ./secrets/openai_api_key.txt
```

### 3. Cloud Deployment

#### AWS EC2

```bash
# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/your-repo/cv-vsevolod-berdutin.git
cd cv-vsevolod-berdutin

# Set up environment
cp .env.example .env
nano .env

# Deploy
docker-compose up -d
```

#### DigitalOcean Droplet

Use the Docker Droplet marketplace image and follow similar steps as AWS.

#### Google Cloud Run

Build and push images:
```bash
# Build for Cloud Run
docker build -t gcr.io/PROJECT_ID/cv-portfolio ./apps/cv-portfolio
docker build -t gcr.io/PROJECT_ID/defi-dashboard ./apps/defi-dashboard
docker build -t gcr.io/PROJECT_ID/backend ./backend

# Push to registry
docker push gcr.io/PROJECT_ID/cv-portfolio
docker push gcr.io/PROJECT_ID/defi-dashboard
docker push gcr.io/PROJECT_ID/backend

# Deploy
gcloud run deploy cv-portfolio --image gcr.io/PROJECT_ID/cv-portfolio --platform managed
```

## Monitoring & Maintenance

### Health Checks

All services include health checks:

```bash
# Check service health
docker-compose ps

# Manual health check
curl http://localhost/health
```

### Log Management

```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100

# View logs for specific service
docker-compose logs cv-portfolio
```

### Resource Monitoring

```bash
# View resource usage
docker stats

# Detailed container info
docker inspect cv-portfolio
```

### Backups

```bash
# Export container
docker export cv-portfolio > cv-portfolio-backup.tar

# Save image
docker save -o cv-portfolio-image.tar cv-vsevolod-berdutin_cv-portfolio

# Backup volumes
docker run --rm -v backend-websocket-data:/data -v $(pwd):/backup alpine tar czf /backup/backend-data.tar.gz /data
```

### Updates

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or rebuild specific service
docker-compose up -d --build cv-portfolio
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port
lsof -i :80
lsof -i :3000

# Kill process
kill -9 PID
```

#### 2. Container Won't Start

```bash
# Check logs
docker-compose logs [service-name]

# Remove and rebuild
docker-compose down
docker-compose up -d --build
```

#### 3. OpenAI API Error

Check `.env` file has valid `OPENAI_API_KEY`:
```bash
cat .env | grep OPENAI_API_KEY
```

#### 4. WebSocket Connection Failed

Verify backend is running:
```bash
docker-compose logs backend
curl http://localhost:8080
```

#### 5. Nginx 502 Bad Gateway

Check upstream services:
```bash
docker-compose ps
docker-compose logs nginx
```

### Debug Mode

Run services in foreground to see output:
```bash
docker-compose up
```

Access container shell:
```bash
docker-compose exec cv-portfolio sh
```

### Performance Issues

Check resource usage:
```bash
docker stats

# Limit container resources
docker-compose up -d --scale cv-portfolio=1 --memory=1g --cpus=0.5
```

## Useful Commands

```bash
# Clean up Docker system
docker system prune -a

# Remove unused volumes
docker volume prune

# View Docker disk usage
docker system df

# Export all logs
docker-compose logs > deployment-logs.txt

# Restart all services
docker-compose restart

# Update specific service
docker-compose up -d --no-deps --build cv-portfolio
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Nginx Documentation](https://nginx.org/en/docs/)

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review this documentation
- Check Docker and Docker Compose versions
- Verify environment variables are set correctly
