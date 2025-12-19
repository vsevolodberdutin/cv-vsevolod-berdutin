# Interactive CV Portfolio with DeFi Dashboard

> A modern, interactive portfolio application showcasing professional experience through two micro-frontend applications built with **Feature-Sliced Design** architecture.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![Feature-Sliced Design](https://img.shields.io/badge/Architecture-FSD-blue)](https://feature-sliced.design/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project demonstrates advanced React/Next.js capabilities through two interconnected micro-frontend applications:

1. **CV Portfolio** - Interactive resume with AI-powered chat assistant
2. **DeFi Dashboard** - Real-time cryptocurrency trading dashboard

Both applications are built using **Feature-Sliced Design (FSD)** methodology, showcasing scalable, maintainable frontend architecture patterns.

### Live Demo

- 🌐 CV Portfolio: [https://cv.vsevolodberdutin.com](https://cv.vsevolodberdutin.com)
- 📊 DeFi Dashboard: [https://defi.vsevolodberdutin.com](https://defi.vsevolodberdutin.com)

---

## ✨ Features

### CV Portfolio Application

- **Interactive CV Display**
  - Expandable sections (Skills, Experience, Education)
  - Smooth animations and transitions
  - Mobile-responsive design
  - PDF download functionality

- **AI-Powered Chat Widget**
  - OpenAI GPT integration
  - Context-aware responses about experience
  - Conversation history
  - Suggested prompts

- **Modern UI/UX**
  - Inspired by Claude.ai interface
  - Clean, minimalist design
  - Accessibility-first approach (WCAG 2.1 AA)

### DeFi Dashboard Application

- **Real-Time Price Tracking**
  - WebSocket integration for live updates
  - Support for multiple cryptocurrencies
  - Price change indicators

- **Interactive Charts**
  - Candlestick charts
  - Volume analysis
  - Historical trends
  - Recharts integration

- **Order Book Visualization**
  - Live bid/ask display
  - Depth visualization
  - Market data analytics

- **Rendering Strategies Showcase**
  - Static Site Generation (SSG) - Market Overview
  - Server-Side Rendering (SSR) - Live Trading
  - Incremental Static Regeneration (ISR) - Analytics

---

## 🏗️ Architecture

### Feature-Sliced Design (FSD)

This project follows the **Feature-Sliced Design** methodology for optimal code organization:

```
Layer 6: app/          → Application initialization
Layer 5: pages/        → Page compositions
Layer 4: widgets/      → Composite UI blocks
Layer 3: features/     → User interactions
Layer 2: entities/     → Business entities
Layer 1: shared/       → Reusable resources
```

**Key Principles:**
- ✅ Unidirectional dependency flow (bottom-up)
- ✅ Public API pattern for encapsulation
- ✅ Clear layer boundaries
- ✅ Self-contained slices
- ✅ Testability and maintainability

### Micro-Frontend Architecture

- **Module Federation** for runtime component sharing
- **Independent deployment** of each application
- **Shared dependencies** optimization
- **Isolated development** workflows

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.3
- **Styling:** Tailwind CSS 3.3
- **State Management:** Zustand
- **Charts:** Recharts
- **Animations:** Framer Motion
- **AI Integration:** OpenAI API

### Backend
- **Runtime:** Node.js 18+
- **API:** Next.js API Routes
- **WebSocket:** ws library
- **Real-time:** Server-Sent Events

### DevOps
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Nginx
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel / AWS / DigitalOcean

### Development Tools
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint, Prettier
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky, lint-staged

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Yarn 1.22+ ([Install](https://yarnpkg.com/))
- Docker (optional, for containerized setup)
- OpenAI API Key ([Get one](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vsevolodberdutin/cv-vsevolod-berdutin.git
   cd cv-vsevolod-berdutin
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

4. **Start development servers**
   ```bash
   # Start all applications
   yarn dev

   # Or start individually
   yarn dev:cv        # CV Portfolio (http://localhost:3000)
   yarn dev:defi      # DeFi Dashboard (http://localhost:3001)
   yarn dev:backend   # WebSocket Server (ws://localhost:8080)
   ```

5. **Open in browser**
   - CV Portfolio: [http://localhost:3000](http://localhost:3000)
   - DeFi Dashboard: [http://localhost:3001](http://localhost:3001)

---

## 📁 Project Structure

```
cv-vsevolod-berdutin/
├── apps/
│   ├── cv-portfolio/              # Application 1: CV Portfolio
│   │   ├── src/
│   │   │   ├── app/              # Next.js app router
│   │   │   ├── pages/            # FSD Layer 5: Page compositions
│   │   │   ├── widgets/          # FSD Layer 4: Composite blocks
│   │   │   ├── features/         # FSD Layer 3: User interactions
│   │   │   ├── entities/         # FSD Layer 2: Business entities
│   │   │   └── shared/           # FSD Layer 1: Shared resources
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── defi-dashboard/           # Application 2: DeFi Dashboard
│       ├── src/
│       │   ├── app/
│       │   ├── pages/
│       │   ├── widgets/
│       │   ├── features/
│       │   ├── entities/
│       │   └── shared/
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       └── package.json
│
├── backend/                       # WebSocket server
│   ├── src/
│   │   ├── server.ts
│   │   └── websocket/
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                          # Documentation
│   ├── PROJECT_PROMPT.md         # Full project specification
│   ├── IMPLEMENTATION_PLAN.md    # Step-by-step implementation guide
│   └── CV_CONTENT.md             # CV data structure
│
├── docker-compose.yml            # Multi-container setup
├── nginx.conf                    # Reverse proxy config
├── package.json                  # Root workspace config
├── .env.local.example            # Environment variables template
└── README.md                     # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Development
yarn dev              # Start all apps in development mode
yarn dev:cv           # Start CV Portfolio only
yarn dev:defi         # Start DeFi Dashboard only
yarn dev:backend      # Start WebSocket server only

# Building
yarn build            # Build all applications
yarn build:cv         # Build CV Portfolio only
yarn build:defi       # Build DeFi Dashboard only

# Production
yarn start            # Start all apps in production mode

# Code Quality
yarn lint             # Run ESLint on all workspaces
yarn lint:fix         # Fix ESLint errors
yarn format           # Format code with Prettier
yarn type-check       # Run TypeScript type checking

# Testing
yarn test             # Run all tests
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Generate coverage report

# Docker
yarn docker:build     # Build Docker images
yarn docker:up        # Start containers
yarn docker:down      # Stop containers
yarn docker:logs      # View container logs

# Cleanup
yarn clean            # Remove node_modules and build artifacts
```

### Development Workflow

1. **Create a new feature**
   ```bash
   # Follow FSD structure
   apps/cv-portfolio/src/features/your-feature/
   ├── ui/              # UI components
   ├── model/           # Business logic
   ├── api/             # API calls
   └── index.ts         # Public API
   ```

2. **Write tests**
   ```bash
   yarn test features/your-feature
   ```

3. **Lint and format**
   ```bash
   yarn lint:fix
   yarn format
   ```

4. **Type check**
   ```bash
   yarn type-check
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **lint-staged** for staged file linting

Configuration files:
- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Prettier configuration
- `.husky/` - Git hooks

---

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

2. **Access applications**
   - Nginx reverse proxy: [http://localhost](http://localhost)
   - CV Portfolio: [http://localhost:3000](http://localhost:3000)
   - DeFi Dashboard: [http://localhost:3001](http://localhost:3001)
   - WebSocket Server: ws://localhost:8080

3. **Stop containers**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

```bash
# Build CV Portfolio
cd apps/cv-portfolio
docker build -t cv-portfolio .

# Build DeFi Dashboard
cd apps/defi-dashboard
docker build -t defi-dashboard .

# Build Backend
cd backend
docker build -t backend .

# Run containers
docker run -p 3000:3000 cv-portfolio
docker run -p 3001:3000 defi-dashboard
docker run -p 8080:8080 backend
```

---

## 📚 Documentation

- **[Project Specification](docs/PROJECT_PROMPT.md)** - Complete project requirements
- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)** - Step-by-step development guide
- **[CV Content](docs/CV_CONTENT.md)** - Structured CV data
- **[Feature-Sliced Design](https://feature-sliced.design/)** - Architecture methodology

### Key Concepts

- **[FSD Layers](docs/PROJECT_PROMPT.md#fsd-layer-descriptions)** - Understanding the architecture
- **[Module Federation](docs/PROJECT_PROMPT.md#module-federation-setup)** - Micro-frontend integration
- **[Rendering Strategies](docs/PROJECT_PROMPT.md#rendering-strategy-demonstration)** - SSG, SSR, ISR

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

### E2E Tests (Optional)

```bash
# Install Playwright
yarn add -D @playwright/test

# Run E2E tests
yarn test:e2e
```

### Accessibility Testing

```bash
# Install axe-core
yarn add -D @axe-core/react

# Run accessibility tests
yarn test:a11y
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy CV Portfolio**
   ```bash
   cd apps/cv-portfolio
   vercel
   ```

3. **Deploy DeFi Dashboard**
   ```bash
   cd apps/defi-dashboard
   vercel
   ```

4. **Set environment variables in Vercel dashboard**

### AWS / DigitalOcean

1. **Build Docker images**
   ```bash
   docker-compose build
   ```

2. **Push to container registry**
   ```bash
   docker tag cv-portfolio your-registry/cv-portfolio
   docker push your-registry/cv-portfolio
   ```

3. **Deploy to cloud provider**
   - Configure load balancer
   - Set up SSL certificates
   - Configure environment variables

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow FSD architecture**
   - Place code in appropriate layers
   - Export through public APIs
   - Write tests for new features
4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Vsevolod Berdutin**

- 📧 Email: vsevolodberdutin@gmail.com
- 💼 LinkedIn: [linkedin.com/in/vsevolodberdutin](https://linkedin.com/in/vsevolodberdutin)
- 🐙 GitHub: [@vsevolodberdutin](https://github.com/vsevolodberdutin)
- ✈️ Telegram: [@vsevolodberdutin](https://t.me/vsevolodberdutin)

---

## 🙏 Acknowledgments

- **[Feature-Sliced Design](https://feature-sliced.design/)** - Architecture methodology
- **[Next.js](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[OpenAI](https://openai.com/)** - AI integration
- **[Recharts](https://recharts.org/)** - Charting library

---

## 📊 Project Status

- ✅ FSD Architecture implemented
- ✅ CV Portfolio completed
- ✅ AI Chat integration functional
- ✅ DeFi Dashboard with real-time data
- ✅ Docker setup configured
- 🚧 Module Federation integration (in progress)
- 📝 Documentation (ongoing)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you or if you find it interesting!

---

**Built with ❤️ using Feature-Sliced Design**
