# `src/` Workspace

## Scope

- This doc applies to application code under `src/`.
- The app is a Next.js project using the App Router in `src/app/`.

## Primary Structure

- `src/app/`: route entrypoints, layout, and global styles
- `src/components/`: reusable UI components
- `src/components/home/`: current home-page UI components and interactive effects
- `src/pages/`: page-level composition modules used by App Router routes
- `src/assets/`: imported local images and GIF assets
- `src/routes.ts`: shared route definitions used by navigation

## Routing Rules

- Put actual route files in `src/app/**/page.tsx`.
- Keep `src/app/page.tsx` as the root entrypoint behavior for `/`.
- Use `next/navigation` redirects only in route entrypoints or other server-safe locations that already follow Next.js rules.
- `src/pages/` is not acting as the legacy Next.js Pages Router. It currently holds React components that are imported by App Router routes.

## Import Conventions

- Prefer the configured aliases from `tsconfig.json` when they make imports easier to read:
    - `@components/*`
    - `@assets/*`
    - `@pages/*`
- Keep import paths consistent within a file. Avoid mixing old and new component locations for the same feature.

## Home Feature Notes

- The current home experience is composed through `src/pages/home/HomePage.tsx`.
- The repository currently contains both `src/pages/home/components/` import usage and `src/components/home/` files. When touching this area, keep one source of truth and update imports deliberately instead of duplicating components.
- Interactive effects live under `src/components/home/effects/`.

## Validation

- Run `npm run lint` after changing files in `src/`.
- Run `npm run build` when route behavior, layout, rendering, or production asset loading changes.
