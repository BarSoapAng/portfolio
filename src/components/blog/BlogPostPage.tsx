import type { ReactNode } from "react";
import Link from "next/link";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

type BlogPostPageProps = {
  post: PostSummary;
  children: ReactNode;
};

function Tag({ label }: { label: string }) {
  return (
    <span className="retro-tag">
      {label}
    </span>
  );
}

export default function BlogPostPage({ post, children }: BlogPostPageProps) {
  return (
    <main className="px-4 py-6 text-gray-2 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <div>
          <Link
            className="retro-button"
            href="/blog"
          >
            Back to blog
          </Link>
        </div>

        <article className="retro-panel shadow-retro-post">
          <div className="retro-panel-inner px-5 py-5 sm:px-8 sm:py-7">
            <header className="border-b-2 border-dashed border-sand-1 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-sand-1">
                <span>{formatPostDate(post.date)}</span>
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <h1 className="mt-3 text-3xl leading-tight text-gray-2 sm:text-4xl">{post.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-1">{post.summary}</p>
            </header>

            <div className="blog-prose mt-6">{children}</div>
          </div>
        </article>
      </div>
    </main>
  );
}
