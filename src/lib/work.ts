import "server-only";

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
