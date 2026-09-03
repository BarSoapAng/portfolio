"use client";

import Image, { type ImageProps } from "next/image";
import styled, { css } from "styled-components";
import { ContentIndex, EntryTags } from "@components/ui/ContentStyles";
import { Heading2, Text } from "@components/ui/Typography";
import { mediaQuery } from "@lib/media";

export const WorkIndex = styled(ContentIndex)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0;

  > article {
    padding-block: 0;
    border: 0;
  }
`;

export const WorkEntry = styled.article`
  position: relative;
  flex: 1;
  min-height: 0;
  width: fit-content;
  max-width: 80%;

  &:nth-of-type(odd) {
    align-self: flex-start;
  }

  &:nth-of-type(even) {
    align-self: flex-end;
  }

  &:nth-of-type(2) {
    margin-inline-end: 37%;
  }

  &:nth-of-type(3) {
    margin-inline-start: 15%;
  }

  &:nth-of-type(4) {
    margin-inline-end: 17%;
  }

  &:nth-of-type(5) {
    margin-inline-start: 32%;
  }

  @media ${mediaQuery.tablet} {
    max-width: 85%;

    &:nth-of-type(2) {
      margin-inline-end: 30%;
    }

    &:nth-of-type(3) {
      margin-inline-start: 12%;
    }

    &:nth-of-type(4) {
      margin-inline-end: 14%;
    }

    &:nth-of-type(5) {
      margin-inline-start: 26%;
    }
  }

  @media ${mediaQuery.smallTablet} {
    max-width: 90%;

    &:nth-of-type(2) {
      margin-inline-end: 20%;
    }

    &:nth-of-type(3) {
      margin-inline-start: 4%;
    }

    &:nth-of-type(4) {
      margin-inline-end: 8%;
    }

    &:nth-of-type(5) {
      margin-inline-start: 16%;
    }
  }

  @media ${mediaQuery.largeMobile} {
    max-width: 92%;

    &:nth-of-type(2) {
      margin-inline-end: 12%;
    }

    &:nth-of-type(3) {
      margin-inline-start: 4%;
    }

    &:nth-of-type(4) {
      margin-inline-end: 6%;
    }

    &:nth-of-type(5) {
      margin-inline-start: 8%;
    }
  }

  @media ${mediaQuery.mediumMobile} {
    max-width: 95%;

    &:nth-of-type(2),
    &:nth-of-type(4) {
      margin-inline-end: 4%;
    }

    &:nth-of-type(3),
    &:nth-of-type(5) {
      margin-inline-start: 4%;
    }
  }

  @media ${mediaQuery.mobile} {
    max-width: 95%;

    &:nth-of-type(2),
    &:nth-of-type(4) {
      margin-inline-end: 4%;
    }

    &:nth-of-type(3),
    &:nth-of-type(5) {
      margin-inline-start: 4%;
    }
  }
`;

export const WorkCopy = styled.div`
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: 100%;
`;

export const WorkArtworkArea = styled.div`
  position: absolute;
  z-index: 0;
  inset-block: 0;
  left: 0;
  width: min(24rem, 80vw);

  ${WorkEntry}:nth-of-type(even) & {
    right: 0;
    left: auto;
  }
`;

type WorkArtworkPlacement = {
  hidden?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width: string;
  rotate?: string;
  transform?: string;
};

export type WorkArtworkLayout = {
  desktop: WorkArtworkPlacement;
  tablet: WorkArtworkPlacement;
  mobile: WorkArtworkPlacement;
  smallMobile: WorkArtworkPlacement;
};

type StyledWorkArtworkProps = {
  $layout: WorkArtworkLayout;
};

type WorkArtworkProps = Omit<ImageProps, "draggable" | "layout"> & {
  layout: WorkArtworkLayout;
};

const BASE_ENTRY_HEIGHT = 72;

const heightDynamicWidth = (width: string) => {
  const pxMatch = width.match(/^(\d+(?:\.\d+)?)px$/);
  if (!pxMatch) return width;
  const px = parseFloat(pxMatch[1]);
  const ratio = (px / BASE_ENTRY_HEIGHT).toFixed(3);
  return `min(${width}, calc(var(--entry-h, ${BASE_ENTRY_HEIGHT}px) * ${ratio}))`;
};

const placementStyles = ({
  hidden = false,
  top = "auto",
  right = "auto",
  bottom = "auto",
  left = "auto",
  width,
  rotate = "none",
  transform = "none",
}: WorkArtworkPlacement) => css`
  display: ${hidden ? "none" : "block"};
  top: ${top};
  right: ${right};
  bottom: ${bottom};
  left: ${left};
  width: ${heightDynamicWidth(width)};
  rotate: ${rotate};
  transform: ${transform};
`;

const StyledWorkArtwork = styled(Image)<StyledWorkArtworkProps>`
  position: absolute;
  z-index: 0;
  height: auto;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
  user-select: none;
  filter: invert(var(--artwork-invert, 0));

  ${({ $layout }) => placementStyles($layout.desktop)}

  @media ${mediaQuery.tablet} {
    ${({ $layout }) => placementStyles($layout.tablet)}
  }

  @media ${mediaQuery.largeMobile} {
    ${({ $layout }) => placementStyles($layout.mobile)}
  }

  @media ${mediaQuery.mobile} {
    ${({ $layout }) => placementStyles($layout.smallMobile)}
  }
`;

export function WorkArtwork({ layout, ...props }: WorkArtworkProps) {
  return (
    <StyledWorkArtwork
      {...props}
      $layout={layout}
      draggable={false}
    />
  );
}


export const CompanyName = styled(Heading2)`
  margin-block-end: var(--space-1);
  width: fit-content;
  max-width: 100%;
`;

export const JobTitle = styled(Text)`
  color: var(--color-accent);
  font-size: var(--font-size-sm);
`;

export const WorkHeading = styled.div`
  position: relative;
  width: fit-content;
  max-width: 100%;
`;

export const Period = styled(EntryTags)`
  display: block;
  color: var(--color-text-muted);
`;
