import "server-only";

import type { Metadata } from "next";
import type { ProjectFrontmatter, ProjectSummary } from "./project-shared";
import {
  createMdxCollectionReader,
  parseTagsField,
  requireBooleanField,
  requireDateField,
  requireNumberField,
  requireStringField,
} from "./mdx-collection";

const PROJECT_FIELD_PARSERS = {
  title: requireStringField("title"),
  order: requireNumberField("order"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  thumbnail: requireStringField("thumbnail"),
  thumbnailAlt: requireStringField("thumbnailAlt"),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof ProjectFrontmatter]: (value: unknown, fileName: string) => ProjectFrontmatter[K];
};

const projectCollection = createMdxCollectionReader<ProjectFrontmatter>({
  directoryName: "project",
  fieldParsers: PROJECT_FIELD_PARSERS,
});

export function getAllProjects(): ProjectSummary[] {
  return projectCollection.getAll();
}

export function getAllProjectSlugs(): string[] {
  return projectCollection.getSlugs();
}

export function getProjectBySlug(slug: string): ProjectSummary | null {
  return projectCollection.getBySlug(slug);
}

export function buildProjectMetadata(project: ProjectSummary): Metadata {
  return {
    title: `${project.title} | Angela's Projects`,
    description: project.summary,
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      publishedTime: project.date,
      tags: project.tags,
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.summary,
    },
  };
}
