"use client";

import Image from "next/image";
import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";
import { largeHeadingStyles, mediumHeadingStyles } from "@components/ui/HeadingStyles";

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
  height: calc(100vh - 4.625rem);
  max-height: 900px;
  margin-block-start: 0;
`;

export const GardenSection = styled(IndexSection)`
  height: calc(100vh - 4.625rem);
  max-height: 900px;

  > h2 {
    ${mediumHeadingStyles}
  }
`;
