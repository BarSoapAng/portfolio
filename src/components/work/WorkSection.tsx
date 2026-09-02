"use client";

import {
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  useReducedMotion,
  useScroll,
} from "framer-motion";
import styled from "styled-components";
import { IndexSection } from "../../app/home/HomePage.styles";
import { mediaQuery } from "@lib/media";
import EricssonWorkExperience from "./experiences/EricssonWorkExperience";
import HackTheNorthWorkExperience from "./experiences/HackTheNorthWorkExperience";
import OroWorkExperience from "./experiences/OroWorkExperience";
import ShopifyWorkExperience from "./experiences/ShopifyWorkExperience";
import TeslaWorkExperience from "./experiences/TeslaWorkExperience";
import WecWorkExperience from "./experiences/WecWorkExperience";
import AnimatedPawTrail from "./PawTrail";
import WorkExperienceStack from "./WorkExperienceStack";

function subscribeToLargeMobile(changeHandler: () => void) {
  const query = window.matchMedia(mediaQuery.largeMobile);
  query.addEventListener("change", changeHandler);

  return () => query.removeEventListener("change", changeHandler);
}

function getLargeMobileSnapshot() {
  return window.matchMedia(mediaQuery.largeMobile).matches;
}

function subscribeToMobile(changeHandler: () => void) {
  const query = window.matchMedia(mediaQuery.mobile);
  query.addEventListener("change", changeHandler);

  return () => query.removeEventListener("change", changeHandler);
}

function getMobileSnapshot() {
  return window.matchMedia(mediaQuery.mobile).matches;
}

const Section = styled(IndexSection)`
  position: relative;
  margin-block-start: var(--space-16);

  @media ${mediaQuery.tablet} {
    margin-block-start: var(--space-12);
  }

  @media ${mediaQuery.smallTablet} {
    margin-block-start: var(--space-8);
  }
`;

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isLargeMobile = useSyncExternalStore(
    subscribeToLargeMobile,
    getLargeMobileSnapshot,
    () => false,
  );
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
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
    () =>
      isMobile
        ? [2, 2, 3, 1, 2]
        : isLargeMobile
          ? [4, 2, 5, 3, 3]
          : [6, 3, 7, 3, 6],
    [isLargeMobile, isMobile],
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
