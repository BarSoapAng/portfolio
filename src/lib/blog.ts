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
  similarReads: (value, fileName) => {
    if (
      !Array.isArray(value) ||
      value.length !== 3 ||
      value.some((slug) => typeof slug !== "string" || slug.trim().length === 0) ||
      new Set(value).size !== 3
    ) {
      throw new Error(`Expected "similarReads" to contain three unique post slugs in ${fileName}.`);
    }

    return value;
  },
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

export function getSimilarPosts(post: PostSummary): PostSummary[] {
  return post.similarReads.map((slug) => {
    if (slug === post.slug) {
      throw new Error(`Post "${post.slug}" cannot include itself in "similarReads".`);
    }

    const similarPost = postCollection.getBySlug(slug);

    if (!similarPost) {
      throw new Error(`Post "${post.slug}" references unknown similar read "${slug}".`);
    }

    return similarPost;
  });
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
