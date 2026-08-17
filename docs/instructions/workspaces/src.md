# `src/` Workspace

## Scope

- This doc applies to application code under `src/`.
- The app is a Next.js project using the App Router in `src/app/`.

## Primary Structure

- `src/app/`: route entrypoints, layout, and global styles
- `src/components/`: reusable UI components
- `src/components/home/`: reusable home-page content
- `src/assets/`: imported local images and GIF assets
- `src/lib/`: data helpers and shared design utilities
- `src/routes.ts`: shared route metadata used by navigation
- `content/blog/`: local MDX blog posts loaded by the App Router blog routes
- `content/work/`: local MDX work entries loaded by the App Router work routes
- `content/project/`: local MDX project entries loaded by the App Router project routes

## Routing Rules

- Put actual route files in `src/app/**/page.tsx`.
- `src/app/page.tsx` currently redirects `/` to `/home`.
- Use `next/navigation` redirects only in route entrypoints or other server-safe locations that already follow Next.js rules.
- `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` load blog content from `content/blog/`, where each `.mdx` filename becomes its slug.
- `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx` load work content from `content/work/`, where each `.mdx` filename becomes its slug.
- `src/app/proj/page.tsx` and `src/app/proj/[slug]/page.tsx` load project content from `content/project/`, where each `.mdx` filename becomes its slug.

## Import Conventions

- Prefer the configured aliases from `tsconfig.json` when they make imports easier to read:
    - `@components/*`
    - `@assets/*`
    - `@lib/*`
- Keep import paths consistent within a file. Avoid mixing old and new component locations for the same feature.

## Visual Presentation

- Follow the [farmhouse pink style guide](../../style-guide.md).
- Keep shared color, font, radius, and spacing values in `src/lib/colors.ts`, `src/lib/font.ts`, `src/lib/radius.ts`, and `src/lib/spacing.ts`.
- Map shared values to global CSS custom properties in `src/app/layout.tsx`; use those properties in `src/app/globals.css`.
- Use the symmetric radius tokens for rounded corners. Do not use asymmetric corner radii, raw radius values, or spacing tokens as radii.
- Pink is the primary theme color. Treat sage and wood as supporting accents rather than competing themes.

## Home Feature Notes

- `src/app/home/page.tsx` currently defines the home page layout directly.
- Reusable home UI belongs in `src/components/home/`.
- `src/components/home/VinylPlayer.tsx` is a server component that fetches Spotify playback state through `src/lib/spotify.ts` and passes display data into the client-only `src/components/home/VinylPlayerClient.tsx`.
- The Spotify player expects `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in the server environment. Keep token refresh and API calls on the server; do not expose Spotify secrets in client components.

## Validation

- Run `pnpm run lint` after changing linted source files in `src/`.
- Run `pnpm run build` when route behavior, layout, global CSS, rendering, or production asset loading changes.
