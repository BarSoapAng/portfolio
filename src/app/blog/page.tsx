import type { Metadata } from "next";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import styles from "@components/navigation/TopBlogOverview.module.css";
import ContentImage from "@components/ui/ContentImage";
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
    <main className={styles.page}>
      <section className="content-index">
        {posts.length === 0 ? (
          <p>
            No posts yet. Add MDX files to <code>content/blog</code>.
          </p>
        ) : null}

        {posts.map((post) => (
          <article className="content-card" key={post.slug}>
            <Link aria-label={`Read ${post.title}`} href={`/blog/${post.slug}`}>
              <ContentImage alt={post.thumbnailAlt} src={post.thumbnail} variant="thumbnail" />
            </Link>
            <div className="content-card__body">
              <p>
                <span>{formatPostDate(post.date)}</span>{" "}
                {post.tags.map((tag) => (
                  <TagLabel key={tag} label={tag} />
                ))}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
              <p>
                <Link href={`/blog/${post.slug}`}>Read entry →</Link>
              </p>
            </div>
          </article>
        ))}
      </section>

      <TopBlogOverview posts={posts} />
    </main>
  );
}
