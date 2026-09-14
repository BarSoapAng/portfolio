import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogPostEngagement from "@components/blog/BlogPostEngagement";
import SimilarReads from "@components/blog/SimilarReads";
import ContentImage from "@components/ui/ContentImage";
import { BlogDate, BlogMeta, ContentHero } from "@components/ui/ContentStyles";
import { Body, Heading1 } from "@components/ui/Typography";
import { buildPostMetadata, getAllPostSlugs, getPostBySlug, getSimilarPosts } from "@lib/blog";
import { formatPostDate } from "@lib/blog-shared";
import styles from "./BlogPost.module.css";

type BlogPostRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return buildPostMetadata(post);
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(`../../../../content/blog/${slug}.mdx`);

  return (
    <main>
      <Body>
        <Link href="/blog">
          ← Back to blogs
        </Link>
      </Body>

      <article className={styles.article}>
        <header>
          <Heading1>{post.title}</Heading1>
          <Body>{post.summary}</Body>
        </header>

        <ContentHero>
          <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="hero" />
        </ContentHero>

        <BlogMeta>
          <BlogDate>{formatPostDate(post.date)}</BlogDate>
          <BlogPostEngagement slug={slug} />
        </BlogMeta>

        <PostContent />
      </article>

      <SimilarReads posts={getSimilarPosts(post)} />
    </main>
  );
}
