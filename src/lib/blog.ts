import "server-only";

import type { Metadata } from "next";
import type { PostFrontmatter, PostSummary } from "./blog-shared";
import { requireContentImageField } from "./content-images";
import {
  createMdxCollectionReader,
  parseTagsField,
  requireBoolean,
  requireBooleanField,
  requireDateField,
  requireStringField,
} from "./mdx-collection";

const POST_FIELD_PARSERS = {
  title: requireStringField("title"),
  date: requireDateField(),
  summary: requireStringField("summary"),
  thumbnail: requireContentImageField("thumbnail"),
  thumbnailAlt: requireStringField("thumbnailAlt"),
  pinned: (value, fileName) => (value === undefined ? false : requireBoolean(value, "pinned", fileName)),
  published: requireBooleanField("published"),
  tags: parseTagsField,
} satisfies {
  [K in keyof PostFrontmatter]: (value: unknown, fileName: string) => PostFrontmatter[K];
};

const postCollection = createMdxCollectionReader<PostFrontmatter>({
  directoryName: "blog",
  fieldParsers: POST_FIELD_PARSERS,
});

export function getAllPosts(): PostSummary[] {
  return postCollection.getAll().sort((left, right) => {
    if (left.pinned !== right.pinned) {
      return left.pinned ? -1 : 1;
    }

    return Date.parse(right.date) - Date.parse(left.date);
  });
}

export function getAllPostSlugs(): string[] {
  return postCollection.getSlugs();
}

export function getPostBySlug(slug: string): PostSummary | null {
  return postCollection.getBySlug(slug);
}

export function getTopPosts(limit: number): PostSummary[] {
  return getAllPosts().slice(0, Math.max(0, limit));
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
