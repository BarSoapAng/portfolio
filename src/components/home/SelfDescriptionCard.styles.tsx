"use client";

import styled, { css, keyframes } from "styled-components";
import { Text } from "@components/ui/Typography";
import { mediaQuery } from "@lib/media";

const highlightText = keyframes`
  from {
    background-size: 0 100%;
  }

  to {
    background-size: 100% 100%;
  }
`;

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(9rem, 13.75rem) minmax(0, 1fr);
  align-content: center;
  align-items: center;
  height: calc(100vh - 74px);
  max-height: 900px;
  gap: var(--space-8);
  margin-bottom: var(--space-12);

  @media ${mediaQuery.tablet} {
    min-height: 32rem;
    height: auto;
    max-height: none;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  @media ${mediaQuery.smallTablet} {
    grid-template-columns: 1fr;
    min-height: 0;
  }
`;

export const HeroImage = styled.img.attrs({ draggable: false })`
  width: 100%;

  @media ${mediaQuery.smallTablet} {
    width: min(100%, 13.75rem);
    justify-self: center;
  }
`;

export const HeroContent = styled.div`
  min-width: 0;
`;

export const HighlightedGreeting = styled(Text)<{ $isInView: boolean }>`
  color: inherit;
  font: inherit;
  background-image: linear-gradient(
    var(--color-primary-soft),
    var(--color-primary-soft)
  );
  background-position: left;
  background-repeat: no-repeat;
  background-size: 0 100%;
  ${({ $isInView }) =>
    $isInView &&
    css`
      animation: ${highlightText} 0.8s ease-out 0.25s forwards;
    `}
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;

  @media (prefers-reduced-motion: reduce) {
    background-size: 100% 100%;
    animation: none;
  }
`;
