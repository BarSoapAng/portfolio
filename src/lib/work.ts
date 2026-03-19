import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import type { WorkFrontmatter, WorkSummary } from "./work-shared";

const WORK_DIRECTORY = path.join(process.cwd(), "content", "work");
const WORK_EXTENSION = ".mdx";

function readWorkFiles(): string[] {
  if (!fs.existsSync(WORK_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(WORK_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(WORK_EXTENSION))
    .map((entry) => entry.name);
}

function requireString(value: unknown, key: string, fileName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected "${key}" to be a non-empty string in ${fileName}.`);
  }

  return value;
}

function requireBoolean(value: unknown, key: string, fileName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Expected "${key}" to be a boolean in ${fileName}.`);
  }

  return value;
}

function requireDate(value: unknown, fileName: string): string {
  const date = requireString(value, "date", fileName);

  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Expected "date" to be a valid date string in ${fileName}.`);
  }

  return date;
}

function parseTags(value: unknown, fileName: string): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some((tag) => typeof tag !== "string" || tag.trim().length === 0)) {
    throw new Error(`Expected "tags" to be an array of non-empty strings in ${fileName}.`);
  }

  return value;
}

function parseFrontmatter(fileName: string): WorkFrontmatter {
  const source = fs.readFileSync(path.join(WORK_DIRECTORY, fileName), "utf8");
  const { data } = matter(source);

  return {
    title: requireString(data.title, "title", fileName),
    company: requireString(data.company, "company", fileName),
    period: requireString(data.period, "period", fileName),
    location: requireString(data.location, "location", fileName),
    date: requireDate(data.date, fileName),
    summary: requireString(data.summary, "summary", fileName),
    published: requireBoolean(data.published, "published", fileName),
    tags: parseTags(data.tags, fileName),
  };
}

export function getAllWorkEntries(): WorkSummary[] {
  return readWorkFiles()
    .map((fileName) => ({
      slug: fileName.slice(0, -WORK_EXTENSION.length),
      ...parseFrontmatter(fileName),
    }))
    .filter((entry) => entry.published)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
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
