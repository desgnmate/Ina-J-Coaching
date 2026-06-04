<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Biome enforcement for JS/TS code changes

When editing JavaScript, TypeScript, JSX, TSX, JSON, CSS, or HTML in this repo:

1. Load and follow the Hermes skill `biome-enforcement` if available.
2. If Biome is missing, install it in this repo with the existing package manager instead of skipping the check.
3. After code changes, run a safe auto-fix pass with Biome.
4. Re-run the final Biome check before claiming the task is done.
5. Report any remaining manual diagnostics clearly.

Repo-specific notes:
- Prefer existing package scripts when present:
  - `npm run check`
  - `npm run lint`
  - `npm run format`
- If scripts are unavailable, use the local package directly:
  - `npx @biomejs/biome check --write .`
  - `npx @biomejs/biome check .`
- Do not introduce broad repo-wide churn unrelated to the task. Keep fixes proportional and safe.
- Do not claim the repo is clean unless the final Biome check actually passes.
