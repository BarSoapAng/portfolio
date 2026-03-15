# Workspace Guidance

## Scope

- This file applies to everything under `src/`.
- Follow the root [AGENTS.md](../AGENTS.md) first, then this file, then the referenced docs.

## Required Reading

- Read [../docs/instructions/workspaces/src.md](../docs/instructions/workspaces/src.md) before changing routes, components, styles, or assets in `src/`.
- Read the relevant workflow doc in [../docs/instructions/workflows/](../docs/instructions/workflows/) before finishing work.

## Local Rules

- Keep route entrypoints in `src/app/`.
- Keep reusable UI in `src/components/`.
- Keep page-level composition in `src/pages/` when that pattern is already in use.
- Prefer the configured path aliases `@components/*`, `@assets/*`, and `@pages/*` over long relative import paths when they improve clarity.
