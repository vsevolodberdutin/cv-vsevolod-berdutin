# ARCHITECTURE RULES

MONOREPO:
- apps/cv-portfolio — main React application
- apps/ui-kit — shared UI components (atomic design)
- backend — Express API for AI chat

BOUNDARIES:
- cv-portfolio may consume ui-kit
- ui-kit must NOT depend on cv-portfolio
- frontend must NOT call OpenAI directly
- backend is the only place allowed to talk to OpenAI API

FRONTEND RULES:
- Components are split by responsibility
- No business logic inside presentational components
- API calls live in dedicated api/services layer
- State management via Zustand only

UI KIT:
- Atomic design (atoms → molecules)
- No app-specific logic
- No routing, no side effects

BACKEND:
- Thin HTTP layer
- No frontend concerns
- Validate all incoming input

FORBIDDEN:
- Cross-app circular dependencies
- Shared state between apps
- Direct environment access outside config