"use client";

import styled from "styled-components";
import { ContentIndex, EntryTags } from "@components/ui/ContentStyles";

export const WorkIndex = styled(ContentIndex)`
  gap: 0;

  > article {
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-medium);
    background: var(--color-surface);
    box-shadow: 0 var(--space-1) var(--space-2)
      color-mix(in srgb, var(--color-border) 45%, transparent);
  }

  > article:last-child {
    border-bottom: 1px solid var(--color-border);
  }
`;

export const WorkEntry = styled.article`
  box-sizing: border-box;
  width: min(56%, 34rem);

  &:nth-of-type(odd) {
    justify-self: start;
  }

  &:nth-of-type(even) {
    width: min(52%, 32rem);
    margin-inline-end: 3%;
    justify-self: end;
  }

  &:nth-of-type(4n + 3) {
    width: min(54%, 33rem);
    margin-inline-start: 7%;
  }

  &:nth-of-type(4n) {
    width: min(58%, 35rem);
    margin-inline-end: 0;
  }

  @media (max-width: 42rem) {
    width: 92%;

    &:nth-of-type(even) {
      width: 88%;
      margin-inline-end: 2%;
    }

    &:nth-of-type(4n + 3) {
      width: 90%;
      margin-inline-start: 4%;
    }

    &:nth-of-type(4n) {
      width: 94%;
      margin-inline-end: 0;
    }
  }
`;

export const WorkHeading = styled.div`
  h2 {
    margin-block-end: var(--space-2);
  }
`;

export const WorkDetails = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

export const Company = styled.span`
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

export const Period = styled(EntryTags)`
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
`;
