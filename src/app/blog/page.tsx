import type { Metadata } from "next";
import BlogIndex from "@components/blog/BlogIndex";
import TopBlogOverview from "@components/navigation/TopBlogOverview";
import styles from "@components/navigation/TopBlogOverview.module.css";
import { getAllPosts } from "@lib/blog";

export const metadata: Metadata = {
  title: "Blog | Angela's World",
  description: "Personal notes, weeknotes, and project updates written in local MDX files.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.page}>
      <BlogIndex posts={posts} />

      <TopBlogOverview posts={posts} />
    </main>
  );
}
