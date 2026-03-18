import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import type { ProjectFrontmatter, ProjectSummary } from "./project-shared";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "project");
const PROJECT_EXTENSION = ".mdx";

function readProjectFiles(): string[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(PROJECT_EXTENSION))
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

function parseFrontmatter(fileName: string): ProjectFrontmatter {
  const source = fs.readFileSync(path.join(PROJECTS_DIRECTORY, fileName), "utf8");
  const { data } = matter(source);

  return {
    title: requireString(data.title, "title", fileName),
    date: requireDate(data.date, fileName),
    summary: requireString(data.summary, "summary", fileName),
    published: requireBoolean(data.published, "published", fileName),
    tags: parseTags(data.tags, fileName),
  };
}

export function getAllProjects(): ProjectSummary[] {
  return readProjectFiles()
    .map((fileName) => ({
      slug: fileName.slice(0, -PROJECT_EXTENSION.length),
      ...parseFrontmatter(fileName),
    }))
    .filter((project) => project.published)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
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
