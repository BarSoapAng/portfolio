import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
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
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-4">
          <TopBlogOverview posts={posts} />
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <div>
            <Link
              className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:-translate-y-0.5 hover:bg-blue-2/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2"
              href="/blog"
            >
              ← Back to blog
            </Link>
          </div>

          <article className="border-2 border-gray-2 bg-paper-1 p-1 font-mono shadow-retro-lg">
            <div className="border-2 border-sand-1 bg-cream-1 px-5 py-5 sm:px-8 sm:py-7">
              <header className="border-b-2 border-dashed border-sand-2 pb-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
                  <span>{formatPostDate(post.date)}</span>
                  {post.tags.map((tag) => (
                    <TagLabel key={tag} label={tag} />
                  ))}
                </div>

                <h1 className="mt-3 text-3xl leading-tight text-gray-2 sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-1">{post.summary}</p>
              </header>

              <div className="mdx-prose mdx-prose--blog mt-6">
                <PostContent />
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
