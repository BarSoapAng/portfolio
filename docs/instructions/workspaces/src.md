# `src/` Workspace

## Scope

- This doc applies to application code under `src/`.
- The app is a Next.js project using the App Router in `src/app/`.

## Primary Structure

- `src/app/`: route entrypoints, layout, and global styles
- `src/components/`: reusable UI components
- `src/components/home/`: reusable home-page cards and effects
- `src/views/`: route view modules imported by App Router entrypoints
- `src/assets/`: imported local images and GIF assets
- `src/routes.ts`: shared route metadata used by navigation
- `content/blog/`: local MDX blog posts loaded by the App Router blog routes
- `content/work/`: local MDX work entries loaded by the App Router work routes
- `content/project/`: local MDX project entries loaded by the App Router project routes

## Routing Rules

- Put actual route files in `src/app/**/page.tsx`.
- `src/app/page.tsx` currently redirects `/` to `/home`.
- Use `next/navigation` redirects only in route entrypoints or other server-safe locations that already follow Next.js rules.
- Do not put application view modules in `src/pages/`; Next.js treats that directory as the legacy Pages Router and will generate accidental routes from it.
- Keep App Router view modules in `src/views/` instead.
- `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` load blog content from `content/blog/`, where each `.mdx` filename becomes its slug.
- `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx` load work content from `content/work/`, where each `.mdx` filename becomes its slug.
- `src/app/proj/page.tsx` and `src/app/proj/[slug]/page.tsx` load project content from `content/project/`, where each `.mdx` filename becomes its slug.

## Import Conventions

- Prefer the configured aliases from `tsconfig.json` when they make imports easier to read:
    - `@components/*`
    - `@assets/*`
    - `@views/*`
- Keep import paths consistent within a file. Avoid mixing old and new component locations for the same feature.

## Home Feature Notes

- `src/app/home/page.tsx` renders the home view from `src/views/HomePage.tsx`.
- Reusable home UI belongs in `src/components/home/`.
- Interactive home effects live in `src/components/home/effects/`.
- There is no `src/views/home/components/` directory in the repo. Import home UI from `src/components/home/` instead of recreating a parallel tree.

## Validation

- Run `npm run lint` after changing linted source files in `src/`.
- Run `npm run build` when route behavior, layout, global CSS, rendering, or production asset loading changes.
