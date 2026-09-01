"use client";

import Image from "next/image";
import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";
import { largeHeadingStyles, mediumHeadingStyles } from "@components/ui/HeadingStyles";
import { mediaQuery } from "@lib/media";

export const HomeMain = styled.main`
  padding-block-start: 0;
`;

export const SectionDivider = styled(Image).attrs({ draggable: false })`
  display: block;
  width: 100%;
  height: auto;
  margin-block-start: var(--space-4);
  border: 0;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
  user-select: none;

  & + * {
    margin-block-start: 56px;
  }

  @media ${mediaQuery.tablet} {
    & + * {
      margin-block-start: var(--space-12);
    }
  }

  @media ${mediaQuery.smallTablet} {
    & + * {
      margin-block-start: var(--space-8);
    }
  }
`;

export const IndexSection = styled.section`
  scroll-margin-top: var(--space-8);

  > h2 {
    ${largeHeadingStyles}
  }

  > ${ContentIndex} {
    margin-block-start: var(--space-4);
  }
`;

export const ProjectsSection = styled(IndexSection)`
  height: calc(100vh - 74px);
  max-height: 900px;
  margin-block-start: 0;

  @media ${mediaQuery.tablet} {
    height: auto;
    max-height: none;
  }
`;

export const GardenSection = styled(IndexSection)`
  --color-primary: var(--color-accent);
  --color-primary-hover: color-mix(in srgb, var(--color-accent) 65%, black);
  --color-primary-soft: var(--color-accent-soft);

  height: calc(100vh - 74px);
  max-height: 900px;

  @media ${mediaQuery.tablet} {
    height: auto;
    max-height: none;
  }

  > h2 {
    ${mediumHeadingStyles}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    text-align: center;

    svg {
      margin-inline-start: var(--space-1);
      font-size: 0.55em;
      transform: rotate(20deg);
    }
  }
`;
