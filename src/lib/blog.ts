import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import type { PostFrontmatter, PostSummary } from "./blog-shared";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");
const POST_EXTENSION = ".mdx";

function readPostFiles(): string[] {
  return fs
    .readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(POST_EXTENSION))
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

function parseFrontmatter(fileName: string): PostFrontmatter {
  const source = fs.readFileSync(path.join(POSTS_DIRECTORY, fileName), "utf8");
  const { data } = matter(source);

  return {
    title: requireString(data.title, "title", fileName),
    date: requireDate(data.date, fileName),
    summary: requireString(data.summary, "summary", fileName),
    published: requireBoolean(data.published, "published", fileName),
    tags: parseTags(data.tags, fileName),
  };
}

export function getAllPosts(): PostSummary[] {
  return readPostFiles()
    .map((fileName) => ({
      slug: fileName.slice(0, -POST_EXTENSION.length),
      ...parseFrontmatter(fileName),
    }))
    .filter((post) => post.published)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): PostSummary | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function buildPostMetadata(post: PostSummary): Metadata {
  return {
    title: `${post.title} | Angela's Blog`,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.summary,
    },
  };
}
