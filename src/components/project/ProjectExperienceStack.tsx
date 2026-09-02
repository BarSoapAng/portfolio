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
import {
  Body,
  DisplayCallout,
  Heading2,
  ResponsiveBodyLarge,
} from "@components/ui/Typography";
import { mediaQuery } from "@lib/media";
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

  @media ${mediaQuery.tablet} {
    min-height: 28rem;
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.9fr);
    gap: var(--space-8);
  }

  @media ${mediaQuery.smallTablet} {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
`;

const ProjectCopy = styled.div`
  display: grid;
  min-width: 0;
  align-items: center;
`;

const ProjectDetails = styled.div`
  grid-area: 1 / 1;
`;

const TitleFrame = styled.div`
  display: grid;

  > div {
    grid-area: 1 / 1;
  }
`;

const ProjectTitle = styled(motion.div)``;

const ProjectLink = styled(Link)`
  color: var(--color-primary-hover);
  text-decoration: underline;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: var(--radius-small);
  }
`;

const DescriptionFrame = styled.div`
  display: grid;

  > div {
    grid-area: 1 / 1;
  }
`;

const ProjectDescription = styled(motion.div)`
  max-width: 32rem;
`;

const ProjectDescriptionText = styled(ResponsiveBodyLarge)`
  margin-block-end: 0;
  color: var(--color-text-muted);
`;

const StackColumn = styled.div`
  position: relative;
  display: grid;
  min-width: 0;
  padding-block-start: var(--space-8);
  gap: var(--space-2);
  justify-items: center;
`;

const DragInstruction = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: var(--space-4);
  display: flex;
  align-items: flex-start;
  color: var(--color-primary);
  opacity: 0.8;
  pointer-events: none;

  > span {
    white-space: nowrap;
    transform: rotate(-4deg);
  }

  svg {
    width: 5.25rem;
    height: auto;
    margin-block-start: var(--space-1);
    margin-inline-start: var(--space-2);
    overflow: visible;
  }

  @media ${mediaQuery.mobile} {
    svg {
      width: var(--space-16);
    }
  }
`;

const StackStage = styled.ul`
  position: relative;
  width: min(100%, 24rem);
  height: 28rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media ${mediaQuery.tablet} {
    height: 25rem;
  }

  @media ${mediaQuery.smallTablet} {
    height: 24rem;
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
  padding: var(--space-3) var(--space-3) var(--space-16);
  border: 1px solid var(--color-primary-hover);
  border-radius: var(--radius-small);
  background: var(--color-surface);
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
    border: 1px solid var(--color-primary);
    border-radius: 0;
    box-shadow: none;
  }
`;

const EmptyMessage = styled(Body)`
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
      style={{ zIndex: totalProjects - position + 1 }}
    >
      <PolaroidPosition
        style={{
          rotate:
            ((projectIndex % 3) + 2) *
            2 *
            (projectIndex % 2 === 0 ? -1 : 1),
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
        <ProjectDetails>
          <TitleFrame>
            <AnimatePresence initial={false} mode="wait">
              <ProjectTitle
                exit={{ opacity: 0 }}
                key={activeProject.slug}
                transition={{ duration: 0 }}
              >
                <Heading2>
                  <ProjectLink
                    aria-label={activeProject.title}
                    data-cursor="pointer"
                    href={`/proj/${activeProject.slug}`}
                  >
                    {Array.from(activeProject.title).map((character, index) => (
                      <motion.span
                        animate={{ opacity: 1 }}
                        aria-hidden="true"
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        key={`${character}-${index}`}
                        transition={{
                          delay: shouldReduceMotion ? 0 : index * 0.06,
                          duration: 0,
                        }}
                      >
                        {character}
                      </motion.span>
                    ))}
                  </ProjectLink>
                </Heading2>
              </ProjectTitle>
            </AnimatePresence>
          </TitleFrame>

          <DescriptionFrame>
            <AnimatePresence initial={false}>
              <ProjectDescription
                animate={{ opacity: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                key={activeProject.slug}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: "easeInOut",
                }}
              >
                <ProjectDescriptionText>
                  {activeProject.summary}
                </ProjectDescriptionText>
              </ProjectDescription>
            </AnimatePresence>
          </DescriptionFrame>
        </ProjectDetails>
      </ProjectCopy>

      <StackColumn>
        <DragInstruction>
          <DisplayCallout>drag here!</DisplayCallout>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 120 70">
            <path
              d="M4 12C34 4 50 16 43 34C37 50 57 53 74 43C92 33 105 44 112 60"
              fill="none"
              stroke="currentColor"
              strokeDasharray="7 8"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path d="m101 54 13 10 2-16Z" fill="currentColor" />
          </svg>
        </DragInstruction>
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
      </StackColumn>
    </ProjectShowcase>
  );
}

export default memo(ProjectExperienceStack);
