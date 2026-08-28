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
  width: 24%;
  height: var(--space-16);
  justify-self: center;
  color: var(--color-primary);
  pointer-events: none;

  > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
  }

  span {
    display: flex;
    align-self: center;
    justify-self: center;
  }

  span:first-child {
    align-self: start;
  }

  span:last-child {
    align-self: end;
  }

  &[data-direction="right"] span:first-child,
  &[data-direction="left"] span:last-child {
    grid-column: 1;
    grid-row: 1;
  }

  &[data-direction="right"] span:last-child,
  &[data-direction="left"] span:first-child {
    grid-column: 3;
    grid-row: 1;
  }

  &[data-direction="right"] span {
    transform: rotate(145deg);
  }

  &[data-direction="left"] span {
    transform: rotate(215deg);
  }

  span:nth-child(even) {
    translate: 0 var(--space-1);
  }

  svg {
    width: calc(var(--space-6) - var(--space-1));
    height: auto;
    opacity: 0.7;
    filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  }

  @media (max-width: 42rem) {
    width: 30%;
    height: var(--space-12);

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
  const pawsPerConnector = 3;
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
