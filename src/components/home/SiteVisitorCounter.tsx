"use client";

import { useEffect, useState } from "react";
import styles from "./SiteVisitorCounter.module.css";

const VISITOR_COUNTER_KEY = "portfolio-site-visitor-count";

export default function SiteVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const storedCount = window.localStorage.getItem(VISITOR_COUNTER_KEY);
    const parsedCount = Number.parseInt(storedCount ?? "0", 10);
    const safeCount =
      Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 0;
    const nextCount = safeCount + 1;

    window.localStorage.setItem(VISITOR_COUNTER_KEY, String(nextCount));

    const timeoutId = window.setTimeout(() => {
      setVisitorCount(nextCount);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <aside className={styles.counter} aria-label="Personal visit counter">
      <p className={styles.label}>Secret visitor society</p>
      <p className={styles.message} aria-live="polite">
        Your visit number is{" "}
        <strong>
          {visitorCount === null ? "…" : `#${visitorCount.toLocaleString()}`}
        </strong>
        .
      </p>
      <p className={styles.note}>Counted privately in this browser.</p>
    </aside>
  );
}
