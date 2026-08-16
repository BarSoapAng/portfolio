import type { Metadata } from "next";
import Link from "next/link";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import styles from "@components/navigation/TopBlogOverview.module.css";
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
      <section>
        {posts.length === 0 ? (
          <p>
            No posts yet. Add MDX files to <code>content/blog</code>.
          </p>
        ) : null}

        {posts.map((post) => (
          <article key={post.slug}>
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
          </article>
        ))}
      </section>

      <TopBlogOverview posts={posts} />
    </main>
  );
}
