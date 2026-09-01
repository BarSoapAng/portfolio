# `src/` Workspace

## Scope

- This doc applies to application code under `src/`.
- The app is a Next.js project using the App Router in `src/app/`.

## Primary Structure

- `src/app/`: route entrypoints, layout, and the styled-components global style registry
- `src/components/`: reusable UI components
- `src/components/home/`: reusable home-page content
- `src/assets/`: local image assets use WebP except for animated cursor APNGs under `src/assets/cursor/apng/`; `public/webIcon.webp` is the only image kept in `public/`
- `src/lib/`: data helpers and shared design utilities
- `src/routes.ts`: shared route metadata used by navigation
- `content/blog/`: local MDX blog posts loaded by the App Router blog routes
- `src/components/work/experiences/`: position-specific work entries and their artwork placement
- `content/project/`: local MDX project entries loaded by the App Router project routes

## Routing Rules

- Put actual route files in `src/app/**/page.tsx`.
- `src/app/page.tsx` currently redirects `/` to `/home`.
- Use `next/navigation` redirects only in route entrypoints or other server-safe locations that already follow Next.js rules.
- `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` load blog content from `content/blog/`, where each `.mdx` filename becomes its slug.
- `src/app/work/page.tsx` redirects to the home work section; work entries do not have standalone detail routes.
- `src/app/proj/page.tsx` redirects to the home projects section; `src/app/proj/[slug]/page.tsx` loads project content from `content/project/`, where each `.mdx` filename becomes its slug.

## Content Images

- Published blog and project MDX frontmatter must include `thumbnail` and `thumbnailAlt` strings.
- Store content thumbnails in `src/assets/content/`, register them in `src/lib/content-images.ts`, and reference them in frontmatter by filename such as `example.webp`. Keep the registry limited to filenames referenced by published MDX.
- Blog and project listings render these images as thumbnails; their detail pages reuse the same images as larger heroes.
- Home work entries import their local artwork from `src/assets/work/` and render it through position-specific components. They do not have standalone detail pages.

## Blog Content Types

- Use only `eng`, `career`, `life`, and `fun` in published blog `tags` frontmatter.
- Set optional blog frontmatter `pinned: true` to place a post before unpinned posts in the blog index and Top Blogs. Multiple pinned posts are ordered newest first.
- Set `similarReads` to exactly three unique published blog slugs. A post cannot recommend itself.
- The blog index provides debounced title and summary search. Tag metadata is not displayed or searchable there.

## Import Conventions

- Prefer the configured aliases from `tsconfig.json` when they make imports easier to read:
    - `@components/*`
    - `@assets/*`
    - `@lib/*`
- Keep import paths consistent within a file. Avoid mixing old and new component locations for the same feature.

## Visual Presentation

- Follow the [farmhouse pink style guide](../../style-guide.md).
- Keep shared color, font, radius, and spacing values in `src/lib/colors.ts`, `src/lib/font.ts`, `src/lib/radius.ts`, and `src/lib/spacing.ts`.
- Map shared values to global CSS custom properties in `src/app/layout.tsx`; use those properties in styled-components and the remaining CSS modules.
- Use the responsive heading variants in `src/components/ui/HeadingStyles.ts` for display-font headings, including component-specific heading sizes.
- Keep document-wide resets and element defaults in the styled-components global style; colocate feature-specific rules with their components.
- Bundle production fonts in `src/assets/fonts/` and load them with `next/font/local` so builds do not depend on Google Fonts availability.
- Use the symmetric radius tokens for rounded corners. Do not use asymmetric corner radii, raw radius values, or spacing tokens as radii.
- Pink is the primary theme color. Treat sage and wood as supporting accents rather than competing themes.

## Home Feature Notes

- `src/app/home/page.tsx` defines the home page layout and includes the work and project indexes.
- Work entries use the shared text shell in `src/components/work/WorkExperience.tsx`; each position owns its content and percentage-based artwork placement in `src/components/work/experiences/`.
- `/work` and `/proj` redirect to the matching home-page sections; only project entries retain standalone detail routes.
- Reusable home UI belongs in `src/components/home/`.
- The Spotify player code remains in `src/components/home/VinylPlayer.tsx`, `src/components/home/VinylPlayerClient.tsx`, and `src/lib/spotify.ts`, but it is not rendered or called by the application.
- If the Spotify player is re-enabled, it expects `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in the server environment. Keep token refresh and API calls on the server; do not expose Spotify secrets in client components.

## Garden Feature Notes

- Garden drawing names are optional; blank names are stored as `Untitled`.
- New garden drawings are always saved as published and appear in the shared garden.

## Validation

- Run `pnpm run lint` after changing linted source files in `src/`.
- Run `pnpm run build` when route behavior, layout, global CSS, rendering, or production asset loading changes.
