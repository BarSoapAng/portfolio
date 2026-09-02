"use client";

import styled from "styled-components";
import { DisplayLabel } from "@components/ui/Typography";

type TagLabelProps = {
  label: string;
};

const Label = styled(DisplayLabel)`
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  color: var(--color-text-muted);
`;

export default function TagLabel({ label }: TagLabelProps) {
  return <Label>{label}</Label>;
}
