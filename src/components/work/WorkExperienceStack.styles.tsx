"use client";

import styled from "styled-components";
import { EntryTags } from "@components/ui/ContentStyles";

export const WorkEntry = styled.article`
`;

export const WorkHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
`;

export const Company = styled(EntryTags)`
  font-size: var(--font-size-md);
`;
