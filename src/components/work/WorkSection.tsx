"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FaPaw } from "react-icons/fa";
import styled from "styled-components";
import { IndexSection } from "../../app/home/HomePage.styles";
import { mediaQuery } from "@lib/media";
import EricssonWorkExperience from "./experiences/EricssonWorkExperience";
import HackTheNorthWorkExperience from "./experiences/HackTheNorthWorkExperience";
import OroWorkExperience from "./experiences/OroWorkExperience";
import ShopifyWorkExperience from "./experiences/ShopifyWorkExperience";
import TeslaWorkExperience from "./experiences/TeslaWorkExperience";
import WecWorkExperience from "./experiences/WecWorkExperience";
import WorkExperienceStack from "./WorkExperienceStack";

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

function subscribeToLargeMobile(changeHandler: () => void) {
  const query = window.matchMedia(mediaQuery.largeMobile);
  query.addEventListener("change", changeHandler);

  return () => query.removeEventListener("change", changeHandler);
}

function getLargeMobileSnapshot() {
  return window.matchMedia(mediaQuery.largeMobile).matches;
}

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
    translate: 1px calc(var(--space-8) - var(--space-1));
  }

  span[data-paw-spacer] {
    width: calc(var(--space-6) - var(--space-1));
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

  &[data-trail="4"] span:nth-child(5) {
    translate: var(--space-2) var(--space-4);
  }

  &[data-trail="4"] span:nth-child(6) {
    translate: var(--space-1) var(--space-6);
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

  @media ${mediaQuery.smallTablet} {
    span[data-paw-spacer] {
      width: calc(var(--space-4) - var(--space-1));
    }

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
    --trail-offset-x: calc(-1 * var(--space-6));
    --trail-offset-y: 0px;
    --trail-length-adjustment: var(--space-6);
  }

  &[data-trail="2"] {
    --trail-offset-x: 0px;
    --trail-offset-y: calc(-1 * var(--space-4));
    --trail-length-adjustment: calc(-1 * var(--space-4));
  }

  &[data-trail="3"] {
    --trail-offset-x: calc(-1 * var(--space-4));
    --trail-offset-y: var(--space-2);
    --trail-length-adjustment: var(--space-4);
  }

  &[data-trail="4"] {
    --trail-offset-x: 0px;
    --trail-offset-y: var(--space-2);
    --trail-length-adjustment: var(--space-4);
  }
`;

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const visibleOpacity =
    total === 1 ? 0.7 : 0.3 + (index / (total - 1)) * 0.4;
  const opacity = useTransform(progress, (value) =>
    value >= ((index + 1) / total) * 0.95 ? visibleOpacity : 0,
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
        direction === "right" ? previousBounds.right + 20 : previousBounds.left;
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
        {index === 1 ? <span data-paw-spacer /> : null}
        {Array.from({ length: pawCount }, (_, pawIndex) => (
          <PawPrint
            index={firstPawIndex + pawIndex}
            key={pawIndex}
            progress={progress}
            shouldReduceMotion={shouldReduceMotion}
            total={totalPaws}
          />
        ))}
        {index === 0 || index === 1 || index === 4 ? (
          <span data-paw-spacer />
        ) : null}
        {index === 3 ? (
          <>
            <span data-paw-spacer />
            <span data-paw-spacer />
          </>
        ) : null}
      </div>
    </PawTrail>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isLargeMobile = useSyncExternalStore(
    subscribeToLargeMobile,
    getLargeMobileSnapshot,
    () => false,
  );
  const experiences = [
    <TeslaWorkExperience key="tesla" />,
    <HackTheNorthWorkExperience key="hack-the-north" />,
    <OroWorkExperience key="oro" />,
    <ShopifyWorkExperience key="shopify" />,
    <EricssonWorkExperience key="ericsson" />,
    <WecWorkExperience key="wec" />,
  ];
  const pawCounts = useMemo(
    () => (isLargeMobile ? [4, 2, 5, 3, 3] : [6, 3, 7, 3, 6]),
    [isLargeMobile],
  );
  const totalPaws = pawCounts.reduce((total, count) => total + count, 0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 60%"],
  });

  const fadeThresholds = useMemo(() => {
    const thresholds: number[] = [];
    let cumulative = 0;
    for (const count of pawCounts) {
      cumulative += count;
      thresholds.push((cumulative / totalPaws) * 0.95);
    }
    return thresholds;
  }, [pawCounts, totalPaws]);

  useLayoutEffect(() => {
    if (shouldReduceMotion) return;

    const articles =
      sectionRef.current?.querySelectorAll<HTMLElement>("article");
    if (!articles) return;

    articles.forEach((article) => {
      article.style.opacity = "0";
      article.style.pointerEvents = "none";
      article.style.willChange = "opacity";
    });

    const unsubscribe = scrollYProgress.on("change", (value) => {
      articles.forEach((article, index) => {
        const threshold = index === 0 ? 0 : fadeThresholds[index - 1];
        const progress = Math.min(
          1,
          Math.max(
            0,
            (value - threshold) / Math.min(0.08, 1 - threshold),
          ),
        );
        article.style.opacity = String(progress);
        article.style.pointerEvents = progress === 1 ? "auto" : "none";
      });
    });

    return unsubscribe;
  }, [scrollYProgress, shouldReduceMotion, fadeThresholds]);

  return (
    <Section id="work" ref={sectionRef}>
      <WorkExperienceStack
        experiences={experiences}
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
