import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
import { ContentHero, EntryTags } from "@components/ui/ContentStyles";
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
    <main>
      <p>
        <Link href="/home#projects">← Back to projects</Link>{" "}
        <span>Project Log</span>
      </p>

      <article>
        <header>
          <p>
            <span aria-hidden>🧃</span>{" "}
            <EntryTags>{project.tags.join(" · ")}</EntryTags>
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>

        <ContentHero>
          <ContentImage alt={project.thumbnailAlt} src={project.thumbnail} variant="hero" />
        </ContentHero>

        <aside>
          <p>
            <strong>status:</strong>
          </p>
          <p>archived + documented</p>
          <p>
            <strong>source:</strong>
          </p>
          <p>content/project/{project.slug}.mdx</p>
          <p>emoji-grade chaos</p>
        </aside>

        <ProjectContent />
      </article>
    </main>
  );
}
