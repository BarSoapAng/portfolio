# Repository Guidance

## Scope And Precedence

- This file defines repo-wide instructions for the entire portfolio project.
- When working inside `src/`, also read the nearest local `AGENTS.md`.
- Detailed guidance lives under `docs/instructions/`. Treat those docs as the canonical source of truth for workflows and workspace-specific conventions.
- Precedence order:
    1. Root `AGENTS.md`
    2. Nearest workspace `AGENTS.md`
    3. Referenced files in `docs/instructions/`

## Required Reading

- Read [docs/instructions/README.md](docs/instructions/README.md) before reorganizing the instruction system.
- Read [docs/instructions/authoring.md](docs/instructions/authoring.md) before creating or editing instruction docs.
- Read the relevant workflow doc in `docs/instructions/workflows/` before making changes.
- Read [docs/instructions/workspaces/src.md](docs/instructions/workspaces/src.md) before editing application code in `src/`.

## Global Rules

- This repo is a single Next.js application, not a monorepo.
- Root tooling lives in `package.json`, `package-lock.json`, `.nvmrc`, `tsconfig.json`, `eslint.config.js`, `tailwind.config.js`, and `postcss.config.mjs`.
- Use `npm` commands from the repo root unless a more specific doc says otherwise.
- Do not invent missing generators, migrations, or CI requirements. Only require workflows that are supported by the current repo state.
- If a check cannot run, say exactly which command was skipped and why.

## Required Finish Workflow

- Before creating a commit, run every required validation command that applies to the files you changed.
- Do not commit work that still needs a required lint, build, or documentation update.
- Use [docs/instructions/workflows/pre-commit.md](docs/instructions/workflows/pre-commit.md) and [docs/instructions/workflows/pull-requests.md](docs/instructions/workflows/pull-requests.md) as the canonical finish checklist.

## Living Docs Policy

- `docs/instructions/` is a living knowledge base that agents are expected to maintain.
- Update the relevant canonical doc when code, workflows, conventions, or durable implementation patterns materially change.
- Prefer updating an existing section over creating a duplicate doc.
- Only add:
    - verified facts grounded in repo state, scripts, or explicit user decisions
    - stable, reusable inferred conventions labeled `Inference:`
- Do not add speculative notes, temporary debugging logs, or one-off task history.
- Keep `AGENTS.md` files thin. Put detailed guidance in `docs/instructions/`.
