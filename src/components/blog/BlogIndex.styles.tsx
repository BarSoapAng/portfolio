"use client";

import styled from "styled-components";
import { ContentCard, ContentIndex } from "@components/ui/ContentStyles";

export const BlogControls = styled.section`
  input {
    width: 100%;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-medium);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
  }

  input:focus-visible {
    outline: none;
    border-color: color-mix(in srgb, var(--color-border) 75%, var(--color-text));
  }
`;

export const BlogContentIndex = styled(ContentIndex)`
  margin-block-start: var(--space-8);
`;

export const BlogContentCard = styled(ContentCard)`
  position: relative;
  padding-inline-end: var(--space-6);

  > a img {
    aspect-ratio: 4 / 3;
  }
`;

export const PinnedPostIcon = styled.span`
  position: absolute;
  inset-block-start: var(--space-6);
  inset-inline-end: 0;
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  line-height: 1;
`;
