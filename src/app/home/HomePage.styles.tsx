"use client";

import Image from "next/image";
import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";
import { largeHeadingStyles } from "@components/ui/HeadingStyles";

export const SectionDivider = styled(Image)`
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
    margin-block-start: 48px;
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
