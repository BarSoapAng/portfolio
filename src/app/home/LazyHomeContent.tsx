"use client";

import dynamic from "next/dynamic";
import { FaPaw } from "react-icons/fa";
import { Heading2 } from "@components/ui/Typography";
import type { PostSummary } from "@lib/blog-shared";
import type { ProjectSummary } from "@lib/project-shared";
import {
  GardenSection,
  HomeSectionSkeleton,
  ProjectsSection,
} from "./HomePage.styles";
import PoroSectionDivider from "./PoroSectionDivider";

const WorkSection = dynamic(() => import("@components/work/WorkSection"), {
  loading: () => <HomeSectionSkeleton $height="100dvh" aria-hidden />,
  ssr: false,
});

const ProjectExperienceStack = dynamic(
  () => import("@components/project/ProjectExperienceStack"),
  {
    loading: () => <HomeSectionSkeleton $height="30rem" aria-hidden />,
    ssr: false,
  },
);

const DrawingCanvas = dynamic(() => import("@components/farm/DrawingCanvas"), {
  loading: () => <HomeSectionSkeleton $height="32rem" aria-hidden />,
  ssr: false,
});

const BlogPreviewStrip = dynamic(
  () => import("@components/blog/BlogPreviewStrip"),
  {
    loading: () => <HomeSectionSkeleton $height="24rem" aria-hidden />,
    ssr: false,
  },
);

type LazyHomeContentProps = {
  posts: PostSummary[];
  projects: ProjectSummary[];
};

export default function LazyHomeContent({
  posts,
  projects,
}: LazyHomeContentProps) {
  return (
    <>
      <WorkSection />

      {projects.length > 0 && (
        <ProjectsSection id="projects">
          <ProjectExperienceStack projects={projects} />
        </ProjectsSection>
      )}

      <GardenSection>
        <Heading2>
          Leave a Mark
          <FaPaw aria-hidden />
        </Heading2>
        <DrawingCanvas />
      </GardenSection>

      <PoroSectionDivider />

      <BlogPreviewStrip posts={posts} />
    </>
  );
}
