import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
import {
  ContentCard,
  ContentCardBody,
  ContentIndex,
  EntryTags,
} from "@components/ui/ContentStyles";
import { type ProjectSummary } from "@lib/project-shared";

type ProjectExperienceStackProps = {
  projects: ProjectSummary[];
};

export default function ProjectExperienceStack({ projects }: ProjectExperienceStackProps) {
  return (
    <ContentIndex>
      {projects.length === 0 ? (
        <p>
          No projects yet - add MDX files to <code>content/project</code>.
        </p>
      ) : (
        projects.map((project) => (
          <ContentCard key={project.slug}>
            <Link aria-label={`View ${project.title}`} href={`/proj/${project.slug}`}>
              <ContentImage alt={project.thumbnailAlt} src={project.thumbnail} variant="thumbnail" />
            </Link>
            <ContentCardBody>
              <p>
                <EntryTags>{project.tags.join(" · ")}</EntryTags>
              </p>
              <h2>
                <Link href={`/proj/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.summary}</p>
              <p>
                <Link href={`/proj/${project.slug}`}>Open project page →</Link>
              </p>
            </ContentCardBody>
          </ContentCard>
        ))
      )}
    </ContentIndex>
  );
}
