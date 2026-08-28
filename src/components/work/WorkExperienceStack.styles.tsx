"use client";

import styled from "styled-components";
import { ContentIndex, EntryTags } from "@components/ui/ContentStyles";

export const WorkIndex = styled(ContentIndex)`
  gap: 0;
`;

export const WorkEntry = styled.article`
  width: 66%;

  &:nth-of-type(odd) {
    justify-self: start;
  }

  &:nth-of-type(even) {
    width: 61%;
    margin-inline-end: 4%;
    justify-self: end;
  }

  &:nth-of-type(4n + 3) {
    width: 64%;
    margin-inline-start: 8%;
  }

  &:nth-of-type(4n) {
    width: 68%;
    margin-inline-end: 0;
  }

  @media (max-width: 42rem) {
    width: 86%;

    &:nth-of-type(even) {
      width: 82%;
      margin-inline-end: 2%;
    }

    &:nth-of-type(4n + 3) {
      width: 84%;
      margin-inline-start: 4%;
    }

    &:nth-of-type(4n) {
      width: 88%;
      margin-inline-end: 0;
    }
  }
`;

export const WorkHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);

  @media (max-width: 42rem) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
`;

export const Company = styled(EntryTags)`
  font-size: var(--font-size-md);
`;
