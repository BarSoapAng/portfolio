"use client";

import styled from "styled-components";

export const WorkEntry = styled.article`
`;

export const WorkHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  margin-block-end: var(--space-2);
`;

export const WorkTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);

  h2 {
    margin: 0;
  }
`;

export const Company = styled.span`
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
`;

export const WorkMeta = styled.p`
  flex-shrink: 0;
  margin: 0;
`;
