# `src/` Workspace

## Scope

- This doc applies to application code under `src/`.
- The app is a Next.js project using the App Router in `src/app/`.

## Primary Structure

- `src/app/`: route entrypoints, layout, and global styles
- `src/components/`: reusable UI components
- `src/components/home/`: reusable home-page cards and effects
- `src/pages/`: route view modules imported by App Router entrypoints
- `src/assets/`: imported local images and GIF assets
- `src/routes.ts`: shared route metadata used by navigation

## Routing Rules

- Put actual route files in `src/app/**/page.tsx`.
- `src/app/page.tsx` currently redirects `/` to `/home`.
- Use `next/navigation` redirects only in route entrypoints or other server-safe locations that already follow Next.js rules.
- `src/pages/` is not the legacy Next.js Pages Router. It holds React view modules imported by App Router routes.

## Import Conventions

- Prefer the configured aliases from `tsconfig.json` when they make imports easier to read:
    - `@components/*`
    - `@assets/*`
    - `@pages/*`
- Keep import paths consistent within a file. Avoid mixing old and new component locations for the same feature.

## Home Feature Notes

- `src/app/home/page.tsx` renders the home view from `src/pages/HomePage.tsx`.
- Reusable home UI belongs in `src/components/home/`.
- Interactive home effects live in `src/components/home/effects/`.
- There is no `src/pages/home/components/` directory in the repo. Import home UI from `src/components/home/` instead of recreating a parallel tree.
- The Spotify vinyl card uses the route handler under `src/app/api/spotify/now-playing/` plus server utilities in `src/lib/spotify.ts`.
- Runtime Spotify access is env-driven: set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and either `SPOTIFY_ACCESS_TOKEN` or `SPOTIFY_REFRESH_TOKEN` in `.env` or `.env.local`.
- Run `npm run spotify:refresh-token -- --write-env` to generate a local `SPOTIFY_REFRESH_TOKEN` without using app routes. The helper uses `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`, defaults to `http://127.0.0.1:3010/callback`, and writes the token to `.env.local` when `--write-env` is passed.
- `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are not enough for `/me/player/*`; Spotify requires a user token for currently-playing and recently-played lookups, so the card should show that setup error explicitly.
- The home page renders the Spotify vinyl card with an initial server-side fetch and the client refreshes `/api/spotify/now-playing`; if Spotify data is missing, the card should show the concrete setup error instead of silently failing in the browser.

## Validation

- Run `npm run lint` after changing linted source files in `src/`.
- Run `npm run build` when route behavior, layout, global CSS, rendering, or production asset loading changes.
