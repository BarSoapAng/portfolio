"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

type CursorRole =
  | "default"
  | "ew-resize"
  | "move"
  | "nesw-resize"
  | "ns-resize"
  | "nwse-resize"
  | "pointer"
  | "text"
  | "wait";

const Cursor = styled.span`
  position: fixed;
  z-index: 2147483647;
  top: 0;
  left: 0;
  display: none;
  width: 32px;
  height: 32px;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-32px, -32px, 0);
  will-change: transform;

  &[data-enabled="true"] {
    display: block;
  }

  &[data-visible="true"] {
    opacity: 1;
  }

  img {
    display: block;
    width: 32px;
    max-width: none;
    height: 32px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  &[data-role="default"] img {
    transform: translate(-5px, -2px);
  }

  &[data-role="pointer"] img {
    transform: translate(-15px, -2px);
  }

  &[data-role="text"] img {
    transform: translate(-4px, -19px);
  }

  &[data-role="move"] img {
    transform: translate(-15px, -26px);
  }

  &:where(
    [data-role="wait"],
    [data-role="ew-resize"],
    [data-role="ns-resize"],
    [data-role="nwse-resize"],
    [data-role="nesw-resize"]
  ) img {
    transform: translate(-16px, -16px);
  }
`;

function getCursorRole(target: EventTarget | null): CursorRole {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (target.closest('[aria-busy="true"]')) {
    return "wait";
  }

  const requestedCursor = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;

  switch (requestedCursor) {
    case "ew-resize":
    case "move":
    case "nesw-resize":
    case "ns-resize":
    case "nwse-resize":
      return requestedCursor;
  }

  if (
    target.closest(
      'input:not([type]), input[type="email"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="url"], textarea, [contenteditable="true"]',
    )
  ) {
    return "text";
  }

  if (target.closest('[draggable="true"]')) {
    return "move";
  }

  if (
    target.closest(
      'a[href], button, input[type="button"], input[type="checkbox"], input[type="file"], input[type="radio"], input[type="reset"], input[type="submit"], label[for], select, summary, [role="button"], [role="link"]',
    )
  ) {
    return "pointer";
  }

  return "default";
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const image = imageRef.current;

    if (!cursor || !image) {
      return;
    }

    const pointerQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;
    let cursorDirectory = motionQuery.matches ? "static" : "animated";
    let isEnabled = false;
    let pointerX = -32;
    let pointerY = -32;
    let pointerTarget: EventTarget | null = null;

    const hideCursor = () => {
      cursor.dataset.visible = "false";
    };

    const paintCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      animationFrame = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hideCursor();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.dataset.visible = "true";

      if (pointerTarget !== event.target) {
        pointerTarget = event.target;
        const role = getCursorRole(event.target);

        if (cursor.dataset.role !== role) {
          cursor.dataset.role = role;
          image.src = `/cursors/${cursorDirectory}/${role}.webp`;
        }
      }

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(paintCursor);
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        hideCursor();
      }
    };

    const disableCursor = () => {
      if (!isEnabled) {
        return;
      }

      isEnabled = false;
      delete document.documentElement.dataset.customCursor;
      cursor.dataset.enabled = "false";
      hideCursor();
      pointerTarget = null;
      image.removeEventListener("error", disableCursor);
      image.removeAttribute("src");
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideCursor);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const syncCursor = () => {
      const nextCursorDirectory = motionQuery.matches ? "static" : "animated";

      if (!pointerQuery.matches) {
        disableCursor();
        return;
      }

      if (isEnabled) {
        if (cursorDirectory !== nextCursorDirectory) {
          cursorDirectory = nextCursorDirectory;
          image.src = `/cursors/${cursorDirectory}/${cursor.dataset.role}.webp`;
        }

        return;
      }

      cursorDirectory = nextCursorDirectory;
      isEnabled = true;
      document.documentElement.dataset.customCursor = "true";
      cursor.dataset.enabled = "true";
      cursor.dataset.role = "default";
      image.addEventListener("error", disableCursor);
      image.src = `/cursors/${cursorDirectory}/default.webp`;
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerout", handlePointerOut);
      window.addEventListener("blur", hideCursor);
    };

    pointerQuery.addEventListener("change", syncCursor);
    motionQuery.addEventListener("change", syncCursor);
    syncCursor();

    return () => {
      pointerQuery.removeEventListener("change", syncCursor);
      motionQuery.removeEventListener("change", syncCursor);
      disableCursor();
    };
  }, []);

  return (
    <Cursor
      aria-hidden="true"
      data-enabled="false"
      data-role="default"
      data-visible="false"
      ref={cursorRef}
    >
      <img alt="" draggable={false} ref={imageRef} />
    </Cursor>
  );
}
