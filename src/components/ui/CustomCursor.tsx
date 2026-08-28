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

  canvas {
    display: block;
    width: 32px;
    max-width: none;
    height: 32px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  &[data-role="default"] canvas {
    transform: translate(-5px, -2px);
  }

  &[data-role="pointer"] canvas {
    transform: translate(-15px, -2px);
  }

  &[data-role="text"] canvas {
    transform: translate(-4px, -19px);
  }

  &[data-role="move"] canvas {
    transform: translate(-15px, -26px);
  }

  &:where(
    [data-role="wait"],
    [data-role="ew-resize"],
    [data-role="ns-resize"],
    [data-role="nwse-resize"],
    [data-role="nesw-resize"]
  ) canvas {
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

function getCursorFrameDelays(role: CursorRole): number[] {
  switch (role) {
    case "default":
      return Array(7).fill(117);
    case "move":
      return [283, 83, 117, 83, 117, 83];
    case "pointer":
      return [83, 83];
    case "text":
      return Array(15).fill(83);
    case "wait":
      return Array(46).fill(83);
    case "ew-resize":
    case "nesw-resize":
    case "ns-resize":
    case "nwse-resize":
      return [83, 33, 83, 33];
  }
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!cursor || !canvas || !context) {
      return;
    }

    const cursorElement = cursor;
    const drawingContext = context;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const pointerQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;
    let cursorDirectory = motionQuery.matches ? "static" : "animated";
    let cursorRole: CursorRole = "default";
    let frameDelays = getCursorFrameDelays(cursorRole);
    let frameIndex = 0;
    let frameTimer: number | null = null;
    let isEnabled = false;
    let isSpriteReady = false;
    let pointerX = -32;
    let pointerY = -32;
    let pointerTarget: EventTarget | null = null;
    let sprite: HTMLImageElement | null = null;
    let spriteRequest = 0;

    const stopCursorAnimation = () => {
      if (frameTimer !== null) {
        window.clearTimeout(frameTimer);
        frameTimer = null;
      }
    };

    const drawCursorFrame = () => {
      if (!sprite || !isSpriteReady) {
        return;
      }

      context.clearRect(0, 0, 32, 32);
      context.drawImage(sprite, frameIndex * 256, 0, 256, 256, 0, 0, 32, 32);
    };

    const scheduleCursorFrame = () => {
      if (
        cursorDirectory !== "animated" ||
        cursor.dataset.visible !== "true" ||
        !isSpriteReady ||
        frameDelays.length < 2 ||
        frameTimer !== null
      ) {
        return;
      }

      frameTimer = window.setTimeout(() => {
        frameTimer = null;
        frameIndex = (frameIndex + 1) % frameDelays.length;
        drawCursorFrame();
        scheduleCursorFrame();
      }, frameDelays[frameIndex]);
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
      stopCursorAnimation();
    };

    const showCursor = () => {
      cursor.dataset.visible = "true";

      if (isSpriteReady) {
        document.documentElement.dataset.customCursor = "true";
      }

      scheduleCursorFrame();
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
      showCursor();

      if (pointerTarget !== event.target) {
        pointerTarget = event.target;
        const role = getCursorRole(event.target);

        if (cursorRole !== role) {
          loadCursorSprite(role);
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

    function loadCursorSprite(role: CursorRole) {
      stopCursorAnimation();
      cursorRole = role;
      cursorElement.dataset.role = role;
      frameDelays = getCursorFrameDelays(role);
      frameIndex = 0;
      isSpriteReady = false;
      const request = ++spriteRequest;
      const nextSprite = new Image();

      nextSprite.decoding = "async";
      nextSprite.addEventListener("load", () => {
        if (!isEnabled || request !== spriteRequest) {
          return;
        }

        sprite = nextSprite;
        isSpriteReady = true;

        if (cursorElement.dataset.visible === "true") {
          document.documentElement.dataset.customCursor = "true";
        }

        drawCursorFrame();
        scheduleCursorFrame();
      });
      nextSprite.addEventListener("error", () => {
        if (request === spriteRequest) {
          disableCursor();
        }
      });
      nextSprite.src = `/cursors/${cursorDirectory}/${role}.webp`;
    }

    function disableCursor() {
      if (!isEnabled) {
        return;
      }

      isEnabled = false;
      delete document.documentElement.dataset.customCursor;
      cursorElement.dataset.enabled = "false";
      hideCursor();
      pointerTarget = null;
      spriteRequest += 1;
      sprite = null;
      isSpriteReady = false;
      drawingContext.clearRect(0, 0, 32, 32);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideCursor);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    const syncCursor = () => {
      const nextCursorDirectory = motionQuery.matches ? "static" : "animated";

      if (!pointerQuery.matches) {
        disableCursor();
        return;
      }

      if (isEnabled) {
        if (cursorDirectory !== nextCursorDirectory) {
          cursorDirectory = nextCursorDirectory;
          loadCursorSprite(cursorRole);
        }

        return;
      }

      cursorDirectory = nextCursorDirectory;
      isEnabled = true;
      cursor.dataset.enabled = "true";
      loadCursorSprite("default");
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
      <canvas height={32} ref={canvasRef} width={32} />
    </Cursor>
  );
}
