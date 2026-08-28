"use client";

import { useRef } from "react";
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

const Section = styled(IndexSection)`
  position: relative;
`;

const PawTrail = styled.div`
  width: 42%;
  height: var(--space-16);
  justify-self: center;
  color: var(--color-primary);
  pointer-events: none;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &[data-direction="left"] > div {
    flex-direction: row-reverse;
  }

  span {
    display: flex;
    align-self: start;
  }

  span:nth-child(2) {
    translate: 0 var(--space-3);
  }

  span:nth-child(3) {
    translate: 0 var(--space-6);
  }

  span:nth-child(4) {
    translate: 0 calc(var(--space-8) + var(--space-1));
  }

  span:nth-child(5) {
    translate: 0 calc(var(--space-12) - var(--space-1));
  }

  &[data-direction="right"] span:nth-child(odd) {
    transform: rotate(140deg);
  }

  &[data-direction="right"] span:nth-child(even) {
    transform: rotate(150deg);
  }

  &[data-direction="left"] span:nth-child(odd) {
    transform: rotate(220deg);
  }

  &[data-direction="left"] span:nth-child(even) {
    transform: rotate(210deg);
  }

  svg {
    width: calc(var(--space-6) - var(--space-1));
    height: auto;
    opacity: 0.7;
    filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  }

  @media (max-width: 42rem) {
    width: 48%;
    height: var(--space-16);

    svg {
      width: calc(var(--space-4) - var(--space-1));
    }
  }
`;

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const opacity = useTransform(progress, (value) =>
    shouldReduceMotion || value >= ((index + 1) / total) * 0.7 ? 1 : 0,
  );

  return (
    <motion.span style={{ opacity }}>
      <FaPaw />
    </motion.span>
  );
}

export default function WorkSection({ entries }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pawsPerConnector = 5;
  const totalPaws = Math.max(entries.length - 1, 0) * pawsPerConnector;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 85%"],
  });

  return (
    <Section id="work" ref={sectionRef}>
      <h2>Work</h2>
      <WorkExperienceStack
        entries={entries}
        renderConnector={(connectorIndex) => (
          <PawTrail
            aria-hidden="true"
            data-direction={connectorIndex % 2 === 0 ? "right" : "left"}
          >
            <div>
              {Array.from({ length: pawsPerConnector }, (_, pawIndex) => {
                const index = connectorIndex * pawsPerConnector + pawIndex;

                return (
                  <PawPrint
                    index={index}
                    key={index}
                    progress={scrollYProgress}
                    shouldReduceMotion={shouldReduceMotion}
                    total={totalPaws}
                  />
                );
              })}
            </div>
          </PawTrail>
        )}
      />
    </Section>
  );
}
