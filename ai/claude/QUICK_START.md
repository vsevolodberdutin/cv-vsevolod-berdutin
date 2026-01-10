# QUICK START — READ FIRST

This folder defines mandatory rules for Claude.

STEPS:
1. Read ALL files in this folder
2. Follow instructions STRICTLY
3. Do NOT start coding before reading everything

PRIORITY:
1. system.md
2. workflow.md
3. other files

If rules conflict or are unclear:
STOP and ask for clarification.

---

PROJECT CONTEXT (SUMMARY):

- Monorepo using Yarn Workspaces
- Frontend: React 18 + Vite + TypeScript + Tailwind
- Backend: Node.js 18 + Express
- AI: OpenAI API (chat assistant)
- Architecture: separated apps + shared ui-kit
- This is a production-grade interactive CV portfolio

Claude is expected to behave as a senior engineer working in an existing codebase.

---

## 🎯 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] Yarn package manager ([Install](https://yarnpkg.com/))
- [ ] OpenAI API key ([Get one](https://platform.openai.com/api-keys))
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## 📋 Helpful Commands

```bash
# Start development (after apps are created)
yarn dev

# Start individual apps
yarn dev:cv          # CV Portfolio
yarn dev:backend     # WebSocket server

# Code quality
yarn lint            # Check code
yarn format          # Format code
yarn type-check      # TypeScript validation

# Build for production
yarn build

---

## 📚 Documentation

- **[README.md](README.md)** - Project overview and full documentation

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
- Check your API key in `.env`
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
