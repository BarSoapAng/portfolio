# Instructions System

## Purpose

This repo keeps detailed operational guidance in `docs/instructions/` and uses `AGENTS.md` files as discovery entrypoints.

- Root `AGENTS.md` defines repo-wide policy.
- `src/AGENTS.md` defines local scope for application code.
- The files in this directory are the canonical source of truth for detailed instructions.

## Precedence

Follow instructions in this order:

1. Root `AGENTS.md`
2. Nearest workspace `AGENTS.md`
3. The referenced files in `docs/instructions/`

If two detailed docs overlap, follow the more specific doc. Workspace guidance wins over shared workflow guidance when both apply.

## Navigation

- Read [authoring.md](authoring.md) before editing instruction docs.
- Read workflow docs in `workflows/` for cross-repo process requirements.
- Read [workspaces/src.md](workspaces/src.md) before changing app code in `src/`.

## Canonical Files

- `workflows/pre-commit.md`: local verification expectations before creating a commit
- `workflows/pull-requests.md`: PR expectations and reporting guidance
- `workflows/testing.md`: when to run lint and build checks
- `workflows/generators.md`: generator guidance for this repo
- `workspaces/src.md`: app structure, commands, and local rules for the Next.js codebase

Agents should treat `workflows/pre-commit.md` as the required local finish checklist.

## Living Document Rule

Keep these docs current as the repo evolves.

- Update the most relevant canonical file when behavior or conventions materially change.
- Prefer in-place edits over append-only notes.
- Capture durable guidance only. Leave out temporary task context.
