"use client";

import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";

export const BlogControls = styled.section`
  padding: var(--space-8);

  > label {
    display: block;
    margin-block-end: var(--space-2);
    color: var(--color-primary-hover);
    font-weight: var(--font-weight-bold);
  }

  input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-medium);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
  }

  input:focus-visible {
    outline: none;
    background: var(--color-primary-soft);
  }
`;

export const BlogSearchRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: var(--space-2);

  input {
    flex: 1;
    min-width: 0;
  }
`;

export const BlogFilterSelect = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: var(--space-4xl);
  margin: 0;
  padding: var(--space-3);
  border-radius: var(--radius-medium);
  color: var(--color-accent);
  cursor: pointer;

  &:focus-within {
    outline: 2px solid var(--color-primary);
    outline-offset: var(--space-xxs);
  }

  select {
    position: absolute;
    inset: 0;
    width: 100%;
    border: 0;
    outline: none;
    appearance: none;
    background: transparent;
    color: transparent;
    cursor: pointer;
    font: inherit;
  }

  option {
    background: var(--color-surface);
    color: var(--color-text);
  }

  option:checked {
    background: var(--color-primary-soft);
    color: var(--color-primary-hover);
  }
`;

export const BlogContentIndex = styled(ContentIndex)`
  margin-block-start: var(--space-8);
`;
