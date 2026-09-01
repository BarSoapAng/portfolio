import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
import { BlogDate, ContentHero } from "@components/ui/ContentStyles";
import TagLabel from "@components/ui/TagLabel";
import { formatLongDate } from "@lib/format-date";
import { buildProjectMetadata, getAllProjectSlugs, getProjectBySlug } from "@lib/project";
import styles from "./ProjectPost.module.css";

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
        <Link href="/home#projects">&larr; Back to projects</Link>
      </p>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
        </header>

        <ContentHero>
          <ContentImage alt={project.thumbnailAlt} src={project.thumbnail} variant="hero" />
        </ContentHero>

        <div className={styles.meta}>
          <BlogDate as="time" dateTime={project.date}>
            {formatLongDate(project.date)}
          </BlogDate>
          <div aria-label="Project technologies" className={styles.tags}>
            {project.tags.map((tag) => (
              <TagLabel key={tag} label={tag} />
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <ProjectContent />
        </div>
      </article>
    </main>
  );
}
