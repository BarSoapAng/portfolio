"use client";

import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";

export const IndexSection = styled.section`
  scroll-margin-top: var(--space-8);

  > h2 {
    font-size: var(--font-size-3xl);
  }

  > ${ContentIndex} {
    margin-block-start: var(--space-4);
  }
`;
