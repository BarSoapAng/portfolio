"use client";

import styled from "styled-components";

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(9rem, 13.75rem) minmax(0, 1fr);
  align-items: center;
  gap: var(--space-8);

  @media (max-width: 42rem) {
    grid-template-columns: 1fr;
  }
`;

export const HeroImage = styled.img`
  width: 100%;

  @media (max-width: 42rem) {
    width: min(100%, 13.75rem);
  }
`;

export const Socials = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: inline-flex;
    color: var(--color-accent);
    font-size: var(--font-size-xl);
  }
`;
