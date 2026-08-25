"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
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
        color-mix(in srgb, var(--color-primary-soft) 50%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--color-primary-soft) 50%, transparent) 1px,
        transparent 1px
      ),
      var(--color-background);
    background-size: var(--space-8) var(--space-8);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-normal);
  }

  ::selection {
    background: var(--color-primary-soft);
    color: var(--color-primary-hover);
  }

  main {
    width: min(calc(100% - (2 * var(--space-4))), 1000px);
    margin-inline: auto;
    padding-block: var(--space-12);
  }

  main > * + * {
    margin-block-start: var(--space-8);
  }

  main > :is(header, section, article, aside, dl) {
    padding: var(--space-8);
  }

  h1,
  h2,
  h3 {
    margin-block: 0 var(--space-3);
    color: var(--color-primary-hover);
    font-family: var(--font-display);
    line-height: var(--line-height-tight);
    text-wrap: balance;
  }

  h1 {
    font-size: var(--font-size-3xl);
  }

  h2 {
    font-size: var(--font-size-2xl);
  }

  h3 {
    font-size: var(--font-size-xl);
  }

  p,
  ul,
  ol,
  dl,
  blockquote {
    margin-block: 0 var(--space-4);
  }

  a {
    color: var(--color-primary);
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  a:hover {
    color: var(--color-primary-hover);
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
    font-weight: var(--font-weight-bold);
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
    border: var(--space-1) solid var(--color-surface);
    border-radius: var(--radius-medium);
    box-shadow: 0 0 0 1px var(--color-border);
  }

  code {
    padding: 0.1em 0.35em;
    border-radius: var(--radius-small);
    background: var(--color-surface-muted);
    color: var(--color-wood);
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  blockquote {
    padding-inline-start: var(--space-6);
    border-inline-start: var(--space-1) solid var(--color-accent);
    color: var(--color-text-muted);
  }

  @media (max-width: 42rem) {
    main {
      padding-block: var(--space-8);
    }

    main > :is(header, section, article, aside, dl) {
      padding: var(--space-6);
    }
  }
`;

export default GlobalStyle;
