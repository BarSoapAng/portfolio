"use client";

import styled from "styled-components";
import { mediaQuery } from "@lib/media";

export const PawTrailContainer = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 100%;
  min-height: min(var(--space-8), 4dvh);
  container-type: size;
  color: var(--color-primary);
  pointer-events: none;

  > div {
    position: absolute;
    top: var(--trail-offset-y, 0px);
    left: calc(var(--trail-left) + var(--trail-offset-x, 0px));
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(
      var(--trail-width) + var(--trail-length-adjustment, 0px)
    );
    height: 100%;
    visibility: hidden;
  }

  &[data-positioned="true"] > div {
    visibility: visible;
  }

  &[data-direction="left"] > div {
    flex-direction: row-reverse;
  }

  &[data-direction="right"] {
    --trail-angle: 95deg;
  }

  &[data-direction="left"] {
    --trail-angle: 265deg;
  }

  span {
    display: flex;
    align-self: start;
    will-change: opacity;
  }

  span:nth-child(2) {
    translate: 0 12.5cqh;
  }

  span:nth-child(3) {
    translate: 0 25cqh;
  }

  span:nth-child(4) {
    translate: 0 37.5cqh;
  }

  span:nth-child(5) {
    translate: 0 50cqh;
  }

  span:nth-child(6) {
    translate: 0 75cqh;
  }

  span:nth-child(7) {
    translate: 1px 87.5cqh;
  }

  span[data-paw-spacer] {
    width: calc(var(--space-6) - var(--space-1));
  }

  &[data-trail="0"] span:nth-child(2) {
    translate: var(--space-1) 12.5cqh;
  }

  &[data-trail="0"] span:nth-child(4) {
    translate: calc(-1 * var(--space-1)) 37.5cqh;
  }

  &[data-trail="0"] span:nth-child(6) {
    translate: var(--space-2) 75cqh;
  }

  &[data-trail="1"] span:nth-child(2) {
    translate: calc(-1 * var(--space-2)) 12.5cqh;
  }

  &[data-trail="1"] span:nth-child(4) {
    translate: var(--space-2) 37.5cqh;
  }

  &[data-trail="1"] span:nth-child(5) {
    translate: calc(-1 * var(--space-1)) 50cqh;
  }

  &[data-trail="2"] span:nth-child(3) {
    translate: var(--space-1) 25cqh;
  }

  &[data-trail="2"] span:nth-child(4) {
    translate: calc(-1 * var(--space-2)) 37.5cqh;
  }

  &[data-trail="2"] span:nth-child(6) {
    translate: var(--space-1) 75cqh;
  }

  &[data-trail="3"] span:nth-child(2) {
    translate: var(--space-2) 12.5cqh;
  }

  &[data-trail="3"] span:nth-child(3) {
    translate: calc(-1 * var(--space-1)) 25cqh;
  }

  &[data-trail="3"] span:nth-child(5) {
    translate: var(--space-1) 50cqh;
  }

  &[data-trail="3"] span:nth-child(6) {
    translate: calc(-1 * var(--space-1)) 75cqh;
  }

  &[data-trail="4"] span:nth-child(2) {
    translate: calc(-1 * var(--space-1)) 12.5cqh;
  }

  &[data-trail="4"] span:nth-child(4) {
    translate: var(--space-2) 37.5cqh;
  }

  &[data-trail="4"] span:nth-child(5) {
    translate: var(--space-2) 50cqh;
  }

  &[data-trail="4"] span:nth-child(6) {
    translate: var(--space-1) 75cqh;
  }

  span:nth-child(odd) {
    transform:
      rotate(calc(var(--trail-angle) - 90deg))
      translateY(calc(-1 * var(--space-2) - var(--space-1)))
      rotate(calc(90deg - var(--trail-angle)));
  }

  span:nth-child(even) {
    transform:
      rotate(calc(var(--trail-angle) - 90deg))
      translateY(calc(var(--space-2) + var(--space-1)))
      rotate(calc(90deg - var(--trail-angle)));
  }

  span:nth-child(odd) svg {
    transform: rotate(calc(var(--trail-angle) - 15deg));
  }

  span:nth-child(even) svg {
    transform: rotate(calc(var(--trail-angle) + 15deg));
  }

  svg {
    width: calc(var(--space-6) - var(--space-1));
    height: auto;
    opacity: 1;
    filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  }

  @media ${mediaQuery.smallTablet} {
    span[data-paw-spacer] {
      width: calc(var(--space-4) - var(--space-1));
    }

    svg {
      width: calc(var(--space-4) - var(--space-1));
    }

    span:nth-child(5) {
      translate: 0 37.5cqh;
    }

    span:nth-child(6) {
      translate: 0 50cqh;
    }

    span:nth-child(7) {
      translate: 0 75cqh;
    }
  }

  @media ${mediaQuery.largeMobile} {
    min-height: min(var(--space-6), 3dvh);

    &[data-trail] span:nth-child(4) {
      translate: 0 33.333cqh;
    }

    &[data-trail] span:nth-child(5) {
      translate: 0 50cqh;
    }

    &[data-trail] span:nth-child(6) {
      translate: 0 50cqh;
    }

    &[data-trail] span:nth-child(7) {
      translate: 0 66.667cqh;
    }
  }

  @media ${mediaQuery.mediumMobile} {
    display: none;
  }

  @media ${mediaQuery.mobile} {
    min-height: min(var(--space-4), 2dvh);

    > div {
      justify-content: space-evenly;
    }

    span[data-paw-spacer] {
      display: none;
    }

    &[data-trail] span:nth-child(2) {
      translate: 0 25cqh;
    }

    &[data-trail] span:nth-child(3) {
      translate: 0 25cqh;
    }

    &[data-trail] span:nth-child(4) {
      translate: 0 50cqh;
    }

    &[data-trail] span:nth-child(5) {
      translate: 0 50cqh;
    }

    &[data-trail] span:nth-child(6) {
      translate: 0 50cqh;
    }

    &[data-trail] span:nth-child(7) {
      translate: 0 50cqh;
    }

    svg {
      width: calc(var(--space-3) + var(--space-1));
    }
  }

  &[data-trail="0"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }

  &[data-trail="1"] {
    --trail-offset-x: calc(-1 * var(--space-6));
    --trail-offset-y: 0px;
    --trail-length-adjustment: var(--space-6);
  }

  &[data-trail="2"] {
    --trail-offset-x: 0px;
    --trail-offset-y: calc(-1 * var(--space-4));
    --trail-length-adjustment: calc(-1 * var(--space-4));
  }

  &[data-trail="3"] {
    --trail-offset-x: calc(-1 * var(--space-4));
    --trail-offset-y: var(--space-2);
    --trail-length-adjustment: var(--space-4);
  }

  &[data-trail="4"] {
    --trail-offset-x: 0px;
    --trail-offset-y: var(--space-2);
    --trail-length-adjustment: var(--space-4);
  }

  @media ${mediaQuery.largeMobile} {
    &[data-trail="1"] {
      --trail-offset-x: calc(-1 * var(--space-3));
      --trail-length-adjustment: var(--space-3);
    }

    &[data-trail="2"] {
      --trail-offset-y: calc(-1 * var(--space-2));
      --trail-length-adjustment: calc(-1 * var(--space-2));
    }

    &[data-trail="3"] {
      --trail-offset-x: calc(-1 * var(--space-2));
      --trail-offset-y: var(--space-1);
      --trail-length-adjustment: var(--space-2);
    }

    &[data-trail="4"] {
      --trail-offset-y: var(--space-1);
      --trail-length-adjustment: var(--space-2);
    }
  }

  @media ${mediaQuery.mobile} {
    &[data-trail="1"],
    &[data-trail="2"],
    &[data-trail="3"],
    &[data-trail="4"] {
      --trail-offset-x: 0px;
      --trail-offset-y: 0px;
      --trail-length-adjustment: 0px;
    }
  }
`;
