import Link from "next/link";
import FoodMenuCard from "@components/home/FoodMenuCard";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

type BlogIndexPageProps = {
  posts: PostSummary[];
};

function Tag({ label }: { label: string }) {
  return (
    <span className="retro-tag">
      {label}
    </span>
  );
}

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-6">
          <FoodMenuCard />
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <section className="retro-panel bg-paper-2 shadow-retro-lg">
            <div className="border-2 border-sand-1 bg-gradient-to-r from-sand-2 via-cream-1 to-paper-1 px-4 py-4">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-sand-1">Personal Blog</p>
              <h1 className="mt-2 text-3xl text-gray-2">Notes, weeknotes, and project scraps</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-1">
                New posts only need a file in <code>content/blog</code>. Published entries are sorted by date and
                rendered automatically.
              </p>
            </div>
          </section>

          <section className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="retro-panel shadow-retro-md"
              >
                <div className="flex h-full flex-col gap-4 border-2 border-sand-1 bg-cream-1 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
                    <span>{formatPostDate(post.date)}</span>
                    {post.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
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
                      className="retro-button"
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
      </div>
    </main>
  );
}
