"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaThumbtack } from "react-icons/fa6";
import {
  BlogContentCard,
  BlogContentCardLayout,
  BlogContentIndex,
  BlogControls,
  PinnedPostIcon,
} from "@components/blog/BlogIndex.styles";
import ContentImage from "@components/ui/ContentImage";
import { ContentCardBody, EntryTags } from "@components/ui/ContentStyles";
import { Body, Heading2, TextInput } from "@components/ui/Typography";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

type BlogIndexProps = {
  posts: PostSummary[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const filteredPosts = posts.filter((post) => {
    const searchableText = `${post.title} ${post.summary}`.toLowerCase();

    return searchableText.includes(debouncedQuery);
  });

  return (
    <div>
      <BlogControls aria-label="Search blog posts">
        <TextInput
          aria-label="Search posts"
          id="blog-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts"
          type="search"
          value={query}
        />
      </BlogControls>

      <BlogContentIndex as="section">
        {filteredPosts.length === 0 ? <Body>No posts match those filters.</Body> : null}

        {filteredPosts.map((post) => (
          <BlogContentCard key={post.slug}>
            <BlogContentCardLayout>
              {post.pinned ? (
                <PinnedPostIcon aria-label="Pinned post" role="img" title="Pinned post">
                  <FaThumbtack aria-hidden />
                </PinnedPostIcon>
              ) : null}
              <Link aria-label={`Read ${post.title}`} href={`/blog/${post.slug}`}>
                <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="thumbnail" />
              </Link>
              <ContentCardBody>
                <Body>
                  <EntryTags>{formatPostDate(post.date)}</EntryTags>
                </Body>
                <Heading2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </Heading2>
                <Body>{post.summary}</Body>
              </ContentCardBody>
            </BlogContentCardLayout>
          </BlogContentCard>
        ))}
      </BlogContentIndex>
    </div>
  );
}
