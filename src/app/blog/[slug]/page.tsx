import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SimilarReads from "@components/blog/SimilarReads";
import ContentImage from "@components/ui/ContentImage";
import { BlogDate, ContentHero } from "@components/ui/ContentStyles";
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
      <p>
        <Link href="/blog">
          ← Back to blogs
        </Link>
      </p>

      <article className={styles.article}>
        <header>
          <h1>{post.title}</h1>
          <p>{post.summary}</p>
        </header>

        <ContentHero>
          <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="hero" />
        </ContentHero>

        <BlogDate>{formatPostDate(post.date)}</BlogDate>

        <PostContent />
      </article>

      <SimilarReads posts={getSimilarPosts(post)} />
    </main>
  );
}
