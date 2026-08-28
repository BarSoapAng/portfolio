"use client";

import { memo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import styled from "styled-components";
import ContentImage from "@components/ui/ContentImage";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

type ProjectPolaroidProps = {
  index: number;
  project: ProjectSummary;
  shouldReduceMotion: boolean | null;
  swingTarget: MotionValue<number>;
};

const Carousel = styled.div`
  position: relative;
  z-index: 0;
  isolation: isolate;
  overflow: hidden;
  overflow: clip;
  margin-inline: calc(-1 * var(--space-4));
  padding-block-end: var(--space-8);
`;

const CarouselViewport = styled.div`
  position: relative;
  isolation: isolate;
  container-type: inline-size;
  overflow: hidden;
  overflow: clip;
  padding-block: var(--space-4);

  &::before {
    position: absolute;
    z-index: 0;
    top: calc(var(--space-4) + var(--space-8) - var(--space-3));
    right: 0;
    left: 0;
    height: var(--space-6);
    border-block: 1px solid color-mix(in srgb, var(--color-primary) 45%, transparent);
    background: var(--color-primary-soft);
    box-shadow: 0 var(--space-1) var(--space-2)
      color-mix(in srgb, var(--color-wood) 15%, transparent);
    content: "";
    pointer-events: none;
  }
`;

const CarouselTrack = styled(motion.ul)`
  position: relative;
  z-index: 1;
  display: flex;
  width: max-content;
  margin: 0;
  padding:
    var(--space-8)
    max(var(--space-4), calc((100cqw - clamp(16rem, 54vw, 21rem)) / 2))
    var(--space-24);
  gap: var(--space-24);
  list-style: none;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  will-change: transform;

  &:active {
    cursor: grabbing;
  }
`;

const Polaroid = styled(motion.li)`
  position: relative;
  width: clamp(16rem, 54vw, 21rem);
  flex: 0 0 auto;
  padding: var(--space-3) var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  box-shadow:
    0 0.75rem 1.75rem color-mix(in srgb, var(--color-wood) 18%, transparent),
    0 0 0 1px color-mix(in srgb, var(--color-surface) 70%, transparent);
  transform-origin: center top;
  will-change: transform;

  &::before {
    position: absolute;
    z-index: 1;
    top: calc(-1 * var(--space-1));
    left: 50%;
    width: var(--space-2);
    aspect-ratio: 1;
    border: 1px solid var(--color-primary-hover);
    border-radius: var(--radius-circle);
    background: var(--color-primary);
    content: "";
    pointer-events: none;
    transform: translateX(-50%);
  }
`;

const ProjectLink = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: var(--radius-small);
  }
`;

const PolaroidPhoto = styled.div`
  img {
    aspect-ratio: 1;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    pointer-events: none;
  }
`;

const PolaroidCaption = styled.div`
  display: flex;
  min-height: var(--space-24);
  padding: var(--space-3) var(--space-2) 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h3 {
    margin: 0;
    font-size: var(--font-size-2xl);
    transition: color 160ms ease;
  }

  p {
    display: -webkit-box;
    overflow: hidden;
    margin: var(--space-1) 0 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const EmptyMessage = styled.p`
  padding-inline: var(--space-4);
`;

const ProjectPolaroid = memo(function ProjectPolaroid({
  index,
  project,
  shouldReduceMotion,
  swingTarget,
}: ProjectPolaroidProps) {
  const restingRotation = ((index % 3) + 1) * (index % 2 === 0 ? -1 : 1);
  const swing = useSpring(swingTarget, {
    damping: 13 + (index % 2),
    mass: 0.75 + (index % 2) * 0.08,
    stiffness: 86 + (index % 3) * 4,
  });
  const rotation = useTransform(swing, (currentSwing) => restingRotation + currentSwing);

  return (
    <Polaroid
      animate={{ opacity: 1 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      style={{ rotate: shouldReduceMotion ? restingRotation : rotation }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <PolaroidPhoto>
        <ContentImage
          alt={project.thumbnailAlt}
          src={project.thumbnail}
          variant="thumbnail"
        />
      </PolaroidPhoto>
      <PolaroidCaption>
        <h3>
          <ProjectLink data-cursor="pointer" draggable={false} href={`/proj/${project.slug}`}>
            {project.title}
          </ProjectLink>
        </h3>
        <p>{project.summary}</p>
      </PolaroidCaption>
    </Polaroid>
  );
});

function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wasDraggingRef = useRef(false);
  const trackX = useMotionValue(0);
  const trackVelocity = useVelocity(trackX);
  const trackAcceleration = useVelocity(trackVelocity);
  const swingTarget = useTransform(
    trackAcceleration,
    [-65000, -12000, 12000, 65000],
    [3, 0, 0, -3],
    { clamp: true },
  );
  const shouldReduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return <EmptyMessage>No projects yet.</EmptyMessage>;
  }

  return (
    <Carousel>
      <CarouselViewport ref={carouselRef}>
        <CarouselTrack
          aria-label="Project carousel. Drag horizontally to explore."
          data-cursor="move"
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.04}
          dragMomentum={!shouldReduceMotion}
          dragTransition={{
            bounceDamping: 36,
            bounceStiffness: 240,
            power: 0.12,
            timeConstant: 210,
          }}
          onClickCapture={(event) => {
            if (wasDraggingRef.current) {
              event.preventDefault();
            }
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              wasDraggingRef.current = false;
            }, 0);
          }}
          onDragStart={() => {
            wasDraggingRef.current = true;
          }}
          style={{ x: trackX }}
        >
          {projects.map((project, index) => (
            <ProjectPolaroid
              index={index}
              key={project.slug}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
              swingTarget={swingTarget}
            />
          ))}
        </CarouselTrack>
      </CarouselViewport>
    </Carousel>
  );
}

export default memo(ProjectExperienceStack);
