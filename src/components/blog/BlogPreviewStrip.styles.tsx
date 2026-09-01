"use client";

import styled from "styled-components";
import { mediumHeadingStyles } from "@components/ui/HeadingStyles";
import { IndexSection } from "../../app/home/HomePage.styles";

export const BlogStripSection = styled(IndexSection)`
  margin-block-start: var(--space-8);
`;

export const BlogStripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 42rem) {
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
    ${mediumHeadingStyles}
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
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary, var(--color-accent));
  }
`;

export const BlogStripMore = styled.p`
  margin-block-start: var(--space-4);
  text-align: end;
  font-size: var(--font-size-sm);
`;
