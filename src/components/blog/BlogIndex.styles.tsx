"use client";

import styled from "styled-components";
import { ContentCard, ContentCardBody, ContentIndex } from "@components/ui/ContentStyles";

export const BlogControls = styled.section`
  display: flow-root;

  input {
    width: 100%;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-medium);
    background: var(--color-surface);
    color: var(--color-text);
  }

  input:focus-visible {
    outline: none;
    border-color: color-mix(in srgb, var(--color-border) 75%, var(--color-text));
  }
`;

export const BlogContentIndex = styled(ContentIndex)`
  display: block;
  margin-block-start: var(--space-4);
`;

export const BlogContentCard = styled.article`
  && {
    padding-block-end: 0;
    border-block-end: 0;
  }

  &::after {
    content: "";
    display: flow-root;
    margin-block-start: var(--space-6);
    border-block-end: 1px solid var(--color-border);
  }

  &:last-child::after {
    border-block-end: 0;
  }
`;

export const BlogContentCardLayout = styled(ContentCard).attrs({ as: "div" })`
  padding-block: 0;

  ${ContentCardBody} > p:first-child {
    margin-block-end: var(--space-1);
  }

  > a img {
    aspect-ratio: 4 / 3;
  }
`;

export const BlogTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
`;

export const PinnedPostIcon = styled.span`
  flex-shrink: 0;
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  line-height: 1;
`;
