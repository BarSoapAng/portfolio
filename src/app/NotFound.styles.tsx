"use client";

import Image from "next/image";
import styled from "styled-components";
import { mediaQuery } from "@lib/media";

export const NotFoundMain = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: var(--space-12);
  min-height: calc(100svh - var(--navbar-height));

  > * + * {
    margin-block-start: 0;
  }

  @media ${mediaQuery.smallTablet} {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    text-align: center;
  }
`;

export const NotFoundImage = styled(Image).attrs({ draggable: false })`
  justify-self: center;
  width: 100%;
  height: auto;
  border: 0;
  box-shadow: none;
  filter: invert(var(--artwork-invert, 0));
`;

export const NotFoundContent = styled.section`
  padding-block: 0;

  > p:first-child {
    margin-block-end: var(--space-2);
    color: var(--color-text-muted);
  }

  nav ul {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-pill);
    font-size: var(--font-size-lg);
    text-decoration: none;
  }

  @media ${mediaQuery.smallTablet} {
    nav ul {
      justify-content: center;
    }
  }
`;
