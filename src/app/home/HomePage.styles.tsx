"use client";

import Image from "next/image";
import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";
import { mediaQuery } from "@lib/media";

export const HomeMain = styled.main`
  padding-block-start: 0;

  > * + * {
    margin-block-start: var(--space-16);
  }

  > section:first-of-type + img {
    margin-block-start: var(--space-4);
  }

  > img:last-of-type {
    margin-block: 8rem var(--space-16);
  }
`;

export const SectionDivider = styled(Image).attrs({ draggable: false })`
  display: block;
  width: 100%;
  height: auto;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
  user-select: none;
  filter: invert(var(--artwork-invert, 0));
`;

export const IndexSection = styled.section`
  scroll-margin-top: var(--space-8);

  > ${ContentIndex} {
    margin-block-start: var(--space-4);
  }
`;

export const ProjectsSection = styled(IndexSection)`
  margin-block-start: var(--space-16);
`;

export const GardenSection = styled(IndexSection)`
  --color-primary: var(--color-accent);
  --color-primary-hover: color-mix(in srgb, var(--color-accent) 80%, var(--color-text));
  --color-primary-soft: var(--color-accent-soft);

  padding-block: 0;

  > h2 {
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
