"use client";

import styled from "styled-components";
import { SmallText } from "@components/ui/Typography";

type TagLabelProps = {
  label: string;
};

const Label = styled(SmallText)`
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  color: var(--color-text-muted);
`;

export default function TagLabel({ label }: TagLabelProps) {
  return <Label>{label}</Label>;
}
