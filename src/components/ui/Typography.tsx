"use client";

import styled, { css } from "styled-components";
import { mediaQuery } from "@lib/media";

const bodyStyles = css`
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
`;

const headingStyles = css`
  margin-block: 0 var(--space-3);
  color: var(--color-primary-hover);
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  text-wrap: balance;
  transition: color 0.3s ease;
`;

export const Heading1 = styled.h1`
  ${headingStyles}
  font-size: var(--font-size-3xl);

  @media ${mediaQuery.smallTablet} {
    font-size: var(--font-size-2xl);
  }
`;

export const Heading2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-2xl);

  @media ${mediaQuery.smallTablet} {
    font-size: var(--font-size-xl);
  }
`;

export const Heading3 = styled.h3`
  ${headingStyles}
  font-size: var(--font-size-xl);

  @media ${mediaQuery.smallTablet} {
    font-size: var(--font-size-lg);
  }
`;

export const CompactHeading = styled.h3`
  ${headingStyles}
  font-size: var(--font-size-lg);
`;

export const Text = styled.span`
  ${bodyStyles}
`;

export const Body = styled.p`
  ${bodyStyles}
  margin-block: 0 var(--space-4);
`;

export const BodyLarge = styled(Body)`
  font-size: var(--font-size-lg);
`;

export const ResponsiveBodyLarge = styled(BodyLarge)`
  @media ${mediaQuery.smallTablet} {
    font-size: var(--font-size-base);
  }
`;

export const Lead = styled(BodyLarge)`
  line-height: var(--line-height-relaxed);
`;

export const BodySmall = styled(Body)`
  font-size: var(--font-size-sm);
`;

export const SmallText = styled(Text)`
  font-size: var(--font-size-sm);
`;

export const Caption = styled.span`
  ${bodyStyles}
  font-size: var(--font-size-xs);
`;

export const CaptionMedium = styled(Caption)`
  font-weight: var(--font-weight-medium);
`;

export const CaptionStrong = styled(Caption)`
  font-weight: var(--font-weight-bold);
`;

export const Eyebrow = styled(CaptionStrong)`
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const DisplayText = styled.span`
  font-family: var(--font-display);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
`;

export const DisplayLabel = styled(DisplayText)`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
`;

export const DisplayLarge = styled(DisplayText)`
  font-size: var(--font-size-xl);
`;

export const DisplayHero = styled(DisplayText)`
  font-size: var(--font-size-3xl);
`;

export const DisplayStrong = styled(DisplayText)`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
`;

export const DisplayCallout = styled(DisplayStrong)`
  line-height: var(--line-height-tight);

  @media ${mediaQuery.mobile} {
    font-size: var(--font-size-lg);
  }
`;

export const DisplayButton = styled.button`
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
`;

export const SmallButton = styled.button`
  ${bodyStyles}
  font-size: var(--font-size-sm);
`;

export const TextInput = styled.input`
  ${bodyStyles}
`;

export const Strong = styled.strong`
  font-weight: var(--font-weight-bold);
`;

export const Emphasis = styled.em``;

export const UnorderedList = styled.ul`
  ${bodyStyles}
  margin-block: 0 var(--space-4);
`;

export const OrderedList = styled.ol`
  ${bodyStyles}
  margin-block: 0 var(--space-4);
`;

export const ListItem = styled.li``;

export const Quote = styled.blockquote`
  ${bodyStyles}
  margin-block: 0 var(--space-4);
  padding-inline-start: var(--space-6);
  border-inline-start: var(--space-1) solid var(--color-accent);
  color: var(--color-text-muted);
`;

export const InlineCode = styled.code`
  padding: 0.1em 0.35em;
  border-radius: var(--radius-small);
  background: var(--color-surface-muted);
  color: var(--color-wood);
  font-family: var(--font-mono);
  font-size: 0.9em;
`;
