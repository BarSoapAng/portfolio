"use client";

import styled from "styled-components";

export const WorkEntry = styled.article`
  h2 {
    margin-block-end: var(--space-2);
  }
`;

export const WorkMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2) var(--space-6);
`;
