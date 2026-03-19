import "server-only";

import type { Metadata } from "next";
import type { ProjectFrontmatter, ProjectSummary } from "./project-shared";
import {
  parseTagsField,
  readMdxCollection,
  requireBooleanField,
  requireDateField,
  requireStringField,
} from "./mdx-collection";

const PROJECT_FIELD_PARSERS = {
  title: requireStringField("title"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof ProjectFrontmatter]: (value: unknown, fileName: string) => ProjectFrontmatter[K];
};

export function getAllProjects(): ProjectSummary[] {
  return readMdxCollection<ProjectFrontmatter>({
    directoryName: "project",
    fieldParsers: PROJECT_FIELD_PARSERS,
  });
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}

export function getProjectBySlug(slug: string): ProjectSummary | null {
  return getAllProjects().find((project) => project.slug === slug) ?? null;
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
