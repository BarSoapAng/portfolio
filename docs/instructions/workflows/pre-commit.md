# Pre-Commit Workflow

## Required Reading

Before committing, read:

- [testing.md](testing.md)
- [generators.md](generators.md)
- [../workspaces/src.md](../workspaces/src.md) when application code under `src/` changes

## Branch And Commit Rules

- Keep commits focused. Split independent concerns when practical.
- Run required validation before creating a commit.
- Do not skip required checks just because the change seems small.

## Minimum Expectations

- Run `npm run lint` when JavaScript, TypeScript, JSX, TSX, or CSS files change.
- Run `npm run build` when routing, layout, rendering behavior, metadata, or production asset loading changes.
- Update the relevant instruction docs when durable workflows or project structure change.
- Do not create a commit until the required commands above have been run or explicitly skipped with a recorded reason.

## Commit Gate

Before creating a commit, confirm all of the following:

- The required lint command has been run for the touched code.
- The required build check has been run when the change can affect production behavior.
- Any instruction docs affected by the change have been updated.
- Any skipped command has a precise reason ready for the final report and PR description.

## Reporting

- If a required check is skipped, record the exact command and reason in the final report and PR description.
- If a doc-worthy workflow or convention changed during the work, update the relevant canonical doc before finishing.
