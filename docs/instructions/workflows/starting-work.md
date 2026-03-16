# Starting Work

## Required First Step

- Assume the current checkout is an already-created Git worktree assigned to the task.
- Start implementation work in that assigned checkout unless the user explicitly instructs otherwise.

## Scope

- If the user explicitly instructs you to create a new worktree, use `git worktree add -b <worktree-name> ../.worktrees/<worktree-name> [start-point]`.
- If the user explicitly instructs you to work outside the default worktree assumption, follow the instruction and record that the default was intentionally overridden.

## Reporting

- Record the worktree path and branch used for the task.
