# Quick Start Guide

This guide will help you get the project up and running quickly.

---

## 🎯 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] Yarn package manager ([Install](https://yarnpkg.com/))
- [ ] OpenAI API key ([Get one](https://platform.openai.com/api-keys))
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Clone and Install

```bash
# Navigate to your projects folder
cd ~/Documents/myProjects

# You're already here! Install dependencies
yarn install
```

### Step 2: Environment Setup

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local and add your OpenAI API key
# On Mac, you can use:
open .env.local
```

Add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 3: Create Project Structure

```bash
# Create app directories
mkdir -p apps/cv-portfolio apps/defi-dashboard backend

# You're ready to start building!
```

---

## 🏗️ Next Steps

Now follow the **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)** to build the project step by step.

### Recommended Order:

1. **Phase 0: Foundation** (Days 1-2)
   - Set up Next.js applications
   - Configure FSD structure
   - Install dependencies

2. **Phase 1: Shared Layer** (Days 3-4)
   - Build reusable UI components
   - Create utility functions
   - Set up design system

3. **Phase 2: CV Portfolio** (Days 5-7)
   - Create entities and features
   - Build widgets
   - Integrate OpenAI

4. **Phase 3: DeFi Dashboard** (Days 11-13)
   - Create crypto entities
   - Build trading widgets
   - WebSocket integration

---

## 📋 Helpful Commands

```bash
# Start development (after apps are created)
yarn dev

# Start individual apps
yarn dev:cv          # CV Portfolio
yarn dev:defi        # DeFi Dashboard
yarn dev:backend     # WebSocket server

# Code quality
yarn lint            # Check code
yarn format          # Format code
yarn type-check      # TypeScript validation

# Build for production
yarn build

# Docker deployment
yarn docker:build    # Build containers
yarn docker:up       # Start containers
```

---

## 📚 Documentation

- **[README.md](README.md)** - Project overview and full documentation
- **[IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)** - Detailed step-by-step guide
- **[PROJECT_PROMPT.md](docs/PROJECT_PROMPT.md)** - Complete project specification
- **[CV_CONTENT.md](docs/CV_CONTENT.md)** - CV data structure

---

## 🆘 Troubleshooting

### Node version issues
```bash
node --version  # Should be 18.0.0 or higher
```

### Yarn not found
```bash
npm install -g yarn
```

### OpenAI API not working
- Check your API key in `.env.local`
- Ensure you have credits in your OpenAI account
- Verify the key starts with `sk-`

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports in package.json
```

---

## 🎓 Learning Resources

- [Feature-Sliced Design](https://feature-sliced.design/) - Architecture methodology
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework

---

## ✅ First Milestone Checklist

After completing Phase 0 and Phase 1, you should have:

- [ ] Next.js apps initialized
- [ ] FSD folder structure created
- [ ] TypeScript configured with path aliases
- [ ] Tailwind CSS set up
- [ ] Basic UI components created (Button, Input, Card)
- [ ] Utility functions implemented
- [ ] Development servers running
- [ ] Hot reload working

---

## 🚀 Ready to Build?

You're all set! Start with **Phase 0** in the [Implementation Plan](docs/IMPLEMENTATION_PLAN.md).

**Good luck building your portfolio! 🎉**

---

## 💡 Pro Tips

1. **Commit often** - Use meaningful commit messages
2. **Test as you go** - Don't wait until the end
3. **Follow FSD strictly** - It will save you time later
4. **Read the docs** - Everything is documented in `/docs`
5. **Ask for help** - Open an issue if you get stuck

---

**Need help?** Check the [full documentation](README.md) or open an issue on GitHub.
