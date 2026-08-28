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
  height: var(--space-12);
  color: var(--color-primary);
  pointer-events: none;

  > div {
    position: absolute;
    left: var(--trail-left, 15%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--trail-width, 70%);
    height: 100%;
  }

  &[data-direction="left"] > div {
    flex-direction: row-reverse;
  }

  &[data-direction="right"] {
    --trail-angle: 95deg;

    > div {
      width: calc(var(--trail-width, 70%) - var(--space-4));
    }
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
    translate: 0 var(--space-2);
  }

  span:nth-child(3) {
    translate: 0 var(--space-4);
  }

  span:nth-child(4) {
    translate: 0 var(--space-6);
  }

  span:nth-child(5) {
    translate: 0 var(--space-8);
  }

  span:nth-child(6) {
    translate: 0 calc(var(--space-8) + var(--space-2));
  }

  span:nth-child(7) {
    translate: 0 calc(var(--space-12) - var(--space-1));
  }

  span:nth-child(odd) {
    transform:
      rotate(calc(var(--trail-angle) - 90deg))
      translateY(calc(-1 * var(--space-1)))
      rotate(calc(90deg - var(--trail-angle)));
  }

  span:nth-child(even) {
    transform:
      rotate(calc(var(--trail-angle) - 90deg)) translateY(var(--space-1))
      rotate(calc(90deg - var(--trail-angle)));
  }

  span:nth-child(odd) svg {
    transform: rotate(calc(var(--trail-angle) - 32deg));
  }

  span:nth-child(even) svg {
    transform: rotate(calc(var(--trail-angle) + 32deg));
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
`;

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const opacity = useTransform(progress, (value) =>
    value >= ((index + 1) / total) * 0.8 ? 1 : 0,
  );

  return (
    <motion.span style={{ opacity: shouldReduceMotion ? 1 : opacity }}>
      <FaPaw />
    </motion.span>
  );
}

function AnimatedPawTrail({
  index,
  pawCount,
  progress,
  shouldReduceMotion,
  totalPaws,
}: AnimatedPawTrailProps) {
  const trailRef = useRef<HTMLDivElement>(null);
  const direction = index % 2 === 0 ? "right" : "left";

  useLayoutEffect(() => {
    const trail = trailRef.current;
    const previousEntry = trail?.previousElementSibling;
    const nextEntry = trail?.nextElementSibling;

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
      const start =
        direction === "right" ? previousBounds.right : previousBounds.left;
      const end = direction === "right" ? nextBounds.left : nextBounds.right;

      trail.style.setProperty(
        "--trail-left",
        `${Math.min(start, end) - trailBounds.left}px`,
      );
      trail.style.setProperty("--trail-width", `${Math.abs(end - start)}px`);
      trail.style.setProperty(
        "--trail-angle",
        `${90 + (Math.atan2(trailBounds.height, end - start) * 180) / Math.PI}deg`,
      );
    };

    positionTrail();

    const resizeObserver = new ResizeObserver(positionTrail);
    resizeObserver.observe(trail);
    resizeObserver.observe(previousEntry);
    resizeObserver.observe(nextEntry);

    return () => resizeObserver.disconnect();
  }, [direction]);

  return (
    <PawTrail aria-hidden="true" data-direction={direction} ref={trailRef}>
      <div>
        {Array.from({ length: pawCount }, (_, pawIndex) => (
          <PawPrint
            index={index * pawCount + pawIndex}
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
  const pawsPerConnector = 7;
  const totalPaws = Math.max(entries.length - 1, 0) * pawsPerConnector;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 60%"],
  });

  return (
    <Section id="work" ref={sectionRef}>
      <h2>Work</h2>
      <WorkExperienceStack
        entries={entries}
        renderConnector={(connectorIndex) => (
          <AnimatedPawTrail
            index={connectorIndex}
            pawCount={pawsPerConnector}
            progress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
            totalPaws={totalPaws}
          />
        )}
      />
    </Section>
  );
}
