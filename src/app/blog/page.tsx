import type { Metadata } from "next";
import BlogIndexPage from "@components/blog/BlogIndexPage";
import { getAllPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog | Angela's Universe",
  description: "Personal notes, weeknotes, and project updates written in local MDX files.",
};

export default function BlogPage() {
  return <BlogIndexPage posts={getAllPosts()} />;
}
