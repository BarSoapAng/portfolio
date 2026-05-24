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
    <div className="w-full border-2 border-gray-2 bg-paper-1 p-1 shadow-retro-sm">
      <div className="group border-2 border-green-3 bg-green-2 px-3 py-2 font-mono text-gray-2">
        <p className="m-0 cursor-default text-sm">
          <span className="font-bold text-green-3">▸</span> Visitor #{" "}
          <span className="tabular-nums">
            {visitorCount === null ? "..." : visitorCount.toLocaleString()}
          </span>
        </p>
        <p className="m-0 max-h-0 overflow-hidden text-[10px] text-red-1 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-10 group-hover:opacity-100">
          ★ secret visitor society says hello.
        </p>
      </div>
    </div>
  );
}
