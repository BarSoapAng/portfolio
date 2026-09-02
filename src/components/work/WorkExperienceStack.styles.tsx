"use client";

import Image from "next/image";
import styled from "styled-components";
import { ContentIndex, EntryTags } from "@components/ui/ContentStyles";
import { Heading2, Text } from "@components/ui/Typography";

export const WorkIndex = styled(ContentIndex)`
  gap: 0;

  > article {
    padding-block: 0;
    border: 0;
  }
`;

export const WorkEntry = styled.article`
  position: relative;
  width: fit-content;
  max-width: 80%;

  &:nth-of-type(odd) {
    justify-self: start;
  }

  &:nth-of-type(even) {
    justify-self: end;
  }

  &:nth-of-type(2) {
    margin-inline-end: 37%;
  }

  &:nth-of-type(3) {
    margin-inline-start: 15%;
  }

  &:nth-of-type(4) {
    margin-inline-end: 17%;
  }

  &:nth-of-type(5) {
    margin-inline-start: 32%;
  }

  @media (max-width: 42rem) {
    max-width: 90%;

    &:nth-of-type(2) {
      margin-inline-end: 24%;
    }

    &:nth-of-type(3) {
      margin-inline-start: 6%;
    }

    &:nth-of-type(4) {
      margin-inline-end: 10%;
    }

    &:nth-of-type(5) {
      margin-inline-start: 22%;
    }
  }
`;

export const WorkCopy = styled.div`
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: 100%;
`;

export const WorkArtworkArea = styled.div`
  position: absolute;
  z-index: 0;
  inset-block: 0;
  left: 0;
  width: min(24rem, 80vw);

  ${WorkEntry}:nth-of-type(even) & {
    right: 0;
    left: auto;
  }
`;

export const WorkArtwork = styled(Image).attrs({ draggable: false })`
  position: absolute;
  z-index: 0;
  width: auto;
  height: auto;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
  user-select: none;
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
  cursor: pointer;

  &:focus-visible {
    border-radius: var(--radius-small);
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }
`;

export const CompanyName = styled(Heading2)`
  width: fit-content;
  max-width: 100%;
  margin-block-end: var(--space-2);
`;

export const JobTitle = styled(Text)`
  position: absolute;
  z-index: 1;
  bottom: calc(100% + var(--space-2));
  left: 0;
  width: max-content;
  max-width: min(18rem, 80vw);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-medium);
  background: var(--color-accent);
  color: var(--color-on-primary);
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
`;
