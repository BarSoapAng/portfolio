import type { Metadata } from "next";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import TagLabel from "@components/ui/TagLabel";
import { getAllPosts } from "@lib/blog";
import { formatPostDate } from "@lib/blog-shared";

export const metadata: Metadata = {
  title: "Blog | Angela's Universe",
  description: "Personal notes, weeknotes, and project updates written in local MDX files.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-4">
          <TopBlogOverview posts={posts} />
        </aside>

        <section className="grid gap-4 md:grid-cols-2">
          {posts.length === 0 ? (
            <div className="md:col-span-2 border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
              <div className="border-2 border-sand-1 bg-cream-1 px-4 py-5 text-sm text-gray-1">
                No posts yet. Add MDX files to <code>content/blog</code>.
              </div>
            </div>
          ) : null}

          {posts.map((post) => (
            <article
              key={post.slug}
              className="group border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md transition hover:-translate-y-0.5 hover:shadow-retro-lg"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="flex h-full flex-col gap-4 border-2 border-sand-1 bg-cream-1 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-sand-1">
                    <span>{formatPostDate(post.date)}</span>
                    {post.tags.map((tag) => (
                      <TagLabel key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl leading-tight text-gray-2 decoration-sand-2 underline-offset-4 group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-6 text-gray-1">{post.summary}</p>
                  </div>

                  <div className="mt-auto">
                    <span className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition group-hover:bg-blue-2/85">
                      Read entry →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
