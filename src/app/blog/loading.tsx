import styles from "./loading.module.css";

function SkeletonLine({ width }: { width: string }) {
  return <span className={styles.line} style={{ width }} />;
}

export default function BlogLoading() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading blog posts"
    >
      <aside className={`${styles.sidebar} ${styles.skeleton}`} aria-hidden>
        <SkeletonLine width="45%" />
        <div className={styles.sidebarLinks}>
          {Array.from({ length: 4 }, (_, index) => (
            <div className={styles.sidebarLink} key={index}>
              <SkeletonLine width="85%" />
              <SkeletonLine width="40%" />
            </div>
          ))}
        </div>
      </aside>

      <section className={styles.content} aria-hidden>
        <div className={`${styles.search} ${styles.skeleton}`} />
        {Array.from({ length: 3 }, (_, index) => (
          <article className={styles.card} key={index}>
            <div className={`${styles.thumbnail} ${styles.skeleton}`} />
            <div className={styles.cardBody}>
              <SkeletonLine width="25%" />
              <SkeletonLine width="60%" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="75%" />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
