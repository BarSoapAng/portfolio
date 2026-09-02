"use client";

import styled from "styled-components";
import { BodySmall } from "@components/ui/Typography";
import { IndexSection } from "../../app/home/HomePage.styles";
import { mediaQuery } from "@lib/media";

export const BlogStripSection = styled(IndexSection)`
  margin-block-start: var(--space-8);
`;

export const BlogStripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media ${mediaQuery.tablet} {
    gap: var(--space-4);
  }

  @media ${mediaQuery.smallTablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${mediaQuery.largeMobile} {
    grid-template-columns: 1fr;
  }
`;

export const BlogStripCard = styled.article`
  > a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  > a img {
    aspect-ratio: 4 / 3;
    width: 100%;
    height: auto;
    border-radius: var(--radius-medium);
    object-fit: cover;
  }

  h3 {
    margin-block: var(--space-2) var(--space-1);
  }

  h3 a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin: 0;
    color: var(--color-text-secondary, var(--color-accent));
  }
`;

export const BlogStripMore = styled(BodySmall)`
  margin-block-start: var(--space-4);
  text-align: end;
`;
