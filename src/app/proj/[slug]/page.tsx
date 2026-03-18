import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectPostPage from "@components/proj/ProjectPostPage";
import { buildProjectMetadata, getAllProjectSlugs, getProjectBySlug } from "@lib/project";

type ProjectRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return buildProjectMetadata(project);
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { default: ProjectContent } = await import(`../../../../content/project/${slug}.mdx`);

  return (
    <ProjectPostPage project={project}>
      <ProjectContent />
    </ProjectPostPage>
  );
}
