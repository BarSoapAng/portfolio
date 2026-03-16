# Repository Guidance

## Scope And Precedence

- This file applies repo-wide.
- For work in `src/`, also read the nearest local `AGENTS.md`.
- Detailed guidance lives in `docs/instructions/` and is canonical for workflows and workspace-specific conventions.
- Follow instructions in this order:
    1. Root `AGENTS.md`
    2. Nearest workspace `AGENTS.md`
    3. Referenced docs in `docs/instructions/`

## Required Reading

- Read [docs/instructions/README.md](docs/instructions/README.md) before reorganizing the instruction system.
- Read [docs/instructions/authoring.md](docs/instructions/authoring.md) before creating or editing instruction docs.
- Read [docs/instructions/workflows/starting-work.md](docs/instructions/workflows/starting-work.md) before beginning implementation work.
- Read the relevant workflow doc in `docs/instructions/workflows/` before making or finishing changes.
- Read [docs/instructions/workspaces/src.md](docs/instructions/workspaces/src.md) before editing application code in `src/`.

## Global Rules

- This repo is a single Next.js application, not a monorepo.
- Root project tooling is defined in `package.json`, `package-lock.json`, `.nvmrc`, `tsconfig.json`, `eslint.config.js`, `tailwind.config.js`, and `postcss.config.mjs`.
- Start work by creating a Git worktree before making code or documentation changes.
- Run `npm` commands from the repo root unless a more specific doc says otherwise.
- Do not invent generator, migration, or CI steps that are not supported by the current repo state.
- If a check cannot run, record the exact command and why it was skipped.

## Required Finish Workflow

- Before creating a commit, run every required validation command that applies to the files you changed.
- Do not create a commit while required lint, build, or documentation updates are still outstanding.
- Use [docs/instructions/workflows/pre-commit.md](docs/instructions/workflows/pre-commit.md) and [docs/instructions/workflows/pull-requests.md](docs/instructions/workflows/pull-requests.md) as the canonical finish checklist.

## Living Docs Policy

- `docs/instructions/` is a living knowledge base that agents are expected to maintain.
- Update the most relevant canonical doc when code, workflows, conventions, or durable implementation patterns materially change.
- Prefer updating an existing section over creating a duplicate doc.
- Only add:
    - verified facts grounded in repo state, scripts, or explicit user decisions
    - stable, reusable inferred conventions labeled `Inference:`
- Do not add speculative notes, temporary debugging logs, or one-off task history.
- Keep `AGENTS.md` files thin. Put detailed guidance in `docs/instructions/`.
