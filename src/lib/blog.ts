import "server-only";

import type { Metadata } from "next";
import type { PostFrontmatter, PostSummary } from "./blog-shared";
import {
  parseTagsField,
  readMdxCollection,
  requireBooleanField,
  requireDateField,
  requireStringField,
} from "./mdx-collection";

const POST_FIELD_PARSERS = {
  title: requireStringField("title"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof PostFrontmatter]: (value: unknown, fileName: string) => PostFrontmatter[K];
};

export function getAllPosts(): PostSummary[] {
  return readMdxCollection<PostFrontmatter>({
    directoryName: "blog",
    fieldParsers: POST_FIELD_PARSERS,
  });
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
