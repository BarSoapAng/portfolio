"use client";

import { createGlobalStyle } from "styled-components";
import { mediaQuery } from "@lib/media";

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    --color-background: #fff8f3;
    --color-surface: #fffdf9;
    --color-surface-muted: #f4ebe4;
    --color-primary: #a94065;
    --color-primary-hover: #87334f;
    --color-primary-soft: #f9dce5;
    --color-on-primary: #ffffff;
    --color-text: #3e302d;
    --color-text-muted: #6f5953;
    --color-border: #d8c5ba;
    --color-accent: #69745a;
    --color-accent-soft: #e5e9de;
    --color-wood: #8a5942;
    --artwork-invert: 0;
  }

  html[data-theme="dark"] {
    color-scheme: dark;
    --color-background: #0e150f;
    --color-surface: #151d16;
    --color-surface-muted: #1e2a20;
    --color-primary: #8fa07a;
    --color-primary-hover: #b3c4a0;
    --color-primary-soft: #2a3025;
    --color-on-primary: #0e150f;
    --color-text: #e8ddd6;
    --color-text-muted: #a69389;
    --color-border: #3e332d;
    --color-accent: #d4698e;
    --color-accent-soft: #3d2230;
    --color-wood: #c4926e;
    --artwork-invert: 1;
  }

  *,
  *::before,
  *::after {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  }

  * {
    box-sizing: border-box;
    scrollbar-color: var(--color-primary) transparent;
    scrollbar-width: thin;
  }

  *::-webkit-scrollbar {
    width: var(--space-3);
    height: var(--space-3);
  }

  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-corner {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: var(--radius-pill);
    background: var(--color-primary);
  }

  html,
  body {
    overflow-x: clip;
  }

  html {
    min-width: 20rem;
    background: var(--color-background);
  }

  body {
    min-height: 100vh;
    margin: 0;
    background:
      linear-gradient(
        color-mix(in srgb, var(--color-primary-soft) 20%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--color-primary-soft) 20%, transparent) 1px,
        transparent 1px
      ),
      var(--color-background);
    background-size: var(--space-12) var(--space-12);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-normal);
  }

  .site-wrapper {
    width: 100%;
    min-height: 100vh;
    overflow: clip;
  }

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    body,
    body * {
      cursor: none !important;
    }
  }

  ::selection {
    background: var(--color-primary-soft);
    color: var(--color-primary-hover);
  }

  main {
    width: min(900px, 85vw);
    margin-inline: auto;
    padding-block: var(--space-12);
  }

  main > * + * {
    margin-block-start: var(--space-8);
  }

  main > :is(header, section, article, aside, dl) {
    padding-block: var(--space-8);
  }

  a {
    color: var(--color-primary);
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  a:hover {
    color: var(--color-primary-hover);
  }

  nav[aria-label="Social media"] a:hover {
    color: color-mix(in srgb, var(--color-accent) 80%, var(--color-text));
  }

  a:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }

  main > a {
    display: inline-block;
    padding: var(--space-3) var(--space-6);
    border: 1px solid var(--color-primary-hover);
    border-radius: var(--radius-pill);
    background: var(--color-primary);
    color: var(--color-on-primary);
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-medium);
    box-shadow: 0 0 0 1px var(--color-border);
    user-select: none;
    -webkit-user-drag: none;
  }

  @media ${mediaQuery.smallTablet} {
    main {
      padding-block: var(--space-8);
    }

    main > :is(header, section, article, aside, dl) {
      padding-block: var(--space-6);
    }
  }
`;

export default GlobalStyle;
