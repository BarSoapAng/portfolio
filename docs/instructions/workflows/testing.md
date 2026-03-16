# Testing

## Always

- Run `npm run lint` for `*.js`, `*.jsx`, `*.ts`, and `*.tsx` changes.
- Treat required validation commands as pre-commit requirements when they apply, not post-commit cleanup.

## Build Verification

Run `npm run build` when the change affects:

- route files under `src/app/`
- route behavior or navigation, including the root redirect in `src/app/page.tsx`
- page composition modules under `src/views/`
- `src/app/layout.tsx`, metadata, or global CSS
- asset imports that are rendered in production

## Current Repo State

- There is no dedicated unit or integration test script in `package.json` right now.
- Do not report missing automated tests as "passed". Instead, say that no test script exists if broader automated coverage would normally be expected.
- Inference: when a future change adds a real test runner, this doc should be updated so that tests become part of the required workflow.

## Reporting

- Record the exact commands run.
- If a command is skipped, record the exact command and why it was skipped.
