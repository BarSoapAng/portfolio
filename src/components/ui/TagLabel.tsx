"use client";

import styled from "styled-components";

type TagLabelProps = {
  label: string;
};

const Label = styled.span`
  display: inline-block;
  margin: var(--space-1) var(--space-1) var(--space-1) 0;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export default function TagLabel({ label }: TagLabelProps) {
  return <Label>{label}</Label>;
}
