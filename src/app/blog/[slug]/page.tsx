import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import styles from "@components/navigation/TopBlogOverview.module.css";
import ContentImage from "@components/ui/ContentImage";
import { ContentHero } from "@components/ui/ContentStyles";
import TagLabel from "@components/ui/TagLabel";
import { buildPostMetadata, getAllPostSlugs, getAllPosts, getPostBySlug } from "@lib/blog";
import { formatPostDate } from "@lib/blog-shared";

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
  const posts = getAllPosts();
  const post = posts.find((entry) => entry.slug === slug) ?? null;

  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(`../../../../content/blog/${slug}.mdx`);

  return (
    <main className={styles.page}>
      <p>
        <Link href="/blog">← Back to blog</Link>
      </p>

      <article>
        <header>
          <p>
            <span>{formatPostDate(post.date)}</span>{" "}
            {post.tags.map((tag) => (
              <TagLabel key={tag} label={tag} />
            ))}
          </p>
          <h1>{post.title}</h1>
          <p>{post.summary}</p>
        </header>

        <ContentHero>
          <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="hero" />
        </ContentHero>

        <PostContent />
      </article>

      <TopBlogOverview posts={posts} />
    </main>
  );
}
