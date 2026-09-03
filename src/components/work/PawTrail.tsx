import { useLayoutEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import { mediaQuery } from "@lib/media";
import { PawTrailContainer } from "./PawTrail.styles";

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

function PawPrint({ index, progress, shouldReduceMotion, total }: PawPrintProps) {
  const visibleOpacity =
    total === 1 ? 0.7 : 0.3 + (index / (total - 1)) * 0.4;
  const opacity = useTransform(progress, (value) =>
    value >= ((index + 1) / total) * 0.75 ? visibleOpacity : 0,
  );

  return (
    <motion.span
      style={{ opacity: shouldReduceMotion ? visibleOpacity : opacity }}
    >
      <FaPaw />
    </motion.span>
  );
}

export default function AnimatedPawTrail({
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
      const isMobileView = window.matchMedia(mediaQuery.largeMobile).matches;
      const gap = isMobileView ? 8 : 20;
      const endGap = isMobileView ? 6 : 16;
      const start =
        direction === "right" ? previousBounds.right + gap : previousBounds.left;
      const end =
        direction === "right" ? nextBounds.left : nextBounds.right - endGap;

      const trailLeft = Math.min(start, end) - trailBounds.left;
      const trailWidth = Math.max(0, Math.abs(end - start));
      trail.style.setProperty("--trail-left", `${trailLeft}px`);
      trail.style.setProperty("--trail-width", `${trailWidth}px`);
      trail.dataset.direction = direction;

      if (window.matchMedia(mediaQuery.mobile).matches) {
        trail.style.removeProperty("--trail-angle");
      } else {
        trail.style.setProperty(
          "--trail-angle",
          `${90 + (Math.atan2(trailBounds.height, end - start) * 180) / Math.PI}deg`,
        );
      }

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
    <PawTrailContainer
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
    </PawTrailContainer>
  );
}
