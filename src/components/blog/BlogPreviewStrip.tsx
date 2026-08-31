"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import ContentImage from "@components/ui/ContentImage";
import { EntryTags } from "@components/ui/ContentStyles";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";
import {
  BlogStripCard,
  BlogStripGrid,
  BlogStripMore,
  BlogStripSection,
} from "./BlogPreviewStrip.styles";

type BlogPreviewStripProps = {
  posts: PostSummary[];
};

export default function BlogPreviewStrip({ posts }: BlogPreviewStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <BlogStripSection ref={sectionRef}>
      <BlogStripGrid>
        {posts.map((post, index) => (
          <div
            key={post.slug}
            style={{
              opacity: shouldReduceMotion || isInView ? 1 : 0,
              transition: `opacity 0.5s ease ${index * 0.1}s`,
            }}
          >
            <BlogStripCard>
              <Link
                aria-label={`Read ${post.title}`}
                href={`/blog/${post.slug}`}
              >
                <ContentImage
                  alt={post.thumbnailAlt}
                  src={post.thumbnail}
                  variant="thumbnail"
                />
              </Link>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>
                <EntryTags>{formatPostDate(post.date)}</EntryTags>
              </p>
            </BlogStripCard>
          </div>
        ))}
      </BlogStripGrid>
      <BlogStripMore>
        <Link href="/blog">See all posts &rarr;</Link>
      </BlogStripMore>
    </BlogStripSection>
  );
}
