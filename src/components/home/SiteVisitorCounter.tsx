"use client";

import { useEffect, useState } from "react";

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
    <>
      <p>
        Visitor # {visitorCount === null ? "..." : visitorCount.toLocaleString()}
      </p>
      <p>secret visitor society says hello.</p>
    </>
  );
}
