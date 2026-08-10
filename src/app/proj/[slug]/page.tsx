import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TagLabel from "@components/ui/TagLabel";
import { buildProjectMetadata, getAllProjectSlugs, getProjectBySlug } from "@lib/project";
import { formatProjectDate } from "@lib/project-shared";

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
        <Link href="/proj">← Back to proj index</Link>{" "}
        <span>Project Log</span>
      </p>

      <article>
        <header>
          <p>
            <span>{formatProjectDate(project.date)}</span>{" "}
            <span aria-hidden>🧃</span>{" "}
            {project.tags.map((tag) => (
              <TagLabel key={tag} label={tag} />
            ))}
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </header>

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
