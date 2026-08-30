"use client";

import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FaPaw } from "react-icons/fa";
import styled from "styled-components";
import { type WorkSummary } from "@lib/work-shared";
import { IndexSection } from "../../app/home/HomePage.styles";
import WorkExperienceStack from "./WorkExperienceStack";

type WorkSectionProps = {
  entries: WorkSummary[];
};

type PawPrintProps = {
  index: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
  total: number;
};

type AnimatedPawTrailProps = {
  firstPawIndex: number;
  index: number;
  pawCount: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
  totalPaws: number;
};

const Section = styled(IndexSection)`
  position: relative;
`;

const PawTrail = styled.div`
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
    translate: 0 calc(var(--space-8) - var(--space-1));
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

  &[data-trail="4"] span:nth-child(6) {
    translate: calc(-1 * var(--space-1)) var(--space-6);
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

  @media (max-width: 42rem) {
    svg {
      width: calc(var(--space-4) - var(--space-1));
    }
  }

  &[data-trail="0"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }

  &[data-trail="1"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }

  &[data-trail="2"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }

  &[data-trail="3"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }

  &[data-trail="4"] {
    --trail-offset-x: 0px;
    --trail-offset-y: 0px;
    --trail-length-adjustment: 0px;
  }
`;

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const visibleOpacity =
    total === 1 ? 1 : 0.4 + (index / (total - 1)) * 0.6;
  const opacity = useTransform(progress, (value) =>
    value >= ((index + 1) / total) * 0.8 ? visibleOpacity : 0,
  );

  return (
    <motion.span
      style={{ opacity: shouldReduceMotion ? visibleOpacity : opacity }}
    >
      <FaPaw />
    </motion.span>
  );
}

function AnimatedPawTrail({
  firstPawIndex,
  index,
  pawCount,
  progress,
  shouldReduceMotion,
  totalPaws,
}: AnimatedPawTrailProps) {
  const trailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const trail = trailRef.current;
    const workEntries =
      trail?.parentElement?.querySelectorAll<HTMLElement>(":scope > article");
    const previousEntry = workEntries?.[index];
    const nextEntry = workEntries?.[index + 1];

    if (
      !trail ||
      !(previousEntry instanceof HTMLElement) ||
      !(nextEntry instanceof HTMLElement)
    ) {
      return;
    }

    const positionTrail = () => {
      const trailBounds = trail.getBoundingClientRect();
      const previousBounds = previousEntry.getBoundingClientRect();
      const nextBounds = nextEntry.getBoundingClientRect();
      const direction =
        nextBounds.left + nextBounds.width / 2 >=
        previousBounds.left + previousBounds.width / 2
          ? "right"
          : "left";
      const start =
        direction === "right" ? previousBounds.right + 8 : previousBounds.left;
      const end =
        direction === "right" ? nextBounds.left : nextBounds.right - 16;

      trail.style.setProperty(
        "--trail-left",
        `${Math.min(start, end) - trailBounds.left}px`,
      );
      trail.style.setProperty("--trail-width", `${Math.abs(end - start)}px`);
      trail.style.setProperty(
        "--trail-angle",
        `${90 + (Math.atan2(trailBounds.height, end - start) * 180) / Math.PI}deg`,
      );
      trail.dataset.direction = direction;
      trail.dataset.positioned = "true";
    };

    positionTrail();
    const animationFrame = window.requestAnimationFrame(positionTrail);

    const resizeObserver = new ResizeObserver(positionTrail);
    resizeObserver.observe(trail);
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
      data-trail={index}
      ref={trailRef}
    >
      <div>
        {Array.from({ length: pawCount }, (_, pawIndex) => (
          <PawPrint
            index={firstPawIndex + pawIndex}
            key={pawIndex}
            progress={progress}
            shouldReduceMotion={shouldReduceMotion}
            total={totalPaws}
          />
        ))}
      </div>
    </PawTrail>
  );
}

export default function WorkSection({ entries }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pawCounts = Array.from(
    { length: Math.max(entries.length - 1, 0) },
    (_, index) => (index % 2 === 0 ? 7 : 5),
  );
  const totalPaws = pawCounts.reduce((total, count) => total + count, 0);
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
            firstPawIndex={pawCounts
              .slice(0, connectorIndex)
              .reduce((total, count) => total + count, 0)}
            index={connectorIndex}
            pawCount={pawCounts[connectorIndex]}
            progress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
            totalPaws={totalPaws}
          />
        )}
      />
    </Section>
  );
}
