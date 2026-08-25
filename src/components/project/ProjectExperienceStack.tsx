"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import ContentImage from "@components/ui/ContentImage";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

const Carousel = styled.div`
  margin-inline: calc(-1 * var(--space-4));
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
  overflow: hidden;
  padding-block: var(--space-4);
`;

const CarouselTrack = styled(motion.ul)`
  display: flex;
  width: max-content;
  margin: 0;
  padding: var(--space-8) var(--space-4) var(--space-12);
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
  transform-origin: center top;
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

export default function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const wasDraggingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

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
        >
          {projects.map((project, index) => {
            const curveOffset = shouldReduceMotion
              ? 0
              : Math.abs(index - (projects.length - 1) / 2) * 14;
            const rotation = shouldReduceMotion
              ? 0
              : (index - (projects.length - 1) / 2) * 2.5;

            return (
              <Polaroid
                animate={{ opacity: 1, rotate: rotation, y: curveOffset }}
                initial={shouldReduceMotion ? false : { opacity: 0, rotate: rotation, y: curveOffset + 12 }}
                key={project.slug}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                whileHover={shouldReduceMotion ? undefined : { rotate: 0, y: curveOffset - 8 }}
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
          })}
        </CarouselTrack>
      </CarouselViewport>
    </Carousel>
  );
}
