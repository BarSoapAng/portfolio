# Documentation Authoring

## Purpose

These docs are operational guidance first. They should stay current when repo changes affect future work.

## Required Format

- Use short, direct sections with stable headings.
- Prefer decision-oriented guidance over broad explanation.
- Keep repo-wide workflow rules in `workflows/`.
- Keep workspace-specific guidance in `workspaces/`.
- Keep `AGENTS.md` files short and use them to route readers to canonical docs.
- Include exact commands only when they are authoritative and supported by the repo today.

## Allowed Content

You may add:

- Verified facts from code, scripts, config files, or explicit user decisions
- Reusable patterns learned during implementation when they are likely to matter again
- Stable inferred conventions labeled `Inference:`

## Disallowed Content

Do not add:

- Temporary task notes
- Debugging journals
- Personal reminders
- Speculative future ideas presented as current policy
- Commands that are not backed by the current repository state

## Update Rules

- Update docs when code, workflows, conventions, or durable implementation patterns materially change.
- Do not update docs for every tiny refactor.
- Edit the most relevant canonical file in place instead of appending a running history log.
- Prefer expanding an existing section over creating a new doc with overlapping guidance.
- If a doc becomes too broad, split it by concern instead of turning one file into a dumping ground for unrelated rules.

## Evidence Standard

- Verified guidance should be grounded in the repository as it exists now.
- `Inference:` may be used for stable conventions that are not explicitly encoded but are well supported by existing patterns.
- If a point cannot be verified and is not a stable inference, leave it out.

## Review Checklist

Before saving instruction docs, confirm:

- The guidance is canonical, not duplicated elsewhere without reason.
- Commands match `package.json`, config files, and the current project structure.
- Scope is clear: repo-wide versus workspace-specific.
- Any inferred guidance is labeled `Inference:`.
