"use client";

import Image from "next/image";
import styled from "styled-components";

export const StyledContentImage = styled(Image)<{ $variant: "thumbnail" | "hero" }>`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;

  ${({ $variant }) =>
    $variant === "hero" &&
    `
      border-radius: var(--radius-large);
    `}
`;
