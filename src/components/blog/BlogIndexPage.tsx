import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import TagLabel from "@components/ui/TagLabel";
import { formatPostDate, type PostSummary } from "../../lib/blog-shared";
import BgMusicPlayer from "./BgMusicPlayer";

type BlogIndexPageProps = {
  posts: PostSummary[];
};

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <>
      <BgMusicPlayer />
      <main className="px-4 py-6 text-gray-2 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <TopBlogOverview posts={posts} />
          </aside>

          <section className="grid gap-4 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md"
              >
                <div className="flex h-full flex-col gap-4 border-2 border-sand-1 bg-cream-1 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
                    <span>{formatPostDate(post.date)}</span>
                    {post.tags.map((tag) => (
                      <TagLabel key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl leading-tight text-gray-2">
                      <Link className="underline decoration-sand-2 underline-offset-4" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm leading-6 text-gray-1">{post.summary}</p>
                  </div>

                  <div>
                    <Link
                      className="inline-flex border-2 border-gray-2 bg-blue-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-2 shadow-inset-blue transition hover:bg-blue-2/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-1 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2"
                      href={`/blog/${post.slug}`}
                    >
                      Read entry
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
