"use client";

import styled from "styled-components";
import { mediaQuery } from "@lib/media";

export const PawTrailContainer = styled.div`
  position: relative;
  width: 100%;
  height: var(--space-8);
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
    translate: 0 var(--space-1);
  }

  span:nth-child(3) {
    translate: 0 var(--space-2);
  }

  span:nth-child(4) {
    translate: 0 var(--space-3);
  }

  span:nth-child(5) {
    translate: 0 var(--space-4);
  }

  span:nth-child(6) {
    translate: 0 var(--space-6);
  }

  span:nth-child(7) {
    translate: 1px calc(var(--space-8) - var(--space-1));
  }

  span[data-paw-spacer] {
    width: calc(var(--space-6) - var(--space-1));
  }

  &[data-trail="0"] span:nth-child(2) {
    translate: var(--space-1) var(--space-1);
  }

  &[data-trail="0"] span:nth-child(4) {
    translate: calc(-1 * var(--space-1)) var(--space-3);
  }

  &[data-trail="0"] span:nth-child(6) {
    translate: var(--space-2) var(--space-6);
  }

  &[data-trail="1"] span:nth-child(2) {
    translate: calc(-1 * var(--space-2)) var(--space-1);
  }

  &[data-trail="1"] span:nth-child(4) {
    translate: var(--space-2) var(--space-3);
  }

  &[data-trail="1"] span:nth-child(5) {
    translate: calc(-1 * var(--space-1)) var(--space-4);
  }

  &[data-trail="2"] span:nth-child(3) {
    translate: var(--space-1) var(--space-2);
  }

  &[data-trail="2"] span:nth-child(4) {
    translate: calc(-1 * var(--space-2)) var(--space-3);
  }

  &[data-trail="2"] span:nth-child(6) {
    translate: var(--space-1) var(--space-6);
  }

  &[data-trail="3"] span:nth-child(2) {
    translate: var(--space-2) var(--space-1);
  }

  &[data-trail="3"] span:nth-child(3) {
    translate: calc(-1 * var(--space-1)) var(--space-2);
  }

  &[data-trail="3"] span:nth-child(5) {
    translate: var(--space-1) var(--space-4);
  }

  &[data-trail="3"] span:nth-child(6) {
    translate: calc(-1 * var(--space-1)) var(--space-6);
  }

  &[data-trail="4"] span:nth-child(2) {
    translate: calc(-1 * var(--space-1)) var(--space-1);
  }

  &[data-trail="4"] span:nth-child(4) {
    translate: var(--space-2) var(--space-3);
  }

  &[data-trail="4"] span:nth-child(5) {
    translate: var(--space-2) var(--space-4);
  }

  &[data-trail="4"] span:nth-child(6) {
    translate: var(--space-1) var(--space-6);
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
  }

  @media ${mediaQuery.mobile} {
    > div {
      justify-content: space-evenly;
    }

    span[data-paw-spacer] {
      display: none;
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
`;
