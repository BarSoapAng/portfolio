"use client";

import styled from "styled-components";

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(9rem, 13.75rem) minmax(0, 1fr);
  align-content: center;
  align-items: center;
  height: calc(100vh - 74px);
  max-height: 900px;
  gap: var(--space-8);
  margin-bottom: var(--space-12);

  @media (max-width: 42rem) {
    grid-template-columns: 1fr;
  }
`;

export const HeroImage = styled.img.attrs({ draggable: false })`
  width: 100%;

  @media (max-width: 42rem) {
    width: min(100%, 13.75rem);
  }
`;

export const HeroContent = styled.div`
  min-width: 0;
`;
