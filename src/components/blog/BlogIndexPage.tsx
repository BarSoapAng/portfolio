import Link from "next/link";
import TopBlogOverview from "@components/home/TopBlogOverview";
import { formatPostDate, type PostSummary } from "../../lib/blog-shared";

type BlogIndexPageProps = {
  posts: PostSummary[];
};

function Tag({ label }: { label: string }) {
  return (
    <span className="border border-[#8b6b4a] bg-[#fff7e7] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-[#6a4d2d]">
      {label}
    </span>
  );
}

export default function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <main className="px-4 py-6 text-[#193746] sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-6">
          <TopBlogOverview />
        </aside>

        <div className="flex min-w-0 flex-col gap-4">
          <section className="border-2 border-[#1f3442] bg-[#f4f1e2] p-1 font-mono shadow-[6px_6px_0_rgba(31,52,66,0.18)]">
            <div className="border-2 border-[#8b6b4a] bg-gradient-to-r from-[#f2cf83] via-[#f7dfaa] to-[#fff2cb] px-4 py-4">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a4f12]">Personal Blog</p>
              <h1 className="mt-2 text-3xl text-[#17303d]">Notes, weeknotes, and project scraps</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2b4652]">
                New posts only need a file in <code>content/blog</code>. Published entries are sorted by date and
                rendered automatically.
              </p>
            </div>
          </section>

          <section className="grid gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-2 border-[#1f3442] bg-[#fffdf4] p-1 font-mono shadow-[4px_4px_0_rgba(31,52,66,0.12)]"
              >
                <div className="flex h-full flex-col gap-4 border-2 border-[#8b6b4a] bg-[#f8ecd0] px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#6a4d2d]">
                    <span>{formatPostDate(post.date)}</span>
                    {post.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl leading-tight text-[#17303d]">
                      <Link className="underline decoration-[#be8f3d] underline-offset-4" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-sm leading-6 text-[#2b4652]">{post.summary}</p>
                  </div>

                  <div>
                    <Link
                      className="inline-flex border-2 border-[#1f3442] bg-[#84c8d7] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#193746] [box-shadow:inset_2px_2px_0_#d9f4f6,inset_-2px_-2px_0_#3d6b7a] transition hover:bg-[#9ed9e5]"
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
