"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ContentImage from "@components/ui/ContentImage";
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
      <section className="blog-controls" aria-label="Filter blog posts">
        <label htmlFor="blog-search">Search</label>
        <input
          id="blog-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts"
          type="search"
          value={query}
        />
        <div className="blog-filters" role="group" aria-label="Filter by content type">
          {(["all", "eng", "career", "life", "fun"] as const).map((type) => (
            <button
              aria-pressed={selectedType === type}
              className="tag-label"
              key={type}
              onClick={() => setSelectedType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
        <p className="blog-result-count" aria-live="polite">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
        </p>
      </section>

      <section className="content-index">
        {filteredPosts.length === 0 ? <p>No posts match those filters.</p> : null}

        {filteredPosts.map((post) => (
          <article className="content-card" key={post.slug}>
            <Link aria-label={`Read ${post.title}`} href={`/blog/${post.slug}`}>
              <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="thumbnail" />
            </Link>
            <div className="content-card__body">
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
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
