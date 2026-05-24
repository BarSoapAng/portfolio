# Generators

## Current Repo State

- This repository does not currently define schema generators, migration generators, or code generation scripts in `package.json`.
- Do not invent generator steps that are not present in the repo.

## Asset And Framework Outputs

- `.next/` contains framework build output and should not be treated as a hand-maintained generated artifact.
- `pnpm-lock.yaml` is the package manager lockfile and should be updated only through normal pnpm dependency management commands.

## Reporting

- If future work introduces a real generator step, document the exact command here.
