"use client";

import { useId, useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styled from "styled-components";
import { type WorkSummary } from "@lib/work-shared";
import { IndexSection } from "../../app/home/HomePage.styles";
import WorkExperienceStack from "./WorkExperienceStack";

type WorkSectionProps = {
  entries: WorkSummary[];
};

type AnimatedPawTrailProps = {
  index: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
  totalTrails: number;
};

const Section = styled(IndexSection)`
  position: relative;
`;

const PawTrail = styled(motion.svg)`
  position: relative;
  left: var(--trail-left);
  display: block;
  width: var(--trail-width);
  height: auto;
  aspect-ratio: 350 / 64;
  color: var(--color-primary);
  filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  mask-image: linear-gradient(to right, #000 40%, transparent 50%);
  mask-position: 100% 0;
  mask-repeat: no-repeat;
  mask-size: 250% 100%;
  pointer-events: none;
  visibility: hidden;
  will-change: mask-position;

  &[data-positioned="true"] {
    visibility: visible;
  }

  [data-variant] {
    display: none;
  }

  &[data-paws="3"] [data-variant="3"],
  &[data-paws="5"] [data-variant="5"],
  &[data-paws="7"] [data-variant="7"] {
    display: block;
  }
`;

function AnimatedPawTrail({
  index,
  progress,
  shouldReduceMotion,
  totalTrails,
}: AnimatedPawTrailProps) {
  const pawId = useId();
  const trailRef = useRef<SVGSVGElement>(null);
  const reveal = useTransform(
    progress,
    [(index / totalTrails) * 0.8, ((index + 1) / totalTrails) * 0.8],
    ["100%", "0%"],
  );

  useLayoutEffect(() => {
    const trail = trailRef.current;
    const workIndex = trail?.parentElement;
    const workEntries =
      workIndex?.querySelectorAll<HTMLElement>(":scope > article");
    const previousEntry = workEntries?.[index];
    const nextEntry = workEntries?.[index + 1];

    if (
      !trail ||
      !workIndex ||
      !(previousEntry instanceof HTMLElement) ||
      !(nextEntry instanceof HTMLElement)
    ) {
      return;
    }

    const positionTrail = () => {
      const workIndexBounds = workIndex.getBoundingClientRect();
      const previousBounds = previousEntry.getBoundingClientRect();
      const nextBounds = nextEntry.getBoundingClientRect();
      const direction =
        nextBounds.left + nextBounds.width / 2 >=
        previousBounds.left + previousBounds.width / 2
          ? "right"
          : "left";
      const start =
        direction === "right" ? previousBounds.right + 20 : previousBounds.left;
      const end =
        direction === "right" ? nextBounds.left : nextBounds.right - 16;
      const width = Math.abs(end - start);

      trail.style.setProperty(
        "--trail-left",
        `${Math.min(start, end) - workIndexBounds.left}px`,
      );
      trail.style.setProperty("--trail-width", `${width}px`);
      trail.dataset.direction = direction;
      trail.dataset.paws = width < 180 ? "3" : width < 280 ? "5" : "7";
      trail.dataset.positioned = "true";
    };

    positionTrail();
    const animationFrame = window.requestAnimationFrame(positionTrail);

    const resizeObserver = new ResizeObserver(positionTrail);
    resizeObserver.observe(workIndex);
    resizeObserver.observe(previousEntry);
    resizeObserver.observe(nextEntry);
    window.addEventListener("resize", positionTrail);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", positionTrail);
      resizeObserver.disconnect();
    };
  }, [index]);

  return (
    <PawTrail
      aria-hidden="true"
      data-direction={index % 2 === 0 ? "right" : "left"}
      preserveAspectRatio="xMidYMid meet"
      ref={trailRef}
      style={{ maskPosition: shouldReduceMotion ? "0% 0" : reveal }}
      viewBox="0 0 350 64"
    >
      <defs>
        <path
          d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"
          id={pawId}
        />
      </defs>
      <g
        data-variant="3"
        transform={
          index % 2 === 0 ? undefined : "translate(350 0) scale(-1 1)"
        }
      >
        <use href={`#${pawId}`} opacity="0.4" transform="translate(2 0) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.7" transform="translate(160 14) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} transform="translate(316 8) rotate(80 16 16) scale(.0625)" />
      </g>
      <g
        data-variant="5"
        transform={
          index % 2 === 0 ? undefined : "translate(350 0) scale(-1 1)"
        }
      >
        <use href={`#${pawId}`} opacity="0.4" transform="translate(2 0) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.55" transform="translate(81 14) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.7" transform="translate(160 8) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.85" transform="translate(239 24) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} transform="translate(316 18) rotate(80 16 16) scale(.0625)" />
      </g>
      <g
        data-variant="7"
        transform={
          index % 2 === 0 ? undefined : "translate(350 0) scale(-1 1)"
        }
      >
        <use href={`#${pawId}`} opacity="0.4" transform="translate(2 0) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.5" transform="translate(55 14) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.6" transform="translate(108 8) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.7" transform="translate(161 24) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.8" transform="translate(214 18) rotate(80 16 16) scale(.0625)" />
        <use href={`#${pawId}`} opacity="0.9" transform="translate(267 32) rotate(110 16 16) scale(.0625)" />
        <use href={`#${pawId}`} transform="translate(316 28) rotate(80 16 16) scale(.0625)" />
      </g>
    </PawTrail>
  );
}

export default function WorkSection({ entries }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const totalTrails = Math.max(entries.length - 1, 0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 60%"],
  });

  return (
    <Section id="work" ref={sectionRef}>
      <WorkExperienceStack
        entries={entries}
        renderConnector={(connectorIndex) => (
          <AnimatedPawTrail
            index={connectorIndex}
            progress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
            totalTrails={totalTrails}
          />
        )}
      />
    </Section>
  );
}
