import TopBlogLink from './TopBlogLink'
import { getTopPosts } from '@lib/blog'
import { formatPostDate } from '@lib/blog-shared'

const DISPLAY_LIMIT = 5

export default function TopBlogOverview() {
  const posts = getTopPosts(DISPLAY_LIMIT)

  return (
    <div className="w-full max-w-[260px] border-2 border-[#8b6b4a] bg-[#f6d6a8] p-1 font-mono text-black">
      <div className="space-y-1">
        <div className="border-2 border-[#8b6b4a] border-b-white bg-[#f2c28f] px-3 py-2 text-center">
          <div className="font-bold text-purple-600">Top Blogs</div>
          <div className="text-[11px] text-blue-600">latest published posts</div>
        </div>

        {posts.map((post) => (
          <TopBlogLink
            key={post.slug}
            dateLabel={formatPostDate(post.date)}
            href={`/blog/${post.slug}`}
            title={post.title}
          />
        ))}
      </div>
    </div>
  )
}
