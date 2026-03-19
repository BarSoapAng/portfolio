import type { ReactNode } from "react";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import TagLabel from "@components/ui/TagLabel";
import { formatPostDate, type PostSummary } from "../../lib/blog-shared";

type BlogPostPageProps = {
  post: PostSummary;
  posts: PostSummary[];
  children: ReactNode;
};

export default function BlogPostPage({ post, posts, children }: BlogPostPageProps) {
  return (
    <main className="px-4 py-6 text-[#193746] sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-6">
          <TopBlogOverview posts={posts} />
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <div>
            <Link
              className="inline-flex border-2 border-[#1f3442] bg-[#84c8d7] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#193746] [box-shadow:inset_2px_2px_0_#d9f4f6,inset_-2px_-2px_0_#3d6b7a] transition hover:bg-[#9ed9e5]"
              href="/blog"
            >
              Back to blog
            </Link>
          </div>

          <article className="border-2 border-[#1f3442] bg-[#fffdf4] p-1 font-mono shadow-[6px_6px_0_rgba(31,52,66,0.14)]">
            <div className="border-2 border-[#8b6b4a] bg-[#f8ecd0] px-5 py-5 sm:px-8 sm:py-7">
              <header className="border-b-2 border-dashed border-[#c7a46a] pb-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#6a4d2d]">
                  <span>{formatPostDate(post.date)}</span>
                  {post.tags.map((tag) => (
                    <TagLabel key={tag} label={tag} />
                  ))}
                </div>

                <h1 className="mt-3 text-3xl leading-tight text-[#17303d] sm:text-4xl">{post.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2b4652]">{post.summary}</p>
              </header>

              <div className="mdx-prose mdx-prose--blog mt-6">{children}</div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
