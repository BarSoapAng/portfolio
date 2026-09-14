import TopBlogLink from "@components/navigation/TopBlogLink";
import { Heading2 } from "@components/ui/Typography";
import { formatPostDate, type PostSummary } from "@lib/blog-shared";
import styles from "./SimilarReads.module.css";

type SimilarReadsProps = {
  posts: PostSummary[];
};

export default function SimilarReads({ posts }: SimilarReadsProps) {
  return (
    <section className={styles.section} aria-labelledby="similar-reads-heading">
      <Heading2 id="similar-reads-heading">Similar reads</Heading2>

      <ul>
        {posts.map((post) => (
          <TopBlogLink
            key={post.slug}
            dateLabel={formatPostDate(post.date)}
            href={`/blog/${post.slug}`}
            title={post.title}
          />
        ))}
      </ul>
    </section>
  );
}
