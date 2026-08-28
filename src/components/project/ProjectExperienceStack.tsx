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
    max(var(--space-4), calc((100cqw - clamp(17rem, 58vw, 23rem)) / 2))
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
  width: clamp(17rem, 58vw, 23rem);
  flex: 0 0 auto;
  padding: var(--space-3) var(--space-3) var(--space-6);
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
  display: block;
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-text);

    h3 {
      color: var(--color-primary);
    }
  }

  &:focus-visible {
    border-radius: var(--radius-small);
  }
`;

const PolaroidPhoto = styled.div`
  img {
    aspect-ratio: 4 / 3;
    border: 0;
    border-radius: var(--radius-small);
    box-shadow: none;
    pointer-events: none;
  }
`;

const PolaroidCaption = styled.div`
  padding: var(--space-4) var(--space-2) 0;

  h3 {
    margin-block-end: var(--space-2);
    font-size: var(--font-size-2xl);
    transition: color 160ms ease;
  }

  p {
    margin-block-end: var(--space-3);
    color: var(--color-text-muted);
  }
`;

const ProjectTags = styled.span`
  display: block;
  margin-block-end: var(--space-3);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
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
    damping: 7 + (index % 3),
    mass: 0.55 + (index % 2) * 0.08,
    stiffness: 72 + (index % 3) * 6,
  });
  const rotation = useTransform(swing, (currentSwing) => restingRotation + currentSwing);

  return (
    <Polaroid
      animate={{ opacity: 1 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      style={{ rotate: shouldReduceMotion ? restingRotation : rotation }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <ProjectLink
        aria-label={`View ${project.title}`}
        draggable={false}
        href={`/proj/${project.slug}`}
      >
        <PolaroidPhoto>
          <ContentImage
            alt={project.thumbnailAlt}
            src={project.thumbnail}
            variant="thumbnail"
          />
        </PolaroidPhoto>
        <PolaroidCaption>
          <h3>{project.title}</h3>
          <ProjectTags>{project.tags.join(" · ")}</ProjectTags>
          <p>{project.summary}</p>
        </PolaroidCaption>
      </ProjectLink>
    </Polaroid>
  );
});

function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wasDraggingRef = useRef(false);
  const trackX = useMotionValue(0);
  const trackVelocity = useVelocity(trackX);
  const trackAcceleration = useVelocity(trackVelocity);
  const swingTarget = useTransform(trackAcceleration, [-45000, 0, 45000], [8, 0, -8], {
    clamp: true,
  });
  const shouldReduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return <EmptyMessage>No projects yet.</EmptyMessage>;
  }

  return (
    <Carousel>
      <CarouselViewport ref={carouselRef}>
        <CarouselTrack
          aria-label="Project carousel. Drag horizontally to explore."
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.12}
          dragMomentum={!shouldReduceMotion}
          dragTransition={{
            bounceDamping: 24,
            bounceStiffness: 180,
            power: 0.18,
            timeConstant: 260,
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
