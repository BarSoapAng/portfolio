"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styled from "styled-components";
import ContentImage from "@components/ui/ContentImage";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

type ProjectPolaroidProps = {
  geometryVersion: MotionValue<number>;
  index: number;
  project: ProjectSummary;
  shouldReduceMotion: boolean | null;
  trackX: MotionValue<number>;
  viewportRef: RefObject<HTMLDivElement | null>;
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

const CarouselHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-inline: var(--space-4);
  color: var(--color-text-muted);

  p {
    margin: 0;
    font-size: var(--font-size-sm);
  }
`;

const DragGlyph = styled.span`
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  line-height: 1;
`;

const CarouselViewport = styled.div`
  position: relative;
  isolation: isolate;
  container-type: inline-size;
  overflow: hidden;
  overflow: clip;
  padding-block: var(--space-4);
`;

const CarouselTrack = styled(motion.ul)`
  display: flex;
  width: max-content;
  margin: 0;
  padding:
    var(--space-8)
    max(var(--space-4), calc((100cqw - clamp(17rem, 58vw, 23rem)) / 2))
    var(--space-24);
  gap: var(--space-6);
  list-style: none;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const Polaroid = styled(motion.li)`
  width: clamp(17rem, 58vw, 23rem);
  flex: 0 0 auto;
  padding: var(--space-3) var(--space-3) var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  box-shadow:
    0 0.75rem 1.75rem color-mix(in srgb, var(--color-wood) 18%, transparent),
    0 0 0 1px color-mix(in srgb, var(--color-surface) 70%, transparent);
  transform-origin: center;
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

function ProjectPolaroid({
  geometryVersion,
  index,
  project,
  shouldReduceMotion,
  trackX,
  viewportRef,
}: ProjectPolaroidProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const horizontalPosition = useTransform(
    [trackX, geometryVersion],
    ([currentTrackX]) => {
      const card = cardRef.current;
      const viewport = viewportRef.current;

      if (!card || !viewport) {
        return 0;
      }

      return (
        card.offsetLeft +
        card.offsetWidth / 2 +
        Number(currentTrackX) -
        viewport.clientWidth / 2
      );
    },
  );
  const arcY = useTransform(horizontalPosition, (distanceFromCenter) => {
    const viewport = viewportRef.current;

    if (!viewport || shouldReduceMotion) {
      return 0;
    }

    const radius = Math.max(viewport.clientWidth * 1.15, 640);
    const horizontalDistance = Math.min(Math.abs(distanceFromCenter), radius * 0.82);

    return radius - Math.sqrt(radius ** 2 - horizontalDistance ** 2);
  });
  const arcRotation = useTransform(horizontalPosition, (distanceFromCenter) => {
    const viewport = viewportRef.current;

    if (!viewport || shouldReduceMotion) {
      return 0;
    }

    const radius = Math.max(viewport.clientWidth * 1.15, 640);
    const horizontalDistance = Math.max(
      radius * -0.82,
      Math.min(distanceFromCenter, radius * 0.82),
    );

    return Math.asin(horizontalDistance / radius) * (180 / Math.PI);
  });
  const arcDepth = useTransform(horizontalPosition, (distanceFromCenter) =>
    Math.max(0, Math.round(1000 - Math.abs(distanceFromCenter))),
  );

  return (
    <Polaroid
      animate={{ opacity: 1 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      ref={cardRef}
      style={{ rotate: arcRotation, y: arcY, zIndex: arcDepth }}
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
}

export default function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wasDraggingRef = useRef(false);
  const geometryVersion = useMotionValue(0);
  const trackX = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const viewport = carouselRef.current;

    if (!viewport) {
      return;
    }

    const updateGeometry = () => {
      geometryVersion.set(geometryVersion.get() + 1);
    };
    const resizeObserver = new ResizeObserver(updateGeometry);

    updateGeometry();
    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, [geometryVersion]);

  if (projects.length === 0) {
    return <EmptyMessage>No projects yet.</EmptyMessage>;
  }

  return (
    <Carousel>
      <CarouselHeader>
        <p id="project-carousel-instructions">Drag the Polaroids to explore</p>
        <DragGlyph aria-hidden="true">↔</DragGlyph>
      </CarouselHeader>
      <CarouselViewport ref={carouselRef}>
        <CarouselTrack
          aria-describedby="project-carousel-instructions"
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
              geometryVersion={geometryVersion}
              index={index}
              key={project.slug}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
              trackX={trackX}
              viewportRef={carouselRef}
            />
          ))}
        </CarouselTrack>
      </CarouselViewport>
    </Carousel>
  );
}
