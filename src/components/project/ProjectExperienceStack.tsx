import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

export default function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  return (
    <div className="content-index">
      {projects.length === 0 ? (
        <p>
          No projects yet - add MDX files to <code>content/project</code>.
        </p>
      ) : (
        projects.map((project) => (
          <article className="content-card" key={project.slug}>
            <Link aria-label={`View ${project.title}`} href={`/proj/${project.slug}`}>
              <ContentImage alt={project.thumbnailAlt} src={project.thumbnail} variant="thumbnail" />
            </Link>
            <div className="content-card__body">
              <p>
                <span className="entry-tags">{project.tags.join(" · ")}</span>
              </p>
              <h2>
                <Link href={`/proj/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.summary}</p>
              <p>
                <Link href={`/proj/${project.slug}`}>Open project page →</Link>
              </p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
