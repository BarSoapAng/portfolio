"use client";

import { css } from "styled-components";

const headingFontStyles = css`
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  text-wrap: balance;
`;

export const largeHeadingStyles = css`
  ${headingFontStyles}
  font-size: var(--font-size-3xl);

  @media (max-width: 52rem) {
    font-size: var(--font-size-2xl);
  }
`;

export const mediumHeadingStyles = css`
  ${headingFontStyles}
  font-size: var(--font-size-2xl);

  @media (max-width: 52rem) {
    font-size: var(--font-size-xl);
  }
`;

export const smallHeadingStyles = css`
  ${headingFontStyles}
  font-size: var(--font-size-xl);

  @media (max-width: 52rem) {
    font-size: var(--font-size-lg);
  }
`;
