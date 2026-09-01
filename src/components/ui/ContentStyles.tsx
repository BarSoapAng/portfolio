"use client";

import styled from "styled-components";
import { mediaQuery } from "@lib/media";

export const ContentIndex = styled.div`
  display: grid;
  gap: var(--space-6);

  > article {
    padding-block: var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  > article:last-child {
    border-bottom: 0;
  }
`;

export const ContentCard = styled.article`
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  align-items: start;
  gap: var(--space-4);
  padding-block: var(--space-6);

  @media ${mediaQuery.smallTablet} {
    grid-template-columns: 7rem minmax(0, 1fr);
  }

  @media ${mediaQuery.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ContentCardBody = styled.div`
  > :last-child {
    margin-block-end: 0;
  }
`;

export const EntryTags = styled.span`
  color: var(--color-accent);
  font-size: var(--font-size-sm);
`;

export const BlogDate = styled(EntryTags)`
  display: block;
`;

export const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-block-end: 50px;

  @media ${mediaQuery.mobile} {
    align-items: flex-start;
    flex-direction: column;
    margin-block-end: var(--space-8);
  }
`;

export const ContentHero = styled.figure`
  margin: var(--space-6) 0;
`;
