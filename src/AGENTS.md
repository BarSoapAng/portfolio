# Workspace Guidance

## Scope

- This file applies to everything under `src/`.

## Required Reading

- Read [../docs/instructions/workspaces/src.md](../docs/instructions/workspaces/src.md) before changing routes, components, styles, or assets in `src/`.
- Read the relevant workflow doc in [../docs/instructions/workflows/](../docs/instructions/workflows/) before finishing work.

## Local Rules

- Keep route entrypoints in `src/app/`.
- Keep reusable UI in `src/components/`.
- Keep route view modules in `src/views/` to avoid collisions with Next.js Pages Router conventions.
- Prefer the configured path aliases `@components/*`, `@assets/*`, and `@views/*` over long relative import paths when they improve clarity.
