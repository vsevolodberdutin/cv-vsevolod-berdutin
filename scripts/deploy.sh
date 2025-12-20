#!/bin/bash
# Deployment script for CV Portfolio & DeFi Dashboard
# Usage: ./scripts/deploy.sh [environment]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${GREEN}🚀 Starting deployment...${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}\n"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️  Please edit .env file and add your OPENAI_API_KEY${NC}"
    echo -e "${YELLOW}Opening .env file for editing...${NC}"
    ${EDITOR:-nano} .env
fi

# Validate OPENAI_API_KEY is set
if ! grep -q "OPENAI_API_KEY=sk-" .env; then
    echo -e "${RED}❌ OPENAI_API_KEY is not set in .env file${NC}"
    echo -e "${YELLOW}Please edit .env and add your OpenAI API key${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}\n"

# Stop existing containers
echo -e "${YELLOW}📦 Stopping existing containers...${NC}"
docker-compose down

# Pull latest images if needed
echo -e "${YELLOW}📥 Pulling base images...${NC}"
docker-compose pull nginx || true

# Build images
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build --no-cache

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check service status
echo -e "\n${GREEN}📊 Service Status:${NC}"
docker-compose ps

# Display access URLs
echo -e "\n${GREEN}✅ Deployment complete!${NC}\n"
echo -e "${GREEN}Access your applications:${NC}"
echo -e "  📄 CV Portfolio:      ${YELLOW}http://localhost${NC}"
echo -e "  📊 DeFi Dashboard:    ${YELLOW}http://localhost/defi${NC}"
echo -e "  🔌 WebSocket:         ${YELLOW}ws://localhost/ws${NC}"
echo -e "  ❤️  Health Check:      ${YELLOW}http://localhost/health${NC}"
echo -e "\n${GREEN}View logs:${NC} docker-compose logs -f"
echo -e "${GREEN}Stop services:${NC} docker-compose down\n"

# Optional: Run health checks
echo -e "${YELLOW}Running health checks...${NC}"
sleep 5

if curl -s http://localhost/health > /dev/null; then
    echo -e "${GREEN}✓ Nginx health check passed${NC}"
else
    echo -e "${RED}✗ Nginx health check failed${NC}"
fi

echo -e "\n${GREEN}🎉 Deployment successful!${NC}"
