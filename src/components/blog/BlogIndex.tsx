"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";
import {
  BlogContentIndex,
  BlogControls,
  BlogFilterSelect,
  BlogSearchRow,
} from "@components/blog/BlogIndex.styles";
import ContentImage from "@components/ui/ContentImage";
import { ContentCard, ContentCardBody } from "@components/ui/ContentStyles";
import TagLabel from "@components/ui/TagLabel";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

type BlogType = "eng" | "career" | "life" | "fun";

type BlogIndexProps = {
  posts: PostSummary[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedType, setSelectedType] = useState<BlogType | "all">("all");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const filteredPosts = posts.filter((post) => {
    const matchesType = selectedType === "all" || post.tags.includes(selectedType);
    const searchableText = `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase();

    return matchesType && searchableText.includes(debouncedQuery);
  });

  return (
    <div>
      <BlogControls aria-label="Filter blog posts">
        <label htmlFor="blog-search">Search</label>
        <BlogSearchRow>
          <input
            id="blog-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts"
            type="search"
            value={query}
          />
          <BlogFilterSelect>
            <FaFilter aria-hidden />
            <select
              aria-label="Filter by content type"
              onChange={(event) => setSelectedType(event.target.value as BlogType | "all")}
              value={selectedType}
            >
              <option value="all">All types</option>
              <option value="eng">Eng</option>
              <option value="career">Career</option>
              <option value="life">Life</option>
              <option value="fun">Fun</option>
            </select>
          </BlogFilterSelect>
        </BlogSearchRow>
      </BlogControls>

      <BlogContentIndex as="section">
        {filteredPosts.length === 0 ? <p>No posts match those filters.</p> : null}

        {filteredPosts.map((post) => (
          <ContentCard key={post.slug}>
            <Link aria-label={`Read ${post.title}`} href={`/blog/${post.slug}`}>
              <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="thumbnail" />
            </Link>
            <ContentCardBody>
              <p>
                <span>{formatPostDate(post.date)}</span>{" "}
                {post.tags.map((tag) => (
                  <TagLabel key={tag} label={tag} />
                ))}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
              <p>
                <Link href={`/blog/${post.slug}`}>Read entry →</Link>
              </p>
            </ContentCardBody>
          </ContentCard>
        ))}
      </BlogContentIndex>
    </div>
  );
}
