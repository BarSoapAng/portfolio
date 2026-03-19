import "server-only";

import type { Metadata } from "next";
import type { WorkFrontmatter, WorkSummary } from "./work-shared";
import {
  parseTagsField,
  readMdxCollection,
  requireBooleanField,
  requireDateField,
  requireStringField,
} from "./mdx-collection";

const WORK_FIELD_PARSERS = {
  title: requireStringField("title"),
  company: requireStringField("company"),
  period: requireStringField("period"),
  location: requireStringField("location"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof WorkFrontmatter]: (value: unknown, fileName: string) => WorkFrontmatter[K];
};

export function getAllWorkEntries(): WorkSummary[] {
  return readMdxCollection<WorkFrontmatter>({
    directoryName: "work",
    fieldParsers: WORK_FIELD_PARSERS,
  });
}

export function getAllWorkSlugs(): string[] {
  return getAllWorkEntries().map((entry) => entry.slug);
}

export function getWorkBySlug(slug: string): WorkSummary | null {
  return getAllWorkEntries().find((entry) => entry.slug === slug) ?? null;
}

export function buildWorkMetadata(entry: WorkSummary): Metadata {
  return {
    title: `${entry.title} @ ${entry.company} | Work | Angela's Universe`,
    description: entry.summary,
    keywords: entry.tags,
    openGraph: {
      title: `${entry.title} @ ${entry.company}`,
      description: entry.summary,
      type: "article",
      publishedTime: entry.date,
      tags: entry.tags,
    },
    twitter: {
      card: "summary",
      title: `${entry.title} @ ${entry.company}`,
      description: entry.summary,
    },
  };
}
