import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostPage from "@components/blog/BlogPostPage";
import { buildPostMetadata, getAllPostSlugs, getPostBySlug } from "../../../lib/blog";

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
    <BlogPostPage post={post}>
      <PostContent />
    </BlogPostPage>
  );
}
