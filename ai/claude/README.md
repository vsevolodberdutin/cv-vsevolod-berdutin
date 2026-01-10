# Interactive CV Portfolio

> A modern, interactive portfolio application built with React, showcasing professional experience with an AI-powered chat assistant.

[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

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

---

## 🎯 Overview

This project is an interactive CV portfolio built with React and Vite, featuring:

1. **CV Portfolio** - Interactive resume with expandable sections
2. **AI Chat Assistant** - OpenAI-powered chat widget for interactive Q&A
3. **UI Kit** - Shared component library with atomic design patterns

### Live Demo

- 🌐 CV Portfolio: [https://cv.vsevolodberdutin.com](https://cv.vsevolodberdutin.com)

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

---

## 🏗️ Architecture

### Monorepo Structure

This project uses **Yarn Workspaces** to manage multiple applications:

- **cv-portfolio** - Main CV application built with Vite + React
- **ui-kit** - Shared component library with Module Federation
- **backend** - Express server for AI chat API

### Component Organization

- **Traditional React structure** with logical separation:
  - `/components` - Reusable UI components
  - `/pages` - Route-based page components
  - `/hooks` - Custom React hooks
  - `/api` - API integration layer
  - `/utils` - Utility functions

- **UI Kit follows Atomic Design**:
  - `/atoms` - Basic components (Button, Input, Badge, Spinner)
  - `/molecules` - Composite components (Card)
  - `/hooks` - Reusable hooks
  - `/utils` - Shared utilities

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Vite 5.0 + React 18.3
- **Language:** TypeScript 5.3
- **Styling:** Tailwind CSS 3.4
- **State Management:** Zustand 5.0
- **Routing:** React Router DOM 6.21
- **Animations:** Framer Motion
- **AI Integration:** OpenAI API
- **Module Federation:** @originjs/vite-plugin-federation

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express 4.18
- **AI:** OpenAI SDK 6.15

### Development Tools
- **Package Manager:** Yarn Workspaces
- **Linting:** ESLint, Prettier
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky, lint-staged

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Yarn 1.22+ ([Install](https://yarnpkg.com/))
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
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

4. **Start development servers**
   ```bash
   # Start backend server
   yarn workspace backend dev    # Port 8080

   # Start CV portfolio (in another terminal)
   yarn workspace cv-portfolio dev    # Port 3000

   # Start UI kit (optional, in another terminal)
   yarn workspace ui-kit dev    # Port 5173
   ```

5. **Open in browser**
   - CV Portfolio: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
cv-vsevolod-berdutin/
├── apps/
│   ├── cv-portfolio/              # Main CV Portfolio Application
│   │   ├── src/
│   │   │   ├── components/       # UI components
│   │   │   │   ├── ChatWidget/  # AI chat feature
│   │   │   │   └── CVSections/  # CV content sections
│   │   │   ├── pages/           # Route pages
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── api/             # API integration
│   │   │   ├── data/            # Static data & types
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── App.tsx          # Main app component
│   │   │   └── main.tsx         # Entry point
│   │   ├── public/              # Static assets
│   │   ├── vite.config.ts       # Vite configuration
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── ui-kit/                   # Shared Component Library
│       ├── src/
│       │   ├── atoms/           # Basic components
│       │   │   ├── Button/
│       │   │   ├── Input/
│       │   │   ├── Badge/
│       │   │   └── Spinner/
│       │   ├── molecules/       # Composite components
│       │   │   └── Card/
│       │   ├── hooks/           # Reusable hooks
│       │   ├── utils/           # Utility functions
│       │   └── index.ts         # Public API
│       ├── vite.config.ts
│       └── package.json
│
├── backend/                      # Express API Server
│   ├── src/
│   │   ├── server.ts            # Main entry point
│   │   └── routes/
│   │       └── chat.ts          # OpenAI chat endpoint
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                         # Documentation
│   ├── CV_Berdutin_Vsevolod_Senior_Frontend.pdf
│   └── CV_Berdutin_Vsevolod_Senior_Frontend.docx
│
├── package.json                  # Root workspace config
├── .env.example                  # Environment variables template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
└── README.md                     # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Development
yarn workspace cv-portfolio dev       # Start CV Portfolio (port 3000)
yarn workspace ui-kit dev             # Start UI Kit (port 5173)
yarn workspace backend dev            # Start backend server (port 8080)

# Building
yarn workspace cv-portfolio build     # Build CV Portfolio
yarn workspace ui-kit build           # Build UI Kit
yarn workspace backend build          # Build backend

# Production
yarn workspace cv-portfolio preview   # Preview CV Portfolio build
yarn workspace backend start          # Start backend in production

# Code Quality
yarn lint                             # Run ESLint on all workspaces
yarn lint:fix                         # Fix ESLint errors
yarn format                           # Format code with Prettier

# Cleanup
yarn clean                            # Remove node_modules and build artifacts
```

### Development Workflow

1. **Create a new component**
   ```bash
   # For CV Portfolio
   apps/cv-portfolio/src/components/YourComponent/
   ├── YourComponent.tsx
   └── index.ts

   # For UI Kit (Atomic Design)
   apps/ui-kit/src/atoms/YourAtom/
   ├── YourAtom.tsx
   └── index.ts
   ```

2. **Lint and format**
   ```bash
   yarn lint:fix
   yarn format
   ```

3. **Commit changes**
   ```bash
   # Use /git command as per project conventions
   /git
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

## 📚 Documentation

Available in the `docs/` folder:
- CV_Berdutin_Vsevolod_Senior_Frontend.pdf
- CV_Berdutin_Vsevolod_Senior_Frontend.docx

---

## 🚢 Deployment

### Vercel (Recommended for Frontend)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy CV Portfolio**
   ```bash
   cd apps/cv-portfolio
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `OPENAI_API_KEY`

### Backend Deployment

Deploy the Express backend to any Node.js hosting platform:
- **Railway** - Simple deployment with automatic SSL
- **Render** - Free tier available
- **DigitalOcean App Platform** - Easy Node.js deployment
- **AWS EC2 / Elastic Beanstalk** - More control

**Required environment variables:**
- `OPENAI_API_KEY`
- `PORT` (default: 8080)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code structure
   - Maintain consistent code style
   - Test your changes
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

## 👤 Author

**Vsevolod Berdutin**

- 📧 Email: vsevolodberdutin@gmail.com
- 💼 LinkedIn: [linkedin.com/in/vsevolodberdutin](https://linkedin.com/in/vsevolodberdutin)
- 🐙 GitHub: [@vsevolodberdutin](https://github.com/vsevolodberdutin)
- ✈️ Telegram: [@vsevolodberdutin](https://t.me/vsevolodberdutin)

---

## 🙏 Acknowledgments

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[OpenAI](https://openai.com/)** - AI integration
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management

---

## 📊 Project Status

- ✅ CV Portfolio completed with Vite + React
- ✅ AI Chat integration functional (OpenAI)
- ✅ UI Kit with Atomic Design pattern
- ✅ Backend API with Express
- ✅ Monorepo setup with Yarn Workspaces
- 🚧 Module Federation integration (experimental)
- 📝 Documentation (ongoing)

---

**Built with ❤️ using React + Vite**
