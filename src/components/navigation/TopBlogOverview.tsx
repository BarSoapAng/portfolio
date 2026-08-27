import TopBlogLink from "./TopBlogLink";
import styles from "./TopBlogOverview.module.css";
import { getTopPosts } from "@lib/blog";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

const DISPLAY_LIMIT = 5;

type TopBlogOverviewProps = {
  posts?: PostSummary[];
};

export default function TopBlogOverview({ posts }: TopBlogOverviewProps) {
  const overviewPosts = posts ?? getTopPosts(DISPLAY_LIMIT);

  return (
    <aside className={styles.sidebar} aria-labelledby="top-blogs-heading">
      <header>
        <h2 id="top-blogs-heading">Top Blogs</h2>
      </header>

      {overviewPosts.length === 0 ? (
        <p>no posts yet — check back soon!</p>
      ) : (
        <ul>
          {overviewPosts.map((post) => (
            <TopBlogLink
              key={post.slug}
              dateLabel={formatPostDate(post.date)}
              href={`/blog/${post.slug}`}
              title={post.title}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}
