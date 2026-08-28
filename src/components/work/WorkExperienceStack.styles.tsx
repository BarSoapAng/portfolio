"use client";

import styled from "styled-components";
import { ContentIndex, EntryTags } from "@components/ui/ContentStyles";

export const WorkIndex = styled(ContentIndex)`
  gap: 0;

  > article {
    padding-block: var(--space-4);
    border: 0;
  }
`;

export const WorkEntry = styled.article`
  width: fit-content;
  max-width: 80%;

  &:nth-of-type(odd) {
    justify-self: start;
  }

  &:nth-of-type(even) {
    margin-inline-end: 6%;
    justify-self: end;
  }

  &:nth-of-type(4n + 3) {
    margin-inline-start: 13%;
  }

  &:nth-of-type(4n) {
    margin-inline-end: 0;
  }

  @media (max-width: 42rem) {
    max-width: 90%;

    &:nth-of-type(even) {
      margin-inline-end: 2%;
    }

    &:nth-of-type(4n + 3) {
      margin-inline-start: 4%;
    }
  }
`;

export const Company = styled.button`
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-align: start;
  cursor: help;

  &:focus-visible {
    border-radius: var(--radius-small);
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }
`;

export const CompanyName = styled.h2`
  width: fit-content;
  max-width: 100%;
  margin-block-end: var(--space-2);
`;

export const JobTitle = styled.span`
  position: absolute;
  z-index: 1;
  bottom: calc(100% + var(--space-2));
  left: 0;
  width: max-content;
  max-width: min(18rem, 80vw);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-medium);
  background: var(--color-primary-hover);
  box-shadow: 0 var(--space-1) var(--space-2)
    color-mix(in srgb, var(--color-primary) 35%, transparent);
  color: var(--color-on-primary);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  opacity: 0;
  pointer-events: none;
  translate: 0 var(--space-2);
  transition:
    opacity 140ms ease,
    translate 140ms ease,
    visibility 140ms ease;
  visibility: hidden;

  ${WorkEntry}:nth-of-type(even) & {
    right: 0;
    left: auto;
  }

  ${CompanyName}:hover + &,
  ${CompanyName}:focus-within + & {
    opacity: 1;
    translate: 0 0;
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const WorkHeading = styled.div`
  position: relative;
  width: fit-content;
  max-width: 100%;
`;

export const Period = styled(EntryTags)`
  display: block;
  font-size: var(--font-size-md);
`;
