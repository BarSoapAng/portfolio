"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import styled from "styled-components";
import { ContentIndex } from "@components/ui/ContentStyles";
import { type WorkSummary } from "@lib/work-shared";
import { IndexSection } from "../../app/home/HomePage.styles";
import WorkExperienceStack from "./WorkExperienceStack";

type WorkSectionProps = {
  entries: WorkSummary[];
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

const PawTrail = styled(motion.div)`
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

  svg {
    width: var(--space-8);
    height: auto;
    opacity: 0.7;
    filter: drop-shadow(0 var(--space-1) var(--space-1) var(--color-primary-soft));
  }

  svg:nth-child(odd) {
    transform: translateX(calc(-1 * var(--space-2))) rotate(-16deg);
  }

  svg:nth-child(even) {
    transform: translateX(var(--space-2)) rotate(16deg);
  }

  @media (max-width: 42rem) {
    top: var(--space-12);
    bottom: var(--space-4);
    width: var(--space-8);

    svg {
      width: var(--space-6);
    }
  }
`;

export default function WorkSection({ entries }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
  });
  const clipPath = useTransform(scrollYProgress, (progress) =>
    shouldReduceMotion
      ? "inset(0 0 0% 0)"
      : `inset(0 0 ${Math.round((1 - progress) * 100)}% 0)`,
  );

  return (
    <Section id="work" ref={sectionRef}>
      <h2>Work</h2>
      <WorkExperienceStack entries={entries} />
      <PawTrail aria-hidden="true" style={{ clipPath }}>
        <div>
          {Array.from({ length: 7 }, (_, index) => (
            <FaPaw key={index} />
          ))}
        </div>
      </PawTrail>
    </Section>
  );
}
