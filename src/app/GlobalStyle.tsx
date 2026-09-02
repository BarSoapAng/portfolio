"use client";

import { createGlobalStyle } from "styled-components";
import { mediaQuery } from "@lib/media";

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
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
        color-mix(in srgb, var(--color-primary-soft) 35%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--color-primary-soft) 35%, transparent) 1px,
        transparent 1px
      ),
      var(--color-background);
    background-size: calc(var(--space-8) + var(--space-1))
      calc(var(--space-8) + var(--space-1));
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
    width: min(900px, 80vw);
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
    color: color-mix(in srgb, var(--color-primary) 65%, black);
  }

  nav[aria-label="Social media"] a:hover {
    color: color-mix(in srgb, var(--color-accent) 65%, black);
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
