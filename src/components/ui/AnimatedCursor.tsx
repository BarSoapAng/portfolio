"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import classicCursor from "@assets/cursor/apng/classic.png";
import diagonalResizeOneCursor from "@assets/cursor/apng/diagonal-resize-1.png";
import diagonalResizeTwoCursor from "@assets/cursor/apng/diagonal-resize-2.png";
import horizontalResizeCursor from "@assets/cursor/apng/horizontal-resize.png";
import loadingCursor from "@assets/cursor/apng/loading.png";
import moveCursor from "@assets/cursor/apng/move.png";
import pointerCursor from "@assets/cursor/apng/pointer.png";
import textCursor from "@assets/cursor/apng/text.png";
import verticalResizeCursor from "@assets/cursor/apng/vertical-resize.png";

const cursorImages = {
  default: { hotspot: [6, 3], src: classicCursor.src },
  help: { hotspot: [6, 3], src: classicCursor.src },
  move: { hotspot: [21, 36], src: moveCursor.src },
  "nesw-resize": { hotspot: [22, 22], src: diagonalResizeTwoCursor.src },
  "ns-resize": { hotspot: [22, 22], src: verticalResizeCursor.src },
  "nwse-resize": { hotspot: [22, 22], src: diagonalResizeOneCursor.src },
  pointer: { hotspot: [20, 3], src: pointerCursor.src },
  text: { hotspot: [6, 27], src: textCursor.src },
  wait: { hotspot: [22, 22], src: loadingCursor.src },
  "ew-resize": { hotspot: [22, 22], src: horizontalResizeCursor.src },
} as const;

type CursorName = keyof typeof cursorImages;

const Cursor = styled.div`
  position: fixed;
  z-index: 2147483647;
  top: 0;
  left: 0;
  display: none;
  width: 44px;
  height: 44px;
  background: center / contain no-repeat;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  will-change: transform;

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    display: block;
  }
`;

function getCursorName(target: EventTarget | null): CursorName {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (target.closest('[aria-busy="true"]')) {
    return "wait";
  }

  const cursorOverrideElement = target.closest<HTMLElement>("[data-cursor]");
  const cursorOverride = cursorOverrideElement?.dataset.cursor;
  const pointerElement = target.closest(
    'a, button, summary, select, label[for], [role="button"], [role="link"], input[type="button"], input[type="checkbox"], input[type="file"], input[type="radio"], input[type="range"], input[type="reset"], input[type="submit"]',
  );

  if (
    pointerElement &&
    cursorOverrideElement &&
    pointerElement !== cursorOverrideElement &&
    cursorOverrideElement.contains(pointerElement)
  ) {
    return "pointer";
  }

  if (cursorOverride && cursorOverride in cursorImages) {
    return cursorOverride as CursorName;
  }

  if (pointerElement) {
    return "pointer";
  }

  if (
    target.closest(
      'blockquote, code, dd, dt, em, figcaption, h1, h2, h3, h4, h5, h6, input, li, p, pre, small, span, strong, textarea, time, [contenteditable="true"]',
    )
  ) {
    return "text";
  }

  return "default";
}

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorElement = cursorRef.current;

    if (!cursorElement) {
      return;
    }

    const cursorMedia = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (cursorMedia.matches) {
      for (const src of new Set(Object.values(cursorImages).map((cursor) => cursor.src))) {
        const image = new window.Image();
        image.src = src;
      }
    }

    const hideCursor = () => {
      cursorElement.style.opacity = "0";
    };

    const updateCursor = (event: PointerEvent) => {
      if (!cursorMedia.matches || event.pointerType === "touch") {
        hideCursor();
        return;
      }

      const cursorName = getCursorName(event.target);
      const cursor = cursorImages[cursorName];

      if (cursorElement.dataset.cursor !== cursorName) {
        cursorElement.dataset.cursor = cursorName;
        cursorElement.style.backgroundImage = `url("${cursor.src}")`;
      }

      cursorElement.style.opacity = "1";
      cursorElement.style.transform = `translate3d(${event.clientX - cursor.hotspot[0]}px, ${event.clientY - cursor.hotspot[1]}px, 0)`;
    };

    document.addEventListener("pointermove", updateCursor, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideCursor);
    cursorMedia.addEventListener("change", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      document.removeEventListener("pointermove", updateCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      cursorMedia.removeEventListener("change", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  return <Cursor aria-hidden ref={cursorRef} />;
}
