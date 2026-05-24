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
    <div className="w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-md">
      <div className="space-y-1 border-2 border-sand-1 bg-cream-2 p-1 font-mono text-gray-2">
        <div className="border-2 border-sand-1 bg-cream-1 px-3 py-2 text-center">
          <div className="font-bold text-purple-1">★ Top Blogs ★</div>
          <div className="text-[11px] tracking-wide text-blue-1">latest published posts</div>
        </div>

        {overviewPosts.length === 0 ? (
          <div className="border-2 border-sand-1 bg-cream-1 px-3 py-3 text-center text-xs text-sand-1">
            no posts yet — check back soon!
          </div>
        ) : (
          overviewPosts.map((post) => (
            <TopBlogLink
              key={post.slug}
              dateLabel={formatPostDate(post.date)}
              href={`/blog/${post.slug}`}
              title={post.title}
            />
          ))
        )}
      </div>
    </div>
  );
}
