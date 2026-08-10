import TopBlogLink from "./TopBlogLink";
import { getTopPosts } from "@lib/blog";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";

const DISPLAY_LIMIT = 5;

type TopBlogOverviewProps = {
  posts?: PostSummary[];
};

export default function TopBlogOverview({ posts }: TopBlogOverviewProps) {
  const overviewPosts = posts ?? getTopPosts(DISPLAY_LIMIT);

  return (
    <section>
      <header>
        <h2>★ Top Blogs ★</h2>
        <p>latest published posts</p>
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
    </section>
  );
}
