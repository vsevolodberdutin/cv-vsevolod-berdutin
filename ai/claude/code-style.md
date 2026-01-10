# CODE STYLE

LANGUAGE:
- TypeScript strict mode
- No `any`
- Explicit return types for public functions

GENERAL:
- Prefer functions over classes
- Early returns over nested conditionals
- Descriptive naming over brevity
- No dead code

NAMING:
- camelCase — variables, functions
- PascalCase — components, types
- kebab-case — folders when applicable

REACT:
- Functional components only
- Hooks at top level
- No side effects in render
- Memoization only when justified

FORMATTING:
- Follow Prettier config
- Do not fight existing lint rules