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
import { ContentIndex } from "@components/ui/ContentStyles";
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

  > ${ContentIndex} {
    padding-inline-end: var(--space-24);
  }

  @media (max-width: 42rem) {
    > ${ContentIndex} {
      padding-inline-end: var(--space-12);
    }
  }
`;

const PawTrail = styled.div`
  position: absolute;
  top: var(--space-16);
  right: 0;
  bottom: var(--space-6);
  width: var(--space-16);
  color: var(--color-primary);
  pointer-events: none;

  > div {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  span {
    display: flex;
  }

  span:nth-child(odd) {
    transform: translateX(calc(-1 * var(--space-2))) rotate(164deg);
  }

  span:nth-child(even) {
    transform: translateX(var(--space-2)) rotate(196deg);
  }

  svg {
    width: var(--space-6);
    height: auto;
    opacity: 0.7;
    filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  }

  @media (max-width: 42rem) {
    top: var(--space-12);
    bottom: var(--space-4);
    width: var(--space-8);

    svg {
      width: var(--space-4);
    }
  }
`;

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const opacity = useTransform(progress, (value) =>
    shouldReduceMotion || value >= (index + 1) / total ? 1 : 0,
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
  });

  return (
    <Section id="work" ref={sectionRef}>
      <h2>Work</h2>
      <WorkExperienceStack entries={entries} />
      <PawTrail aria-hidden="true">
        <div>
          {Array.from({ length: 9 }, (_, index) => (
            <PawPrint
              index={index}
              key={index}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
              total={9}
            />
          ))}
        </div>
      </PawTrail>
    </Section>
  );
}
