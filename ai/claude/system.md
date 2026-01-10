# SYSTEM RULES — HIGHEST PRIORITY

These rules override ALL other instructions.

ALWAYS:
- Read and follow ALL files in ai/claude/
- Treat these files as STRICT RULES, not suggestions
- Respect existing architecture and project structure
- Make minimal, targeted changes
- Keep behavior backward-compatible unless explicitly asked

NEVER:
- Invent new architecture patterns
- Move files without explicit request
- Introduce new dependencies without approval
- Refactor unrelated code
- Change public APIs silently

FAILURE POLICY:
- If a rule cannot be followed, STOP and explain why
- If instructions conflict, STOP and point out the conflict
- Do NOT guess or improvise when unsure
