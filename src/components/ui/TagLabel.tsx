"use client";

import styled from "styled-components";

type TagLabelProps = {
  label: string;
};

const Label = styled.span`
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
`;

export default function TagLabel({ label }: TagLabelProps) {
  return <Label>{label}</Label>;
}
