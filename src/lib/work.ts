import "server-only";

import type { Metadata } from "next";
import type { WorkFrontmatter, WorkSummary } from "./work-shared";
import {
  createMdxCollectionReader,
  requireNumberField,
  parseTagsField,
  requireBooleanField,
  requireDateField,
  requireStringField,
} from "./mdx-collection";

const WORK_FIELD_PARSERS = {
  title: requireStringField("title"),
  company: requireStringField("company"),
  period: requireStringField("period"),
  order: requireNumberField("order"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof WorkFrontmatter]: (value: unknown, fileName: string) => WorkFrontmatter[K];
};

const workCollection = createMdxCollectionReader<WorkFrontmatter>({
  directoryName: "work",
  fieldParsers: WORK_FIELD_PARSERS,
});

export function getAllWorkEntries(): WorkSummary[] {
  return workCollection.getAll();
}

export function getAllWorkSlugs(): string[] {
  return workCollection.getSlugs();
}

export function getWorkBySlug(slug: string): WorkSummary | null {
  return workCollection.getBySlug(slug);
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
