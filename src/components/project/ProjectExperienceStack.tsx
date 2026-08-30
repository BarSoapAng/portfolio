"use client";

import { memo, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import styled from "styled-components";
import ContentImage from "@components/ui/ContentImage";
import { largeHeadingStyles } from "@components/ui/HeadingStyles";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

type ProjectPolaroidProps = {
  isFront: boolean;
  onSendToBack: () => void;
  position: number;
  project: ProjectSummary;
  projectIndex: number;
  totalProjects: number;
};

const ProjectShowcase = styled.div`
  display: grid;
  min-height: 30rem;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 1fr);
  align-items: center;
  gap: var(--space-12);

  @media (max-width: 52rem) {
    gap: var(--space-8);
  }

  @media (max-width: 42rem) {
    min-height: 0;
    grid-template-columns: 1fr;
  }
`;

const ProjectCopy = styled.div`
  display: grid;
  min-width: 0;
  align-items: center;
`;

const ProjectDetails = styled(motion.div)`
  grid-area: 1 / 1;

  > :last-child {
    margin-block-end: 0;
  }
`;

const ProjectTitle = styled.h2`
  ${largeHeadingStyles}
`;

const ProjectLink = styled(Link)`
  color: var(--color-primary-hover);
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: var(--radius-small);
  }
`;

const ProjectDescription = styled.p`
  max-width: 32rem;
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
`;

const StackColumn = styled.div`
  display: grid;
  min-width: 0;
  gap: var(--space-2);
  justify-items: center;
`;

const StackStage = styled.ul`
  position: relative;
  width: min(100%, 24rem);
  height: 27rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 42rem) {
    height: 25rem;
  }
`;

const StackCard = styled.li<{ $isFront: boolean }>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: ${({ $isFront }) => ($isFront ? "auto" : "none")};
`;

const PolaroidPosition = styled(motion.div)`
  width: min(82%, 20rem);
  will-change: transform;
`;

const Polaroid = styled(motion.button)`
  width: 100%;
  padding: var(--space-3) var(--space-3) var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  background: var(--color-surface);
  box-shadow:
    0 0.75rem 1.75rem color-mix(in srgb, var(--color-wood) 18%, transparent),
    0 0 0 1px color-mix(in srgb, var(--color-surface) 70%, transparent);
  color: inherit;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  will-change: transform;

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: var(--space-1);
  }
`;

const PolaroidPhoto = styled.div`
  pointer-events: none;

  img {
    aspect-ratio: 1;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
`;

const StackHint = styled.p`
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
`;

const EmptyMessage = styled.p`
  padding-inline: var(--space-4);
`;

const ProjectPolaroid = memo(function ProjectPolaroid({
  isFront,
  onSendToBack,
  position,
  project,
  projectIndex,
  totalProjects,
}: ProjectPolaroidProps) {
  const wasDraggingRef = useRef(false);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.hypot(info.offset.x, info.offset.y) >= 110) {
      onSendToBack();
    }

    window.setTimeout(() => {
      wasDraggingRef.current = false;
    }, 0);
  };

  return (
    <StackCard
      $isFront={isFront}
      aria-hidden={!isFront}
      style={{ zIndex: totalProjects - position }}
    >
      <PolaroidPosition
        style={{
          rotate: ((projectIndex % 3) + 1) * (projectIndex % 2 === 0 ? -1 : 1),
          x: ((projectIndex % 3) - 1) * 6,
          y: ((projectIndex % 4) - 1.5) * 4,
        }}
      >
        <Polaroid
          aria-label={`Show the next project. ${project.title} is currently selected.`}
          data-cursor="move"
          disabled={!isFront}
          drag={isFront && totalProjects > 1}
          dragMomentum={false}
          dragSnapToOrigin
          onClick={() => {
            if (!wasDraggingRef.current) {
              onSendToBack();
            }
          }}
          onDragEnd={handleDragEnd}
          onDragStart={() => {
            wasDraggingRef.current = true;
          }}
          type="button"
        >
          <PolaroidPhoto>
            <ContentImage
              alt={project.thumbnailAlt}
              src={project.thumbnail}
              variant="thumbnail"
            />
          </PolaroidPhoto>
        </Polaroid>
      </PolaroidPosition>
    </StackCard>
  );
});

function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  const [projectOrder, setProjectOrder] = useState(() =>
    projects.map((_project, index) => index),
  );
  const shouldReduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return <EmptyMessage>No projects yet.</EmptyMessage>;
  }

  const activeProject = projects[projectOrder[0]];
  const sendFrontProjectToBack = () => {
    setProjectOrder(([frontProject, ...remainingProjects]) => [
      ...remainingProjects,
      frontProject,
    ]);
  };

  return (
    <ProjectShowcase>
      <ProjectCopy aria-live="polite">
        <AnimatePresence initial={false}>
          <ProjectDetails
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            key={activeProject.slug}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.16,
              ease: "easeInOut",
            }}
          >
            <ProjectTitle>
              <ProjectLink
                data-cursor="pointer"
                href={`/proj/${activeProject.slug}`}
              >
                {activeProject.title}
              </ProjectLink>
            </ProjectTitle>
            <ProjectDescription>{activeProject.summary}</ProjectDescription>
          </ProjectDetails>
        </AnimatePresence>
      </ProjectCopy>

      <StackColumn>
        <StackStage aria-label="Project photo stack">
          {projectOrder.map((projectIndex, position) => (
            <ProjectPolaroid
              isFront={position === 0}
              key={projects[projectIndex].slug}
              onSendToBack={sendFrontProjectToBack}
              position={position}
              project={projects[projectIndex]}
              projectIndex={projectIndex}
              totalProjects={projects.length}
            />
          ))}
        </StackStage>
        <StackHint>Drag the top photo to shuffle the stack.</StackHint>
      </StackColumn>
    </ProjectShowcase>
  );
}

export default memo(ProjectExperienceStack);
